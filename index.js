var semver = require('semver');

var findIndexByHash = require('./lib/find-index-by-hash');
var getCommits = require('./lib/get-commits');
var getSemverTags = require('./lib/get-semver-tags');
var loadRepository = require('./lib/load-repository');

/**
 * Get semantic version git tags of repository at process.cwd()
 *
 * @param  {MainCallback} callback function to execute after information retrieval
 */
function gitSemverTags(callback) {
  // Initialize repository
  loadRepository(function(error, repository) {
    if (error) {
      return callback(error);
    }

    // Get a list of commits
    getCommits(repository, function(error, commits) {
      if (error) {
        return callback(error);
      }

      // Get a list of tags matching semver pattern
      var tagNames = getSemverTags(repository)
        .sort(function(aTag, bTag) {
          // if tags reference same hash sort descending by semantic version
          if (aTag.hash === bTag.hash) {
            return semver.compare(bTag.name, aTag.name);
          }

          // sort tags descending by occurence in commits list
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

module.exports = gitSemverTags;

/**
 * Main callback executed after all information has been collected
 *
 * @typedef {function} MainCallback
 * @param {(Error|null)} error - encountered error, if any
 * @param {array} [tags] - semantic git tags of repository at process.cwd()
 */
