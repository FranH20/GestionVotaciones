var db = firebase.firestore();

function guardarConcurso(){
    
    var nombre = document.getElementById('nombre').value;
    var fechaInicio = document.getElementById('fechaInicio').value;
    var fechaFin = document.getElementById('fechaFin').value;
    var horaInicio = document.getElementById('horaInicio').value;
    var horaFin = document.getElementById('horaFin').value;
    
    //Ejemplo inconcluso: fechainicio: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),

    // Agregar Datos
    db.collection("concurso").add({
        nombre: nombre,
        fechainicio: fechaInicio,
        fechafin: fechaFin,
        horainicio: horaInicio,
        horafin: horaFin
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}

//Leer documentos
var datosTabla = document.getElementById('tablaconcurso');

db.collection("concurso").onSnapshot((querySnapshot) => {
    datosTabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        datosTabla.innerHTML += `<tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().fechainicio}</td>
        <td>${doc.data().fechafin}</td>
        <td>${doc.data().horainicio}</td>
        <td>${doc.data().horafin}</td>
        <td><button class="btn btn-danger" onclick="eliminarconcurso('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editarconcurso('${doc.id}','${doc.data().nombre}', '${doc.data().fechainicio}',
         '${doc.data().fechafin}', '${doc.data().horainicio}', '${doc.data().horafin}')">Editar</button></td>
        </tr>`
    });
});

function eliminarconcurso(id){
    //Borrar documentos
    db.collection("concurso").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Editar documentos
function editarconcurso(id, nombre, apellido, fecha){
    document.getElementById('nombre').value = nombre;
    document.getElementById('fechaInicio').value = fechaInicio;
    document.getElementById('fechaFin').value = fechaFin;
    document.getElementById('horaInicio').value = horaInicio;
    document.getElementById('horaFin').value = horaFin;

    var boton = document.getElementById('botonconcurso');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var identificador = db.collection('users').doc(id);
        
        var nombre = document.getElementById('nombre').value;
        var fechaInicio = document.getElementById('fechaInicio').value;
        var fechaFin = document.getElementById('fechaFin').value;
        var horaInicio = document.getElementById('horaInicio').value;
        var horaFin = document.getElementById('horaFin').value;

        return identificador.update({
            nombre: nombre,
            fechainicio: fechaInicio,
            fechafin: fechaFin,
            horainicio: horaInicio,
            horafin: horaFin
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
            boton.onclick=function(){
                guardarConcurso();
            }
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    
}
