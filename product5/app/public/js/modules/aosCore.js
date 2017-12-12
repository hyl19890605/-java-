layui.define(['layer', 'element','form','tree'], function(exports) {
    var $ = layui.jquery
        ,layer = layui.layer
        ,element = layui.element
        ,form = layui.form
        ,tree = layui.tree;
     
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o){
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    }

    exports('aosCore', {
        // 首页默认加载解析
        homePageTpl: function() {
            $('#main').find('.layui-tab-item').eq(0).load('home?v=' + new Date().getTime());
        }
        /**
         * @param  {url}      需要解析的模板Url地址
         * @param  {title}    窗口标题
         * @param  {width}    窗口宽度
         * @param  {height}   窗口高度
         * @return {[type]}
         */
        ,openClickLayerPage: function(url, title, width, height) {
            var _width = width ? width + 'px' : 'auto';
            var _height = height ? height + 'px' : 'auto';
            $.ajax({
                url:url,
                success:function(tplContent,status){
                    layer.open({
                        type: 1
                        ,anim: 0
                        ,maxmin: true
                        ,area: [_width, _height]
                        ,title: title
                        ,content: tplContent
                    });
                },
                error:function(){
                    layer.alert("页面不存在！");
                }
            });
        }
        /**
         * 导航加载解析
         * @param  {url}      需要解析的模板Url地址
         * @param  {filter}   监听的Tab-filter属性
         * @param  {title}    tab标签名字
         * @param  {layId}    tab对应的lay-id
         * @return {[type]}
         */
        ,reloadTpl: function(url, filter, title, layId) {
            $.ajax({
                url:url,
                success:function(tpl,status){
                    element.tabAdd(filter, {
                        title: title,
                        content: tpl,
                        id: layId
                    });
                    element.tabChange(filter, layId);
                },
                error:function(xhr,status,error){
                    if(error && "Not Found"==error){
                        layer.alert("功能开发中...");
                    }else{
                        layer.alert("系统发生异常！");
                    }
                }
            });
        }
        // 刷新浏览器历史，去除hash
        ,reloadHistory: function(callback) {
            history.replaceState(null, '', location.pathname + location.search);
            callback && callback();
        }
        ,initUrlHash: function() {
            var _hash = location.hash;
            var _findLayNavUrlHash = $('[data-hash="' + _hash.replace('#', '') + '"]');

            if (_hash && _findLayNavUrlHash.length > 0) {

                var _url = _findLayNavUrlHash.data('url') + '?v=' + new Date().getTime();
                var _title = _findLayNavUrlHash.find('span').text();
                var _layId = _findLayNavUrlHash.data('id');

                aosCore.reloadTpl(_url, 'tabMain', _title, _layId);
            }
        }
        /**
         * 初始化设置导航链接Tab的Hash值
         * @param  {_this}      当前导航
         * @param  {elem}       elem
         * @return {[type]}
         */
        ,initNavForTabUrlHash: function(_this, elem) {
            var url = _this.data('url') + '?v=' + new Date().getTime();
            var urlHash = _this.data('hash');
            var title = elem.find('span').text();
            var layId = elem.attr('data-id');
            var isTabShow = $('#tabBody').children('li[lay-id="' + layId + '"]').length;            
            if (!isTabShow) {
                aosCore.reloadTpl(url, 'tabMain', title, layId);
            }

            element.tabChange('tabMain', layId);
            aosCore.reloadHistory(function(){
                location.hash = urlHash;
            });
        }
        // 根据lay-id找到导航对应的hash
        ,setHashByLayId: function() {
            var _findLayId = $('.layui-tab-title').find('.layui-this').attr('lay-id');
            var _findUrlHash = $('.layui-nav-item').find('dd[data-id="' + _findLayId + '"]').data('hash');
            if (_findUrlHash) {
                location.hash = _findUrlHash
            } else {
                aosCore.reloadHistory();
            }
        }
        // 全屏显示
        ,toggleFullScreen: function() {  
            if (!document.fullscreenElement && // alternative standard method  
                !document.mozFullScreenElement && !document.webkitFullscreenElement) {// current working methods  
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }
        //修改密码
        ,modifyPassword:function(){
            aosCore.openClickLayerPage('/toPassword', '修改密码', 500, 300);
        }
        //将list转换为tree
		,parseTree:function(sNodes,name){
			var key = 'id';
			var parentKey = 'pid';
			var childKey = 'children';
			var r = [];
			var tmpMap = {};
			for (i = 0, l = sNodes.length; i < l; i++) {
                if(name!='name')  sNodes[i].name = sNodes[i][name];
				tmpMap[sNodes[i][key]] = sNodes[i];
			}
			for (i = 0, l = sNodes.length; i < l; i++) {
				var id = sNodes[i][parentKey];
				if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
					
					if (!tmpMap[sNodes[i][parentKey]][childKey])
						tmpMap[sNodes[i][parentKey]][childKey] = [];
					tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
				} else {
					r.push(sNodes[i]);
				}
			}
			return r;
		}
        ,initTree:function(options){
            var op = {
                url:options.url,
                id:options.id,
                name:options.name||'name',
                selctedId:options.selctedId||'',
                title:options.title||'请选择',
                value:options.value||''
            }
            $.ajax({
                url:op.url,
                method:'post',
                success:function(res){
                    var hlist = [];
                    hlist.push("<option value='"+op.value+"' selected=true>"+op.title+"</option>");
                    if(res.data.length>0){
                        var treedata = aosCore.parseTree(res.data,op.name);
                        hlist = aosCore.createTree(treedata,0,hlist,op.name,op.selctedId);
                    }
                    $("#"+op.id).html(hlist.join(''));
                    form.render('select');
                }
            });
        }
        ,createTree:function(nodes,depth,list,name,selctedId){
            var depth = depth||0;
            var list = list||[];
            if(nodes && nodes.length>0){
                for(var i=0,l=nodes.length;i<l;i++){
                    var hasChild = nodes[i].children && nodes[i].children.length>0;
                    var pre = [];
                    for(var j=0;j<depth;j++){pre.push('&emsp;');}
                    list.push("<option value=\""+nodes[i].id+"\""+(selctedId==nodes[i].id?' selected':'')+">"+pre.join('')+nodes[i][name]+"</option>");
                    if(hasChild){
                        list = this.createTree(nodes[i].children,depth+1,list,name,selctedId);
                    }
                }
                return list;
            }else{
                return [];
            }
        }
        ,initTreeCheckbox:function(options){
            var op = {
                url: options.url,
                id: options.id,
                name: options.name||'name',
                checkedIds: options.checkedIds||''
            };
            $.ajax({
                url: op.url,
                method:'post',
                success:function(res){
                    var treedata = aosCore.parseTree(res.data,op.name);
                    var hlist = [];
                    hlist = aosCore.createTreeCheckbox(treedata,0,hlist,op.name,op.checkedIds);
                    $("#"+op.id).html(hlist.join(''));
                    form.render('checkbox');
                }
            });
        }
        ,createTreeCheckbox:function(nodes,depth,list,name,checkedIds){
            var depth = depth||0;
            var list = list||[];
            if(nodes && nodes.length>0){
                for(var i=0,l=nodes.length;i<l;i++){
                    var hasChild = nodes[i].children && nodes[i].children.length>0;
                    var pre = [];
                    for(var j=0;j<depth;j++){pre.push('&emsp;&emsp;');}
                    list.push("<li>"+pre.join('')+'<input type="checkbox" name=\"'+nodes[i].id+'\" '+(checkedIds.indexOf(nodes[i].id+";")>=0?'checked':'')+' lay-skin="primary">'+nodes[i][name]+"</li>");
                    if(hasChild){
                        list = this.createTreeCheckbox(nodes[i].children,depth+1,list,name,checkedIds);
                    }
                }
                return list;
            }else{
                return [];
            }
        }
        ,initSelect:function(options){
            var op = {
                url: options.url,
                id:options.id,
                key: options.key||'key',
                value: options.value||'value',
                selectedKey: options.selectedKey||''
            };
            $.ajax({
                url: op.url,
                method:'post',
                success:function(res){
                    var reslist = res.data.list;
                    var oplist  = [];
                    for(var i=0;i<reslist.length;i++){
                        oplist.push('<option value=\"'+reslist[i][op.value]+'\" '+(selectedKey === reslist[i][op.value]?'selected':'')+'>'+reslist[i][op.key]+"</option>");
                    }

                    $("#"+op.id).html(oplist.join(''));
                    form.render('select');
                }
            });
        }
        ,closeAll:function(){
            layer.closeAll('page');
		    return false;
        },
        parseDate:function(date,fmt){
			if(date){
				var t = new Date(date);
                var f = fmt||'yyyy-MM-dd hh:mm:ss';
				return t.Format(f);
			}else{
				return '';
			}
		},
        parseStatus:function(status){
            switch(status){
                case '0':;
                case  0 :return "有效";
                case '1':;
                case  1 :return "无效";
                default :return "未知";
            }
        }
        ,parseSex:function(sex){
            switch(sex){
                case '1':;
                case  1 :return "男";
                case '2':;
                case  2 :return "女";
                default :return "未知";
            }
        },parseDict:function(item,dict){
            var list = DICTS[dict];
            if(list!=null && list.length>0){
                for(var i=0;i<list.length;i++){
                    if(item==list[i].itemValue){
                        return list[i].itemKey;
                    }
                }
                return '未知';
            }else{
                return item;
            }
        }
    });

});