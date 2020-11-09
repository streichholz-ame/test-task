<?php 
require "db-connect.php";

$data = $dbh->prepare('INSERT INTO ToDoList(name) VALUES (?)');

$data->bindParam(1, $_POST['name']);

$data->execute();

$data = $dbh->prepare('SELECT * FROM ToDoList WHERE id = ?');

$data->execute([$dbh->lastInsertId()]);

echo json_encode($data->fetch(PDO::FETCH_ASSOC));