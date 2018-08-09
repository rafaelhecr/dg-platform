$(".button-collapse").sideNav();

$('.dropdown-button').dropdown('open');

$('.dropdown-button').dropdown('close');

function logout(){
    firebase.auth().signOut();
};