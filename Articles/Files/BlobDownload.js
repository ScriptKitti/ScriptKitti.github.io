function download(filePath, fileTitle) {
  window.URL = window.URL || window.webkitURL;
  
  var request = new XMLHttpRequest();
  request.responseType = 'arraybuffer';
  request.open('GET', filePath, true);
  
  request.onload = function() {
    var contentType = request.getResponseHeader('Content-Type') || 'audio/mpeg3';
    var array = new Int8Array(request.response);
    
    try {
      var blob = new Blob([array], {type: contentType});
      
      createLink(window.URL.createObjectURL(blob));
    } catch(error) {
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      
      if (error.name == 'TypeError' && window.BlobBuilder) {
        var builder = new BlobBuilder();
        builder.append(array.buffer);
        var blob = builder.getBlob(contentType);
        
        createLink(window.URL.createObjectURL(blob));
      } else if (error.name == 'InvalidStateError') {
        var blob = new Blob([array.buffer], {type: contentType});
        
        createLink(window.URL.createObjectURL(blob));
      }
    }
  };
  
  function createLink(href) {
    var a = document.createElement('a');
    a.download = fileTitle;
    a.href = href;
    a.target = '_blank';
    a.click();
  }
  
  request.send();
}
alert('Double click on play button to download.');
