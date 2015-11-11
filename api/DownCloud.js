javascript:(function(page, client, json, count, index, url, stream, title, artwork, genre, duration, size, description, created) {
  function loadJS(src, cb) {
    var ref = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
    if (cb && typeof(cb) === 'function') {
      script.onload = cb;
    }
      return script;
  }
  if (typeof jQuery == 'undefined') {
    loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
  }

  var waitForLoad = function() {
    if (typeof jQuery != 'undefined') {
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
        var stringIndex = (index / 10).toFixed(1).toString();
        var first = stringIndex.split('.')[0];
        var second = stringIndex.split('.')[1];

        stream = json[first][second].stream_url;
        title = json[first][second].title;
        artwork = json[first][second].artwork_url;
        genre = json[first][second].genre;
        duration = json[first][second].duration;
        size = json[first][second].original_content_size;
        description = json[first][second].description;
        created = json[first][second].created_at;

        url = stream + '?client_id=' + client;

        var metadata = [];
        metadata.push(url, title, artwork, genre, duration, size, description, created);

        SKBlobDownload(url, title, 'audio/mpeg3', metadata);
      });

      loadJS('https://scriptkitti.github.io/api/BlobDownload.js');
      alert('Ready to start downloading music.\n\nDOUBLE CLICK ON THE PLAY BUTTON TO START DOWNLOAD!');
    } else {
      window.setTimeout(waitForLoad, 60);
    }
  };
  window.setTimeout(waitForLoad, 60);
})();
