// Metodo GET
function getPuntos() {
    var puntuaciones;

    $.ajax ({
        method: "GET",
        url: "http://127.0.0.1:8080/puntuacion",
        headers: {
            "Content-type": "applicaction/json"
        }
    }).done(function(data) {
        puntuaciones = data;
        for(var i = 0; i < puntuaciones.length; i++) {
            $("#puntos" + i).html(puntuaciones[i].nombre + ".........." + puntuaciones[i].puntuacion);
        }
    })
}

// Metodo POST
function postPuntos(name, puntos) {
    $.ajax({
        method:"POST",
        url: "http://127.0.0.1:8080/puntuacion",
        data: JSON.stringify({nombre: name, puntuacion: puntos}),
        headers: {"Content-type":"application/json"}
    });
}