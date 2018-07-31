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
    if (user) {
        
    } else {
        window.location.href = "/platform/login";
    }
  });

$(function(){
    var uploadButton = $('#upload-button');
    uploadButton.on('click', function(e){
        cloudinary.openUploadWidget(
            { cloud_name: 'smith07', upload_preset: 'zmhzjmag',
            sources: ['local'], theme: 'white',
            client_allowed_formats: ["xls","csv"], resourse_type: 'raw'},
            function(error, result) {
                console.log(result);
                if (!error){
                    $.ajax({
                        url: '/platform/creportes/result',
                        type: 'POST',
                        data: JSON.stringify(result),
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        success: function(msg){
                            console.log(msg);
                        }
                    });

                }
            });
    });
});

$(document).on('cloudinarywidgetclosed', function(e, data){
    console.log("El widget se cerro", data);
});