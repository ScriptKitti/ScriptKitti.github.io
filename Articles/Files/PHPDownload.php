<?php
  $filePath = $_REQUEST['href'];
  $fileName = $_REQUEST['title'];
  header ('Content-Type: application/octet-stream');
  header ('Content-Disposition: attachment; filename=' . $fileName);
  readfile($filePath);
?>
