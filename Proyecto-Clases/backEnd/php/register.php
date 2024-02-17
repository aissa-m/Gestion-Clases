<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php'; // Asegúrate de que este path sea correcto

// Verificar si los campos requeridos están presentes
if (isset($_POST['email'], $_POST['nombre'], $_POST['asignatura'], $_POST['password'])) {
    $email = $_POST['email'];
    $nombre = $_POST['nombre'];
    $asignatura = $_POST['asignatura'];
    $password = $_POST['password'];

    
    // Validar y limpiar datos aquí (filtrado, saneamiento, etc.)

    // Hash de la contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Preparar la sentencia SQL para insertar los datos
    $query = "INSERT INTO usuarios (nombre, email, asignatura, contra) VALUES (?, ?, ?, ?)";

    $stmt = $conexion->prepare($query);

    if ($stmt) {
        // Vincular parámetros
        $stmt->bind_param("ssss", $nombre, $email, $asignatura, $passwordHash);

        // Ejecutar la sentencia
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Registro exitoso"]);
        } else {
            // Error al ejecutar la sentencia
            echo json_encode(["success" => false, "message" => "Error al registrar el usuario"]);
        }

        // Cerrar la sentencia
        $stmt->close();
    } else {
        // Error al preparar la sentencia
        echo json_encode(["success" => false, "message" => "Error en la base de datos"]);
    }
} else {
    // Campos requeridos faltantes
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

// Cerrar conexión
$conexion->close();
?>
