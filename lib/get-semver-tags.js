var semver = require('semver');
var getTags = require('./get-tags');

module.exports = function(repository) {
	// Get all tags
	return getTags(repository)
		// Filter for valid semver tags
		.filter(function(tag) {
			return semver.valid(tag.name);
		});
};
