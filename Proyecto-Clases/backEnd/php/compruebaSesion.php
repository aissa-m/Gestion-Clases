<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
// compruebaSesion.php
session_start();
if (isset($_SESSION['loged']) && $_SESSION['loged'] === true) {
    echo json_encode(["logueado" => true]);
} else {
    echo json_encode(["logueado" => false]);
}
