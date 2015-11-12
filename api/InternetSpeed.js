function SKPingTest() {
  return ;
}

function SKDownloadTest(size) {
  var date = new Date();
  var imageURL = 'http://scriptkitti.github.io/Images/ScriptKitti.png';
  var start, end, antiCache;
  
  antiCache = '?antiCache=' + date.getTime();
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
        start = date.getTime();
      } else if (request.readyState == 4) {
        end = date.getTime();
      }
      
      var duration = (end - start) / 1000;
      var length = request.getResponseHeader('Content-Length') * 8;
      var bps = (length / duration).toFixed(2);
      var kbps = (bps / 1024).toFixed(2);
      var mbps = (kbps / 1024).toFixed(2);
      
      if (size.toLowerCase() = 'bps') {
        return bps;
      } else if (size.toLowerCase() = 'kbps') {
        return kbps;
      } else {
        return mbps;
      }
    } else {
      return 'Page Not Found';
    }
  }
}

function SKUploadTest() {
  return ;
}
