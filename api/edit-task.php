<?php 
require "db-connect.php";

if (empty(trim($_GET['id']))) {
    die('ID is empty!');
}

if (empty(trim($_POST['name']))) {
    die('Name is empty!');
}

$isDone = $_POST['isDone'] == 'true' ? 1 : 0;

$data = $dbh->prepare('UPDATE Task SET `name` = ?, `deadline` = ?, `isDone` = ' . $isDone . ' WHERE id = ?');

$data->bindParam(1, $_POST['name']);
if (!empty(trim($_POST['deadline']))) {
    $data->bindParam(2, $_POST['deadline']);
}
else {
    $data->bindValue(2, NULL, PDO::PARAM_NULL);
}
$data->bindParam(3, $_GET['id']);
$data->execute();

$data = $dbh->prepare('SELECT * FROM Task WHERE id = ?');

$data->execute([$_GET['id']]);
echo json_encode($data->fetch(PDO::FETCH_ASSOC));