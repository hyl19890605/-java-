// var Parameter = require('parameter');

// var parameter = new Parameter({
//   translate: function() {
//     var args = Array.prototype.slice.call(arguments);
//     // Assume there have I18n.t method for convert language.
//     return I18n.t.apply(I18n, args);
//   }
// });

// var data = {
//   name: 'foo',
//   age: 24,
//   gender: 'male'
// };

// var rule = {
//   name: 'string',
//   age: 'int',
//   gender: ['male', 'female', 'unknown']
// };

// var errors = parameter.validate(rule, data);


const Controller = require('egg').Controller;

class AAController extends Controller {
//   async index() {
//     this.ctx.body = 'hi, egg';
//   }

* index(ctx) {
    console.log("**************************");
    yield ctx.render('pages/aa');
  }


  * add(ctx) {
    console.log("%%%%%%%%%%%%%%");
       var data={
        aa:ctx.query.aa,
       }

       console.log(data.aa+"&&&&&&&&&&&&&&&");
       //yield ctx.render('pages/bb',ctx.request.body.aa);
      const rule={
        aa:{type:'string',format:/\d+/,message:'必须为数字类型'}

      }
      try{
        ctx.validate(rule,data);
      }catch(err){
        ctx.logger.warn(err.errors);
        console.log(JSON.stringify(err.errors));
        return;
      }

       yield ctx.render('pages/bb');
     }
  
}


module.exports = AAController;