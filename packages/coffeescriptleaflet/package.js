Package.describe({
  name: 'treyyoder:coffeescriptleaflet',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('coffeescriptleaflet.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('treyyoder:coffeescriptleaflet');
  api.addFiles('coffeescriptleaflet-tests.js');
});
