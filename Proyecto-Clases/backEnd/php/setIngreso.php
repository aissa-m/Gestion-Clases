<?php 

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD']==='POST') {
    $alumno_id=$_POST['alumno_id'];
    $monto = $_POST['monto'];
    $fecha = $_POST['fecha'];

    $consulta = $conexion->prepare('INSERT INTO ingresos(fecha, monto, alumno_id) VALUES (?,?,?)');
    $consulta->bind_param('sii', $fecha, $monto, $alumno_id);
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