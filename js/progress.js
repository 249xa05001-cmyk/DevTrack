 /* ==========================================
   Update Overall Progress
========================================== */

function updateProgress() {

    const progressBar = document.getElementById("overall-progress");
    const progressText = document.getElementById("progress-text");

    const totalGoals = goals.length;

    const completedGoals = goals.filter(goal => goal.completed).length;

    const percentage = calculatePercentage(completedGoals, totalGoals);

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        `${completedGoals} / ${totalGoals} Goals Completed (${percentage}%)`;

}

/* ==========================================
   Get Progress Details
========================================== */

function getProgressData() {

    return {

        total: goals.length,

        completed: goals.filter(goal => goal.completed).length,

        percentage: calculatePercentage(
            goals.filter(goal => goal.completed).length,
            goals.length
        )

    };

} 
