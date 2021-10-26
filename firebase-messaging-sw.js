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


console.log('sw messaging init ', messaging);

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: '/firebase-logo.png'
  // };

  self.registration.showNotification(payload.notification.title,
    payload.notification);
});




// // Customize notification handler
// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('Handling background message', payload);
//
//     // Copy data object to get parameters in the click handler
//     payload.data.notification = JSON.parse(JSON.stringify(payload.notification));
//
//     return self.registration.showNotification(payload.title, payload.notification);
// });
//
//
//
// // messaging.onNotificationClick('notificationclick').then(r => console.log(r));
//
// self.addEventListener('notificationclick', function(event) {
//     console.log('notificationclick', event);
//     const target = event.notification.data.click_action || '/';
//     event.notification.close();
//
//     // This looks to see if the current is already open and focuses if it is
//     event.waitUntil(clients.matchAll({
//         type: 'window',
//         includeUncontrolled: true
//     }).then(function(clientList) {
//         // clientList always is empty?!
//         for (var i = 0; i < clientList.length; i++) {
//             var client = clientList[i];
//             if (client.url === target && 'focus' in client) {
//                 return client.focus();
//             }
//         }
//
//         return clients.openWindow(target);
//     }));
// });
