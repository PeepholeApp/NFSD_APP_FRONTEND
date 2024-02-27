importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAaYR3xE_0MFP3l9akg5OqeBQOGPqoAkiM",
  authDomain: "peephole-a72ed.firebaseapp.com",
  projectId: "peephole-a72ed",
  storageBucket: "peephole-a72ed.appspot.com",
  messagingSenderId: "703727668306",
  appId: "1:703727668306:web:2bc522d9547a05cef6238b",
  measurementId: "G-V6GV3K3Y8E",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging(firebaseApp);
