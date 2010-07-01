jQuery.fn.defaultize = function() {
  this.each(function() {
    $(this).focus(jQuery.defaultize.clearDefaultValuesOnFocus);
    $(this).blur(jQuery.defaultize.applyDefaultValuesOnBlur);
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
    //text_field.blur(); // previous field lost focus so we do not need to blur it
  },

  replaceInputTextWithInputPassword: function(text_field) {
    var password_field = $("<input type='password' />");
    jQuery.defaultize.copyAttributes(text_field, password_field);
    text_field.replaceWith(password_field);
    text_field.remove(); // to make sure all event handlers are removed
    // setting focus on newly replaced element delaying it first as on
    // http://stackoverflow.com/questions/102055/adding-an-input-field-to-the-dom-and-focusing-it-in-ie
    setTimeout('jQuery.defaultize.setFocus',0);
  },

  setFocus: function() {
    password_field.focus();
  },

  /* TODO: when tabbing through the form new element does not always get focus when it should */
  copyAttributes: function(from, to) {
    var attrs = ['name', 'style', 'class', 'title', 'value'];
    
    for(i in attrs) {
      if(from.attr(attrs[i]) != undefined) {
        to.attr(attrs[i], from.attr(attrs[i]));
      }
    }
    to.focus(jQuery.defaultize.clearDefaultValuesOnFocus);
    to.blur(jQuery.defaultize.applyDefaultValuesOnBlur);
  },
}
