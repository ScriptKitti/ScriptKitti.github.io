<?php
  if (isset($_GET['fileTitle'], $_GET['filePath'])) {
    $fileTitle = $_GET['fileTitle'];
    $filePath = $_GET['filePath'];
    header('Content-Type: audio/mp3');
    header('Content-Disposition: attachment; filename="' . $fileTitle . '.mp3";');
    header('Pragma: public');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);
    exit;
  }
?>
