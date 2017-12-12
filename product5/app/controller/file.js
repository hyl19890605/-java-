const Controller = require('egg').Controller;
const FormStream = require('formstream');

class FileController extends Controller {
  async  upload(ctx) {
    const fileStream = await  ctx.getFileStream();
    var form = new FormStream();
  
    form.stream('file', fileStream,fileStream.filename);
    
    const url = "http://192.168.8.154:8080/file/file/upload";
    const result = await  ctx.curl(url, {
      method: 'POST',
      headers: form.headers(),
      stream: form
    });
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }

}
module.exports = FileController;
