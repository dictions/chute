var Vue = require('vue');
var Masonry = require('masonry-layout');
var Moment = require('moment');

/*
 * Filters for hashtags
 */

Vue.filter('trim', function(value) {
	if (!value) return '';
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
			loading: false,
		};
	},
	template: require('./template.html'),
	watch: {
		albumId: 'fetchNextPage'
	},
	ready: function() {

		var self = this;

		// Start masonry
		this.masonry = window.masonry = new Masonry(this.$el.getElementsByTagName('ul')[0], {
			itemSelector: '.masonry-item',
			transitionDuration: 0,
		});

		// Fetch when we get near the bottom
		this.scrollHandler = setInterval(function() {

			var body = document.body;
			var html = document.documentElement;
			var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			var windowHeight = window.innerHeight|| html.clientHeight|| body.clientHeight;

			if (window.pageYOffset + windowHeight >= height - 100 && !self.loading && !self.allLoaded) self.fetchNextPage();

		}, 1000 / 4);
	},
	computed: {
		allLoaded: function() {
			return this.assets.length >= this.imageCount;
		}
	},
	methods: {

		fetchNextPage: function() {

			var self = this;

			this.loading = true;

			// Fetch new page and add items with Masonry
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

				self.loading = false;
			});
		},

		moment: function(date) {
			return new Moment(date);
		}
	}
})