<?php 
require "db-connect.php";

if (empty(trim($_POST['name']))) {
    die('Name is empty!');
}

if (empty(trim($_POST['toDoList_id']))) {
    die('Task should be bound to a project!');
}

$positionQuery = $dbh->prepare('SELECT max(`position`) FROM `Task` WHERE `toDoList_id` = ?');

$positionQuery->bindParam(1, $_POST['toDoList_id']);
$positionQuery->execute();
$position = $positionQuery->fetch()[0];

$data = $dbh->prepare('INSERT INTO Task(name, toDoList_id, position) VALUES (?, ?, ?)');

$data->bindParam(1, $_POST['name']);
$data->bindParam(2, $_POST['toDoList_id']);
$data->bindParam(3, ++$position);

$data->execute();

$data = $dbh->prepare('SELECT * FROM Task WHERE id = ?');

$data->execute([$dbh->lastInsertId()]);

echo json_encode($data->fetch(PDO::FETCH_ASSOC));