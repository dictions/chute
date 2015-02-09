var Vue = require('vue');
var Moment = require('moment');

module.exports = Vue.extend({
	data: function() {
		return {
			album: {
				user: null
			}
		};
	},
	template: require('./template.html'),
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
		moment: function(date) {
			return new Moment(date);
		}
	}
})