<?php


if (!isset($_GET['method'])) {
	exit();
}

require_once 'api_keys.php';
$API_KEY = MUSIXMATCH_API_KEY;

$method = $_GET['method'];

$url = 'http://api.musixmatch.com/ws/1.1/' . $method . '?';

unset($_GET['method']);

foreach($_GET as $key => $value) {
	$url .= $key.'='.urlencode(strtolower($value)).'&';
}
$url .= "apikey=" . $API_KEY;

$hash = 'cache/'.md5($url);

if (true || !file_exists($hash) || filemtime($hash) < time() - 1000 * 60 * 30) {
  
  $data = file_get_contents($url);
	file_put_contents($hash, $data);
}
header("Content-Type: application/json; charset=utf-8;");
readfile($hash);


?>
