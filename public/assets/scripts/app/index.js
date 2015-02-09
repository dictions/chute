var Router = require('director').Router;
var router = new Router().configure({
	html5history: true
});



/*
 * Router Config
 */

router.on('/albums/:id', function (id) {
	window.app.view.albumId = id;
});


var Vue = require('vue');
var directives = require('./directives');


/*
 * App Init
 */

window.app = {};

window.app.init = function() {

	this.data = require('./store');

	this.view = new Vue({
		el: '#app',
		data: {
			albumId: null
		},
		components: {
			assets: require('./views/Assets'),
			header: require('./views/Header'),
		}
	});

	router.init('/albums/aus6kwrg');
}

var Fonts = require('./fonts');

Fonts();
window.app.init();