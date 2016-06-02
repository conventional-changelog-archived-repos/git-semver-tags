var walk = require('git-walk-refs');

module.exports = function(repository, callback) {
  var commits = [];
  var ended = false;
  var head = repository.refs().map(function(ref) {
    return ref.hash;
  });

  walk(repository.find, head)
    .on('error', function(error) {
      if (!ended) {
        ended = true;
        return callback(error);
      }
    })
    .on('end', function() {
      if (!ended) {
        ended = true;
        return callback(null, commits.reverse());
      }
    })
    .on('data', function(data) {
      if (!ended) {
        commits.push({
          hash: data.hash,
          message: data.message()
        });
      }
    });
};
