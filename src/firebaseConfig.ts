import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const fbConfig = {
  apiKey: "AIzaSyAR2Mb1eJ2iFLEXAfWC1m0zs5TqK4tizMc",
  authDomain: "dutee-test.firebaseapp.com",
  projectId: "dutee-test",
  storageBucket: "dutee-test.appspot.com",
  messagingSenderId: "4673281886",
  appId: "1:4673281886:web:98e2c8f3006bc2e0b679cf",
  measurementId: "G-6JS7XESY67"
};
const app = initializeApp(fbConfig);
export const storage = getStorage(app);