module.exports = function findIndexByHash(commits, hash) {
  var match = commits.filter(function(commit) {
    return commit.hash === hash;
  })[0];

  if (!match) {
    return -1;
  }

  return commits.indexOf(match);
};
