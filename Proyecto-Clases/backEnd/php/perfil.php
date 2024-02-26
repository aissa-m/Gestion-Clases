<?php
include 'conexion.php';
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['id'])) {
    $id = $data['id'];

    $consulta = $conexion->prepare('SELECT * FROM usuarios WHERE id = ?');
    $consulta->bind_param('i', $id);
    $consulta->execute();
    $datos = [];
    if ($consulta->execute()) {
        $res = $consulta->get_result();

        if ($res->num_rows > 0) {
            while ($fila = $res->fetch_assoc()) {
                $datos[] =$fila;
            }
        }
    }
    echo json_encode($datos);
} else {
    echo json_encode(['error' => 'No se ha recibido el id']);
}

