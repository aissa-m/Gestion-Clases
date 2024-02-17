<?php
// Configuración de cabeceras para CORS y tipo de contenido
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
header('Content-Type: application/json');

// Inclusión del archivo de conexión a la base de datos
include 'conexion.php';

// Verificación de la recepción de datos mediante POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtención de datos del formulario
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $telefono = isset($_POST['telefono']) ? $_POST['telefono'] : null;
    $descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : '';
    $idProfe = $_POST['idProfe'] ?? null;

    // Preparación de la consulta para insertar los datos
    $query = "INSERT INTO alumnos (nombre, email, telefono, descripcion, idProfe) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($query);

    // Vinculación de parámetros y ejecución de la consulta
    if ($stmt) {
        $stmt->bind_param("ssssi", $nombre, $email, $telefono, $descripcion, $idProfe);
        $resultado = $stmt->execute();

        // Verificación del resultado de la inserción
        if ($resultado) {
            echo json_encode(['success' => true, 'message' => 'Alumno añadido correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al añadir el alumno']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta']);
    }
} else {
    // Método HTTP no permitido para esta acción
    echo json_encode(['success' => false, 'message' => 'Método no permitido'], http_response_code(405));
}

// Cierre de la conexión a la base de datos
$conexion->close();
