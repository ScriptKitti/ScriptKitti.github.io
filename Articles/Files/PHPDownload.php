<?php
  $Path2File = href;
  $theFileName = title;
  header ('Cache-Control: must-revalidate, post-check=0, pre-check=0');
  header ('Content-Type: application/octet-stream');
  header ('Content-Length: ' . filesize($Path2File));
  header ('Content-Disposition: attachment; filename=$theFileName');
  readfile($Path2File);
?>
