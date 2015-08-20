'use strict';
var exec = require('child_process').exec;
var semverValid = require('semver').valid;
var cmd = 'git tag --sort version:refname';

module.exports = function(callback) {
  exec(cmd, function(err, data) {
    if (err) {
      callback(err);
      return;
    }

    var tags = [];
    var tag;
    var splittedData = data.split('\n');
    var i;

    for (i = splittedData.length - 1; i >= 0 ; i--) {
      tag = splittedData[i];
      if (semverValid(tag)) {
        tags.push(tag);
      }
    }

    callback(null, tags);
  });
};
