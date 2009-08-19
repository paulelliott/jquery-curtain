/*
 * jQuery Curtain v0.4 - jQuery JavaScript Plugin
 * Code: http://github.com/paulelliott/jquery-curtain/tree/master
 *
 * Copyright (c) 2009 Paul Elliott with RedLine IT
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
  var defaultSettings = {
    loader_image: '/images/ajax-loader.gif',
    loader_height: 100,
    loader_width: 100
  };
  
  $.extend({
    curtainSettings: function(newDefaults) {
      defaultSettings = $.extend(defaultSettings, newDefaults);
    }
  });
  
  $.fn.extend({
    curtain: function(options) {
      if (options === 'remove') {
        return this.each(function() {
          var element = $(this);
          element.curtain('get').remove();
          element.removeData('jquery-curtain-id');
        });
      } else if (options === 'get') {
        var curtains = [];
        $(this).each(function() {
          curtains = $.merge(curtains, $.makeArray($("#" + $(this).data('jquery-curtain-id'))));
        });
        return $(curtains);
      } else {
        var settings = $.extend(defaultSettings, options);

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
          if (settings.loader_image) {
            var image = $("<img src='" + settings.loader_image + "' alt='Loading...' />");
            curtain.append(image.css({
              position: 'relative',
              top: ((element.height() / 2) - (settings.loader_height / 2)) + "px",
              left: ((element.width() / 2) - (settings.loader_width / 2)) + "px"
            }));
          }

          $("body").append(curtain);
        });
      }
    }
  });
  
  //internal fields and functions
  var curtainCount = 0;
})(jQuery);
