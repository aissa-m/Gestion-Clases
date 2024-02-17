<?php

include 'conexion.php';


$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {

    $idProfe = $data['id'];
    $consulta = $conexion->prepare('SELECT i.fecha, i.monto, a.nombre, i.id
             FROM ingresos i 
             JOIN alumnos a on a.id = i.alumno_id
             WHERE i.idProfe = ?
             ');
    $consulta->bind_param('i', $idProfe);
    $consulta->execute();
    $res = $consulta->get_result();

    $datos = [];

    if ($res->num_rows > 0) {
        $datos = $res->fetch_all(MYSQLI_ASSOC);
        $datos = array_reverse($datos);
        echo json_encode($datos);
    } else {
        echo json_encode('No hay datos');
    }
}