// 'use strict';

// module.exports = appInfo => {
//   // const config = exports = {};

//   // // use for cookie sign key, should change to your own and keep security
//   // config.keys = appInfo.name + '_1511157322096_2613';

//   // // add your config here
//   // config.middleware = [];

//   // return config;

// // config/config.default.js
// const path = require('path');
// module.exports = appInfo => {
//   const config = {};
//   config.view = {
//     root: [
//       path.join(appInfo.baseDir, 'app/view'),
//       path.join(appInfo.baseDir, 'path/to/another'),
//     ].join(',')
//   };
//   return config;
// };
 

// };
exports.keys = 'my-cookie-secret-key';
exports.view = {
  defaultViewEngine: 'nunjucks',
  defaultExtension: '.html',
  mapping: {
    '.html': 'nunjucks',
  },
};
exports.static = {
  prefix:'/'
};
// exports.security = {
//   xframe: {
//     enable: false,
//   },
// };