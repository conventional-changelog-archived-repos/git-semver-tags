'use strict';
var assert = require('assert');
var equal = assert.deepEqual;
var findIndexByHash = require('./lib/find-index-by-hash');
var gitSemverTags = require('./');
var shell = require('shelljs');
var writeFileSync = require('fs').writeFileSync;
var gitDummyCommit = require('git-dummy-commit');

shell.config.silent = true;
shell.rm('-rf', 'tmp');
shell.mkdir('tmp');
shell.cd('tmp');
shell.exec('git init');

describe('find-index-by-hash', function() {
  it('should return -1 for an empty array', function() {
    var actual = findIndexByHash([], null);
    var expected = -1;

    equal(actual, expected);
  });

  it('should return the first match index', function() {
    var actual = findIndexByHash([
      {hash: 1},
      {hash: 1}
    ], 1);
    var expected = 0;

    equal(actual, expected);
  });
});

describe('git-semver-tags', function() {
  it('should error if no commits found', function(done) {
    gitSemverTags(function(err) {
      assert(err);

      done();
    });
  });

  it('should get no semver tags', function(done) {
    writeFileSync('test1', '');
    shell.exec('git add --all && git commit -m"First commit"');
    shell.exec('git tag foo');

    gitSemverTags(function(err, tags) {
      equal(tags, []);

      done();
    });
  });

  it('should get the semver tag', function(done) {
    writeFileSync('test2', '');
    shell.exec('git add --all && git commit -m"Second commit"');
    shell.exec('git tag v2.0.0');
    writeFileSync('test3', '');
    shell.exec('git add --all && git commit -m"Third commit"');
    shell.exec('git tag va.b.c');

    gitSemverTags(function(err, tags) {
      equal(tags, ['v2.0.0']);

      done();
    });
  });

  it('should get both semver tags', function(done) {
    shell.exec('git tag v3.0.0');

    gitSemverTags(function(err, tags) {
      equal(tags, ['v3.0.0', 'v2.0.0']);

      done();
    });
  });

  it('should get all semver tags if two tags on the same commit', function(done) {
    shell.exec('git tag v4.0.0');

    gitSemverTags(function(err, tags) {
      equal(tags, ['v4.0.0', 'v3.0.0', 'v2.0.0']);

      done();
    });
  });

  it('should still work if I run it again', function(done) {
    gitSemverTags(function(err, tags) {
      equal(tags, ['v4.0.0', 'v3.0.0', 'v2.0.0']);

      done();
    });
  });

  it('should be in reverse chronological order', function(done) {
    writeFileSync('test4', '');
    shell.exec('git add --all && git commit -m"Fourth commit"');
    shell.exec('git tag v1.0.0');

    gitSemverTags(function(err, tags) {
      equal(tags, ['v1.0.0', 'v4.0.0', 'v3.0.0', 'v2.0.0']);

      done();
    });
  });

  it('should work with prerelease', function(done) {
    writeFileSync('test5', '');
    shell.exec('git add --all && git commit -m"Fifth commit"');
    shell.exec('git tag 5.0.0-pre');

    gitSemverTags(function(err, tags) {
      equal(tags, ['5.0.0-pre', 'v1.0.0', 'v4.0.0', 'v3.0.0', 'v2.0.0']);

      done();
    });
  });

  it('should work with empty commit', function(done) {
    shell.rm('-rf', '.git');
    shell.exec('git init');
    gitDummyCommit('empty commit');
    shell.exec('git tag v1.1.0');
    gitDummyCommit('empty commit2');
    gitDummyCommit('empty commit3');

    gitSemverTags(function(err, tags) {
      equal(tags, ['v1.1.0']);

      done();
    });
  });
});
