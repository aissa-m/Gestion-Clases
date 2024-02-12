<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $id = $data['id'];
    $tipo = $data['tipo'];
    $tabla = '';

    switch ($tipo) {
        case 'alumno':
            $tabla = 'alumnos';
            break;
        case 'ingreso':
            $tabla = 'ingresos';
            break;
        case 'pendiente':
            $tabla = 'pagos_pendientes';
            break;
    }

    if ($tabla) {
        $consulta = $conexion->prepare("DELETE FROM $tabla WHERE id = ?");
        $consulta->bind_param('i', $id);
        if ($consulta->execute()) {
            if ($conexion->affected_rows > 0) {
                echo json_encode('Exito');
            } else {
                echo json_encode('No se encontró el registro a eliminar');
            }
        } else {
            echo json_encode('Error al eliminar: ' . $consulta->error);
        }
        
    } else {
        echo json_encode('Tipo de registro no válido');
    }
}
