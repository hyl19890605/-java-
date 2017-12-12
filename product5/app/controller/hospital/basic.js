const Controller = require('egg').Controller;
class BasicController extends Controller {
  * toBasic(ctx) {
    yield ctx.render('pages/hospital/basic',ctx.session.userinfo.hospital);
  }

  * update(ctx){
      var data ={
        id:ctx.session.userinfo.hospital.id,
        hospitalName:ctx.request.body.hospitalName,
        hospitalDesc:ctx.request.body.hospitalDesc,
        hospitalAddress:ctx.request.body.hospitalAddress,
        hospitalPhone:ctx.request.body.hospitalPhone,
        addressJd:ctx.request.body.addressJd,
        addressWd:ctx.request.body.addressWd,
        hospitalWebsite:ctx.request.body.hospitalWebsite,
        hospitalImage:ctx.request.body.hospitalImage
      };
      if(data.id==null||data.id==undefined){
        ctx.helper.msgFail('医院的id参数异常！');
        return  false;
      }else if(data.hospitalName==null||data.hospitalName==undefined){
        ctx.helper.msgFail('医院名字参数异常！');
        return false;
      // }else if(data.hospitalDesc==null||data.hospitalDesc==undefined){
      //   ctx.helper.msgFail('医院描述参数异常！');
      //   return false;
      }else if(data.hospitalAddress==null||data.hospitalAddress==undefined){
        ctx.helper.msgFail('医院地址参数异常！');
        return false;
      }else if(data.hospitalPhone==null||data.hospitalPhone==undefined){
        ctx.helper.msgFail('医院号码参数异常！');
        return false;
      }else if(data.hospitalWebsite==null||data.hospitalWebsite==undefined){
        ctx.helper.msgFail('医院网址参数异常！');
        return false;
      }else if(data.hospitalImage==null||data.hospitalImage==undefined){
        ctx.helper.msgFail('医院图片参数异常！');
        return false;
      }else{
        yield ctx.helper.postObj('/pay/zhyyhospital/update',data);
        return true;
      }
    
  }

}
module.exports = BasicController;
