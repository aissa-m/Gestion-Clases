<?php

include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $idProfe = $data['id'];
    $consulta = $conexion->prepare('SELECT SUM(monto) AS total FROM pagos_pendientes WHERE idProfe = ?');
    $consulta->bind_param('i', $idProfe);
    $consulta->execute();
    $res = $consulta->get_result();

    $total = 0;

    if ($fila = $res->fetch_assoc()) {
        $total = $fila['total'] === null ? 0 : $fila['total'];
        echo json_encode($total);
    }
    else{
        echo json_encode('No hay datos');
    }

}
