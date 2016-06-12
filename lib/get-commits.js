var walk = require('git-walk-refs');

/**
 * Get commits for repository in reverse chronological order
 *
 * @param  {!GitRepository} repository git repository
 * @param  {!CommitsCallback} callback function to execute after information retrieval
 * @private
 */
function getCommits(repository, callback) {
  var commits = []; // results array

  // Get an array of refs
  var head = repository.refs().map(function(ref) {
    return ref.hash;
  });

  // Walk the git history for each ref
  walk(repository.find, head)
    .on('error', callback)
    .on('end', function() {
      // return list in inverse chronological order
      return callback(null, commits.reverse());
    })
    .on('data', function(data) {
      // add commit entry to results array
      commits.push({
        hash: data.hash,
        message: data.message()
      });
    });
}

module.exports = getCommits;
/**
 * @callback CommitsCallback
 * @param {?Error} error error encountered if any
 * @param {GitCommit[]} [commits] commits in inverse chronological order
 * @private
 */

/**
 * @typedef GitCommit
 * @property {function?} author
 * @property {function?} committer
 * @property {function?} tagger
 * @property {!string} hash
 * @see https://github.com/chrisdickinson/git-walk-refs
 * @private
 */
