Package.describe({
	name : 'treyyoder:leafnav',
	version : '0.0.1',
	// Brief, one-line summary of the package.
	summary : '',
	// URL to the Git repository containing the source code for this package.
	git : '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation : 'README.md'
});

Package.onUse(function(api, where) {
	api.versionsFrom('1.1.0.2');
	api.use('fuatsengul:leaflet-routing-machine');
	api.addFiles('leafnav.js', 'client');
	api.addFiles('Marker.NavAids.js', 'client');

});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('treyyoder:leafnav');
	api.addFiles('leafnav-tests.js');
});
