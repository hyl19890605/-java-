const Controller = require('egg').Controller;
class IndexController extends Controller {
  * toLogin(ctx) {
    yield ctx.render('pages/login');
  }

  * login(ctx){
     var data ={
        account:ctx.request.body.username,
        password:ctx.request.body.password
    };
    if(!data.account || !data.password){
      ctx.helper.msgFail('登录参数异常！');
      return;
    }
    var failCount =yield ctx.app.redis.get('user-'+data.account+'-count');
    failCount = parseInt(failCount||'0');
    if(failCount>=ctx.app.loginFailCount){
      ctx.helper.msgFail('登录失败次数过多，账户将锁定'+ctx.app.loginFailLockSeconds/60+'分钟！');
      return;
    }

    const result = yield ctx.helper.post('/sys/sys/login',data);
     
    if(result.data.code===0){
         yield ctx.app.redis.set('user-'+data.account+'-count',0,'EX',ctx.app.loginFailLockSeconds);

         var  user = result.data.data;
         const res = yield ctx.helper.post('/sys/sys/getResByUserid',{userid:user.id});
         var resList = res.data;
         if(resList==null || resList.length==0){
            ctx.helper.msgFail('获取权限失败！');
         }else{
            var resMap = {};
            for(var i in resList){
               if(resList[i].id!='0'){
                  resMap[resList[i].id] = resList[i];
               }
            }
            var resources = [];
            for(var i in resList){
                  var id = resList[i].id;
                  if(resMap[resList[i].pid] && resList[i].id != resList[i].pid){
                      if(!resMap[resList[i].pid].children) resMap[resList[i].pid].children=[];
                      resMap[resList[i].pid].children.push(resList[i]);
                  }else{
                    if(resList[i].id!=0)
                      resources.push(resList[i]);
                  }
            }
            user.resources = resources;

            const hospitalRes = yield ctx.helper.post('/pay/zhyyhospital/get',{deptId:user.deptId});
            user.hospital = hospitalRes.data.data;
            ctx.session.userinfo =user;
            ctx.helper.msgSuccess('登录成功！');
         }
     }else{
        yield ctx.app.redis.set('user-'+data.account+'-count',++failCount,'EX',ctx.app.loginFailLockSeconds);
        ctx.session=null;
        ctx.body = result.data;
     }
  }

  * toPassword(ctx){
    yield ctx.render('pages/password');
  }

  * password(ctx){
    var data ={
      oldPassword:ctx.request.body.oldPassword,
      newPassword:ctx.request.body.newPassword,
      newPassword1:ctx.request.body.newPassword1,
      userId:ctx.session.userinfo.id
    }
    if(data.oldPassword && data.newPassword && data.newPassword1 && data.userId){
      if(data.oldPassword===data.newPassword){
        ctx.helper.msgFail('新密码不能同旧密码一样！');
      }else if(data.newPassword != data.newPassword1){
        ctx.helper.msgFail('密码不一致！');
      }else{
        const result = yield ctx.helper.post('/sys/sys/password',data);
        if(result.data.code===0){
          ctx.helper.msgSuccess('修改成功！');
        }else{
          ctx.helper.msgFail('修改失败！');
        }
      }
    }else{
      ctx.helper.msgFail('参数异常！');
    }
  }

 * logout(ctx){
      ctx.session=null;
      ctx.redirect("toLogin");
   }

 * index(ctx) {
    yield ctx.render('pages/index',ctx.session.userinfo);
  }

  * home(ctx) {
    yield ctx.render('pages/home');
  }

}
module.exports = IndexController;
