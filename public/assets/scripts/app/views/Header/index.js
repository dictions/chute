var Vue = require('vue');
var Moment = require('moment');

module.exports = Vue.extend({
	template: require('./template.html'),
	methods: {
		moment: function(date) {
			return new Moment(date);
		}
	}
})