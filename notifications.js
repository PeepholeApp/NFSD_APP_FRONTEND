import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

async function initializeNotifications(user) {
  const firebaseConfig = {
    apiKey: "AIzaSyAaYR3xE_0MFP3l9akg5OqeBQOGPqoAkiM",
    authDomain: "peephole-a72ed.firebaseapp.com",
    projectId: "peephole-a72ed",
    storageBucket: "peephole-a72ed.appspot.com",
    messagingSenderId: "703727668306",
    appId: "1:703727668306:web:2bc522d9547a05cef6238b",
    measurementId: "G-V6GV3K3Y8E",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging();

  onMessage(messaging, (message) => {
    console.log("message", message);
  });
  const result = await Notification.requestPermission();
  if (result === "granted") {
    getToken(messaging, {
      vapidKey:
        "BAxUvQBYrOql6XXisi3b_Dl2AIjCbVJ4wZy48w9i3HuAd2-G4yTqNdaNqYV5-IASNg3LxHlHuXHW2JltztZfxHY",
    }).then(async (token) => {
      if (token) {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${user.userId}`,
          {
            pushToken: token,
          },
          {
            headers: {
              //manda el token del usuario verificado
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      }
      console.log("token", token);
    });
  }
}

export default initializeNotifications;
