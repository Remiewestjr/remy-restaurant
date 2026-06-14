<?php
require 'config.php';
$result = mysqli_query($conn, "SELECT * FROM commandes ORDER BY date_commande DESC");
if (!$result) {
    die('Impossible de lire les commandes.');
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panneau Admin – REMIE Restaurant</title>
  <link rel="stylesheet" href="style.css">
  <script defer src="script.js"></script>
</head>
<body onload="verifierAccesAdmin()">
  <header>
    <h1>👨‍🍳 Espace Administrateur</h1>
  </header>

  <main class="admin-panel">
    <h2>Commandes reçues</h2>
    <table class="commandes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Client</th>
          <th>Table</th>
          <th>Commande</th>
          <th>Total</th>
          <th>Paiement</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <?php if (mysqli_num_rows($result) === 0): ?>
          <tr>
            <td colspan="7">Aucune commande reçue pour l’instant.</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Jean Dupont</td>
            <td>5</td>
            <td>Pizza Royale, Coca-Cola</td>
            <td>20.00 $</td>
            <td>Sur place</td>
            <td>2025-12-01 18:30:00</td>
          </tr>
        <?php else: ?>
          <?php while ($row = mysqli_fetch_assoc($result)): ?>
            <tr>
              <td><?php echo htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td><?php echo htmlspecialchars($row['nom_client'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td><?php echo htmlspecialchars($row['table_numero'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td><?php echo htmlspecialchars($row['commande'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td><?php echo htmlspecialchars(number_format($row['total'], 2), ENT_QUOTES, 'UTF-8'); ?> $</td>
              <td><?php echo htmlspecialchars($row['paiement'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td><?php echo htmlspecialchars($row['date_commande'], ENT_QUOTES, 'UTF-8'); ?></td>
            </tr>
          <?php endwhile; ?>
        <?php endif; ?>
      </tbody>
    </table>

    <button class="logout" onclick="deconnexionAdmin()">Déconnexion</button>
  </main>

  <footer>
    <p>&copy; 2025 REMIE Restaurant | Zone confidentielle</p>
  </footer>
</body>
</html>
