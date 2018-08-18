const download = require('download-file');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

// funcion principal a exportar
let compPSReport = (url) => { 
    return new Promise((res, rej) => {
        setTimeout(download1, 100);
        setTimeout(download2, 1000, url);
        setTimeout(() => {
            const file1 = excelToJson({
                sourceFile: './temp/plantilla.xls'
            });
        
            const file2 = excelToJson({
                sourceFile: './temp/descargado.xls'
            });
            
            let datos = []; 
            let objeto = {};
            
            for (let i=0; i<file1['Sheet1'].length; i++){
                let textoLimpio1 = JSON.stringify(file1['Sheet1'][i]);
                let textoLimpio2 = JSON.stringify(file2['Sheet1'][i]);
                if (textoLimpio1 != textoLimpio2){
                    // console.log ((i+1) + " " + textoLimpio1 + "\n" + (i+1) + " " + textoLimpio2 + "\n\n");
                    datos.push({
                        "Plantilla": file1['Sheet1'][i],
                        "Subido": file2['Sheet1'][i]
                    });
                }
                
            }
            objeto.datos = datos;
            res(objeto);
        }, 3000)
        setTimeout(erase1, 5800);
        setTimeout(erase2, 6800);
    })
}

module.exports = {compPSReport};


// funciones secundarias que complementan la principal    
const download1 = () => {
    let urlPlantilla = "https://storage.googleapis.com/daduga/PlatillaParametros.xls";
    let optionsPlant = {
        directory: "./temp",
        filename: "plantilla.xls"
    }
    download(urlPlantilla, optionsPlant, function(err){
        if(err){
            throw err;
            console.log("Error en la descarga del archivo a comparar");
        }
    });
}

const download2 = (url) => {
    let optionsAComparar = {
        directory: "./temp",
        filename: "descargado.xls"
    }
    download(url, optionsAComparar, function(err){
        if(err){
            throw err;
            console.log("Error en la descarga del archivo a comparar");
        } 
    });    
}


const erase1 = () => {
    fs.unlink('./temp/plantilla.xls', (err) =>{
        if (err) throw err;
        console.log("La plantilla fue eliminada");
    } );
}

const erase2 = () => {
    fs.unlink('./temp/descargado.xls', (err) => {
        if (err) throw err;
        console.log("El archivo subido a comparar tambien fue eliminado");
    })
}
