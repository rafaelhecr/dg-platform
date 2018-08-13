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
                        success: function(resultadoCompar){ //mostrar el mensaje con los resultados de la comparación
                            var DatosJson = JSON.parse(JSON.stringify(resultadoCompar));
                            console.log(DatosJson.datos);
                            $("#Table").append('<tr> Se encontraron las siguientes diferencias </tr> <tr>' +
                                '<td align="center" style="dislay: none;"> Plantilla </td>' + 
                                '<td align="center" style="dislay: none;"> Subido </td> </tr>' );
                            for(i=0; i < DatosJson.datos.length; i++){
                                $("#Table").append('<tr>' +                             
                                '<td align="center" style="dislay: none;">' + JSON.stringify(DatosJson.datos[i].Plantilla) + '</td>'+
                                '<td align="center" style="dislay: none;">' + JSON.stringify(DatosJson.datos[i].Subido) + '</td>'+'</tr>');
                            }  
                        }
                    });

                }
            });
    });
});

$(document).on('cloudinarywidgetclosed', function(e, data){
    console.log("El widget se cerro", data);
});
// intentando leer la respuesta
