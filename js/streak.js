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

    let lastVisit = loadLastVisit();

    const today = getTodayDate();

    if (lastVisit === "") {

        streak = 1;

    }

    else {

        const previous = new Date(lastVisit);

        const current = new Date(today);

        const difference = Math.floor(

            (current - previous) / (1000 * 60 * 60 * 24)

        );

        if (difference === 1) {

            streak++;

        }

        else if (difference > 1) {

            streak = 1;

        }

    }

    if (streak > best) {

        best = streak;

        saveBestStreak(best);

    }

    if (lastVisit !== today) {

    saveStreak(streak);

    saveLastVisit(today);

}
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