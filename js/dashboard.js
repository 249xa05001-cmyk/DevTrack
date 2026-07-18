 /* ==========================================
   Dashboard
========================================== */

const quotes = [

    "Small progress is still progress.",

    "Consistency beats motivation.",

    "Practice makes progress.",

    "Every bug teaches something.",

    "Code. Learn. Improve.",

    "One commit every day."

];

function initializeDashboard(){

    updateGreeting();

    updateDate();

    updateQuote();

}

function updateGreeting(){

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if(hour < 12){

        greeting = "Good Morning";

    }

    else if(hour < 18){

        greeting = "Good Afternoon";

    }

    document.getElementById("greeting").textContent =
        greeting + " 👋";

}

function updateDate(){

    const today = new Date();

    document.getElementById("today-date").textContent =
        today.toDateString();

}

function updateQuote(){

    const random =
        Math.floor(Math.random()*quotes.length);

    document.getElementById("quote").textContent =
        quotes[random];

} 
