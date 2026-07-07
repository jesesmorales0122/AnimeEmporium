<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir datos del formulario
    $nombre = htmlspecialchars($_POST["nombre"]);
    $correo = htmlspecialchars($_POST["correo"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    // Configuración del correo
    $destino = "tu_correo@ejemplo.com"; // <-- cámbialo por tu correo real
    $asunto = "Nuevo mensaje desde Anime Emporium";
    $contenido = "Nombre: $nombre\nCorreo: $correo\nMensaje:\n$mensaje";

    // Cabeceras para que el correo se vea bien
    $headers = "From: $correo\r\n";
    $headers .= "Reply-To: $correo\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar correo
    if (mail($destino, $asunto, $contenido, $headers)) {
        echo "<p style='color:lime;'>¡Mensaje enviado correctamente!</p>";
    } else {
        echo "<p style='color:red;'>Error al enviar el mensaje. Intenta más tarde.</p>";
    }
}
?>