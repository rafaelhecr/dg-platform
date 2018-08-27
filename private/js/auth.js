// Initialize Firebase
//Esta configuración es para conectarme al servicio de Firebase, he eliminado el contenido de estos campos
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "/platform/login";
    };
});