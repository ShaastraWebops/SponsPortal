/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/categorys', require('./api/category'));
  app.use('/api/sponsors', require('./api/sponsor'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/uploads', require('./api/upload'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      // console.log(app.get('appPath'));
      // res.sendfile(app.get('appPath') + '/index.html');
      res.sendFile('index.html', { root: app.get('appPath') });
    });
};
