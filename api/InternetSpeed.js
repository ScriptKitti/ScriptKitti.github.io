var ping = null;
var pBusy = false,
    dBusy = false,
    uBusy = false;
var pComplete,
    dComplete,
    uComplete;
var dCurData,
    dMaxData,
    dCurSpeed,
    uCurData,
    uMaxData,
    uCurSpeed;

function SKPing(object, size) {
  var start,
      end;
  
  pComplete = false;
  size = size.toLowerCase();
  
  var check = function() {
    if (ping != null && pBusy) {
      if (size == 'ms') {
        $(object).text(ping + ' ms');
      } else {
        $(object).text((ping / 1000).toFixed(4) + ' s');
      }
      
      ping = null;
      pBusy = false;
      dBusy = false;
      uBusy = false;
      pComplete = true;
      
      console.log('Ping Complete');
    } else {
      if (!pBusy && !dBusy && !uBusy) {
        SKPingCalc('HEAD');
      }
      window.setTimeout(check, 1000);
    }
  }
  window.setTimeout(check, 1000);
}

function SKDownload(object, size) {
  var newSize,
      oldSize;
  
  dComplete = false;
  size = size.toLowerCase();
  
  var check = function() {
    if (ping != null && dBusy) {
      $.ajax({
        async: true,
        cache: false,
        data: {},
        processData: false,
        type: 'GET',
        url: 'http://scriptkitti.github.io/api/2MB',
        success: function (result) {
          ping = null;
          pBusy = false;
          dBusy = false;
          uBusy = false;
          dComplete = true;
          
          console.log('Download Complete');
        },
        xhr: function() {
          var xhr = $.ajaxSettings.xhr();
          
          xhr.onprogress = function(event) {
            newSize = event.loaded;
            dCurData = newSize;
            dMaxData = event.total;
            
            var timer = function() {
              oldSize = event.loaded;
            }
            window.setTimeout(timer, 1000);
            
            var length = (newSize - oldSize) * 8,
                bps = (length / ping).toFixed(2),
                kbps = (bps / 1024).toFixed(2),
                mbps = (kbps / 1024).toFixed(2);
            
            if (size == 'bps') {
              dCurSpeed = bps * 1;
              $(object).text(bps + ' bps');
            } else if (size == 'kbps') {
              dCurSpeed = kbps * 1;
              $(object).text(kbps + ' kbps');
            } else {
              dCurSpeed = mbps * 1;
              $(object).text(mbps + ' Mbps');
            }
          };
          
          return xhr;
        }
      });
    } else {
      if (!pBusy && !dBusy && !uBusy) {
        SKPingCalc('GET');
      }
      window.setTimeout(check, 1000);
    }
  }
  window.setTimeout(check, 1000);
}

function SKUpload(object, size) {
  var newSize,
      oldSize;
  
  uComplete = false;
  size = size.toLowerCase();
  
  var check = function() {
    if (ping != null && uBusy) {
      $.get('http://scriptkitti.github.io/api/2MB', function(data) {
        $.ajax({
          async: true,
          cache: false,
          data: data,
          processData: false,
          type: 'POST',
          url: '',
          success: function(result) {
            ping = null;
            pBusy = false;
            dBusy = false;
            uBusy = false;
            uComplete = true;
            
            console.log('Upload Complete');
          },
          xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            
            xhr.upload.onprogress = function(event) {
              newSize = event.loaded;
              uCurData = newSize;
              uMaxData = event.total;
              
              var timer = function() {
                oldSize = event.loaded;
              }
              window.setTimeout(timer, 1000);
              
              var length = (newSize - oldSize) * 8,
                  bps = (length / ping).toFixed(2),
                  kbps = (bps / 1024).toFixed(2),
                  mbps = (kbps / 1024).toFixed(2);
              
              if (size == 'bps') {
                uCurSpeed = bps * 1;
                $(object).text(bps + ' bps');
              } else if (size == 'kbps') {
                uCurSpeed = kbps * 1;
                $(object).text(kbps + ' kbps');
              } else {
                uCurSpeed = mbps * 1;
                $(object).text(mbps + ' Mbps');
              }
            };
            
            return xhr;
          }
        });
      });
    } else {
      if (!pBusy && !dBusy && !uBusy) {
        SKPingCalc('POST');
      }
      window.setTimeout(check, 1000);
    }
  }
  window.setTimeout(check, 1000);
}

function SKPingCalc(type) {
  var start,
      end;
  
  type = type.toUpperCase();
  
  if (type == 'HEAD') {
    pBusy = true;
    dBusy = false;
    uBusy = false;
  } else if (type == 'GET') {
    pBusy = false;
    dBusy = true;
    uBusy = false;
  } else if (type == 'POST') {
    pBusy = false;
    dBusy = false;
    uBusy = true;
  }
  
  start = (new Date()).getTime();
  
  $.ajax({
    async: true,
    cache: false,
    data: {},
    processData: false,
    type: type,
    url: '',
    success: function(result) {
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
