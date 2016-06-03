var path = require('path');
var gitFsRepo = require('git-fs-repo');

/**
 * Initialize a git repository
 *
 * @param  {RepositoryCallback} callback
 * @private
 */
function loadRepository(callback) {
	// Use $cwd/.git as git database directory
	var gitDirectory = path.join(process.cwd(), '.git');

	// Initialize a js-backed representation of the local git repository
	gitFsRepo(gitDirectory, function(error, gitRepository) {
		if (error) {
			return callback(error);
		}

		// get the current head object
		var head = gitRepository.ref('HEAD');

		// if there is no head object this repository most likely has no commits
		if (!head) {
			var headErrors = new Error('Git repository has no HEAD, are there any commits?');
			return callback(headErrors);
		}

		callback(null, gitRepository);
	});
}

module.exports = loadRepository;

/**
 * @typedef {Object} GitRepository
 * @property {function} ref
 * @property {function} refs
 * @see https://github.com/chrisdickinson/git-fs-repo
 * @private
 */

/**
 * Main callback executed after all information has been collected
 *
 * @callback RepositoryCallback
 * @param {(Error|null)} error - encountered error, if any
 * @param {GitRepositpry} [gitRepository]
 * @private
 */
