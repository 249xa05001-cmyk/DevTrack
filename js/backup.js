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

            goals = importedGoals;

            saveGoals(goals);

            renderGoals();

            showToast("📥 Goals Imported");

        } catch (error) {

            alert("Invalid JSON File!");

        }

    };

    reader.readAsText(file);

}