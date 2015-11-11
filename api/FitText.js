(function() {
  $.each($('#fit-text'), function() {
    $(this).css({'width': '100%'});
    var pw = $(this).width();
    var vh = window.screen.height;
    var vw = window.screen.width;
    var ratio = vw / vh;
    var count = $(this).text().length;
    var size = (pw / count) * ratio;
    $(this).css({
      'font-size': size + 'vw'
    });
  });
})();
