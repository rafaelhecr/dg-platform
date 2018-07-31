const express = require("express");
const router = express.Router();
const compara_psexcel = require("./models/powerspecreport");
/*app.use() para el parser -  lo removere depues si no se ocupa */


/*daduga.com.mx/platform es la ruta de acceso */

router.get("/", function(req, res){
    /*res.send("platform/dashboard") */
    res.sendFile(__dirname + "/views/platform/dashboard.html");
});

router.get("/login", function(req, res){
    /*res.send("platform/dashboard") */
    res.sendFile(__dirname + "/views/platform/login.html");
});

router.get("/creportes", function(req,res){
    /*Se llama a la vista del comparador de archivos de programas de Cummins*/
    res.sendFile(__dirname + "/views/platform/com_reportes/creportes.html");
});

router.get("/creportes/result", function(req,res){
    res.status(200).send("Esta es la ruta correcta");
})
router.post("/creportes/result", function(req,res){
    
    console.log(req.body[0]["secure_url"]);
    compara_psexcel.compPSReport(req.body[0]["secure_url"]);
})

module.exports = router;