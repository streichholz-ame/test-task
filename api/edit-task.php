<?php 
require "db-connect.php";

$isDone = $_POST['isDone'] == 'true' ? 1 : 0;

$data = $dbh->prepare('UPDATE Task SET `name` = ?, `isDone` = ' . $isDone . ' WHERE id = ?');

$data->bindParam(1, $_POST['name']);

$data->bindParam(2, $_GET['id']);

$data->execute();

$data = $dbh->prepare('SELECT * FROM Task WHERE id = ?');

$data->execute([$_GET['id']]);

echo json_encode($data->fetch(PDO::FETCH_ASSOC));