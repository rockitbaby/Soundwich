<?php

require_once('api_keys.php');
$API_KEY = LAST_FM_API_KEY;

if (!isset($_GET['method'])) {
	exit();
}

$url = 'http://ws.audioscrobbler.com/2.0/?';
foreach($_GET as $key => $value) {
	$url .= $key.'='.urlencode(strtolower($value)).'&';
}
$url .= "api_key=" . $API_KEY;

$hash = './cache/'.md5($url);

if (!file_exists($hash) || filemtime($hash) < time() - 1000 * 60 * 30) {
	$data = file_get_contents($url);
	file_put_contents($hash, $data);
}
header("Content-Type: application/json; charset=utf-8;");
readfile($hash);