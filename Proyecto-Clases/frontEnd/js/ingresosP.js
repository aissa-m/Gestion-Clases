const URL = '../../backEnd/php/';
function getPendientes() {
  fetch(URL+"getPagosPendientes.php")
    .then(response => response.json())
    .then(pendientes => {
      const contenedor = document.getElementById("contenedor-pendientes");
      contenedor.innerHTML = ""; // Limpia el contenedor antes de añadir los nuevos datos

      if (pendientes === "No hay datos") {
        document.getElementById("titulo").innerText = "No hay datos todavía!";
      } else {
        pendientes.forEach(pendiente => {
          const tarjeta = `
            <div class="col-md-4 mb-4">
              <div class="card" style="background-color: rgba(0, 0, 0, 0.2);">
                <div class="card-body">
                  <h5 class="card-title">${pendiente.nombre}</h5>
                  <p class="card-text">Monto pendiente: ${pendiente.monto}€</p>
                  <p class="card-text">Fecha: ${pendiente.fecha}</p>
                  <p class="card-text">Horas: ${pendiente.horas}</p>
                  <button class='btn btn-success pagarBtn' data-id='${pendiente.id}'>Pagar</button>
                  <button class="btn btn-danger eliminar" data-id="${pendiente.id}" data-tipo="pendiente">Eliminar</button>
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
  fetch(URL+"alumnos.php")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("alumnoSelect");
      data.forEach((alumno) => {
        const option = document.createElement("option");
        option.value = alumno.id;
        option.textContent = alumno.nombre;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function guardarPendiente() {
  document.getElementById("formAgregarPendiente").addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(this);
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
  fetch(URL+"pagar.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idPagoPendiente }),
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
  fetch(URL+'getTotalP.php')
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
