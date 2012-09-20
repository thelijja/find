(function() {

  jQuery(function() {
    return $('.navbar li a').click(function(e) {
      $('.navbar ul.nav > li').removeClass('active');
      return $(this).parent('li').addClass('active');
    });
  });

}).call(this);
