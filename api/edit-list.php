<?php 
require "db-connect.php";

if (empty(trim($_GET['id']))) {
    die('ID is empty!');
}

if (empty(trim($_POST['name']))) {
    die('Name is empty!');
}

$data = $dbh->prepare('UPDATE ToDoList SET name = ? WHERE id = ?');

$data->bindParam(1, $_POST['name']);
$data->bindParam(2, $_GET['id']);
$data->execute();

$data = $dbh->prepare('SELECT * FROM ToDoList WHERE id = ?');
$data->execute([$_GET['id']]);

echo json_encode($data->fetch(PDO::FETCH_ASSOC));