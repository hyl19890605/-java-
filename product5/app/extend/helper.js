const Excel = require('exceljs');
const fs = require("fs");
const moment = require('moment');

const alignment = { vertical: 'middle', horizontal: 'center'};
const border = {
  top: {style:'thin', color: {argb:'000000'}},
  left: {style:'thin', color: {argb:'000000'}},
  bottom: {style:'thin', color: {argb:'000000'}},
  right: {style:'thin', color: {argb:'000000'}}
};

module.exports = {
  msgSuccess(msg){
    this.ctx.body={code:0,msg:msg};
  },
  msgFail(msg){
    this.ctx.body={code:1,msg:msg};
  },
  resPage(result) {
    this.ctx.status = result.status;
    this.ctx.set(result.headers);
    this.ctx.body = {
      code:result.data.code,
      msg:result.data.msg,
      count:result.data.data.total,
      data:result.data.data.list  
    };
  },
  resObj(result){
    this.ctx.status = result.status;
    this.ctx.set(result.headers);
    this.ctx.body = result.data;
  },
 * post(url,req){
    req.token = '2222';
    if(url.indexOf('http')==-1){
      return this.ctx.curl(this.app.apiUrl+url, {method: 'POST',data:req,dataType:'json'});
    }else{
      return this.ctx.curl(url, {method: 'POST',data:req,dataType:'json'});
    }
    
  },
 * postPage(url,req){
    req.pageNum = this.ctx.request.body.page;
    req.pageSize = this.ctx.request.body.limit;
    if(req.pageNum&&req.pageSize){
        if(req.pageNum>0&&req.pageSize<=100){
          const res = yield this.post(url,req);
          this.resPage(res);
          return true;
        }else{
          msgFail('分页参数错误');
          return false;
        }
    }
    
  },
  * postObj(url,req){
    const res = yield this.post(url,req);
    this.resObj(res);
  },
  * postExcel(url,req,headers){
      const  locals = this.app.locals;
      const result = yield this.post(url,req);//请求数据
      var workbook = new Excel.Workbook();
      var sheet = workbook.addWorksheet('My Sheet');

      headers.forEach(function(item){
         if(item.style){
            item.style.alignment = {
                vertical:item.style.alignment.vertical||alignment.vertical,
                horizontal:item.style.alignment.horizontal||alignment.horizontal
            };
         }else{
            item.style = {alignment};
         }
      });

      sheet.columns = headers;
      sheet.addRows(result.data.data.list);
      sheet.eachRow(function(row, rowNumber) {
        row.height = 25;
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
          if(rowNumber==1){
            cell.border = border;
            cell.fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:'009688'}
            };
            cell.font = {
                name: 'Arial Black',
                color: { argb: 'ffffff' },
                family: 2,
                size: 12
            };
          }else{
            if(headers[colNumber-1].type){
              if(headers[colNumber-1].type==='date'){//日期处理
                if(cell.value) cell.value = new Date(cell.value);
              }else if(headers[colNumber-1].dict){//字典项处理
                if(cell.value){
                    const items = locals[headers[colNumber-1].dict];
                    for(let i=0;i<items.length;i++){
                        if(cell.value.toString()==items[i].itemValue){
                          cell.value = items[i].itemKey;
                        }
                    }
                }
              }
            }
            cell.border = border;
          }
        });
      });
      
      var fileName = "./tmp/"+moment().format('YYYYMMDDHHmmss')+".xlsx";
      var tmp = fs.createWriteStream(fileName);
      yield workbook.xlsx.write(tmp);
      this.ctx.set('Content-Type', 'application/vnd.openxmlformats');
      this.ctx.set("Content-Disposition", "attachment; filename=export.xlsx");
      this.ctx.body = fs.createReadStream(fileName);
  }
};