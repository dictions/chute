var Vue = require('vue');

Vue.filter('hashtag', function(value) {
	var regex = /#(\w*[a-zA-Z_]+\w*)/gim;
	return value.replace(regex, '<b class="hashtag">#$1</b>');
});

module.exports = {
	bind: function() {
		var self = this;
		this.el.addEventListener('error', function(e) {
			switch (self.expression) {
				case 'avatar':
					self.el.src = '//placehold.it/100x100';
					break;
				case 'asset':
					self.el.src = '//placehold.it/360x360';
					break;
			}
		});
	},
	unbind: function() {
		this.el.removeEventListener('error');
	}
}