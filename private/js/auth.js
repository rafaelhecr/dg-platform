// Initialize Firebase
var config = {
    apiKey: "AIzaSyAihFUK8QygoI-3GGpHWFdSaIJtJS-nqG8",
    authDomain: "dazzling-bruin-180814.firebaseapp.com",
    databaseURL: "https://dazzling-bruin-180814.firebaseio.com",
    projectId: "dazzling-bruin-180814",
    storageBucket: "dazzling-bruin-180814.appspot.com",
    messagingSenderId: "594017903645"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "/platform/login";
    };
});