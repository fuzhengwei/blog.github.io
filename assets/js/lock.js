var os = function () {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  }
}()

function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2)
		return parts.pop().split(";").shift();
}

function setCookie(name, value, hours){
    var exp = new Date();
    exp.setTime(exp.getTime() + hours*60*60*1000);
    // ;path=/ cookie全站有效
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}

function getToken() {
    let value = getCookie('UM_distinctid');
    if (!value) {
        return getUUID().toUpperCase();
    }
    return value.substring(value.length - 6).toUpperCase();
}

function getUUID(){
    return 'xxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
    });
}

// 文章所在容器的选择器
var articleSelector = 'article.post.container.need';

// DOM 完全就绪时执行
$(function() {
// 找到文章所在的容器
var $article = $(articleSelector);
if($article.length <= 0) return;

// 文章的实际高度
var article = $article[0], height = article.clientHeight;
// 文章隐藏后的高度
var halfHeight = height * 0.4;
// 篇幅短一点的文章就不需要解锁了
if (os.isPc && halfHeight > 800) {
    // 获取口令
    var token = getToken();
    $('.asb-post-01').find('.token').text(token);
}

var _lock = function() {
    $article.css('height', halfHeight + 'px');
    $article.addClass('lock');
    $('.asb-post-01').css('display', 'block');
}

var _unlock = function() {
    $article.css('height', 'initial');
    $article.removeClass('lock');
    $('.asb-post-01').css('display', 'none');
}

// 查询后端的结果
var _detect = function() {
    // 24小时有效
    var res = getCookie("_unlock");
    if('success' == res){
       return;
    }

	$.ajax({
		url : 'https://wx.bugstack.cn/itstack-ark-wx/api/check',
		type: "GET",
		dataType: "text",
		data : {
			token : token
		},
		success : function(data) {
			if (data == 'refuse') {
				_lock();
			} else {
				_unlock();
				setCookie("_unlock","success",1);
			}
		},
		error : function(data) {
			_unlock();
		}
	})
}

// 定时任务
_detect();
setInterval(function() {
      _detect();
}, 10000);

});