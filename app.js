/* jshint node: true */

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
/*
    Hide internal paths for the outside world
*/
app.use('/distribution', express.static(__dirname + '/node_modules/'));
app.listen(process.env.PORT || 1337, function(err) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log('Listening for incoming requests!');
});