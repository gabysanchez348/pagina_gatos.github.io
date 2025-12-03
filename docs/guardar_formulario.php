<?php
include('conexion.php');

// Verifica si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capturar los datos enviados desde el formulario
    $nombre = $_POST['nombre'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    // Evitar inyección SQL
    $nombre = $conn->real_escape_string($nombre);
    $correo = $conn->real_escape_string($correo);
    $telefono = $conn->real_escape_string($telefono);
    $mensaje = $conn->real_escape_string($mensaje);

    // Consulta SQL (ajusta el nombre de la tabla)
    $sql = "INSERT INTO adopciones (nombre, correo, telefono, mensaje)
            VALUES ('$nombre', '$correo', '$telefono', '$mensaje')";

    if ($conn->query($sql) === TRUE) {
        echo "✅ Registro guardado con éxito.";
    } else {
        echo "❌ Error: " . $conn->error;
    }

    $conn->close();
} else {
    echo "No se recibieron datos del formulario.";
}
?>
