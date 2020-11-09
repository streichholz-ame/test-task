<?php
$dbh = new PDO('mysql:host=' . $_ENV['MYSQL_SERVER'] . ';dbname=' . $_ENV['MYSQL_DB'], $_ENV['MYSQL_LOGIN'], $_ENV['MYSQL_PASSWORD']);
