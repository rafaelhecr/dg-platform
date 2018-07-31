const express = require("express");
const router_app = require("./router_app");
const bodyParser = require("body-parser");

const app = express();

app.use ("/public", express.static('public'));
app.use("/private", express.static('private'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/platform", router_app);
app.listen(8080);