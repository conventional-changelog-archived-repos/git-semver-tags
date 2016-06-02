var semver = require('semver');

var findIndexByHash = require('./lib/find-index-by-hash');
var getCommits = require('./lib/get-commits');
var getSemverTags = require('./lib/get-semver-tags');
var loadRepository = require('./lib/load-repository');

module.exports = function gitSemverTags(callback) {
  loadRepository(function(error, repository) {
    if (error) {
      return callback(error);
    }

    // Get a list of commits
    getCommits(repository, function(error, commits) {
      if (error) {
        return callback(error);
      }

      var tagNames = getSemverTags(repository)
        .sort(function(aTag, bTag) {
          if (aTag.hash === bTag.hash) {
            return semver.compare(bTag.name, aTag.name);
          }

          var aCommit = findIndexByHash(commits, aTag.hash);
          var bCommit = findIndexByHash(commits, bTag.hash);
          return bCommit - aCommit;
        })
        // map out the name
        .map(function(tag) {
          return tag.name;
        });

      return callback(null, tagNames);
    });
  });
};
