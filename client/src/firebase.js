// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAC7WJmgo9CqR0bOObfCOi5qwKEVLOVMTk",
    authDomain: "barberah-2ffd4.firebaseapp.com",
    projectId: "barberah-2ffd4",
    storageBucket: "barberah-2ffd4.appspot.com",
    messagingSenderId: "402511168046",
    appId: "1:402511168046:web:3f47d50ef6c432138a95bf",
    measurementId: "G-1JXKHFNFQJ"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);






// ----------------------------------

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage } from "firebase/storage";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAQbWbXwYs1Mb8xyJ2ZcK8NLqT0hh0dmzA",
//   authDomain: "zameen-7ecb6.firebaseapp.com",
//   projectId: "zameen-7ecb6",
//   storageBucket: "zameen-7ecb6.appspot.com",
//   messagingSenderId: "136536538680",
//   appId: "1:136536538680:web:b779587e423baab31270cd",
//   measurementId: "G-0WHXMZW1P1"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const storage = getStorage(app);