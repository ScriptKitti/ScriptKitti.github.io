function download(data, filename) {
  if (!window.BlobBuilder && window.WebKitBlobBuilder) {
    window.BlobBuilder = window.WebKitBlobBuilder;
  }
  
  fs.root.getFile(filename, {
    create: true
  }, function(fileEntry) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };
      
      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };
      
      var builder = new BlobBuilder();
      builder.append(data);
      var blob = builder.getBlob();
      fileWriter.write(blob);
    }, errorHandler);
  }, errorHandler);
}
