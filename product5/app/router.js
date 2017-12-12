
module.exports = app => {
  app.get('/', 'index.toLogin');
  app.get('/toLogin', 'index.toLogin');
  app.get('/toIndex', 'index.index');
  app.post('/login', 'index.login');
  app.get('/logout','index.logout');
  app.get('/home', 'index.home');
  app.get('/toPassword','index.toPassword');
  app.post('/password','index.password');
  app.post('/file/upload','file.upload');

  const routers = [];


  routers.push({pre:["hospital","basic"],methods:["toBasic","update"]});
  routers.push({pre:["hospital","department"],methods:["toPage","page","treeList","toAdd","add","toUpdate","update","delete","excel"]});
  routers.push({pre:["hospital","doctor"],methods:["toPage","page","toAdd","add","toUpdate","update","delete","excel"]});
  routers.push({pre:["hospital","pay"],methods:["toPage","page","toUpdate","toBarCodePay","BarCodePay","toWeiXinCodePay","WeiXinPay","update","delete","excel","toTest","add","toPayCode","queryStatus"]});
  app.parseRouters(routers);
};