<?php

include 'conexion.php';

$consulta = $conexion->prepare('SELECT SUM(monto) AS total FROM pagos_pendientes');
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
