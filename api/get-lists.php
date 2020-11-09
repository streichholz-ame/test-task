<?php 
require "db-connect.php";

$data = $dbh->query('SELECT * from ToDoList');

echo json_encode($data->fetchAll(PDO::FETCH_ASSOC));