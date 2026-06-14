<?php

$serveur = "localhost";
$utilisateur = "root";
$motdepasse = "";
$base = "remie_restaurant";

$conn = mysqli_connect(
$serveur,
$utilisateur,
$motdepasse,
$base
);

if(!$conn){
    die("Connexion échouée");
}

?>