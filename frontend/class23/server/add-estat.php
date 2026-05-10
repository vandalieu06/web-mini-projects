<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Mètode no permès"]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["estat"]) || empty(trim($input["estat"]))) {
    http_response_code(400);
    echo json_encode(["error" => "Estat obligatori"]);
    exit();
}

$estat = trim($input["estat"]);
$estatsValids = ["feliz", "cansado", "estresado", "tranquilo", "motivado"];

if (!in_array($estat, $estatsValids)) {
    http_response_code(400);
    echo json_encode([
        "error" =>
            "Estat invàlid. Valors permesos: " . implode(", ", $estatsValids),
    ]);
    exit();
}

$data = date("Y-m-d");

try {
    $stmt = $pdo->prepare(
        "INSERT INTO estats_anims (estat, data) VALUES (?, ?)",
    );
    $stmt->execute([$estat, $data]);

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "id" => (int) $pdo->lastInsertId(),
        "message" => "Estat registrat",
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en registrar l'estat"]);
}
