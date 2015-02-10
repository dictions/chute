var Router = require('director').Router;
var router = window.router = new Router().configure({
	html5history: true
});



/*
 * Router Config
 */

router.on('/albums/:id', function (id) {
	window.app.view.albumId = id;
	window.app.view.previewAsset = null;
});

router.on('/albums/:id/:preview', function (id, preview) {
	window.app.view.albumId = id;
	window.app.view.previewAsset = preview;
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
			albumId: null,
			previewAsset: null,
			album: {
				user: null,
			}
		},
		components: {
			assets: require('./views/Assets'),
			header: require('./views/Header'),
		},
		watch: {
			albumId: 'fetchAlbum'
		},
		methods: {
			fetchAlbum: function() {
				var self = this;
				if (this.albumId) window.app.data.fetchAlbum(this.albumId, function() {
					self.album = window.app.data.album
				});
			},
		}
	});

	router.init('/albums/aus6kwrg');
}

var Fonts = require('./fonts');

Fonts();
window.app.init();