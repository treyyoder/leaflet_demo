Package.describe({
	name : 'treyyoder:atc',
	version : '0.0.1',
	summary : 'Air Traffic Simulator using Leaflet and treyyoder:leafnav',
	// URL to the Git repository containing the source code for this package.
	git : '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation : 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.2');
	api.use('treyyoder:leafnav');
	api.addFiles('images/plane.png');
	api.addFiles('atc.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('treyyoder:atc');
	api.addFiles('atc-tests.js');
});