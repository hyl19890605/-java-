'use strict';

module.exports = (options) => {
  return function* (next) {
		if(this.session.userinfo == null){
			if(this.header.type=='ajax'){
				this.status = 402;
				this.helper.msgFail('请登录！');
				return;
			}else{
				this.redirect('/toLogin');
			}
		}else{
			this.session.save();
		}
    yield next;
  };
};