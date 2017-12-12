const Controller = require('egg').Controller;
const qr = require('qr-image');
class PayController extends Controller {
  * toPage(ctx) {
    yield ctx.render('pages/hospital/pay-page');
  }

  * page(ctx) {
    var req = {
      hospitalId:ctx.session.userinfo.hospitalId,
      channelType:ctx.request.body.channelType,
      billType:ctx.request.body.billType,
      outTradeStatus:ctx.request.body.outTradeStatus
    };
    yield ctx.helper.postPage('/pay/zhyybill/page',req);
  }

  * toUpdate(ctx){
    var data ={
      id:ctx.query.id
    };
    const result = yield ctx.helper.post('/pay/zhyybill/get',data);
    yield ctx.render('pages/hospital/pay-add',result.data.data);
  }

  * update(ctx){
      var data ={
        id:ctx.request.body.id,
        channelType:ctx.request.body.channelType,
        totalAmount:ctx.request.body.totalAmount
      };
    yield ctx.helper.postObj('/pay/zhyybill/update',data);
  }

  * delete(ctx) {
      var data ={
        id:ctx.request.body.id
      };
      yield ctx.helper.postObj('/pay/zhyybill/delete',data);
  }

  * excel(ctx){
    var data = {
      hospitalId:ctx.session.userinfo.hospitalId,
      channelType:ctx.request.body.channelType,
      billType:ctx.request.body.billType,
      outTradeStatus:ctx.request.body.outTradeStatus,
      pageNum:0,
      pageSize:0
    };
    var headers =[
          { header: '流水号', key:'outTradeNo', width:20 },
          { header: '订单号', key:'tradeNo', width:20},
          { header: '账单类型', key:'billType', width:20,type:'dict',dict:'BILL_TYPE'},
          { header: '医院名称', key:'hospitalId', width:20},
          { header: '金额', key:'tradeAmount', width:20},
          { header: '回填金额', key:'totalAmount', width:20},
          { header: '交易时间', key:'tradeTime', width:20,type:'date'},
          { header: '创建时间', key:'tradeCreateTime', width:20,type:'date'},
          { header: '交易状态', key:'outTradeStatus', width:20,type:'dict',dict:'TRADE_STATUS'}
    ];
    yield ctx.helper.postExcel('/pay/zhyybill/page',data,headers);
  }

  * toTest(ctx) {
    yield ctx.render('pages/hospital/pay-add');
  }

  * toBarCodePay(ctx){
    var data ={
      id:ctx.query.id
    };
    const result = yield ctx.helper.post('/pay/zhyybill/get',data);
    yield ctx.render('pages/hospital/pay-barCodePay',result.data.data);
  }

  * BarCodePay(ctx){
    var data ={
      id:ctx.request.body.id,
      hospitalId:ctx.request.body.hospitalId,
      totalAmount:ctx.request.body.totalAmount,
      channelType:ctx.request.body.channelType,
      billType:ctx.request.body.billType,
      authCode:ctx.request.body.authCode,
      payType:1  
    };
    yield ctx.helper.postObj('/pay/alipay/billtest',data);
  }

  * toWeiXinCodePay(ctx){
    var data ={
      id:ctx.query.id
    };
    const result = yield ctx.helper.post('/pay/zhyybill/get',data);
    yield ctx.render('pages/hospital/pay-weiXinPay',result.data.data);
  } 

  * WeiXinPay(ctx){
    var data ={
      id:ctx.request.body.id,
      hospitalId:ctx.request.body.hospitalId,
      totalAmount:ctx.request.body.totalAmount,
      channelType:ctx.request.body.channelType,
      billType:ctx.request.body.billType,
      authCode:ctx.request.body.authCode,
      payType:2
    };
    yield ctx.helper.postObj('/pay/pay/billtest',data);
  }

  * add(ctx){
      var data ={
        hospitalId:ctx.request.body.hospitalId,
        totalAmount:ctx.request.body.totalAmount,
        channelType:ctx.request.body.channelType,
        billType:ctx.request.body.billType,
        //authCode:ctx.request.body.authCode
      };
     
     yield ctx.helper.postObj('/pay/alipay/billtest',data);
  }

  * toPayCode(ctx){
    var url = ctx.query.url;
    var img = qr.image(url,{size :10});
    ctx.body = img;
  }

  * queryStatus(ctx){
    var data ={
      outTradeNo:ctx.request.body.outTradeNo
    };
    yield ctx.helper.postObj('/pay/pay/queryTradeStatus',data);
  }

}
module.exports = PayController;
