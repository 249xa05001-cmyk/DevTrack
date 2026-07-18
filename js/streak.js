  /* ==========================================
   DOM Elements
========================================== */

const streakCount = document.getElementById("streak-count");

const bestStreak = document.getElementById("best-streak");

/* ==========================================
   Initialize Streak
========================================== */
function initializeStreak() {

    let streak = loadStreak();
    let best = loadBestStreak();
    const lastVisit = loadLastVisit();
    const today = getTodayDate();

    // First time using the app
    if (!lastVisit) {

        streak = 1;

    } else {

        const previous = new Date(lastVisit + "T00:00:00");
        const current = new Date(today + "T00:00:00");

        const oneDay = 24 * 60 * 60 * 1000;
        const difference = Math.floor((current - previous) / oneDay);

        if (difference === 0) {
            // Same day → do nothing
        }
        else if (difference === 1) {
            // Consecutive day
            streak++;
        }
        else if (difference > 1) {
            // Missed one or more days
            streak = 1;
        }
    }

    if (streak > best) {
        best = streak;
        saveBestStreak(best);
    }

    saveStreak(streak);
    saveLastVisit(today);

    updateStreakUI(streak, best);
}
 
/* ==========================================
   Update UI
========================================== */

 function updateStreakUI(streak, best) {

    if (streakCount) {
        streakCount.textContent = `${streak} Days`;
    }

    if (bestStreak) {
        bestStreak.textContent = `${best} Days`;
    }

}
