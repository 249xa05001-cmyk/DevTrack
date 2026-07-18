 /* ==========================================
   DOM Elements
========================================== */

const streakCount = document.getElementById("streak-count");
const bestStreak = document.getElementById("best-streak");

/* ==========================================
   Initialize Streak
========================================== */

function initializeStreak() {

    const streak = loadStreak();
    const best = loadBestStreak();

    updateStreakUI(streak, best);

}

/* ==========================================
   Update Study Streak
========================================== */

function updateStudyStreak() {

    let streak = loadStreak();
    let best = loadBestStreak();

    const lastVisit = loadLastVisit();
    const today = getTodayDate();

    /* Already studied today */
    if (lastVisit === today) {

        return;

    }

    /* First study */
    if (!lastVisit) {

        streak = 1;

    }

    else {

        const previous = new Date(lastVisit + "T00:00:00");
        const current = new Date(today + "T00:00:00");

        const difference = Math.floor(
            (current - previous) / (1000 * 60 * 60 * 24)
        );

        if (difference === 1) {

            streak++;

        }

        else {

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
