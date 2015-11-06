<?php
  $stream = $_GET['stream'];
  $client = $_GET['client'];
  $fileName = $_GET['title'];
  $filePath = $stream . '?client_id=' . $client;
  header('Content-Type: application/octet-stream');
  header('Content-Disposition: attachment; filename=' . $fileName . ';');
  header('Content-Length: ' . filesize($filePath));
  readfile($filePath);
  exit;
?>
