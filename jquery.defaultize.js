/*
Example usage:

  $(function() {
    $("input[title][type='text'], input[title][type='password']").defaultize();
  });

*/

(function($) {
  $.fn.defaultize = function(options) {
    $.defaultize.settings = jQuery.extend({
                               cssClass: "defaultValue",
                               descriptionFromAttribute: "title"
                            }, options);
    this.each(function() {
      $(this).focus(function (event) { $.defaultize.clearDefaults($(this)); });
      $(this).blur(function (event) { $.defaultize.applyDefaults($(this)); });
      
      /*
       * Fix for FF
       *
       * On reloading the page FF does not set 
       */
      $.defaultize.applyDefaults($(this));
    });
  };
  
  $.defaultize = {
    clearDefaults: function(element) {
      if(
          (
            element.attr('value') == undefined ||
            element.attr('value') == element.attr($.defaultize.settings['descriptionFromAttribute'])
          ) && $(this).attr($.defaultize.settings['descriptionFromAttribute']) != '' &&
          /*
           If it does not have that class applied to it user entered some text
           only by accident being the same as default text so we won't clear the
           field
          */
          element.hasClass($.defaultize.settings['cssClass'])
        ) {
          element.attr('value', '').removeClass($.defaultize.settings['cssClass']);
          
          if(element.attr('name').match(/password/i) && element.attr('type').match(/text/i)) {
            $.defaultize.replaceTextWithPasswordField(element);
          }
      }
    },

    applyDefaults: function(element) {
      if(
          (
            element.attr('value') == undefined || element.attr('value') == ''
          ) && element.attr($.defaultize.settings['descriptionFromAttribute']) != ''
        ) {
          element.attr('value', element.attr($.defaultize.settings['descriptionFromAttribute'])).addClass($.defaultize.settings['cssClass']);
          
          if(element.attr('name').match(/password/i) && element.attr('type').match(/password/i)) {
            $.defaultize.replacePasswordWithTextField(element);
          }
      }
    },

    replacePasswordWithTextField: function(password_field) {
      var text_field = $("<input type='text' />");
      $.defaultize.copyAttributes(password_field, text_field);
      password_field.replaceWith(text_field);
      password_field.remove(); // to make sure all event handlers are removed
    },

    replaceTextWithPasswordField: function(text_field) {
      var password_field = $("<input type='password' />");
      $.defaultize.copyAttributes(text_field, password_field);
      text_field.replaceWith(password_field);
      text_field.remove(); // to make sure all event handlers are removed
      /*
       * password_field.focus() does not work in IE; see link below for explanation
       * http://stackoverflow.com/questions/102055/adding-an-input-field-to-the-dom-and-focusing-it-in-ie
       */
      setTimeout(function() {password_field.focus()},0);
    },

    /*
     * Copies some attributes and sets focus and blur events
     * TODO: copy events instead of setting it
     */
    copyAttributes: function(from, to) {
      var attrs = [
                    'align',
                    'alt',
                    'class',
                    'checked',
                    'disabled',
                    'maxlength',
                    'name',
                    'readonly',
                    'size',
                    'style',
                    'title',
                    'value'
                  ];
      
      for(var i in attrs) {
        if(from.attr(attrs[i]) != undefined) {
          to.attr(attrs[i], from.attr(attrs[i]));
        }
      }
      
      /*
       * Fix for IE
       * 
       * In IE password field is not necessary of the same length as text field
       */
      if(to.attr('width') != undefined) {
        to.width(from.width());
      }
      
      /*
       * Fix for FF
       *
       * element.attr('maxlength') returns -1 if maxlength not set but if you try to
       * set maxlength to -1 it actually assigns it to 0
       */
      if(from.attr('maxlength') == -1) {
        to.attr('maxlength', 524288);
      }
      
      /*
        Copy all the events as in
        http://stackoverflow.com/questions/2337521/copy-events-from-one-elm-to-other-using-jquery
       */
      var events = from.data('events');

      for(var type in events) {
          for (var idx in events[type]) {
              to[type](events[type][idx].handler);
          }
      }
    }
  };
})(jQuery);
