const URL = '../../backEnd/php/';
function getPendientes() {
  const id = localStorage.getItem('id');
  fetch(URL+'getPagosPendientes.php', {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({id:id})
  })
    .then(response => response.json())
    .then(pendientes => {
      console.log(pendientes);
      const contenedor = document.getElementById("contenedor-pendientes");
      contenedor.innerHTML = ""; // Limpia el contenedor antes de añadir los nuevos datos

      if (pendientes === "No hay datos") {
        document.getElementById("titulo").innerText = "No hay datos todavía!";
      } else {
        // Agrupar los pendientes por alumno
        const pendientesPorAlumno = pendientes.reduce((acc, pendiente) => {
          // Si el alumno aún no existe en el acumulador, lo inicializa
          if (!acc[pendiente.nombre]) {
            acc[pendiente.nombre] = {
              nombre: pendiente.nombre,
              pagos: [],
              total: 0
            };
          }
          // Añade el pendiente al alumno y suma al total
          acc[pendiente.nombre].pagos.push({
            monto: pendiente.monto,
            fecha: pendiente.fecha,
            horas: pendiente.horas,
            id: pendiente.id
          });
          acc[pendiente.nombre].total += parseFloat(pendiente.monto);
          return acc;
        }, {});

        // Crear una tarjeta por alumno
        Object.values(pendientesPorAlumno).forEach(alumno => {
          const tarjeta = `
            <div class="col-md-4 mb-4">
              <div class="card h-100" style="background-color: rgba(0, 0, 0, 0.2);">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${alumno.nombre}</h5>
                  ${alumno.pagos.map(pago => `
                    <p class="card-text">${pago.monto}€ - ${pago.fecha}</p>
                  `).join('')}
                  <p class="card-text mt-auto"><strong>Total pendiente: ${alumno.total.toFixed(2)}€</strong></p>
                  <div class="mt-2">
                    <button class='btn btn-success pagarBtn' data-id='${alumno.pagos[0].id}'>Pagar Último</button>
                    <button class="btn btn-danger eliminar" data-id="${alumno.pagos[0].id}" data-tipo="pendiente">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          `;
          contenedor.insertAdjacentHTML("beforeend", tarjeta);
        });

        // Reiniciar y añadir escuchadores de eventos a los botones
        addEventListenersToButtons();
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}


function addEventListenersToButtons() {
  document.querySelectorAll(".pagarBtn").forEach(button => {
    button.addEventListener("click", function() {
      pagar(this.getAttribute("data-id"));
    });
  });
}


function cargarAlumnos() {
  const id = localStorage.getItem('id');
  fetch(URL+"alumnos.php", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id}) // Convertir objeto a cadena JSON
})
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      if (data.success) {
        const select = document.getElementById("alumnoSelect");
        data.alumnos.forEach((alumno) => {
          const option = document.createElement("option");
          option.value = alumno.id;
          option.textContent = alumno.nombre;
          select.appendChild(option);
        });
      }      
    })
    .catch((error) => console.error("Error:", error));
}

function guardarPendiente() {
  document.getElementById("formAgregarPendiente").addEventListener("submit", function (e) {
      e.preventDefault();
      const idProfe = localStorage.getItem('id');
      const horas = document.getElementById('horas').value;
      const monto = horas * 12; // Suponiendo que 12 es la tarifa por hora
      var formData = new FormData(this);
      formData.append('monto', monto);
      formData.append('idProfe', idProfe);
      console.log(formData);
      fetch(URL+"setPagoP.php", {
        method: "POST",
        body: formData,
      })
        .then((respones) => respones.json())
        .then((data) => {
          if (data === "Exito") {
            location.href = "ingresos_pendientes.html";
          } else {
            alert("Error al añadir alumno");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error al enviar los datos");
        });
    });
}

function pagar(idPagoPendiente) {
  console.log(idPagoPendiente);
  const idProfe = localStorage.getItem('id');
  fetch(URL+"pagar.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idPagoPendiente, idProfe: idProfe}),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res === "Exito") {
        alert("Pago registrado!");
        location.reload(); // Recargar la página o actualizar la tabla de pendientes
      } else {
        alert("Error al registrar el pago!" + res);
      }
    })
    .catch((error) => {
      console.error("Error del servidor:", error);
    });
}


function getTotalPendiente(){
  const id = localStorage.getItem('id');
  fetch(URL+'getTotalP.php', {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({id:id})
  })
  .then(response => response.json())
  .then( total =>{
    const card = document.getElementById('totalP');
    const cardBody = `
      <div class="card-body"> 
        <h5 class="">Total Pendiente: ${total}€</h5>
      </div>
    `;
    card.insertAdjacentHTML('beforeend', cardBody);
  })
}
document.addEventListener("DOMContentLoaded", function () {
  getPendientes();
  cargarAlumnos();
  guardarPendiente();
  getTotalPendiente();
});
