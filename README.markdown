Defaultize jQuery plugin
========================
Makes forms smaller by putting description for input[type=text|password] elements in themselves. Effortlessly.

To use it just include jquery and jquery.defaultize.js plugin and specify which fields you would like it to be applied to.

By default text that appears on an input field will be taken from it's title attribute. That is why in the example below we select all fields that have title attribute present. When field has default value plugin applies defaultValue class to that element. The class name is easy to change by setting plugin options.

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.defaultize.js"></script>

    <script type="text/javascript">
      $(function() {
        // Defaultize all the input fields with title attribute present and with type attribute of text or password
        $("input[title][type='text'], input[title][type='password']").defaultize();
      });
    </script>
    
    <style type="text/css">
      input.defaultValue { color: gray; }
    </style>

How it works
============
When there is no text in the input fields it puts some default text (by default taken from title attribute of the input element) and applies css style to indicate that it is just default value (by default it is .defaultValue css class).
For input[type=password] field plugin needs to replace it with input[type=text] to be able to show default text instead of dots (as updating input[type] attribute does not work for some browsers).

Plugin options
==============
It is easy to change default behaviour by setting plugin options

  * cssClass
    * css class applied to the element when default text is displayed
    * default: defaultValue
  * descriptionFromAttribute
    * attribute from which default text is taken
    * default: title

Compressing plugin
==================
If you want to generate compressed version of the plugin you can use provided ant build file to do this automatically. Just run ant in the plugin folder.

Browser Compatibility
=====================
It is the same as [compatibility of jQuery](http://docs.jquery.com/Browser_Compatibility) itself.
Before any commit I test it on:
  * Windows
    * IE [6|7|8]
    * Firefox [2|3]
    * Safari [3|4]
    * Google Chrome [1|3|5]
    * Opera [9|10]
    
  * Linux
    * Google Chrome 5
    * Firefox 3
    * Epiphany (gnome web browser) 2

Known issues
============
 - Firefox 2 - When defaultizing password field on replacement of input[type=password] with input[type=text] and back FF2 resets tab index
 
If you found a bug other than listed above please let me know.
