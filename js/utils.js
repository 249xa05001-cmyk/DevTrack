  /* ==========================================
   Generate Unique ID
========================================== */

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

/* ==========================================
   Get Today's Date
========================================== */

 function getTodayDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

/* ==========================================
   Format Date
========================================== */

function formatDate(dateString) {

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    return new Date(dateString).toLocaleDateString("en-US", options);

}

/* ==========================================
   Calculate Percentage
========================================== */

function calculatePercentage(completed, total) {

    if (total === 0) {
        return 0;
    }

    return Math.round((completed / total) * 100);

}

/* ==========================================
   Create Element
========================================== */

function createElement(tag, className = "", text = "") {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;

}

/* ==========================================
   Capitalize First Letter
========================================== */

function capitalize(text) {

    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);

}

/* ==========================================
   Show Alert
========================================== */

function showMessage(message) {

    alert(message);

}
/* ==========================================
   Toast Notification
========================================== */

function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    },100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        },300);

    },2500);

}
/* ==========================================
   Toast Notification
========================================== */

 
function getRemainingDays(date, completed){

    if(completed) return "✅ Completed";

    const today = new Date();

    const target = new Date(date);

    const diff = Math.ceil(
        (target - today) / (1000*60*60*24)
    );

    if(diff > 0)
        return `⏳ ${diff} days left`;

    if(diff === 0)
        return "📅 Due Today";

    return `❌ Overdue by ${Math.abs(diff)} days`;
}
