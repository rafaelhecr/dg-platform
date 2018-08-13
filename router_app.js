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
    /*res.send("platform/dashboard/login") */
    res.sendFile(__dirname + "/views/platform/login.html");
});

router.get("/creportes", function(req,res){
    /*Se llama a la vista del comparador de archivos de programas de Cummins
    res.send("platform/creportes")*/
    res.sendFile(__dirname + "/views/platform/com_reportes/creportes.html");
});


router.post("/creportes/result", function(req,res){
    /*Ruta tipo post para recibir como parametro por AJAX el link de cloudinary*/    
    console.log(req.body[0]["secure_url"]);
    compara_psexcel.compPSReport(req.body[0]["secure_url"]).then((resultado) => {    
        console.log(JSON.stringify(resultado));
        res.json(resultado);
    }, (error) => {
        console.log(error);
    })
})

module.exports = router;