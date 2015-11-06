<?php
   if (isset($_POST['fileTitle'], $_POST['filePath'])) {
      $fileTitle = $_POST['fileTitle'];
      $filePath = $_POST['filePath'];
      header('Content-Type: audio/mp3');
      header('Content-Disposition: attachment; filename=' . $fileTitle . '.mp3;');
      header('Content-Length: ' . filesize($filePath));
      readfile($filePath);
      exit;
   }
?>
