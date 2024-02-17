const URL = '../../backEnd/php/';


function mesNombre(cadenaMes) {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const partes = cadenaMes.split("-");
  const mesNumero = parseInt(partes[1], 10); // Convierte el mes a número (1-12)
  return meses[mesNumero - 1]; // Retorna el nombre del mes correspondiente
}

function agruparIngresosPorMes(ingresos) {
  const ingresosPorMes = {};

  ingresos.forEach((ingreso) => {
    const mes = ingreso.fecha.substring(0, 7); // Obtiene YYYY-MM
    const nombreMes = mesNombre(mes); // Convierte a nombre de mes
    if (!ingresosPorMes[nombreMes]) {
      ingresosPorMes[nombreMes] = {
        total: 0,
        ingresos: [],
      };
    }
    ingresosPorMes[nombreMes].ingresos.push(ingreso);
    ingresosPorMes[nombreMes].total += parseFloat(ingreso.monto); // Asumiendo monto es un string que se puede convertir a float
  });

  return ingresosPorMes;
}


function getIngresos() {
  const id = localStorage.getItem('id');
  fetch(URL+'ingresos.php', {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({id:id})
  })
    .then((response) => response.json())
    .then((ingresos) => {
      const contenedorAcordeon = document.getElementById("acordeon-ingresos");
      contenedorAcordeon.innerHTML = ""; // Limpia el contenedor antes de añadir los nuevos datos

      if (ingresos === "No hay datos") {
        document.getElementById("titulo").innerText = "No hay datos todavía!";
      } else {
        const ingresosPorMes = agruparIngresosPorMes(ingresos);

        Object.keys(ingresosPorMes).forEach((nombreMes, index) => {
          // Crear el elemento acordeón para el mes
          const acordeonItem = `
            <div class="card" style="background-color: rgba(0, 0, 0, 0.2);">
              <div class="card-header" id="heading${index}">
                <h2 class="mb-0">
                  <button class="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}" style="color: black;">
                    ${nombreMes} - Total: ${ingresosPorMes[nombreMes].total.toFixed(2)}€
                  </button>
                </h2>
              </div>
              <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#acordeon-ingresos">

              <div class="card-body">
                ${ingresosPorMes[nombreMes].ingresos
                  .map(
                    (ingreso) => `
                      <div class="card mb-3" style="background-color: rgba(0, 0, 0, 0.2);">
                        <div class="card-body">
                          <h5 class="card-title">${ingreso.nombre}</h5>
                          <p class="card-text">Monto: ${ingreso.monto}€</p>
                          <p class="card-text">Fecha: ${ingreso.fecha}</p>
                          <button class="btn btn-secondary eliminar" data-id="${ingreso.id}" data-tipo="ingreso">Eliminar</button>
                        </div>
                      </div>
                    `
                  )
                  .join("")}
              </div>

            </div>            
              </div>
            </div>
          `;
          contenedorAcordeon.insertAdjacentHTML("beforeend", acordeonItem);
        });
      }
    })
    .catch((e) => {
      console.error(e);
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

function guardarIngreso() {
  document
    .getElementById("formAgregarIngreso")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const idProfe = localStorage.getItem('id');
      var formData = new FormData(this);
      formData.append('idProfe', idProfe);
      fetch(URL+"setIngreso.php", {
        method: "POST",
        body: formData,
      })
        .then((respones) => respones.json())
        .then((data) => {
          if (data === "Exito") {
            location.href = "ingresos.html";
          } else {
            alert("Error al añadir ingreso");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error al enviar los datos");
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getIngresos();
  cargarAlumnos();
  guardarIngreso();
});
