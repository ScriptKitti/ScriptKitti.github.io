(function() {
  function SKBlobDownload(url, title, cType, metadata) {
    window.URL = window.URL || window.webkitURL;

    if (XMLHttpRequest) {
      var request = new XMLHttpRequest();
    } else if (ActiveXObject) {
      var request = new ActiveXObject('Microsoft.XMLHTTP');
    }

    request.responseType = 'arraybuffer';
    request.open('GET', url, true);
    var contentType = request.getResponseHeader('Content-Type') || cType;
    request.send();

    request.onload = function() {
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
      a.download = title;
      a.href = href;
      a.target = '_blank';
      a.click();
    }
  }
})();
