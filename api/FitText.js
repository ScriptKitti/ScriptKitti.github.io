(function() {
  function SKAdjustFont(object, text, width) {
    var vh = window.screen.height;
    var vw = window.screen.width;
    var ratio = vw / vh;
    var count = text.length;
    var size = (width / count) * ratio;
    $(object).css({
      'font-size': size + 'vw'
    });
  }
})();
