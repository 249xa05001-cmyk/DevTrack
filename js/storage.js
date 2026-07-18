 /* ==========================================
   Storage Keys
========================================== */

const STORAGE_KEYS = {
    GOALS: "devtrack_goals",
    NOTES: "devtrack_notes",
    STREAK: "devtrack_streak",
    LAST_VISIT: "devtrack_last_visit",
    THEME: "devtrack_theme",
    ANALYTICS: "devtrack_analytics",
    BEST_STREAK: "devtrack_best_streak",
};

/* ==========================================
   Save Data
========================================== */

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/* ==========================================
   Load Data
========================================== */
function loadData(key, defaultValue = null) {

    const data = localStorage.getItem(key);

    if (data === null) {
        return defaultValue;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${key}:`, error);
        return defaultValue;
    }

}
 

/* ==========================================
   Remove Data
========================================== */

function removeData(key) {
    localStorage.removeItem(key);
}

/* ==========================================
   Clear DevTrack Data
========================================== */

function clearDevTrackData() {

    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });

}

/* ==========================================
   Goals
========================================== */

function saveGoals(goals) {
    saveData(STORAGE_KEYS.GOALS, goals);
}

function loadGoals() {
    return loadData(STORAGE_KEYS.GOALS, []);
}

/* ==========================================
   Notes
========================================== */

function saveNotes(notes) {
    saveData(STORAGE_KEYS.NOTES, notes);
}

function loadNotes() {
    return loadData(STORAGE_KEYS.NOTES, "");
}

/* ==========================================
   Streak
========================================== */

function saveStreak(streak) {
    saveData(STORAGE_KEYS.STREAK, streak);
}

function loadStreak() {
    return loadData(STORAGE_KEYS.STREAK, 0);
}
function saveBestStreak(best) {

    saveData(STORAGE_KEYS.BEST_STREAK, best);

}

function loadBestStreak() {

    return loadData(STORAGE_KEYS.BEST_STREAK, 0);

}

/* ==========================================
   Last Visit
========================================== */

function saveLastVisit(date) {
    saveData(STORAGE_KEYS.LAST_VISIT, date);
}

function loadLastVisit() {
    return loadData(STORAGE_KEYS.LAST_VISIT, "");
}

/* ==========================================
   Theme
========================================== */

function saveTheme(theme) {
    saveData(STORAGE_KEYS.THEME, theme);
}

function loadTheme() {
    return loadData(STORAGE_KEYS.THEME, "light");
}

/* ==========================================
   Weekly Analytics
========================================== */

function saveAnalytics(data) {
    saveData(STORAGE_KEYS.ANALYTICS, data);
}

function loadAnalytics() {

    return loadData(STORAGE_KEYS.ANALYTICS, {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
    });

} 
