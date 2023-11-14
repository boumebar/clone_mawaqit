 import { getCurrentMonth, getCurrentDay, getCurrentHour } from "./date.js";



 // Fonction recuperant la prochaine heure de prière
 export function getNextPrayerTime(horaires) {
    var currentTime = new Date();
    var currentHour = getCurrentHour();
    var currentMinute = currentTime.getMinutes();
    // Convertir l'heure actuelle en millisecondes
    var currentTimeMs = (currentHour * 60 + currentMinute) * 60000;

    // Convertir chaque heure de prière en millisecondes pour la comparaison
    var prayerTimesInMs = horaires.map(function (prayerTime) {
    var timeComponents = prayerTime.split(':');
    var hours = parseInt(timeComponents[0], 10);
    var minutes = parseInt(timeComponents[1], 10);
    return (hours * 60 + minutes) * 60000;
    });
     // Chercher la prochaine heure de prière
    var nextPrayerTime;
    for (var i = 0; i < prayerTimesInMs.length; i++) {
        if (prayerTimesInMs[i] > currentTimeMs) {
            nextPrayerTime = new Date(currentTime);
            nextPrayerTime.setHours(Math.floor(prayerTimesInMs[i] / 3600000), (prayerTimesInMs[i] / 60000) % 60, 0);
            break;
        }else{
            nextPrayerTime = new Date(prayerTimesInMs[0]);
            nextPrayerTime.setHours(Math.floor(prayerTimesInMs[0] / 3600000), (prayerTimesInMs[0] / 60000) % 60, 0);
        }
    }
    var nextPrayerHour = nextPrayerTime.getHours();
    var nextPrayerMinute = nextPrayerTime.getMinutes();

    var formattedNextPrayerTime = ('0' + nextPrayerHour).slice(-2) + ':' + ('0' + nextPrayerMinute).slice(-2);

    return formattedNextPrayerTime;
 }


 // recuperer les donnees d'une mosquee
 export function dataMasjid(ville = "vitry") {
    return fetch("libs/mosquees/" + ville + ".json")
        .then((response) => response.json())
        .catch((error) => {
            console.error("Erreur lors de la récupération des horaires de prière : " + error);
        });
}

// genere les cartes avec horaires de prière
export function cardsPrayers(data,prayersCard,chouroukCard,jumuaCard,countDown,nameNextPrayer) {

    var data = data;
    var month = getCurrentMonth();
    var day = getCurrentDay();
    //console.log(data.calendar[month][day]);
    if (data.calendar[month] && data.calendar[month][day]) {
        const horaires = data.calendar[month][day];
        const iqamatime = data.iqamaCalendar[month][day];
        // Créez un tableau des noms des prières dans l'ordre
        const prayerNames = ["Fajr","Dhuhr", "Asr", "Maghrib", "Isha"];

        // Affichez les horaires de chourouk
        chouroukTime(horaires,chouroukCard);

        // Affichez les horaires de joumoua
        joumouaTime(data,jumuaCard);

        // console.log(horaires)
        
        // Cherchez la prochaine heure de prière
        var nextPrayerTime = getNextPrayerTime(horaires);

        const countdown = countdownFromNowToNextPrayer(nextPrayerTime);
        countDown.textContent = countdown;

        // Affichez les horaires de prières
        let i = 0;
        prayerNames.forEach((prayerName) => {
            // Créez un élément div pour cette prière
            const prayerDiv = document.createElement('div');

            // Créez un élément div pour le nom de la prière
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.textContent = prayerName;

            // Créez un élément div pour l'heure de la prière
            const timeDiv = document.createElement('div');
            timeDiv.classList.add('time');

            // Créez un élément div pour l'heure exacte
            const timeExactDiv = document.createElement('div');
            timeExactDiv.textContent = horaires[i];

            // Créez un élément div pour l'attente (ex. +10 minutes)
            const waitDiv = document.createElement('div');
            waitDiv.classList.add('wait');
            waitDiv.textContent = iqamatime[i];


            // si l'heure de la prière est la suivante alors mettre la classe rouge
            if (horaires[i] === nextPrayerTime) {
                prayerDiv.classList.add('prayer-highlighted');
                nameNextPrayer.textContent = prayerName;        
            }

            // Ajoutez le nom, l'heure exacte et l'attente à l'élément de prière
            timeDiv.appendChild(timeExactDiv);
            prayerDiv.appendChild(nameDiv);
            prayerDiv.appendChild(timeDiv);
            prayerDiv.appendChild(waitDiv);

           

            // Ajoutez l'élément de prière à l'élément des prières
            prayersCard.appendChild(prayerDiv);

            i++;
        });
    } else {
        console.error("Horaires de prière non disponibles pour aujourd'hui.");
    }
   
}


// recuperer les horaires de chourouk
function chouroukTime(horaires,chouroukCard){
// Affichez les horaires de chourouk

    if (horaires.length >= 2) {
        // Supprimez l'heure de chourouk et l'enregistre
        const chouroukTime = horaires.splice(1, 1)[0];
        // Affichez l'heure de chourouk
        chouroukCard.textContent = chouroukTime;
    } else {
        console.log("Le tableau n'a pas assez d'éléments pour retirer le deuxième.");
    }  
}

//recuperer les horaires de joumoua
function joumouaTime(data,jumuaCard){
      // Affichez les horaires de joumoua
      //console.log(data);
      if(data.jumua){
        jumuaCard.textContent = data.jumua;
    }else {
        console.log("Il n'y a pas de salat jumua");
    }
}

// Fonction pour calculer le temps restant pour la prochaine prière
function countdownFromNowToNextPrayer(nextPrayerTime) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const nextPrayerTimeParts = nextPrayerTime.split(':');
    const nextPrayerHour = parseInt(nextPrayerTimeParts[0]);
    const nextPrayerMinute = parseInt(nextPrayerTimeParts[1]);

    const currentDate = new Date();
    const nextPrayerDate = new Date();

    currentDate.setHours(currentHour, currentMinute, 0, 0);
    nextPrayerDate.setHours(nextPrayerHour, nextPrayerMinute, 0, 0);

    let timeDiff = nextPrayerDate - currentDate;

    if (timeDiff < 0) {
        // Si l'heure de la prochaine prière est antérieure à l'heure actuelle, ajoutez 24 heures
        timeDiff += 24 * 60 * 60 * 1000;
    }

    const hours = formattedTime(Math.floor(timeDiff / (60 * 60 * 1000)));
    const minutes = formattedTime(Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000)));

    return `${hours}:${minutes}`;
}


// formate les minutes ou heures
export function formattedTime(currentTime){
    return currentTime < 10 ? `0${currentTime}` : currentTime.toString().slice(-2);
}
