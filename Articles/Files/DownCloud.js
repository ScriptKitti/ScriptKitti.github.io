javascript:(function(page, client, stream, url, json, index, name, count) {
  page = window.location.href;
  page = page.split('://').join('://api-v2.');
  
  client = '9d43dd98637027e2f9764bc7219d9972';
  
  count = 10;
  json = [];
  
  $.getJSON(page + '&limit=10&offset=' + (count - 10), function(data) {
    json.push(data.collection);
  });
  
  var checkUpdates = function() {
    if ($(document).find('li[class="searchList__item"]').length > count) {
      count = $(document).find('li[class="searchList__item"]').length;
      $.getJSON(page + '&limit=10&offset=' + (count - 10), function(data) {
        json.push(data.collection);
      });
    }
    window.setTimeout(checkUpdates, 60);
  };
  window.setTimeout(checkUpdates, 60);
  
  $(document).on('dblclick', 'li', function() {
    index = $(this).index();
    stream = json[(index / 10) | 0][index % 10].stream_url;
    name = json[(index / 10) | 0][index % 10].title;
    url = stream + '?client_id=' + client;
    downloadMP3(url, name);
  });
  
  function downloadMP3(href, title) {
    var link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.download = title + '.mp3';
    link.click();
  }
  
  alert('Double click on play button to download.');
})();
// javascript:(function(page, client, stream, url, json, index, name, count) {
//   function loadJS(src, cb) {
//     var ref = window.document.getElementsByTagName('script')[0];
//     var script = window.document.createElement('script');
//     script.src = src;
//     script.async = true;
//     ref.parentNode.insertBefore(script, ref);
//     if (cb && typeof(cb) === 'function') {
//       script.onload = cb;
//     }
//     return script;
//   }
  
//   if (typeof jQuery != 'undefined') {
//     loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
    
//     var waitForLoad = function() {
//       if (typeof jQuery != 'undefined') {
//         page = window.location.href;
//         page = page.split('://').join('://api-v2.');
        
//         client = '9d43dd98637027e2f9764bc7219d9972';
        
//         count = 10;
//         json = [];
        
//         $.getJSON(page + '&limit=10&offset=' + (count - 10), function(data) {
//           json.push(data.collection);
//         });
        
//         var checkUpdates = function() {
//           if ($(document).find('li[class="searchList__item"]').length > count) {
//             count = $(document).find('li[class="searchList__item"]').length;
//             $.getJSON(page + '&limit=10&offset=' + (count - 10), function(data) {
//               json.push(data.collection);
//             });
//           }
//           window.setTimeout(checkUpdates, 60);
//         };
//         window.setTimeout(checkUpdates, 60);
        
//         $(document).on('dblclick', 'li', function() {
//           index = $(this).index();
//           stream = json[(index / 10) | 0][index % 10].stream_url;
//           name = json[(index / 10) | 0][index % 10].title;
//           url = stream + '?client_id=' + client;
//           downloadMP3(url, name);
//         });
        
//         alert('Double click on play button to download.');
//       } else {
//         window.setTimeout(waitForLoad, 60);
//       }
//     };
//     window.setTimeout(waitForLoad, 60);
    
//     function downloadMP3(href, title) {
//       var link = document.createElement('a');
//       link.href = href;
//       link.target = '_blank';
//       link.download = title + '.mp3';
//       link.click();
//     }
//   }
// })();
