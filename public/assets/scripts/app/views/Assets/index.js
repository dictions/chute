var Vue = require('vue');

module.exports = Vue.extend({
	data: function() {
		return {
			assets: [],
		};
	},
	template: require('./template.html'),
	watch: {
		albumId: 'fetchNextPage'
	},
	methods: {
		fetchNextPage: function() {
			var self = this;
			if (this.albumId) window.app.data.fetchNextPage(this.albumId, function() {
				self.assets = window.app.data.assets;
			});
		},
	}
})