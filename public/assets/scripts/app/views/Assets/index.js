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
			if (this.albumId) window.app.data.fetchNextPage(this.albumId, function(newAssets) {
				function animate(asset, i) {
					setTimeout(function() {
						self.assets.push(asset)
					}, i * 200);
				}
				for (var i = 0; i < newAssets.length; i++) {
					animate(newAssets[i], i);
				}
			});
		},
	}
})