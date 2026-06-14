<?php
require 'config.php';

header('Content-Type: application/json; charset=utf-8');

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);
if (!$data) {
    $data = $_POST;
}

$nomClient = isset($data['nom_client']) ? trim($data['nom_client']) : '';
$tableNumero = isset($data['table_numero']) ? trim($data['table_numero']) : '';
$commande = isset($data['commande']) ? trim($data['commande']) : '';
$total = isset($data['total']) ? floatval($data['total']) : 0;
$paiement = isset($data['paiement']) ? trim($data['paiement']) : 'Sur place';

if ($nomClient === '' || $tableNumero === '' || $commande === '' || $total <= 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Données de commande invalides. Veuillez vérifier le nom, le numéro de table et le total.'
    ]);
    exit;
}

$stmt = mysqli_prepare($conn, "INSERT INTO commandes (nom_client, table_numero, commande, total, paiement) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur interne du serveur.']);
    exit;
}

mysqli_stmt_bind_param($stmt, 'ssdss', $nomClient, $tableNumero, $commande, $total, $paiement);
$executed = mysqli_stmt_execute($stmt);
if (!$executed) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Impossible d’enregistrer la commande.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Commande enregistrée avec succès.']);
