const URL = '../../backEnd/php/';

function getAlumnos() {
    const id = localStorage.getItem('id');
    fetch(URL+"alumnos.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id}) // Convertir objeto a cadena JSON
    })
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
        if (data.success) {
            const contenedor = document.getElementById('contenedor-alumnos');
            contenedor.innerHTML = ''; // Limpia el contenido actual del contenedor
            // console.log(data);
            data.alumnos.forEach(alumno => {
                const card = `
                    <div class="col-md-4 mb-4 tarjeta-alumno">
                        <div class="card" style="background-color: rgba(0, 0, 0, 0.2);" onclick="verDetallesAlumno(${alumno.id})">
                            <div class="card-body">
                                <h5 class="card-title">${alumno.nombre}</h5>                                
                            </div>
                        </div>
                    </div>
                `;
                contenedor.insertAdjacentHTML('beforeend', card);
            });
        }
        else{
            const h2 = document.getElementById('titulo');
            h2.innerText = 'No hay datos todavia!';
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    getAlumnos();
});

function verDetallesAlumno(id) {
    localStorage.setItem('alumnoId', id);
    window.location.href = 'detallesAlumno.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtén una instancia del modal usando su ID
    var myModal = new bootstrap.Modal(document.getElementById('modalAgregarAlumno'), {
      keyboard: false
    });

    // Para abrir el modal
    document.getElementById('btnAbrirModal').addEventListener('click', function () {
        myModal.show();
    });

    // Suponiendo que tienes un botón con id="btnAbrirModal" para abrir el modal

    // Para cerrar el modal después de agregar un alumno exitosamente
    function cerrarModal() {
        myModal.hide();
        document.querySelector('#modalAgregarAlumno').remove();
    }

    // Sustituye el manejo de tu formulario aquí con Fetch API
    const form = document.getElementById('formAgregarAlumno');
    const idProfe = localStorage.getItem('id');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Usa Fetch API para enviar los datos aquí
        // Ejemplo básico de cómo enviar los datos con Fetch y FormData
        var formData = new FormData(form);
        formData.append('idProfe', idProfe);

        fetch(URL+'nuevoAlumno.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                // alert('Alumno añadido correctamente');
                cerrarModal();
                location.href='alumnos.html';
                form.reset();
                // Actualiza la lista de alumnos aquí si es necesario
            } else {
                alert('Error al añadir alumno');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar los datos');
        });
    });
});



