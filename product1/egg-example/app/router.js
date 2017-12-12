'use strict';

module.exports = app => {
 // app.get('/', app.controller.home.index);
 app.get('/', app.controller.aa.index);

  //app.router.redirect('/',"pages/aa.html");
  app.get('/add', app.controller.aa.add);
  
};
