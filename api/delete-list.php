<?php 
require "db-connect.php";

$data = $dbh->prepare('DELETE FROM ToDoList WHERE id=?');

$data->execute([$_GET['id']]);