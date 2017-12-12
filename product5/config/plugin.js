exports.handlebars = {
  enable: true,
  package: 'egg-view-handlebars',
  partialsPath:'app/view/partials'
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};