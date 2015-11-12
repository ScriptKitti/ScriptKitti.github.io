function SKPngTest(object) {
  var start, end, ping;
  
  start = (new Date()).getTime();
  
  $.ajax({
    url: '',
    success: function(result) {
      end = (new Date()).getTime();
      ping = end - start;
      $(object).text(ping + ' ms');
    }
  });
}

function SKDownloadTest(object, size) {
  var imageURL = 'http://scriptkitti.github.io/Images/ScriptKittiTitle.jpg';
  var start, end, ping, newSize, oldSize, timer, antiCache;
  
  antiCache = '?antiCache=' + (new Date()).getTime();
  imageURL = imageURL + antiCache;
  
  start = (new Date()).getTime();
  
  $.ajax({
    url: '',
    success: function(result) {
      end = (new Date()).getTime();
      ping = (end - start) / 1000;
    }
  });
  
  if (XMLHttpRequest) {
    var request = new XMLHttpRequest();
  } else if (ActiveXObject) {
    var request = new ActiveXObject('Microsoft.XMLHTTP');
  }
  
  request.onprogress = function(event) {    
    newSize = event.loaded;
    
    timer = function() {
      oldSize = event.loaded;
    };
    window.setTimeout(timer, 1000);
    
    var length = (newSize - oldSize) * 8;
    var bps = (length / ping).toFixed(2);
    var kbps = (bps / 1024).toFixed(2);
    var mbps = (kbps / 1024).toFixed(2);
    
    size = size.toLowerCase();
    
    if (size == 'bps') {
      $(object).text(bps + ' bps');
    } else if (size == 'kbps') {
      $(object).text(kbps + ' kbps');
    } else {
      $(object).text(mbps + ' Mbps');
    }
  }
  
  request.responseType = 'arraybuffer';
  request.open('GET', imageURL, true);
  var contentType = request.getResponseHeader('Content-Type') || 'image/jpeg';
  request.send();
  
  request.onreadystatechange = function() {
    if (request.status == 200) {
      if (request.readyState == 2) {
        console.log('Ready');
      } else if (request.readyState == 4) {
        console.log('Complete');
      }
    } else {
      $(object).text('Page Not Found');
    }
  }
}

function SKUploadTest() {
  return ;
}
