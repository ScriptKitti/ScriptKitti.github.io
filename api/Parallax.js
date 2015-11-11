(function() {
  function(object, factor) {
    $(window).scroll(function() {
      if ($(window).scrollTop() >= 0) {
        var imgPos = ($(window).scrollTop() / factor) * -1;
        
        $(object).css({
          'background-position': 'center ' + imgPos + 'px'
        });
      } else {
        var imgSize = 100 - ($(window).scrollTop() / factor);
        
        $(object).css({
          'background-size': imgSize + '%'
        });
      }
    });
  }
})();
