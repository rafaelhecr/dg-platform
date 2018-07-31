const express = require('express');
const app = express();
const download = require('download-file');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
var acumText;

module.exports.compPSReport = (url) => {
    let urlParse = url;
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
    
    const download2 = () => {
        //let urlAComparar = "https://res.cloudinary.com/smith07/raw/upload/v1531498989/vxhtl1qdnhirnlggokz5.xls";
        let urlAComparar = urlParse;
        let optionsAComparar = {
            directory: "./temp",
            filename: "descargado.xls"
        }
        download(urlAComparar, optionsAComparar, function(err){
            if(err){
                throw err;
                console.log("Error en la descarga del archivo a comparar");
            } 
        });    
    }

    const readFilesContent = () =>{
        const file1 = excelToJson({
            sourceFile: './temp/plantilla.xls'
        });
    
        const file2 = excelToJson({
            sourceFile: './temp/descargado.xls'
        });
        
    
        
        for (let i=0; i<file1['Sheet1'].length; i++){
            let textoLimpio1 = JSON.stringify(file1['Sheet1'][i]);
            let textoLimpio2 = JSON.stringify(file2['Sheet1'][i]);
            if (textoLimpio1 != textoLimpio2){
                acumText += (i+1) + " " + textoLimpio1 + "\n" + (i+1) + " " + textoLimpio2 + "\n\n";
                console.log ((i+1) + " " + textoLimpio1 + "\n" + (i+1) + " " + textoLimpio2 + "\n\n");

            }
            
        }
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
    setTimeout(download1, 50);
    setTimeout(download2, 100);
    setTimeout(readFilesContent, 3000);
    setTimeout(erase1, 7000);
    setTimeout(erase2, 7000);
};
