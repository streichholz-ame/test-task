<?php
require "db-connect.php";

$ids = $_POST['ids'];
$position = 1;

foreach ($ids as $id) {
    $id = substr($id, 3);
    $data = $dbh->prepare('UPDATE `Task` SET `position` = ? WHERE `id` = ?');
    $position++;
    $data->bindParam(1, $position, PDO::PARAM_INT);
    $data->bindParam(2, $id);
    $data->execute();
}