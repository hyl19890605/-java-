const Controller = require('egg').Controller;
class DepartmentController extends Controller {
  * toPage(ctx) {
    yield ctx.render('pages/hospital/department-page');
  }

  * page(ctx) {
    var req = {
      id:ctx.request.body.id||0,
      hospitalId:ctx.session.userinfo.hospital.id,
      deptName:ctx.request.body.deptName
    };
    yield ctx.helper.postPage('/pay/zhyydept/treePage',req);
  }

  * treeList(ctx) {
    var data = {
      id:0,
      hospitalId:ctx.session.userinfo.hospital.id
    };
    yield ctx.helper.postObj('/pay/zhyydept/treeList',data);
  }

  * toAdd(ctx) {
    yield ctx.render('pages/hospital/department-add');
  }

  * add(ctx) {
      var data ={
        hospitalId:ctx.session.userinfo.hospital.id,
        pid:ctx.request.body.pid,
        deptName:ctx.request.body.deptName,
        deptDesc:ctx.request.body.deptDesc,
        deptImage:ctx.request.body.deptImage,
        sortNo:ctx.request.body.sortNo
      };
      if(data.hospitalId==null||data.hospitalId==undefined){
        ctx.helper.msgFail('医院的id参数异常！');
        return  false;
      }else if(data.pid==null||data.pid==undefined){
        ctx.helper.msgFail('部门的父节点参数异常！');
        return  false;
      }else if(data.deptName==null||data.deptName==undefined){
        ctx.helper.msgFail('部门的名字参数异常！');
        return  false;
      }else if(data.deptDesc==null||data.deptDesc==undefined){
        ctx.helper.msgFail('部门的描述参数异常！');
        return  false;
      }else if(data.deptImage==null||data.deptImage==undefined){
        ctx.helper.msgFail('部门的图片参数异常！');
        return  false;
      }else if(data.sortNo==null||data.sortNo==undefined){
        ctx.helper.msgFail('部门的排列序号参数异常！');
        return  false;
      }else {
        yield ctx.helper.postObj('/pay/zhyydept/insert',data);
        return true;
      }
     
  }

  * toUpdate(ctx){
    var data ={
      id:ctx.query.id
    };
    const result = yield ctx.helper.post('/pay/zhyydept/get',data);
    yield ctx.render('pages/hospital/department-add',result.data.data);
  }

  * update(ctx){
      var data ={
        id:ctx.request.body.id,
        pid:ctx.request.body.pid,
        deptName:ctx.request.body.deptName,
        deptDesc:ctx.request.body.deptDesc,
        deptImage:ctx.request.body.deptImage,
        sortNo:ctx.request.body.sortNo
      };
      if(data.id==null||data.id==undefined){
        ctx.helper.msgFail('部门的id参数异常！');
        return  false;
      }else if(data.pid==null||data.pid==undefined){
        ctx.helper.msgFail('部门的父节点参数异常！');
        return  false;
      }else if(data.deptName==null||data.deptName==undefined){
        ctx.helper.msgFail('部门的名字参数异常！');
        return  false;
      }else if(data.deptDesc==null||data.deptDesc==undefined){
        ctx.helper.msgFail('部门的描述参数异常！');
        return  false;
      }else if(data.deptImage==null||data.deptImage==undefined){
        ctx.helper.msgFail('部门的图片参数异常！');
        return  false;
      }else if(data.sortNo==null||data.sortNo==undefined){
        ctx.helper.msgFail('部门的排列序号参数异常！');
        return  false;
      }else {
        yield ctx.helper.postObj('/pay/zhyydept/update',data);
        return true;
      }
  }

  * delete(ctx) {
      var data ={
        id:ctx.request.body.id
      };
      yield ctx.helper.postObj('/pay/zhyydept/delete',data);
  }

  * excel(ctx){
    var data = {
      id:ctx.request.body.id||0,
      hospitalId:ctx.session.userinfo.hospital.id,
      deptName:ctx.request.body.deptName,
      pageNum:0,
      pageSize:0
    };
    var headers =[
          { header: '科室名称', key:'deptName', width:20 },
          { header: '上级科室', key:'parentName', width:20},
          { header: '科室描述', key:'deptDesc', width:20},
          { header: '科室图片', key:'deptImage', width:20}
    ];
    yield ctx.helper.postExcel('/pay/zhyydept/treePage',data,headers);
  }
}
module.exports = DepartmentController;
