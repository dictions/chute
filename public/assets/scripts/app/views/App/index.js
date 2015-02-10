var Vue = require('vue');

module.exports = new Vue({
	el: '#app',
	data: {
		albumId: null,
		previewAsset: null,
		album: {
			user: null,
		}
	},
	components: {
		assets: require('../Assets'),
		header: require('../Header'),
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