<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . "/database.php";

$pdo = getDatabaseConnection();
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET") {
    $stmt = $pdo->query("SELECT * FROM recettes");
    $recettes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($recettes);
    exit;
}

if ($requestMethod === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['titre']) || !isset($data['description'])) {
        echo json_encode(["error" => "Données manquantes"]);
        exit;
    }
    $stmt = $pdo->prepare("INSERT INTO recettes (titre, description) VALUES (?, ?)");
    $stmt->execute([$data['titre'], $data['description']]);
    echo json_encode(["message" => "Recette ajoutée"]);
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Méthode non autorisée"]);
?>
