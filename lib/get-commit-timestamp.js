var getCommitHuman = require('./get-commit-human');

/**
 * Get timestamp for commit
 * 
 * @param {GitCommit} commit
 * @returns {number} commit unix epoch timestamp in milliseconds with time zone offset
 * @private
 */
function getCommitTimeStamp(commit) {
	// get a commiter object from commit object
	var committer = getCommitHuman(commit);
	// calculate the time zone offset in
	return committer.time + committer.tzoff;
}

module.exports = getCommitTimeStamp;
