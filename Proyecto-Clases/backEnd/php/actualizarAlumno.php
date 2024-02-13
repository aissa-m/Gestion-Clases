<?php
header('Content-Type: application/json');
include 'conexion.php';

// Asumiendo que recibes los campos 'nombre', 'email', 'telefono', 'descripcion' y 'id' del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$descripcion = $_POST['descripcion'];
$id = $_POST['id'];

// Validación de los datos aquí...

// Preparar la consulta SQL para actualizar el registro
$sql = "UPDATE alumnos SET nombre=?, email=?, telefono=?, descripcion=? WHERE id=?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssssi", $nombre, $email, $telefono, $descripcion, $id);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Alumno actualizado exitosamente"]);
} else {
    echo json_encode(["error" => "Error al actualizar el alumno"]);
}

$stmt->close();
$conexion->close();
?>
