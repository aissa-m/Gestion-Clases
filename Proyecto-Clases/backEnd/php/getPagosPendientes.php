<?php

include 'conexion.php';

$consulta = $conexion->prepare('SELECT p.fecha, p.monto, a.nombre, p.horas, p.id
                                FROM pagos_pendientes p 
                                JOIN alumnos a on a.id = p.alumno_id;');
$consulta->execute();
$res = $consulta->get_result();

$datos = [];

if ($res->num_rows > 0) {
    $datos = $res->fetch_all(MYSQLI_ASSOC);
    $datos = array_reverse($datos);
    echo json_encode($datos);
}
else{
    echo json_encode('No hay datos');
}
