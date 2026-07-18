 /* ==========================================
   DOM Elements
========================================== */

const notesArea = document.getElementById("daily-notes");

const saveNotesBtn = document.getElementById("save-notes-btn");

const lastSaved = document.getElementById("last-saved");

/* ==========================================
   Initialize Notes
========================================== */

function initializeNotes() {

    notesArea.value = loadNotes();

    const savedTime = loadData("notes_last_saved", "");

    if (savedTime !== "") {

        lastSaved.textContent =
            "Last Saved : " + savedTime;

    }

}

/* ==========================================
   Save Notes
========================================== */

function saveDailyNotes() {

    const notes = notesArea.value;

    saveNotes(notes);
    showToast("💾 Notes Saved");
    const time = new Date().toLocaleString();

    saveData("notes_last_saved", time);

    lastSaved.textContent =
        "Last Saved : " + time;

     

}

/* ==========================================
   Auto Save
========================================== */

let autoSaveTimer;

 if (notesArea) {

    notesArea.addEventListener("input", function () {

        clearTimeout(autoSaveTimer);

        autoSaveTimer = setTimeout(() => {

            saveDailyNotes();

        }, 2000);

    });

}

if (saveNotesBtn) {

    saveNotesBtn.addEventListener("click", saveDailyNotes);

}

/* ==========================================
   Save Button
========================================== */

  
