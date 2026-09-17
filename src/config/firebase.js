import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCPlhId9WflsQAPKzD5Ue5gZsuzqm-Oemk",
  authDomain: "achanoif2.firebaseapp.com",
  projectId: "achanoif2",
  storageBucket: "achanoif2.firebasestorage.app",
  messagingSenderId: "934497056190",
  appId: "1:934497056190:web:b0c818e765f4c74e95b5ef",
  measurementId: "G-HNNXHVESFS",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

let auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    auth = getAuth(app);
  }
}

export { app, auth };
