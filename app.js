const express = require("express");
const router_app = require("./router_app");
const router_app_public = require("./middelwares/router_app_public");
const bodyParser = require("body-parser");

const app = express();

app.use ("/public", express.static('public'));
app.use ("/private", express.static('private'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/platform", router_app);

//Inicializador del server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`La aplicación esta a la escucha en ${PORT}`);
})