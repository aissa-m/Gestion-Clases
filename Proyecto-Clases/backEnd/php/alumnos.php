<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
session_start();

include 'conexion.php'; // Asegúrate de que la ruta a tu script de conexión es correcta

// Lee el cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $idProfe = $data['id'];

    // Prepara la consulta para seleccionar los alumnos asociados al profesor
    $consulta = $conexion->prepare('SELECT * FROM alumnos WHERE idProfe = ?');
    $consulta->bind_param('i', $idProfe);

    // Ejecuta la consulta
    if ($consulta->execute()) {
        $resultado = $consulta->get_result();
        $alumnos = [];

        // Verifica si hay datos
        if ($resultado->num_rows > 0) {
            // Obtiene los datos como un array asociativo
            while ($fila = $resultado->fetch_assoc()) {
                $alumnos[] = $fila;
            }

            // Envía los datos en formato JSON
            echo json_encode(["success" => true, "alumnos" => $alumnos]);
        } else {
            // Si no hay datos, envía un mensaje de error en formato JSON
            echo json_encode(["success" => false, "message" => "No se encontraron alumnos"]);
        }
    } else {
        // Si la consulta no se ejecuta correctamente, envía un mensaje de error
        echo json_encode(["success" => false, "message" => "Error al ejecutar la consulta"]);
    }

    // Cierra la consulta
    $consulta->close();
} else {
    // Si no se reciben los datos esperados, envía un mensaje de error
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

// Cierra la conexión a la base de datos
$conexion->close();
?>
