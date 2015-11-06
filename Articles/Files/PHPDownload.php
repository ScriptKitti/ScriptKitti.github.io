<?php
  if (isset($_POST['fileTitle'], $_POST['filePath'])) {
    $fileTitle = $_POST['fileTitle'];
    $filePath = $_POST['filePath'];
    header('Content-Type: audio/mp3');
    header('Content-Disposition: attachment; filename="' . $fileTitle . '.mp3";');
    header('Pragma: public');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);
    exit;
  }
?>
