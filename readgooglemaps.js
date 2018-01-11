function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'google_maps.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var responseText = xobj.responseText;
            // Parse JSON string into object
            var actual_JSON = JSON.parse(responseText);
            callback(actual_JSON);
        }
    };
    xobj.send(null);  

    //Aixo es el codi donat per el profesor.
}
function viewJSON() {
    loadJSON(function(response) {
        
        /*
        Aqui preparam la variable str per que sigui un string que ens retorni la nostra taula.
        Afegint el for que recor el JSON ficam dins cada celda la variable del JSON dins la nostra variable
        str que es la nostra taula.
        */
        var str = "<table><tr><th>Nombre</th><th>Direccion</th><th>Latitud</th><th>Longitud</th><th>Tipo de restaurante</th><th>Icono</th>";
        for(var i= 0; i<response.results.length; i++){
            str +=
            "<tr><td>"+response.results[i].name+
            "</td><td>"+response.results[i].vicinity+
            "</td><td>"+response.results[i].geometry.location.lat+
            "</td><td>"+response.results[i].geometry.location.lng+
            "</td><td>"+response.results[i].types+
            "</td><td><img src='"+response.results[i].icon+"'></td></tr>";
        }
        str += "</table>";
        
        //Aqui el que feim es retornar la nostra taula a la pagina web.
        document.getElementById("results").innerHTML = str;
    });
}

