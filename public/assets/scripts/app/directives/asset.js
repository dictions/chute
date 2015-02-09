module.exports = {
	bind: function() {
		this.el.addEventListener('error', function(e) {
			console.log('ERRORRRRR');
		});
	},
	unbind: function() {
		this.el.removeEventListener('error');
	}
}