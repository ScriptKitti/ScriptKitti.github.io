function SKPingTest() {
  return ;
}

function SKDownloadTest(object, size) {
  var imageURL = 'http://scriptkitti.github.io/Images/ScriptKitti.png';
  var start, end, antiCache;
  var imageSize = 174057;
  
  antiCache = '?antiCache=' + (new Date()).getTime();
  imageURL = imageURL + antiCache;
  
  if (XMLHttpRequest) {
    var request = new XMLHttpRequest();
  } else if (ActiveXObject) {
    var request = new ActiveXObject('Microsoft.XMLHTTP');
  }

  request.responseType = 'arraybuffer';
  request.open('GET', imageURL, true);
  var contentType = request.getResponseHeader('Content-Type') || 'image/png';
  request.send();

  request.onreadystatechange = function() {
    if (request.status == 200) {
      if (request.readyState == 2) {
        start = (new Date()).getTime();
      }
      
      end = (new Date()).getTime();
      
      var duration = (end - start) / 1000;
      var length = imageSize * 8;
      var bps = (length / duration).toFixed(2);
      var kbps = (bps / 1024).toFixed(2);
      var mbps = (kbps / 1024).toFixed(2);
      
      size = size.toLowerCase();
      
      if (size == 'bps') {
        $(object).text(bps);
      } else if (size == 'kbps') {
        $(object).text(kbps);
      } else {
        $(object).text(mbps);
      }
    } else {
      $(object).text('Page Not Found');
    }
  }
}

function SKUploadTest() {
  return ;
}
