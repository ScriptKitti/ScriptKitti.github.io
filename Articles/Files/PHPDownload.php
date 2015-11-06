<?php
  $filePath = $_REQUEST['href'];
  $fileName = $_REQUEST['title'];
  header ('Cache-Control: must-revalidate, post-check=0, pre-check=0');
  header ('Content-Type: application/octet-stream');
  header ('Content-Length: ' . filesize($filePath));
  header ('Content-Disposition: attachment; filename=$fileName');
  readfile($filePath);
?>
