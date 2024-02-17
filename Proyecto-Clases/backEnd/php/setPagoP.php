<?php 

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD']==='POST') {
    $alumno_id=$_POST['alumno_id'];
    $monto = $_POST['monto'];
    $fecha = $_POST['fecha'];
    $horas = $_POST['horas'];
    $idProfe = $_POST['idProfe'];

    $consulta = $conexion->prepare('INSERT INTO pagos_pendientes(fecha, horas, monto, alumno_id, idProfe) VALUES (?,?,?,?,?)');
    $consulta->bind_param('sddii', $fecha, $horas, $monto, $alumno_id, $idProfe);
    if($consulta->execute()){
       echo json_encode('Exito'); 
    }
    else{
        echo json_encode('Error'); 
    }


}
else{
    echo json_encode('No recibe datos'); 
}