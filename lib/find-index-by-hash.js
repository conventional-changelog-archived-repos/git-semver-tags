/**
 * Find index of item with item.hash === hash
 *
 * @param {array} commits haystack of commits to search in
 * @param {string} hash hash to match commits against
 * @private
 */
function findIndexByHash(commits, hash) {
  // Get first commit matching hash
  var match = commits.filter(function(commit) {
    return commit.hash === hash;
  })[0];

  // No index to find if no match was found
  if (!match) {
    return -1;
  }

  // Return the index of match in haystack
  return commits.indexOf(match);
}

module.exports = findIndexByHash;
