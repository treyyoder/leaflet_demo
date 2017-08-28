Package.describe({
	name : 'treyyoder:war',
	version : '0.0.1',
	// Brief, one-line summary of the package.
	summary : '',
	// URL to the Git repository containing the source code for this package.
	git : '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation : 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.2');
	api.use('treyyoder:leafnav');
	api.addFiles('images/missle.png');
	api.addFiles('images/nuclearExplosion.png');
	api.addFiles('images/nkflag.png');
	api.addFiles('images/usflag.png');
	api.addFiles('images/srflag.png');
	api.addFiles('war.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('treyyoder:war');
	api.addFiles('war-tests.js');
});
