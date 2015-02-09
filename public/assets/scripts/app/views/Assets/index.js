var Vue = require('vue');
var Masonry = require('masonry-layout');
var Moment = require('moment');


Vue.filter('caption', function(value) {
	if (value.length > 120) return value.substring(0,120) + ' ...';
	return value;
});

Vue.filter('hashtag', function(value) {
	var regex = /#(\w*[a-zA-Z_]+\w*)/gim;
	return value.replace(regex, '<b class="hashtag">#$1</b>');
});

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
	replace: true,
	ready: function() {
		this.masonry = window.masonry = new Masonry(this.$el, {
			itemSelector: '.masonry-item',
			transitionDuration: 0,
		});
	},
	methods: {
		fetchNextPage: function() {
			var self = this;
			if (this.albumId) window.app.data.fetchNextPage(this.albumId, function(newAssets) {
				function animate(asset, i) {
					setTimeout(function() {
						self.assets.push(asset)
						setTimeout(function() {
							self.masonry.reloadItems();
							self.masonry.layout();
						});
					}, i * 100);
				}
				for (var i = 0; i < newAssets.length; i++) {
					animate(newAssets[i], i);
				}
			});
		},
		moment: function(date) {
			return new Moment(date);
		}
	}
})