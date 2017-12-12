module.exports = app => {
    app.beforeStart(async () => {

      //加载数据字典
      const dicts = ["CHANNEL_TYPE","API_TYPE","SIGN_TYPE","BILL_TYPE","TRADE_STATUS","DOCTOR_TITLE","ROLE_TYPE","DM_XB","DEPT_TYPE","RESOURCE_TYPE","ICON_UNICODE"];
      var dictObj = {};
      for(let i=0;i<dicts.length;i++){
         var dictRes = await app.curl(app.apiUrl+'/sys/dictitem/queryDictItemByDictCode?token=222', {
          method: 'GET',
          dataType: 'json',
          data:{
              code:dicts[i]
          }
        });
        var res = [];
        for(let j=0;j<dictRes.data.data.length;j++){
            res.push({
              itemKey:dictRes.data.data[j].itemKey,
              itemValue:dictRes.data.data[j].itemValue
            });
        }
        app.locals[dicts[i]] = res;
        dictObj[dicts[i]] =res;
      }
      app.locals.DICT_JSON = JSON.stringify(dictObj);
    });

  };