# Funtility Javascript identity

This manages the login process and access tokens issued by the Funtility identity api. It also provides a wrapper around the fetch api that includes the access token in each api call. The base url to the https://api.funtility.com/ is hard coded.

You can referrence the api.js only and create your own front end or include a referrence to the api.js, ui.js, and ui.css (recommended) in the index.html of your website.

``````
<!--Funtility auth-->
<link async rel="stylesheet" href="https://funtility.github.io/identity/ui.css">
<script src="https://funtility.github.io/identity/ui.js"></script>
<script src="https://funtility.github.io/identity/api.js"></script>
``````

Then add a div in the index.html where you want the sign in button to appear.

```
<div id="funtility"></div>
```

The ui.css is simple to override if you want to change the styles. See the ui.css file for the styles used.

See the index.html for an example of how to construct the FuntilityAPI and FuntilityUI classes.