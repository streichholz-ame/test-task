<?php 
require "db-connect.php";

if (empty(trim($_GET['id']))) {
    die('ID is empty!');
}

$data = $dbh->prepare('DELETE FROM ToDoList WHERE id=?');

$data->execute([$_GET['id']]);