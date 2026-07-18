   /* ==========================================
   Goals Data
========================================== */

/* ==========================================
   DOM Elements
========================================== */
const searchGoal = document.getElementById("search-goal");

const filterCategory = document.getElementById("filter-category");

const sortGoals = document.getElementById("sort-goals");
const goalInput = document.getElementById("goal-input");
const goalCategory = document.getElementById("goal-category");
const goalPriority = document.getElementById("goal-priority");
const goalDate = document.getElementById("goal-date");

const addGoalBtn = document.getElementById("add-goal-btn");
const goalsContainer = document.getElementById("goals-container");

/* ==========================================
   Delete Modal
========================================== */

const deleteModal = document.getElementById("delete-modal");

const confirmDeleteBtn = document.getElementById("confirm-delete");

const cancelDeleteBtn = document.getElementById("cancel-delete");

let goalToDelete = null;

/* ==========================================
   Variables
========================================== */

let goals = loadGoals();

let editingGoalId = null;

/* ==========================================
   Initialize Goals
========================================== */

function initializeGoals() {

    goals = loadGoals();

    renderGoals();

}

/* ==========================================
   Add / Update Goal
========================================== */
function addGoal() {

    const title = goalInput.value.trim();

    if (title === "") {

        alert("Enter a goal.");

        return;

    }

    let isEditing = editingGoalId !== null;

    if (isEditing) {

        const goal = goals.find(g => g.id === editingGoalId);

        if (goal) {

            goal.title = title;
            goal.category = goalCategory.value;
            goal.priority = goalPriority.value;
            goal.targetDate = goalDate.value;

        }

        editingGoalId = null;

        addGoalBtn.textContent = "Add Goal";

    }

    else {

        goals.push({

            id: generateId(),

            title,

            category: goalCategory.value,

            priority: goalPriority.value,

            targetDate: goalDate.value,

            completed: false

        });

    }

    saveGoals(goals);

    showNotification(
        "✅ Goal Added",
        title
    );

    renderGoals();

    clearGoalForm();

    if (isEditing) {

        showToast("✏️ Goal Updated Successfully");

    }

    else {

        showToast("✅ Goal Added Successfully");

    }

}

/* ==========================================
   Clear Form
========================================== */
function clearGoalForm() {

    goalInput.value = "";

    goalCategory.selectedIndex = 0;

    goalPriority.selectedIndex = 0;

    goalDate.value = "";

    editingGoalId = null;

    addGoalBtn.textContent = "Add Goal";

}

/* ==========================================
   Timezone-Safe Date Parsing
========================================== */

/*
   new Date("YYYY-MM-DD") parses as UTC midnight. Calling
   .setHours(0,0,0,0) on that later re-anchors it to LOCAL
   midnight, which silently shifts the date back one day in
   any timezone behind UTC. Parsing the parts manually avoids
   that off-by-one entirely.
*/
function parseLocalDate(dateString) {

    if (!dateString) {
        return null;
    }

    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);

}

/* ==========================================
   Deadline Status
========================================== */

function getDeadlineStatus(date) {

    if (!date) {

        return "";

    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const deadline = parseLocalDate(date);

    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (diff > 0) {

        return `🟢 ${diff} day${diff > 1 ? "s" : ""} left`;

    }

    if (diff === 0) {

        return "🟡 Due Today";

    }

    return `🔴 Overdue by ${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""}`;

}



function renderGoals() {

    goalsContainer.innerHTML = "";

    /* Copy Goals Array */
    let filteredGoals = [...goals];

    /* ==========================
       Search
    ========================== */

    const searchText = searchGoal.value.trim().toLowerCase();

    if (searchText !== "") {

        filteredGoals = filteredGoals.filter(goal =>
            goal.title.toLowerCase().includes(searchText)
        );

    }

    /* ==========================
       Category Filter
    ========================== */

    if (filterCategory.value !== "All") {

        filteredGoals = filteredGoals.filter(goal =>
            goal.category === filterCategory.value
        );

    }

    /* ==========================
       Sorting
    ========================== */

    if (sortGoals.value === "priority") {

        const priorityOrder = {

            High: 1,
            Medium: 2,
            Low: 3

        };

        filteredGoals.sort((a, b) =>
            priorityOrder[a.priority] - priorityOrder[b.priority]
        );

    }

    else if (sortGoals.value === "deadline") {

        filteredGoals.sort((a, b) => {

            if (!a.targetDate) return 1;
            if (!b.targetDate) return -1;

            return parseLocalDate(a.targetDate) - parseLocalDate(b.targetDate);

        });

    }

    else if (sortGoals.value === "completed") {

        filteredGoals.sort((a, b) => a.completed - b.completed);

    }

    /* ==========================
       Empty State
    ========================== */

    if (filteredGoals.length === 0) {

        goalsContainer.innerHTML = `
            <div class="empty-state">

                <h2>🎯 No Goals Yet</h2>

                <p>
                    Add your first learning goal and start tracking your progress.
                </p>

            </div>
        `;

        updateProgress();
        updateAnalytics();
        updateDashboardStats();

        return;

    }

    /* ==========================
       Render Cards
    ========================== */

    filteredGoals.forEach(goal => {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deadline = goal.targetDate
            ? parseLocalDate(goal.targetDate)
            : null;

        const isOverdue =
            deadline &&
            deadline < today &&
            !goal.completed;

        /* Defensive fallbacks in case of malformed/imported data */
        const category = goal.category || "Other";
        const priority = goal.priority || "Medium";

        const card = document.createElement("div");

        card.className = isOverdue
            ? "goal-card overdue"
            : "goal-card";

        card.innerHTML = `

<div class="goal-left">

    <input
        type="checkbox"
        ${goal.completed ? "checked" : ""}
        data-id="${goal.id}"
        class="goal-checkbox">

    <div>

        <h3 class="goal-title ${goal.completed ? "completed" : ""}">
            ${goal.title}
        </h3>

        <div class="goal-meta">

            <span class="category ${category.toLowerCase()}">
                ${category}
            </span>

            <span class="priority ${priority.toLowerCase()}">
                ${priority}
            </span>

        </div>

        <p>
            📅 ${goal.targetDate || "No Deadline"}
        </p>

        <p class="deadline-status">
            ${getDeadlineStatus(goal.targetDate)}
        </p>

    </div>

</div>

<div class="goal-actions">

    <button
        class="edit-btn"
        data-id="${goal.id}">
        ✏️ Edit
    </button>

    <button
        class="delete-btn"
        data-id="${goal.id}">
        🗑 Delete
    </button>

</div>

`;

        goalsContainer.appendChild(card);

    });

    addGoalEvents();

    updateProgress();

    updateAnalytics();

    updateDashboardStats();

}

/* ==========================================
   Add Events
========================================== */

function addGoalEvents() {

    document.querySelectorAll(".goal-checkbox").forEach(box => {

        box.addEventListener("change", function () {

            toggleGoal(Number(this.dataset.id));

        });

    });

    document.querySelectorAll(".delete-btn").forEach(button => {

        button.addEventListener("click", function () {

            deleteGoal(Number(this.dataset.id));

        });

    });

    document.querySelectorAll(".edit-btn").forEach(button => {

        button.addEventListener("click", function () {

            editGoal(Number(this.dataset.id));

        });

    });

}

/* ==========================================
   Toggle Goal
========================================== */

function toggleGoal(id) {

    goals = goals.map(goal => {

        if (goal.id === id) {

            goal.completed = !goal.completed;

            if (goal.completed) {

                showNotification(
                    "🎉 Goal Completed",
                    goal.title
                );

            }

        }

        return goal;

    });

    saveGoals(goals);

    renderGoals();

}

/* ==========================================
   Delete Goal
========================================== */

function deleteGoal(id) {

    goalToDelete = id;

    deleteModal.classList.add("show");

}

/* ==========================================
   Edit Goal
========================================== */

function editGoal(id) {

    const goal = goals.find(g => g.id === id);

    if (!goal) return;

    goalInput.value = goal.title;

    goalCategory.value = goal.category || "Other";

    goalPriority.value = goal.priority || "Medium";

    goalDate.value = goal.targetDate || "";

    editingGoalId = id;

    addGoalBtn.textContent = "Update Goal";

    goalInput.focus();

}

/* ==========================================
   Events
========================================== */

addGoalBtn.addEventListener("click", addGoal);

goalInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addGoal();

    }

});

/* ==========================================
   Delete Modal Events
========================================== */

cancelDeleteBtn.addEventListener("click", function () {

    deleteModal.classList.remove("show");

    goalToDelete = null;

});

deleteModal.addEventListener("click", function (event) {

    if (event.target === deleteModal) {

        deleteModal.classList.remove("show");

        goalToDelete = null;

    }

});

confirmDeleteBtn.addEventListener("click", function () {

    goals = goals.filter(goal => goal.id !== goalToDelete);

    saveGoals(goals);

    renderGoals();

    showToast("🗑 Goal Deleted");

    deleteModal.classList.remove("show");

    goalToDelete = null;

});
