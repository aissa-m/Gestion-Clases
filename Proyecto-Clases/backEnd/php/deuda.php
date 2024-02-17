<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
header('Content-Type: application/json');
include 'conexion.php';

if (isset($_GET['id'])) {
    // Prepara la consulta
    $id = $_GET['id'];
    $consulta = $conexion->prepare('SELECT SUM(monto) as deuda FROM pagos_pendientes WHERE alumno_id = ?');
    $consulta->bind_param('i', $id);
    // Ejecuta la consulta
    $consulta->execute();

    // Obtiene el resultado
    $resultado = $consulta->get_result();

    $datos = 0;
    // Verifica si hay datos
    if ($resultado->num_rows > 0) {
        // Obtiene los datos como un array asociativo
        $fila = $resultado->fetch_assoc();
        // Envía los datos en formato JSON
        echo json_encode($fila);
    } else {
        // Si no hay datos, envía un mensaje de error en formato JSON
        echo json_encode(['error' => 'No se encontraron datos']);
    }

}
else {
    echo json_encode('Eorrrrrrrrrror');
}
// Cierra la consulta y la conexión como buena práctica


