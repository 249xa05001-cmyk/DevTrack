   /* ==========================================
   Initialize Notifications
========================================== */

function initializeNotifications() {

    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission === "default") {

        Notification.requestPermission();

    }

}

/* ==========================================
   Show Notification
========================================== */

function showNotification(title, message) {

    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission === "granted") {

        new Notification(title, {

            body: message,

            icon: "favicon.ico"

        });

    }

}
