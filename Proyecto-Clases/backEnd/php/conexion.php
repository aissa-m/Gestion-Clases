<?php

$server = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'control_clases';

$conexion = new mysqli($server, $user, $pass, $dbname);
if($conexion->connect_error){
    die("Error al conectar a la base de datos.".$conexion->connect_error);
}else{
    // echo 
    // '
    // <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    // <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    // <link rel="shortcut icon" href="img/db.png" type="image/x-icon">
    // <div class="container text-center">
    //     <img src="img/db.png"/>
    //     <p>
    //     /*********
    //      ...Conectado...            
    //     ********/
    //     </p>
    // </div>
    // ';    
}