jQuery.fn.defaultize = function() {
  this.each(function() {
    $(this).focus(jQuery.defaultize.clearDefaultValuesOnFocus);
    $(this).blur(jQuery.defaultize.applyDefaultValuesOnBlur);
    /*
     * Fix for FF
     *
     * On reloading the page FF does not set 
     */
    $(this).focus()
    $(this).blur();
  });
};

jQuery.defaultize = {
  clearDefaultValuesOnFocus: function(event) {
    if(($(this).attr('value') == undefined || $(this).attr('value') == $(this).attr('title')) && $(this).attr('title') != '') {
      $(this).attr('value', '').removeClass('defaultValue');
      
      if($(this).attr('name').match(/password/i) && $(this).attr('type').match(/text/i)) {
        jQuery.defaultize.replaceInputTextWithInputPassword($(this));
      }
    }
  },

  applyDefaultValuesOnBlur: function(event) {
    if(($(this).attr('value') == undefined || $(this).attr('value') == '') && $(this).attr('title') != '') {
      $(this).attr('value', $(this).attr('title')).addClass('defaultValue');
      
      if($(this).attr('name').match(/password/i) && $(this).attr('type').match(/password/i)) {
        jQuery.defaultize.replaceInputPasswordWithInputText($(this));
      }
    }
  },

  replaceInputPasswordWithInputText: function(password_field) {
    var text_field = $("<input type='text' />");
    jQuery.defaultize.copyAttributes(password_field, text_field);
    password_field.replaceWith(text_field);
    password_field.remove(); // to make sure all event handlers are removed
  },

  replaceInputTextWithInputPassword: function(text_field) {
    var password_field = $("<input type='password' />");
    jQuery.defaultize.copyAttributes(text_field, password_field);
    text_field.replaceWith(password_field);
    text_field.remove(); // to make sure all event handlers are removed
    /*
     * password_field.focus() does not work in IE; see link below for explanation
     * http://stackoverflow.com/questions/102055/adding-an-input-field-to-the-dom-and-focusing-it-in-ie
     */
    setTimeout(function() {jQuery.defaultize.setFocus(password_field)},0);
  },

  setFocus: function(field) {
    field.focus();
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
                  'value',
                  'width'
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
    
    to.focus(jQuery.defaultize.clearDefaultValuesOnFocus);
    to.blur(jQuery.defaultize.applyDefaultValuesOnBlur);
  }
};
