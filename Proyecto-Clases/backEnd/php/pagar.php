<?php

include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $id = $data['id'];
    $idProfe = $data['idProfe'];

    // Primero, selecciona el pago pendiente para obtener los detalles
    $consulta = $conexion->prepare('SELECT * FROM pagos_pendientes WHERE id = ?');
    $consulta->bind_param('i', $id);
    $consulta->execute();
    $resultado = $consulta->get_result();

    if ($resultado->num_rows > 0) {
        $pago = $resultado->fetch_assoc();
        $fechaActual = date('Y-m-d');

        // Inserta los detalles en la tabla de ingresos
        $insertar = $conexion->prepare('INSERT INTO ingresos (alumno_id, monto, fecha, idProfe) VALUES (?, ?, ?, ?)');
        $insertar->bind_param('idsi', $pago['alumno_id'], $pago['monto'], $pago['fecha'], $idProfe);
        
        if ($insertar->execute()) {
            // Si el ingreso se registra con éxito, elimina el pago pendiente
            $eliminar = $conexion->prepare('DELETE FROM pagos_pendientes WHERE id = ?');
            $eliminar->bind_param('i', $id);
            
            if ($eliminar->execute()) {
                echo json_encode('Exito');
            } else {
                echo json_encode('Error al eliminar el pago pendiente');
            }
        } else {
            echo json_encode('Error al registrar el ingreso');
        }
    } else {
        echo json_encode('Pago pendiente no encontrado'.$id);
    }
} else {
    echo json_encode('No recibe datos');
}
