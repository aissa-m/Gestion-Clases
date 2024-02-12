<?php 

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD']==='POST') {
    $alumno_id=$_POST['alumno_id'];
    $monto = $_POST['monto'];
    $fecha = $_POST['fecha'];
    $horas = $_POST['horas'];

    $consulta = $conexion->prepare('INSERT INTO pagos_pendientes(fecha, horas, monto, alumno_id) VALUES (?,?,?,?)');
    $consulta->bind_param('sddi', $fecha, $horas, $monto, $alumno_id);
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