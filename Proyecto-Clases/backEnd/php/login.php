<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
session_start();
include 'conexion.php'; // Asegúrate de que este path sea correcto

// Verificar si los campos requeridos están presentes
if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Preparar la consulta para buscar al usuario por email
    $query = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conexion->prepare($query);

    if ($stmt) {
        // Vincular parámetros y ejecutar
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        // Verificar si el usuario existe
        if ($user) {
            // Verificar la contraseña
            if (password_verify($password, $user['contra'])) {
                $_SESSION['loged'] = true;
                // Login exitoso
                $id = $user['id'];
                echo json_encode(["success" => true, "message" => "Login exitoso", "id" => $id]);
            } else {
                // Contraseña incorrecta
                echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
            }
        } else {
            // Usuario no encontrado
            echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
        }

        $stmt->close();
    } else {
        // Error al preparar la consulta
        echo json_encode(["success" => false, "message" => "Error en la base de datos"]);
    }
} else {
    // Campos requeridos faltantes
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

// Cerrar conexión
$conexion->close();
?>
