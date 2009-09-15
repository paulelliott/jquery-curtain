/*
 * jQuery Curtain v0.5.2 - jQuery JavaScript Plugin
 * Code: http://github.com/paulelliott/jquery-curtain/tree/master
 *
 * Copyright (c) 2009 Paul Elliott with RedLine IT
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
  var defaults = {
    loader_image: '/images/ajax-loader.gif'
  };
  
  $.extend({
    curtainSetup: function(options) {
      $.extend(defaults, options);
    }
  });
  
  $.fn.extend({
    curtain: function(options) {
      if (options === 'remove') {
        this.curtain('get').remove();
        return this.removeData('jquery-curtain-id');
      } else if (options === 'get') {
        var curtains = [];
        this.each(function() {
          curtains = $.merge(curtains, $("#" + $(this).data('jquery-curtain-id')));
        });
        return $(curtains);
      } else {
        options = options ? options : {};
        var noImage = options.loader_image === '';
        options = $.extend({}, defaults, options);
        if (noImage) options.loader_image = '';

        return this.each(function() {
          var element = $(this);
          var offset = element.offset();
          var id = "jquery-curtain-" + curtainCount++;
          element.data('jquery-curtain-id',id);
          var curtain = $("<div id='" + id + "' class='jquery-curtain'></div>").css({
            position: 'absolute',
            'z-index': 99999,
            'background-color': 'black',
            border: '1px solid black',
            filter: 'alpha(opacity=50)',
            '-moz-opacity': 0.5,
            opacity: 0.5,
            top: offset.top,
            left: offset.left,
            width: element.width(),
            height: element.height()
          });

          //If a loader graphic was specified, add it.
          if (options.loader_image) {
            var image = $("<img src='" + options.loader_image + "' alt='Loading...' style='display:none;' />");
            image.load(function() {
              image.css({
                position: 'relative',
                top: ((curtain.height() / 2) - (image.height() / 2)) + "px",
                left: ((curtain.width() / 2) - (image.width() / 2)) + "px"
              }).show();
            });
            curtain.append(image);
          }

          $("body").append(curtain);
        });
      }
    }
  });
  
  //internal fields and functions
  var curtainCount = 0;
})(jQuery);
