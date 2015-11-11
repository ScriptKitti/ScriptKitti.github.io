(function() {
  function fitText() {
    $.each($('#fit-text'), function() {
      var vh = window.screen.height;
      var vw = window.screen.width;
      var ratio = vw / vh;
      var count = $(this).text().length;
      var size = (vw / count) * ratio;
      $(this).css({
        'font-size': size + 'vw'
      });
    });
  }
})();
