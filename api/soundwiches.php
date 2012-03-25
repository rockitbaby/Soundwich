<?php

if (!isset($_GET['id'])) {
	exit();
}

$hash = './definitions/'.$_GET['id'].'.json';

if (!file_exists($hash)) {
  header("HTTP/1.0 404 Not Found");
}
sleep(2);
header("Content-Type: application/json; charset=utf-8;");
readfile($hash);