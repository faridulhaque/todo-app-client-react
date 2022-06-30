import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDibnK0u6DwbMpzxrFNZR7JZbVJ8XF6N-Q",
  authDomain: "ph-todo.firebaseapp.com",
  projectId: "ph-todo",
  storageBucket: "ph-todo.appspot.com",
  messagingSenderId: "1097989141559",
  appId: "1:1097989141559:web:b08632cb15fd11d9ca3bb2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
