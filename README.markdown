Defaultize jQuery plugin
========================

Makes forms smaller by putting description for input[type=text|password] elements in themselves. Effortlessly.

To use it just include jquery and jquery.defaultize.js plugin and specify which fields you would like to be processed.

Text that appears on an input field will be taken from it's title attribute. That is why in the example below we select all fields that have title attribute present.

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.defaultize.js"></script>
    <script type="text/javascript">
      $(function() {
        // Defaultize all the input fields with title attribute present and with type attribute of text or password
        $("input[title][type='text'], input[title][type='password']").defaultize();
      });
    </script>

Compressing plugin
==================
If you want to generate compressed version of the plugin you can use provided ant build file to do this automatically. Just run ant in the plugin folder.

