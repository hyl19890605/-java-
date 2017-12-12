exports.keys = 'hosptail-cookie-secret-key';
exports.view = {
  defaultViewEngine: 'handlebars',
  defaultExtension: '.html',
  mapping: {
    '.html': 'handlebars',
  },
};
exports.static = {
  prefix:'/'
};
exports.middleware = ['aossecurity'];
exports.aossecurity = {
  ignore:/^\/$|^\/login|^\/toLogin|^\/logout/
};
exports.session = {
  key: 'EGG_SESS',
  maxAge: 1800*1000,
  httpOnly: true,
  encrypt: true,
};
exports.redis = {
  client: {
    host: '192.168.8.154',
    port: '6379',
    password: '',
    db: '0',
  },
  agent:true
};

exports.apiUrl="http://localhost:8083";//默认接口地址
exports.loginFailCount=3;//允许失败登录次数，默认3次
exports.loginFailLockSeconds=600;//默认多次登录失败后锁定时间（秒）