var request = require('superagent');
var Emitter = require('events').EventEmitter;

var Store = function() {
	this.listener = new Emitter();
	this.api = 'https://getchute.com/v2';
	this.album = {};
	this.user = {};
	this.assets = [];
	this.asset = {};
	this.currentPage = 1;
	this.nextPage = null;
};

Store.prototype.fetchAlbum = function(id, cb) {

	var self = this;

	request
	.get(this.api + '/albums/' + id)
	.end(function(res) {
		var res = JSON.parse(res.text);
		self.user = res.data.user;
		self.album = res.data;
		if (cb) cb();
	});

};

Store.prototype.fetchAssets = function(id, cb) {

	var self = this;

	request
	.get(this.api + '/albums/' + id + '/assets?per_page=20')
	.end(function(res) {
		var res = JSON.parse(res.text);
		self.assets = res.data;
		self.currentPage = res.pagination.current_page;
		self.nextPage = res.pagination.next_page;
		if (cb) cb(res.data);
	});

};

Store.prototype.fetchAsset = function(albumId, id, cb) {

	var self = this;

	request
	.get(this.api + '/albums/' + albumId + '/assets/' + id)
	.end(function(res) {
		var res = JSON.parse(res.text);
		self.asset = res.data;
		if (cb) cb(res.data);
	});

};

Store.prototype.fetchNextPage = function(id, cb) {

	var self = this;

	// If we've fetched assets before, concat arrays
	if (this.nextPage) {
		request
		.get(this.nextPage)
		.end(function(res) {
			var res = JSON.parse(res.text);
			self.assets = self.assets.concat(res.data);
			self.currentPage = res.pagination.current_page;
			self.nextPage = res.pagination.next_page;
			if (cb) cb(res.data);
		});
	} else {
		self.fetchAssets(id, cb);
	}
};

module.exports = new Store();