<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
header('Content-Type: application/json');
include 'conexion.php';

// Prepara la consulta
$consulta = $conexion->prepare('SELECT * FROM alumnos');

// Ejecuta la consulta
$consulta->execute();

// Obtiene el resultado
$resultado = $consulta->get_result();

$datos = [];
// Verifica si hay datos
if($resultado->num_rows > 0){
    // Obtiene los datos como un array asociativo
    $datos = $resultado->fetch_all(MYSQLI_ASSOC);
    $datos = array_reverse($datos);
    // Envía los datos en formato JSON
    echo json_encode($datos);
} else {
    // Si no hay datos, envía un mensaje de error en formato JSON
    echo json_encode(['error' => 'No se encontraron datos']);
}

// Cierra la consulta y la conexión como buena práctica
$consulta->close();
$conexion->close();