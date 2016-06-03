var semver = require('semver');
var getTags = require('./get-tags');

/**
 * Get git tags of repository matching semantic version pattern
 * 
 * @param {GitRepository} repository
 * @returns {GitTag[]}
 * @see https://github.com/npm/node-semver#functions
 * @private
 */
function getSemverTags(repository) {
	// Get all tags
	return getTags(repository)
		// Filter for valid semver tags
		.filter(function(tag) {
			return semver.valid(tag.name);
		});
}

module.exports = getSemverTags;
