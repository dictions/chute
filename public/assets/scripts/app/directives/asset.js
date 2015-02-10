var Vue = require('vue');

module.exports = {
	bind: function() {
		var self = this;
		this.el.addEventListener('error', function(e) {
			switch (self.expression) {
				case 'avatar':
					self.el.src = 'http://images.ak.instagram.com/profiles/anonymousUser.jpg';
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