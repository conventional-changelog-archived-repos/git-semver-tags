var getCommitHuman = require('./get-commit-human');

module.exports = function getCommitTimeStamp(commit) {
	var committer = getCommitHuman(commit);
	return committer.time + committer.tzoff;
};
