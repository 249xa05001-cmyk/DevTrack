  /* ==========================================
   DOM Elements
========================================== */

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const importFile = document.getElementById("import-file");

/* ==========================================
   Events
========================================== */

if (exportBtn) {
    exportBtn.addEventListener("click", exportGoals);
}

if (importBtn) {
    importBtn.addEventListener("click", () => {
        importFile.click();
    });
}

if (importFile) {
    importFile.addEventListener("change", importGoals);
}

/* ==========================================
   Export Goals
========================================== */

function exportGoals() {

    const data = JSON.stringify(goals, null, 4);

    const blob = new Blob([data], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "devtrack-goals.json";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    showToast("📤 Goals Exported");

}

/* ==========================================
   Sanitize Imported Goal
========================================== */

/*
   An imported file can contain objects missing fields
   (category, priority, etc). Without this, renderGoals()
   later crashes on goal.category.toLowerCase() and the
   ENTIRE goal list silently disappears, not just the bad
   entry. Every field gets a safe fallback here instead.
*/
function sanitizeGoal(goal) {

    return {

        id: typeof goal.id === "number" ? goal.id : generateId(),

        title: typeof goal.title === "string" && goal.title.trim() !== ""
            ? goal.title
            : "Untitled Goal",

        category: typeof goal.category === "string" && goal.category.trim() !== ""
            ? goal.category
            : "Other",

        priority: ["High", "Medium", "Low"].includes(goal.priority)
            ? goal.priority
            : "Medium",

        targetDate: typeof goal.targetDate === "string" ? goal.targetDate : "",

        completed: !!goal.completed

    };

}

/* ==========================================
   Import Goals
========================================== */

function importGoals() {

    const file = importFile.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            const importedGoals = JSON.parse(event.target.result);

            if (!Array.isArray(importedGoals)) {
                throw new Error("Invalid File");
            }

            goals = importedGoals.map(sanitizeGoal);

            saveGoals(goals);

            renderGoals();

            showToast("📥 Goals Imported");

        } catch (error) {

            alert("Invalid JSON File!");

        }

    };

    reader.onerror = function () {

        alert("Could not read the selected file.");

    };

    reader.readAsText(file);

    /* Reset so re-selecting the same file still fires "change" */
    importFile.value = "";

}
 
