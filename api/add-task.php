<?php 
require "db-connect.php";

$data = $dbh->prepare('INSERT INTO Task(name, toDoList_id) VALUES (?, ?)');

$data->bindParam(1, $_POST['name']);
$data->bindParam(2, $_POST['toDoList_id']);

$data->execute();

$data = $dbh->prepare('SELECT * FROM Task WHERE id = ?');

$data->execute([$dbh->lastInsertId()]);

echo json_encode($data->fetch(PDO::FETCH_ASSOC));