const Controller = require('egg').Controller;
class DoctorController extends Controller {
  * toPage(ctx) {
    yield ctx.render('pages/hospital/doctor-page');
  }

  * page(ctx) {
    var req = {
      hospitalId:ctx.session.userinfo.hospital.id,
      doctorName:ctx.request.body.doctorName
    };
    yield ctx.helper.postPage('/pay/zhyydoctor/page',req);
  }


  * toAdd(ctx) {
    yield ctx.render('pages/hospital/doctor-add');
  }

  * add(ctx) {
      var data ={
        hospitalId:ctx.session.userinfo.hospital.id,
        doctorName:ctx.request.body.doctorName,
        doctorDuty:ctx.request.body.doctorDuty,
        deptId:ctx.request.body.deptId,
        doctorExpertise:ctx.request.body.doctorExpertise,
        doctorDesc:ctx.request.body.doctorDesc,
        doctorPhoto:ctx.request.body.doctorPhoto,
        sortNo:ctx.request.body.sortNo,
        doctorSex:ctx.request.body.doctorSex
      };
      if(data.hospitalId==null||data.hospitalId==undefined){
        ctx.helper.msgFail('医院的id参数异常！');
        return  false;
      }else if(data.doctorName==null||data.doctorName==undefined){
        ctx.helper.msgFail('医生名字参数异常！');
        return  false;
      }else if(data.doctorDuty==null||data.doctorDuty==undefined){
        ctx.helper.msgFail('医生职称参数异常！');
        return  false;
      }else if(data.deptId==null||data.deptId==undefined){
        ctx.helper.msgFail('部门id参数异常！');
        return  false;
      }else if(data.doctorExpertise==null||data.doctorExpertise==undefined){
        ctx.helper.msgFail('医生擅长参数异常！');
        return  false;
      }else if(data.doctorDesc==null||data.doctorDesc==undefined){
        ctx.helper.msgFail('医生简介参数异常！');
        return  false;
      }else if(data.doctorPhoto==null||data.doctorPhoto==undefined){
        ctx.helper.msgFail('医生照片参数异常！');
        return  false;
      }else if(data.sortNo==null||data.sortNo==undefined){
        ctx.helper.msgFail('医生排序号参数异常！');
        return  false;
      }else if(data.doctorSex==null||data.doctorSex==undefined){
        ctx.helper.msgFail('医生的性别参数异常！');
        return false;
      }else{
        yield ctx.helper.postObj('/pay/zhyydoctor/insert',data);
        return true;
      }
      
  }

  * toUpdate(ctx){
    var data ={
      id:ctx.query.id
    };
    const result = yield ctx.helper.post('/pay/zhyydoctor/get',data);
    yield ctx.render('pages/hospital/doctor-add',result.data.data);
  }

  * update(ctx){
      var data ={
        id:ctx.request.body.id,
        doctorName:ctx.request.body.doctorName,
        doctorDuty:ctx.request.body.doctorDuty,
        deptId:ctx.request.body.deptId,
        doctorExpertise:ctx.request.body.doctorExpertise,
        doctorDesc:ctx.request.body.doctorDesc,
        doctorPhoto:ctx.request.body.doctorPhoto,
        sortNo:ctx.request.body.sortNo,
        doctorSex:ctx.request.body.doctorSex
      };
      if(data.id==null||data.id==undefined){
        ctx.helper.msgFail('医生的id参数异常！');
        return  false;
      }else if(data.doctorName==null||data.doctorName==undefined){
        ctx.helper.msgFail('医生名字参数异常！');
        return  false;
      }else if(data.doctorDuty==null||data.doctorDuty==undefined){
        ctx.helper.msgFail('医生职称参数异常！');
        return  false;
      }else if(data.deptId==null||data.deptId==undefined){
        ctx.helper.msgFail('部门id参数异常！');
        return  false;
      }else if(data.doctorExpertise==null||data.doctorExpertise==undefined){
        ctx.helper.msgFail('医生擅长参数异常！');
        return  false;
      }else if(data.doctorDesc==null||data.doctorDesc==undefined){
        ctx.helper.msgFail('医生简介参数异常！');
        return  false;
      }else if(data.doctorPhoto==null||data.doctorPhoto==undefined){
        ctx.helper.msgFail('医生照片参数异常！');
        return  false;
      }else if(data.sortNo==null||data.sortNo==undefined){
        ctx.helper.msgFail('医生排序号参数异常！');
        return  false;
      }else if(data.doctorSex==null||data.doctorSex==undefined){
        ctx.helper.msgFail('医生的性别参数异常！');
        return false;
      }else{
        yield ctx.helper.postObj('/pay/zhyydoctor/update',data);
        return true;
      }
   
  }

  * delete(ctx) {
      var data ={
        id:ctx.request.body.id
      };
      yield ctx.helper.postObj('/pay/zhyydoctor/delete',data);
  }

  * excel(ctx){
    var data = {
      hospitalId:ctx.session.userinfo.hospital.id,
      doctorName:ctx.request.body.doctorName,
      pageNum:0,
      pageSize:0
    };
    var headers =[
          { header: '姓名', key:'doctorName', width:20 },
          { header: '职称', key:'doctorDuty', width:20},
          { header: '擅长', key:'doctorExpertise', width:20},
          { header: '照片', key:'doctorPhoto', width:20}
    ];
    yield ctx.helper.postExcel('/pay/zhyydoctor/page',data,headers);
  }
}
module.exports = DoctorController;
