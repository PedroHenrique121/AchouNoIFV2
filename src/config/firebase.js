<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { Platform } from "react-native";

=======
import { Platform } from "react-native";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Config do projeto Firebase "achanoif2" (mesmo usado pelo painel de funcionários).
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
const firebaseConfig = {
  apiKey: "AIzaSyCPlhId9WflsQAPKzD5Ue5gZsuzqm-Oemk",
  authDomain: "achanoif2.firebaseapp.com",
  projectId: "achanoif2",
  storageBucket: "achanoif2.firebasestorage.app",
  messagingSenderId: "934497056190",
  appId: "1:934497056190:web:b0c818e765f4c74e95b5ef",
  measurementId: "G-HNNXHVESFS",
};

<<<<<<< HEAD
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
=======
// Evita reinicializar o app em hot-reload.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence:
      Platform.OS === "web"
        ? browserLocalPersistence
        : getReactNativePersistence(AsyncStorage),
  });
} catch {
  // Se o auth já foi inicializado (hot-reload), reaproveita a instância existente.
  auth = getAuth(app);
>>>>>>> 76bc0a53c6c01c8f29dea2d54a309ed71f2dd73c
}

export { app, auth };
