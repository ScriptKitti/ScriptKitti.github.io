function(object, factor, percentage) {
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 0) {
      var position = ($(window).scrollTop() / factor) * -1;
        
      $(object).css({
        'background-position': 'center ' + position + 'px'
      });
    } else {
      var size = percentage - ($(window).scrollTop() / factor);
        
      $(object).css({
        'background-size': size + '%'
      });
    }
  });
}
