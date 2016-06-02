module.exports = function getTags(repository) {
	// Get all references
	return repository.refs(false)
		// Filter for references matching git tag ref paths
		.filter(function(ref){
			return ref.name.indexOf('refs/tags/') === 0;
		})
		// Pick relevant information
		.map(function(tag){
			return {
				name: tag.name.replace(/^refs\/tags\//, ''),
				hash: tag.hash,
				timestamp: null
			};
		});
};
