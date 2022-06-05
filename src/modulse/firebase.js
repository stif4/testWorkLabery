import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCXAlIjGryKS3dEokb6yzo_TOPuSRNMMWM",
  authDomain: "testproject-4aef1.firebaseapp.com",
  databaseURL: "https://testproject-4aef1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testproject-4aef1",
  storageBucket: "testproject-4aef1.appspot.com",
  messagingSenderId: "1070815036783",
  appId: "1:1070815036783:web:f1dcc55a05246015ab949a",
  measurementId: "G-8SR8ERRVG1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();