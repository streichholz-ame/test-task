<?php 
require "db-connect.php";

$data = $dbh->prepare('DELETE FROM Task WHERE id=?');

$data->execute([$_GET['id']]);