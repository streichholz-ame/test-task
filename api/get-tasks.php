<?php 
require "db-connect.php";

if (empty(trim($_GET['id']))) {
    die('ID is empty!');
}

$data = $dbh->prepare('SELECT id, name, isDone, deadline FROM Task WHERE toDoList_id = ? ORDER BY position ASC');

$data->execute([$_GET['id']]);

echo json_encode($data->fetchAll(PDO::FETCH_ASSOC));