import { formatDateGregorian,formatDateHegire } from "./date.js";
import { cardsPrayers, dataMasjid,formattedTime} from "./prayers.js";


// Récupération des éléments HTML
const timeDisplay = document.getElementById('timeDisplay');
const secDisplay = document.getElementById('sec');
const title = document.querySelector('h1');
const dateGregorien = document.getElementById('gregorianDate');
const dateHegirien = document.getElementById('hijriDate');
const temperature = document.getElementById('temperature');
const prayersCard = document.getElementById('prayers');
const chouroukCard = document.querySelector('.chourouk-id > div');
const jumuaCard = document.querySelector('.joumouaa-id > div');
const countDown = document.querySelector('#countdown');
const nameNextPrayer = document.querySelector('#name-next-prayer');



// Fonction pour mettre à jour l'heure
function displayTime() {
    var currentTime = new Date();
    var currentHour = formattedTime(currentTime.getHours());
    var currentMinute = formattedTime(currentTime.getMinutes());
    var currentSecond = formattedTime(currentTime.getSeconds());

    timeDisplay.textContent = currentHour + ':' + currentMinute;
    secDisplay.textContent = ':' + currentSecond;
    secDisplay.style.color = '#D1B6BB';    

}


// Fonction pour mettre à jour la date hegirienne
function dateHegirian() {
    dateHegirien.textContent = formatDateHegire();
}

// Fonction pour mettre à jour la date gregorienne
function dateGregorian() {
    dateGregorien.textContent = formatDateGregorian();
}

// Initialisez un compteur pour suivre l'état actuel (true pour hijriDate, false pour gregorianDate)
let isHijriDateVisible = true;
// Fonction pour alterner la date hegire , gregorienne
function alternateDate() {
    if (isHijriDateVisible) {
        dateHegirien.classList.remove("fadeOut");
        dateHegirien.classList.add("fadeIn");
        dateGregorien.classList.remove("fadeIn");
        dateGregorien.classList.add("fadeOut");
      } else {
        dateHegirien.classList.remove("fadeIn");
        dateHegirien.classList.add("fadeOut");
        dateGregorien.classList.remove("fadeOut");
        dateGregorien.classList.add("fadeIn");
      }
    
      isHijriDateVisible = !isHijriDateVisible;
}


// Fonction pour mettre à jour la temperature
function weather(ville){
    const apiKey = '7e9e33d53b6cf495efd6a3fe00a8ecd6'; // Remplacez par votre clé API OpenWeatherMap

    // Faites une requête à l'API OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {

        temperature.textContent = Math.round(data.main.temp);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération de la température :', error);
  });
}


// Recupere les horaires de prière
async function getPrayersTimes() {
    var ville = getVariableUrl();
    const data = await dataMasjid(ville);
    if(data){
        return data;
    }else{
        return dataMasjid();
    }
}

// construit et affiche les horaires
async function displayPrayers() {
    try {
        const data = await getPrayersTimes();
        cardsPrayers(data,prayersCard,chouroukCard,jumuaCard,countDown,nameNextPrayer);
        title.textContent = data.name;
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Fonction pour obtenir la ville dans l'url
function getVariableUrl() {
    var url = window.location.href;
    var variable = url.split('=');
    var ville = variable[variable.length - 1];
    if(ville.length > 10){
        ville = "vitry";
    }
    return ville;
}



// Fonction principale

function run(){

    // Mettre à jour les horaires de prière
    setInterval(displayPrayers(),60000);
    
    // Mettre à jour l'heure toutes les secondes
    setInterval(displayTime, 1000);

    // Démarrez la minuterie pour alterner toutes les 5 secondes (5000 ms)
    setInterval(alternateDate, 5000);

    // Mettre à jour la date hegirienne
    dateHegirian();

    // Mettre à jour la date gregorienne
    dateGregorian();

    // Mettre à jour la température
    weather(getVariableUrl());
    
}


// Lancer la fonction
run();

























