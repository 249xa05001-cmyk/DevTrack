 /* ==========================================
   DOM Elements
========================================== */

const totalGoalsElement = document.getElementById("total-goals");
const completedGoalsElement = document.getElementById("completed-goals");
const pendingGoalsElement = document.getElementById("pending-goals");
const completionRateElement = document.getElementById("completion-rate");

/* ==========================================
   Chart Variable
========================================== */

let progressChart = null;
let priorityChart = null;
/* ==========================================
   Initialize Analytics
========================================== */

function initializeAnalytics() {

    updateAnalytics();

}

/* ==========================================
   Update Analytics
========================================== */

function updateAnalytics() {

    const total = goals.length;

    const completed = goals.filter(goal => goal.completed).length;

    const pending = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    totalGoalsElement.textContent = total;

    completedGoalsElement.textContent = completed;

    pendingGoalsElement.textContent = pending;

    completionRateElement.textContent = percentage + "%";

    drawChart(completed, pending);
    drawPriorityChart();
}

/* ==========================================
   Dashboard Statistics
========================================== */

 function updateDashboardStats() {

    const total = goals.length;

    const completed = goals.filter(goal => goal.completed).length;

    const pending = total - completed;

    const high = goals.filter(goal => goal.priority === "High").length;

    document.getElementById("stats-total").textContent = total;

    document.getElementById("stats-completed").textContent = completed;

    document.getElementById("stats-pending").textContent = pending;

    document.getElementById("stats-high").textContent = high;

}

/* ==========================================
   Draw Chart
========================================== */

function drawChart(completed, pending) {

    const canvas = document.getElementById("progressChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (progressChart) {

        progressChart.destroy();

    }

    progressChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Completed",
                "Pending"

            ],

            datasets: [{

                data: [

                    completed,
                    pending

                ],

                backgroundColor: [

                    "#22C55E",
                    "#EF4444"

                ],

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
/* ==========================================
   Priority Chart
========================================== */

function drawPriorityChart(){

    const high = goals.filter(g => g.priority === "High").length;

    const medium = goals.filter(g => g.priority === "Medium").length;

    const low = goals.filter(g => g.priority === "Low").length;

    const canvas = document.getElementById("priorityChart");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    if(priorityChart){

        priorityChart.destroy();

    }

    priorityChart = new Chart(ctx,{

        type:"bar",

        data:{

            labels:["High","Medium","Low"],

            datasets:[{

                label:"Goals",

                data:[high,medium,low],

                backgroundColor:[

                    "#EF4444",

                    "#F59E0B",

                    "#22C55E"

                ]

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            scales:{

                y:{

                    beginAtZero:true,

                    ticks:{

                        stepSize:1

                    }

                }

            }

        }

    });

}