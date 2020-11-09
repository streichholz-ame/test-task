<?php
$dbh = new PDO('mysql:host=' . getenv('MYSQL_SERVER') . ';dbname=' . getenv('MYSQL_DB'), getenv('MYSQL_LOGIN'), getenv('MYSQL_PASSWORD'));
