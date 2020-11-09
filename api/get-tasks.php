<?php 
require "db-connect.php";

$data = $dbh->prepare('SELECT id, name, isDone FROM Task WHERE toDoList_id = ?');

$data->execute([$_GET['id']]);

echo json_encode($data->fetchAll(PDO::FETCH_ASSOC));