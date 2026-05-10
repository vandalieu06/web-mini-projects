<?php

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Mètode no permès"]);
    exit;
}

if (!isset($_GET['data']) || empty($_GET['data'])) {
    http_response_code(400);
    echo json_encode(["error" => "Paràmetre 'data' obligatori (YYYY-MM-DD)"]);
    exit;
}

$data = $_GET['data'];

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
    http_response_code(400);
    echo json_encode(["error" => "Format de data invàlid. Format correcte: YYYY-MM-DD"]);
    exit;
}

$stmt = $pdo->prepare("SELECT estat, COUNT(*) as total FROM estats_anims WHERE data = ? GROUP BY estat");
$stmt->execute([$data]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

$estats = [];
$total = 0;

foreach ($results as $row) {
    $estats[$row['estat']] = (int)$row['total'];
    $total += (int)$row['total'];
}

$percentatges = [];
if ($total > 0) {
    foreach ($estats as $key => $value) {
        $percentatges[$key] = round(($value / $total) * 100, 1);
    }
}

echo json_encode([
    "data" => $data,
    "total" => $total,
    "estats" => $estats,
    "percentatges" => $percentatges
]);