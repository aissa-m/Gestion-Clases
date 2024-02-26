const URL = '../../backEnd/php/';
const alumnoId = localStorage.getItem('alumnoId');
document.addEventListener('DOMContentLoaded', () => {    
    if (alumnoId) {
        fetch(URL+`detallesAlumno.php?id=${alumnoId}`)
            .then(response => response.json())
            .then(data => {
                mostrarDetallesAlumno(data);
            })
            .catch(error => console.error('Error:', error));
    } else {
        // Manejar el caso de que no haya un ID de alumno disponible
        console.log('No hay un ID de alumno para mostrar');
    }


    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('editar')) {
            const alumnoId = e.target.dataset.id;
            cargarDatosAlumnoEnModal(alumnoId);
        }
    });


    deudas();
});

function mostrarDetallesAlumno(data) {
    const card = document.getElementById('detalles-alumnos');
    // card.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    const info = `
        <div class="card-body">
            <b><p>${data.nombre}</p></b>
            <p>${data.email}</p>
            <p>${data.telefono}</p>  
            <p>${data.descripcion}</p>     
            
            <button class="btn btn-secondary editar" id="editar" data-id="${data.id}" data-tipo="alumno">Editar</button>                                
            <button class="btn btn-danger eliminar" data-id="${data.id}" data-tipo="alumno">Eliminar</button>
            

        <div>
    `;

    card.insertAdjacentHTML('beforeend', info);
}




function cargarDatosAlumnoEnModal(alumnoId) {
    var myModal = new bootstrap.Modal(document.getElementById('editarAlumnoModal'), {
        keyboard: false
    });      

    fetch(URL+`detallesAlumno.php?id=${alumnoId}`)
        .then(response => response.json())
        .then(data => {
            // Cargar datos en el formulario del modal
            document.getElementById('nombreAlumno').value = data.nombre;
            document.getElementById('emailAlumno').value = data.email;
            document.getElementById('telefonoAlumno').value = data.telefono;
            document.getElementById('descripcionAlumno').value = data.descripcion;
            document.getElementById('idAlumno').value = data.id;                     
            myModal.show();
        })
        .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', function() {

    var myModal = new bootstrap.Modal(document.getElementById('editarAlumnoModal'), {
        keyboard: false
    });
    function cerrarModal() {
        myModal.hide();
        document.querySelector('#editarAlumnoModal').remove();
    }


    document.getElementById('formEditarAlumno').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto de envío del formulario

        var formData = new FormData(this); // Crea un FormData con los datos del formulario

        fetch(URL+'actualizarAlumno.php', {
            method: 'POST',
            body: formData // Envía los datos del formulario como FormData
        })
        .then(response => response.json())
        .then(data => {
            alert('Datos Modificados con éxito!');
            cerrarModal();  
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    });
});


function deudas() {
    console.log(alumnoId);
    if(alumnoId != '' && alumnoId != null){
        fetch(URL+`deuda.php?id=${alumnoId}`)
        .then(response => response.json())
        .then( data =>{            
            console.log(data);
            if (data.deuda !== null) {
                const div = document.getElementById('deudas');
                const card = `
                    <div class="card deudas">
                        <div class="card-body">
                            <h5>Pendiente: ${data.deuda}€</h5>
                        </div>
                    </div>
                    
                `;

                div.insertAdjacentHTML('beforeend', card);
            }
        })
        .catch( error => {
            console.error('Error del servidor: '+error);
        })
    }
}