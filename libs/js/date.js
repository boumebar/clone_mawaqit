
// Récupération de la date
const now = new Date();

// formater en date gregorien
export function formatDateGregorian(){
    const joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const mois = ["janv.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

    const jourSemaine = joursSemaine[now.getDay()];
    const jour = now.getDate();
    const moisAbrege = mois[now.getMonth()];
    const annee = now.getFullYear();
   
    // Affichage
    const dateFormatee = `${jourSemaine} ${jour} ${moisAbrege} ${annee}`;
    return dateFormatee;
}


// formate en Date Hegire
export function formatDateHegire(){
    const dateHijri =new Intl.DateTimeFormat('fr-TN-u-ca-islamic', {day: 'numeric', month: 'long',year : 'numeric'}).format(now);
    return dateHijri;
}

// recuperer le jour 
export function getCurrentDay(){
    return now.getDate();
}

// recuperer le mois
export function getCurrentMonth(){
    return now.getMonth();
}
// recuperer heure formater
export function getCurrentHour(){
    return now.getHours().toString().padStart(2, '0');
}

// recuperer minutes formater
export function getCurrentMinute(){
    return now.getMinutes().toString().padStart(2, '0');
}

// recuperer secondes formater
export function getCurrentSecond(){
    return now.getSeconds().toString().padStart(2, '0');
}



