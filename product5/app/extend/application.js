const APIURL = Symbol('Application#apiUrl');//接口地址
const LOGINFAILCOUNT = Symbol('Application#loginFailCount');//允许登录失败次数
const LOGINFAILLOCKSECONDS = Symbol('Application#loginFailLockSeconds');//多次登录失败账户锁定时间（秒）
module.exports = {
  get apiUrl() {
    if (!this[APIURL]) {
      if(this.config.apiUrl){
         this[APIURL] = this.config.apiUrl;
      }
    }
    return this[APIURL];
  },get loginFailCount() {
    if (!this[LOGINFAILCOUNT]) {
      if(this.config.loginFailCount){
         this[LOGINFAILCOUNT] = this.config.loginFailCount;
      }
    }
    return this[LOGINFAILCOUNT];
  },get loginFailLockSeconds() {
    if (!this[LOGINFAILLOCKSECONDS]) {
      if(this.config.loginFailLockSeconds){
         this[LOGINFAILLOCKSECONDS] = this.config.loginFailLockSeconds;
      }
    }
    return this[LOGINFAILLOCKSECONDS];
  },parseRouters(routers){
    for(var i in routers){
        const router = routers[i];
        for(var j in router.methods){
            if(router.methods[j].indexOf("to")==0){
                this.get("/"+router.pre.join("/")+"/"+router.methods[j],router.pre.join(".")+"."+router.methods[j]);
            }else{
                this.post("/"+router.pre.join("/")+"/"+router.methods[j],router.pre.join(".")+"."+router.methods[j]);
            }
        }
    }
  }
};