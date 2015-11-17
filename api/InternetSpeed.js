var ping = null;
var busy = false;
var curDownload, curDownloadSize, maxDownload, curUpload, curUploadSize, maxUpload;

function SKPing(object, size) {
  var start, end;
  
  size = size.toLowerCase();
  
  var check = function () {
    if (busy != true) {
      busy = true;
      
      if (ping != null) {
        if (size == 'ms') {
          $(object).text(ping + ' ms');
        } else {
          $(object).text((ping / 1000).toFixed(4) + ' s');
        }
        
        ping = null;
        busy = false;
        
        console.log('Ping Complete');
      } else {
        SKPingCalc('HEAD');
        window.setTimeout(check, 1000);
      }
    }
  }
  window.setTimeout(check, 1000);
}

function SKDownload(object, size) {
  var newSize, oldSize;
  
  size = size.toLowerCase();
  
  var check = function () {
    if (busy != true) {
      busy = true;
      
      if (ping != null) {
        $.ajax({
          async: true,
          cache: false,
          data: {},
          processData: false,
          type: 'GET',
          url: 'http://scriptkitti.github.io/api/2MB',
          success: function (result) {
            ping = null;
            busy = false;
            
            console.log('Download Complete');
          },
          xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            
            xhr.onprogress = function (event) {
              newSize = event.loaded;
              
              curDownload = newSize;
              maxDownload = event.total;
              
              var timer = function () {
                oldSize = event.loaded;
              }
              window.setTimeout(timer, 1000);
              
              var length = (newSize - oldSize) * 8;
              var bps = (length / ping).toFixed(2);
              var kbps = (bps / 1024).toFixed(2);
              var mbps = (kbps / 1024).toFixed(2);
              
              if (size == 'bps') {
                curDownloadSize = bps;
                $(object).text(bps + ' bps');
              } else if (size == 'kbps') {
                curDownloadSize = kbps;
                $(object).text(kbps + ' kbps');
              } else {
                curDownloadSize = mbps;
                $(object).text(mbps + ' Mbps');
              }
            };
            
            return xhr;
          }
        });
      } else {
        SKPingCalc('GET');
        window.setTimeout(check, 1000);
      }
    }
  }
  window.setTimeout(check, 1000);
}

function SKUpload(object, size) {
  var newSize, oldSize; //, data;
  
  size = size.toLowerCase();
  
/*
  var dataSize = 2 * 1024 * 1024;
  var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=[];,./!@#$%ˆ&*()_+{}:"|<>?';
  
  for (a = 0; a < dataSize; a++) {
    data += char.charAt(Math.floor(Math.random() * char.length));
  }
*/
  
  var check = function () {
    if (busy != true) {
      busy = true;
      
      if (ping != null) {
        $.get('http://scriptkitti.github.io/api/2MB', function (data) {
          $.ajax({
            async: true,
            cache: false,
            data: data,
            processData: false,
            type: 'POST',
            url: '',
            success: function (result) {
              ping = null;
              busy = false;
              
              console.log('Upload Complete');
            },
            xhr: function () {
              var xhr = $.ajaxSettings.xhr();
              
              xhr.upload.onprogress = function (event) {
                newSize = event.loaded;
                
                curUpload = newSize;
                maxUpload = event.total;
                
                var timer = function () {
                  oldSize = event.loaded;
                }
                window.setTimeout(timer, 1000);
                
                var length = (newSize - oldSize) * 8;
                var bps = (length / ping).toFixed(2);
                var kbps = (bps / 1024).toFixed(2);
                var mbps = (kbps / 1024).toFixed(2);
                
                if (size == 'bps') {
                  curUploadSize = bps;
                  $(object).text(bps + ' bps');
                } else if (size == 'kbps') {
                  curUploadSize = kbps;
                  $(object).text(kbps + ' kbps');
                } else {
                  curUploadSize = mbps;
                  $(object).text(mbps + ' Mbps');
                }
              };
              
              return xhr;
            }
          });
        });
      } else {
        SKPingCalc('POST');
        window.setTimeout(check, 1000);
      }
    }
  }
  window.setTimeout(check, 1000);
}

function SKPingCalc(type) {
  var start, end;
  
  type = type.toUpperCase();
  start = (new Date()).getTime();
  
  $.ajax({
    async: true,
    cache: false,
    data: {},
    processData: false,
    type: type,
    url: '',
    success: function (result) {
      end = (new Date()).getTime();
      
      if (type == 'HEAD') {
        ping = end - start;
      } else {
        ping = (end - start) / 1000;
      }
      
      console.log('Calculate Complete');
    }
  });
}
