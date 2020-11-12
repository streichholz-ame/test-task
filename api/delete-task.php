<?php 
require "db-connect.php";

if (empty(trim($_GET['id']))) {
    die('ID is empty!');
}

$data = $dbh->prepare('DELETE FROM Task WHERE id=?');

$data->execute([$_GET['id']]);