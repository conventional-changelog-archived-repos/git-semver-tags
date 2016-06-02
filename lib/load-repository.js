var path = require('path');
var gitFsRepo = require('git-fs-repo');

module.exports = function loadRepository(callback) {
	var gitDirectory = path.join(process.cwd(), '.git');

	gitFsRepo(gitDirectory, function(error, gitRepository) {
		if (error) {
			return callback(error);
		}

		// check if repository has at least one commit
		var head = gitRepository.ref('HEAD');

		if (!head) {
			var headErrors = new Error('Git repository has no HEAD, are there any commits?');
			return callback(headErrors);
		}

		callback(null, gitRepository);
	});
};
