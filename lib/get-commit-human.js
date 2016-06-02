var human = require('git-parse-human');

module.exports = function getCommitHuman(commit) {
	var getter = commit.tagger || commit.author || commit.committer;
	var bound = getter.bind(commit);
	return human(bound());
};
