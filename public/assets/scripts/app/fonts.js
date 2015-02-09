var WebFont = require('components-webfontloader');

module.exports = function() {
	window.WebFont.load({
		google: {
			families: ['Karla:400,700:latin'],
		}
	});
};

