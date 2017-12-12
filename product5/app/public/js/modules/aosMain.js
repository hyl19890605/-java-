
var toggleFullScreen,$, element, form, laydate,aosCore,table,laytpl,layer,upload;

layui.define(['element', 'form', 'laydate', 'aosCore','table','upload'], function(exports) {
	
	// 全局变量赋值
	$ = layui.jquery
	,element = layui.element
	,form = layui.form
	,layer= layui.layer
	,laydate = layui.laydate
	// admin模块
	,aosCore = layui.aosCore
	,table = layui.table
	,laytpl = layui.laytpl
	,upload = layui.upload
	,side = $('.layui-side')
    ,body = $('.layui-body,.layui-footer');


	form.verify({
		userName: function(value, item){ //value：表单的值、item：表单的DOM对象
		  if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
			return '用户名不能有特殊字符';
		  }
		  if(/(^\_)|(\__)|(\_+$)/.test(value)){
			return '用户名首尾不能出现下划线\'_\'';
		  }
		  if(/^\d+\d+\d$/.test(value)){
			return '用户名不能全为数字';
			}
			if(value.length>30){
				return '用户名不能超过30个字';
			}
		},
		account: function(value, item){ //value：表单的值、item：表单的DOM对象
			if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
			  return '账户不能有特殊字符';
			}
			if(/(^\_)|(\__)|(\_+$)/.test(value)){
			  return '账户首尾不能出现下划线\'_\'';
			}
			if(/^\d+\d+\d$/.test(value)){
			  return '账户不能全为数字';
			}
			if(value.length>50){
				return '账户不能超过50个字';
			}
		  },
		deptName:function(value, item){ //value：表单的值、item：表单的DOM对象
			if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
			  return '部门名字不能有特殊字符';
			}
			if(/(^\_)|(\__)|(\_+$)/.test(value)){
			  return '部门名字首尾不能出现下划线\'_\'';
			}
			if(/^\d+\d+\d$/.test(value)){
			  return '部门名字不能全为数字';
			}
			if(value.length>50){
			  return '部门名字不能超过50个字';
			}
		  },
		  roleName:function(value, item){ //value：表单的值、item：表单的DOM对象
			if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
			  return '角色名称不能有特殊字符';
			}
			if(/(^\_)|(\__)|(\_+$)/.test(value)){
			  return '角色名称首尾不能出现下划线\'_\'';
			}
			if(/^\d+\d+\d$/.test(value)){
			  return '角色名称不能全为数字';
			}
			if(value.length>100){
			  return '角色名字不能超过100个字';
			}
		  },
		  resName:function(value, item){ //value：表单的值、item：表单的DOM对象
			if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
			  return '资源名称不能有特殊字符';
			}
			if(/(^\_)|(\__)|(\_+$)/.test(value)){
			  return '资源名称首尾不能出现下划线\'_\'';
			}
			if(/^\d+\d+\d$/.test(value)){
			  return '资源名称不能全为数字';
			}
			if(value.length>100){
			  return '资源名字不能超过100个字';
			}
		  },
		  name:function(value, item){ //value：表单的值、item：表单的DOM对象
			if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
			  return '字典名称不能有特殊字符';
			}
			if(/(^\_)|(\__)|(\_+$)/.test(value)){
			  return '字典名称首尾不能出现下划线\'_\'';
			}
			if(/^\d+\d+\d$/.test(value)){
			  return '字典名称不能全为数字';
			}
			if(value.length>100){
			  return '字典名字不能超过100个字';
			}
			},
			hospitalName:function(value, item){ //value：表单的值、item：表单的DOM对象
				if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
					return '医院名称不能有特殊字符';
				}
				if(/(^\_)|(\__)|(\_+$)/.test(value)){
					return '医院名称首尾不能出现下划线\'_\'';
				}
				if(/^\d+\d+\d$/.test(value)){
					return '医院名称不能全为数字';
				}
				if(value.length>100){
					return '医院名字不能超过100个字';
				}
				},
				hospitalAddress:function(value, item){ //value：表单的值、item：表单的DOM对象
					if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
						return '医院地址不能有特殊字符';
					}
					if(/(^\_)|(\__)|(\_+$)/.test(value)){
						return '医院地址首尾不能出现下划线\'_\'';
					}
					if(/^\d+\d+\d$/.test(value)){
						return '医院地址不能全为数字';
					}
					if(value.length>100){
						return '医院地址不能超过100个字';
					}
					},
					hospitalPhone:function(value,item){
							var isMobile=/^([0-9]{3,4}-)?[0-9]{7,8}$/;
							var isPhone=/^1[3|4|5|7|8][0-9]{9}$/;
							if(isMobile.test(value)||isPhone.test(value)){
								
							}else{
								return '医院电话不是正确的固定电话格式或手机格式';
							}
							
					},
				 hospitalWebsite:function(value,item){
						if(!new RegExp("[a-zA-z]+://[^/s]*").test(value)){
							return '医院官网的网址格式必须是正确的网址格式';
						}
					},
					hospitalImage:function(value,item){
						if(!new RegExp("[a-zA-z]+://[^/s]*").test(value)){
							return '医院图片上传的地址格式不对，请重新上传';
						}
					},
					doctorName: function(value, item){ //value：表单的值、item：表单的DOM对象
						if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
						return '医生名字不能有特殊字符';
						}
						if(/(^\_)|(\__)|(\_+$)/.test(value)){
						return '医生名字首尾不能出现下划线\'_\'';
						}
						if(/^\d+\d+\d$/.test(value)){
						return '医生名字不能全为数字';
						}
						if(value.length>300){
							return '医生名字不能超过300个字';
						}
					},
					doctorExpertise:function(value, item){ //value：表单的值、item：表单的DOM对象
						// if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
						// return '医生擅长不能有特殊字符';
						// }
						if(/(^\_)|(\__)|(\_+$)/.test(value)){
						return '医生擅长首尾不能出现下划线\'_\'';
						}
						if(/^\d+\d+\d$/.test(value)){
						return '医生擅长不能全为数字';
						}
						if(value.length>200){
							return '医生擅长不能超过200个字';
						}
					},
					doctorDesc:function(value, item){ //value：表单的值、item：表单的DOM对象
						// if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
						// return '医生简介不能有特殊字符';
						// }
						if(/(^\_)|(\__)|(\_+$)/.test(value)){
						return '医生简介首尾不能出现下划线\'_\'';
						}
						if(/^\d+\d+\d$/.test(value)){
						return '医生简介不能全为数字';
						}
						if(value.length>2000){
							return '医生简介不能超过2000个字';
						}
					},
					doctorPhoto:function(value,item){
						if(!new RegExp("[a-zA-z]+://[^/s]*").test(value)){
							return '医生照片上传的地址格式不对，请重新上传';
						}
					},
					deptImage:function(value,item){
						if(!new RegExp("[a-zA-z]+://[^/s]*").test(value)){
							return '科室图片上传的地址格式不对，请重新上传';
						}
					},
					deptDesc:function(value, item){ //value：表单的值、item：表单的DOM对象
						// if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
						// return '科室描述不能有特殊字符';
						// }
						if(/(^\_)|(\__)|(\_+$)/.test(value)){
						return '科室描述首尾不能出现下划线\'_\'';
						}
						if(/^\d+\d+\d$/.test(value)){
						return '科室描述不能全为数字';
						}
						if(value.length>1000){
							return '科室描述不能超过1000个字';
						}
					},
		//我们既支持上述函数式的方式，也支持下述数组的形式
		//数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
		password: function(value,item){
			if(!new RegExp("^[A-Za-z]{1}([A-Za-z0-9]|[._]){5,19}$").test(value)){
				return '密码是否由6-20位的字母、数字、下划线和点组成';
			}
		},

	  });   
	 function navHide(t) {
        var time = t ? t : 50;
        side.animate({'left': -200}, time);
        body.animate({'left': 0}, time);
    };

    function navShow(t) {
        var time = t ? t : 50;
        side.animate({'left': 0}, time);
        body.animate({'left': 200}, time);
    };
	
	$('.btn-nav').on('click', function () {
		if(side.position().left==-200){
			$(this).removeClass("open");
			navShow(50);
		}else{
			$(this).addClass("open");
			navHide(50);
		}
    });

	function getCookie(cname) {  
		var name = cname + "=";  
		var ca = document.cookie.split(';');  
		for(var i=0; i<ca.length; i++) {  
			var c = ca[i];  
			while (c.charAt(0)==' ') c = c.substring(1);  
			if (c.indexOf(name) != -1) return c.substring(name.length, c.length);  
		}  
		return "";  
	}

	function csrfSafeMethod(method) {
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}

	$.ajaxSetup({
		cache: false,
		beforeSend: function(xhr, settings) {
			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
				xhr.setRequestHeader('x-csrf-token', getCookie('csrfToken'));
			}
		},
		headers:{
			"type":"ajax"
		},
		complete: function(jqXHR, textStatus, errorMsg){
			if(jqXHR.status==402){
				layer.alert('未登录或长时间未操作，请重新登录！', function(index){
					layer.close(index);
					window.location.href="/toLogin";
				}); 
			}
    	}
	});

	layer.config({
		skin: 'layui-layer-molv'
	});

	table.set({
		limits: [5,10,20,50,100]
  		,limit:10
	});
	// 初始化UrlHash
	aosCore.initUrlHash();
	
	// 监听导航变动
	element.on('nav(navBar)', function(elem) {
		aosCore.initNavForTabUrlHash($(this), elem);
	});

	// 监听tab变动
	element.on('tab(tabMain)', function(data) {
		aosCore.setHashByLayId();
	});
	
	exports('aosMain', {
		// 初始化
		init: function() {
			aosCore.homePageTpl();
			toggleFullScreen = aosCore.toggleFullScreen;
		}
	});
});
