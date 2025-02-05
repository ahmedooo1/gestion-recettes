<?php
function getDatabaseConnection() {
    $host = getenv("DB_HOST");
    $dbname = getenv("DB_NAME");
    $user = getenv("DB_USER");
    $password = getenv("DB_PASSWORD");
    
    try {
        return new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    } catch (PDOException $e) {
        die(json_encode(["error" => "Erreur de connexion: " . $e->getMessage()]));
    }
}
?>
