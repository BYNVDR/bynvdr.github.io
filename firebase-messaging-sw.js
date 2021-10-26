// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyCEds7abmJXm7Vj2JOFaSu6a1cIMqJYjZo",
    authDomain: "scloud-659bd.firebaseapp.com",
    projectId: "scloud-659bd",
    storageBucket: "scloud-659bd.appspot.com",
    messagingSenderId: "832589533425",
    appId: "1:832589533425:web:140e979cd7be3f4bca5950",
    measurementId: "G-03FTQM8LRR"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
    const target = event.notification.click_action || '/';
    event.notification.close();

    // этот код должен проверять список открытых вкладок и переключатся на открытую
    // вкладку с ссылкой если такая есть, иначе открывает новую вкладку
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList почему-то всегда пуст!?
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        // Открываем новое окно
        return clients.openWindow(target);
    }));
});