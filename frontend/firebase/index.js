import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMjCzbTZa5h1R55yqyl1_3JjzcTCOH_j0",
  authDomain: "seekme-836f4.firebaseapp.com",
  projectId: "seekme-836f4",
  storageBucket: "seekme-836f4.appspot.com",
  messagingSenderId: "311288092391",
  appId: "1:311288092391:web:b4f1378934999e272e3442",
  measurementId: "G-3MF0SGLKPD",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app as default };
