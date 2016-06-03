var human = require('git-parse-human');

/**
 * Get human object for commit tagger, author or committer
 * 
 * @param {GitCommit} commit
 * @returns {GitHuman} 
 * @private
 */
function getCommitHuman(commit) {
	// Use getter for raw information about author of commit, where author is
	// the tagger, author or committer in said precedence
	var getter = commit.tagger || commit.author || commit.committer;
	var bound = getter.bind(commit);
	// Parse raw author information into commit "human" object
	return human(bound());
}

module.exports = getCommitHuman;

/**
 * @typedef GitHuman
 * @property {string} name
 * @property {string} email
 * @property {number} time unix epoch commit timestamp in milliseconds
 * @property {number} tzoff time zone offset in milliseconds
 * @see https://github.com/chrisdickinson/git-parse-human
 */
