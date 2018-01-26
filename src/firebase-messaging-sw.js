importScripts('https://www.gstatic.com/firebasejs/4.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.2/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '806923153240'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const options = {
    icon: '/favicon.png'
  };
  return self.registration.showNotification(payload.data.title, options);
});
