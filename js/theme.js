   /* ==========================================
   DOM Elements
========================================== */

const themeBtn = document.getElementById("theme-btn");

/* ==========================================
   Initialize Theme
========================================== */

function initializeTheme() {

    const theme = loadTheme();

    if (theme === "dark") {

        document.body.classList.add("dark");

        if (themeBtn) {
            themeBtn.textContent = "☀️";
        }

    } else {

        document.body.classList.remove("dark");

        if (themeBtn) {
            themeBtn.textContent = "🌙";
        }

    }

}

/* ==========================================
   Toggle Theme
========================================== */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    saveTheme(isDark ? "dark" : "light");

    if (themeBtn) {
        themeBtn.textContent = isDark ? "☀️" : "🌙";
    }

}

/* ==========================================
   Events
========================================== */

if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
}
