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
  fetch("http://localhost:3000/backEnd/php/ingresos.php")
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
              <table class="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${ingresosPorMes[nombreMes].ingresos
                    .map(
                      (ingreso) => `
                    <tr>
                      <td>${ingreso.nombre}</td>
                      <td>${ingreso.monto}€</td>
                      <td>${ingreso.fecha}</td>
                      <td><button class="btn btn-secondary eliminar" data-id="${ingreso.id}" data-tipo="ingreso">Eliminar</button></td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
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
  fetch("http://localhost:3000/backEnd/php/alumnos.php")
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

function guardarIngreso() {
  document
    .getElementById("formAgregarIngreso")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(this);

      fetch("http://localhost:3000/backEnd/php/setIngreso.php", {
        method: "POST",
        body: formData,
      })
        .then((respones) => respones.json())
        .then((data) => {
          if (data === "Exito") {
            location.href = "ingresos.html";
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

document.addEventListener("DOMContentLoaded", function () {
  getIngresos();
  cargarAlumnos();
  guardarIngreso();
});
