---
layout: post
category: life
title: 牛掰！我是这么把个人博客粉丝转到公众号的
tagline: by 沉默王二
tag: life
---

### 01、前言
纯洁的微笑推荐了一篇文章，题目没有任何特色，叫做《我是怎么把博客粉丝转到公众号的》，但读完后，我震惊了——原来还有这种骚操作啊！

惊叹于作者的思路和动手能力，我也决定试一把。**毕竟在这个互联网时代，拥有流量就仿佛拥有了一切**。

<!--more-->

没想到的是，我这一把试了整整一个星期（有好几天都是折腾到半夜两三点，眼皮一直打架），今天才终于搞定。期间踩了无数次的坑，感慨颇多。于是就想从技术的角度，来回顾一下这次的历程，给大家一些参照。

《我是怎么把博客粉丝转到公众号的》的作者叫崔庆才，加了好友聊了几句，感觉非常的有才。借此机会，我们再来一起回顾一下他的思路。

1）读者通过谷歌或者 Robin 李的搜索引擎检索到了博客。

2）博客的部分内容是隐藏的，需要读者关注公众号并回复口令解锁。

3）解锁后，读者就可以无碍地浏览全站所有文章了。

大家看到这可能会产生一个疑问：作者的思路是非常清晰的，但读者的用户体验怎么保证呢？

首先，读者只需要解锁一次，全站的所有文章就全都解锁了。其次，操作起来非常简便，扫一下二维码，发送一个口令就完事了。最后，读者关注公众号的动作，在一定程度上为作者注入了源源不断的写作动力，这样的话，读者就可以看到更多更优质的文章了。

真的是两全其美啊！

既然方案大佬已经提供了，那我们就动手开干吧！**人嘛，你可以缺少想法，但不能缺少执行力啊——干就对了**。

接下来，我们就从前端到后端，细细致致地过一遍。前端是通过 HTML + CSS + JavaScript 实现的，后端是通过 JFinal + 微信 SDK + MySql 实现的。用到的技术栈还包括 jQuery、Nginx、Maven 等等。

### 02、前端

前端主要完成的工作包括隐藏文章、提醒用户扫码关注公众号并发送口令，还有解锁文章。怎么实现的呢？我们一步步来看。

**1）找到文章所在的容器**

怎么找到文章所在的容器呢？很简单，F12 打开谷歌浏览器的开发者模式，通过【Elements】面板的选择器进行定位。

比如说，[小白学堂](itmind.net)这个博客的文章容器是 `article.article-content`。截图如下。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-1.png)


**2）把文章所在容器的高度缩小**

怎么缩小文章所在容器的高度呢？使用 jQuery 是最快捷的方法，比如说 `$seletor.css('height', '100px');` 可以将容器的高度设置为 100 像素。

具体的代码的如下所示。

```js
// DOM 完全就绪时执行
$(function() {
// 找到文章所在的容器
var $article = $("article.article-content");
if ($article.length > 0) {
// 文章的实际高度
var article = $article[0], height = article.clientHeight;
// 文章隐藏后的高度
var halfHeight = height * 0.3;

$article.css('height', halfHeight + 'px');
$article.addClass('lock');
}
});
```

执行完这段代码后，文章呈现出来的样子如下图所示。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-2.png)

页面有点乱，对不对？这是因为文章的容器高度缩小了，但文章的内容因为容纳不下躲在了其他页面元素的下方。

**3）真正地隐藏起来**

上图中呈现出来的页面效果读者肯定是接受不了的，怎么办呢？一行 CSS 代码就能搞定。

```css
.lock {
position: relative;
overflow: hidden;
padding-bottom: 30px;
}
```

不知道你注意到了没之前的 JavaScript 代码，里面有一行是：

```js
$article.addClass('lock');
```

这行代码可以在文章容器上额外加上一个 CSS 样式，于是文章的部分内容就真的隐藏了起来，就像下面这样。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-3.png)

**4）增加点渐变效果**

部分文章虽然被隐藏了，但缺少点渐变效果，给读者的感受就像是一刀两断——这种感觉太过唐突，应该缓冲一下，于是我们再来点 CSS 修饰一下。

```css
.asb-post-01 {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
display: block;
z-index: 10000;
margin-bottom: 0;
}

.asb-post-01 .mask {
height: 240px;
width: 100%;
background: -webkit-gradient(linear, 0 top, 0 bottom, from(rgba(255, 255, 255, 0)), to(#fff));
}
```

`.asb-post-01` 和 `.mask` 从哪里跑出来的？在这里呢，看下图。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-4.png)

上面的 CSS 代码稍微解释一下。`position: absolute;` 是绝对定位，` bottom: 0;` 可以使 `.asb-post-01` 定位在文章容器的最底部。`.asb-post-01 .mask` 就像一张幕布，呈现出了隐隐约约的渐变效果，效果图如下所示。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-5.png)

**5）提醒读者关注公众号**

好了，文章已经隐藏了起来，并且渐变效果也有了，是时候提醒读者关注公众号了。在 `<div class="mask"></div>` 元素的下方加入以下代码。

```html
<div class="info">
<div>扫码或搜索：<span style="color: #E9405A; font-weight: bold;">沉默王二</span></div>
<div>
<span>发送 </span><span class="token" style="color: #e9415a; font-weight: bold; font-size: 17px; margin-bottom: 45px;">290992</span>
</div>
<div>
即可<span style="color: #e9415a; font-weight: bold;">立即永久</span>解锁本站全部文章
</div>
<div>
<img class="code-img" style="width: 300px;display:unset" src="http://www.itmind.net/wp-content/uploads/2019/09/cmower.jpg">
</div>
</div>
```

再来两行 CSS 代码，设置扫码区域的高度和背景。

```css
.asb-post-01 .info {
background: white;
height: 370px;
}
```

呈现出来的页面效果图如下所示，是不是感觉很完美了？简直天衣无缝好不好，忍不住给自己点个赞。


![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-6.png)


**6）生成口令**

页面效果已经搞定了。接下来就很关键了，怎么确定读者的身份标识呢？

>当然是 Cookies，Cookies 里面保存了浏览网页时自动生成的 Session ID，而且每一个用户都是不一样的，这样不就可以来唯一标识一台浏览设备了吗？

这是崔庆才大佬给出的解决方案，我举双手赞同。怎么获取呢？代码如下所示。

```js
function getCookie(name) {
var value = "; " + document.cookie;
var parts = value.split("; " + name + "=");
if (parts.length == 2)
return parts.pop().split(";").shift();
}

function getToken() {
let value = getCookie('UM_distinctid');
if (!value) {
return defaultToken;
}
return value.substring(value.length - 6).toUpperCase();
}
```



**7）轮循监听解锁或者隐藏文章**

前端还有最后一个工作要做，就是轮循监听，每隔一段时间向后端发送一个查询，查询读者的口令是否已经保存到数据库，如果保存过了，隐藏的文章就要重现江湖了；如果没有保存，文章当然要继续隐藏着。

具体的代码如下所示。

```js
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
console.log('Detecting Token', token);
$.ajax({
url : 'http://qingmiaokeji.cn/jfinal/wx/',
method : 'GET',
data : {
token : token
},
success : function(data) {
console.log('locked', data.locked);

if (data.locked === true) {
_lock();
} else {
_unlock();
}
},
error : function(data) {
_unlock();
}
})
}

_detect();
setInterval(function() {
_detect();
}, 5000);
```

①、_lock 方法的作用是隐藏文章。

②、_unlock 方法的作用是显示文章。

③、_detect 方法的作用是查询口令有没有保存，如果保存就解锁文章，如果没有就隐藏文章。

④、setInterval 是一个定时器，每隔 5 秒执行一次 _detect 方法。

### 03、后端

前端的工作已经完成了。那后端的工作都包括哪一些呢？

1）将读者发送的口令保存到数据库。

2）响应前端的定时查询，把要解锁还是继续锁定的结果返回。

这两个工作看起来平淡无奇，但如果从零开发的话，还是非常耗时耗力的。我们应该珍惜站在巨人肩膀上的机会，不是吗？

这次我采用的后端框架是 JFinal，配合其微信开发 SDK，省时省力省心。简单介绍一下 JFinal，它是基于 Java 语言的极速 WEB + ORM 框架，其核心设计目标是开发迅速、代码量少、学习简单、功能强大、轻量级、易扩展、Restful——非常适合我们这次的开发任务。

为了减轻大家的开发成本，我已经将项目开源到了 GitHub 上，地址如下所示：

https://github.com/qinggee/jfinal_weixin_demo_for_maven

**大家可以直接将项目导出到 IDE 中，只需要把数据库链接地址、用户名和密码，以及微信订阅号相关配置修改一下**就行了。截个图大家参照一下。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-7.png)

为了方便大家的实操，我把关键的内容详细地说明一下。

**1）创建数据库和表**

创建数据库就不再赘述了，就说创建表吧，SQL 如下所示。

```sql
DROP TABLE IF EXISTS `weixin`;
CREATE TABLE `weixin` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`openid` varchar(255) NOT NULL,
`token` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

weixin 表有三个字段：

①、id 为主键；

②、openid 为微信用户的关键标识。当用户取消关注订阅后，可根据该字段删除记录。

③、token 为博客读者的唯一标识。当用户关注订阅号后，可根据该字段判定博客是否需要解锁。

**2）读者关注订阅号后，保存口令**

`WeixinMsgController` 类的 `processInTextMsg()` 方法用来处理接收到的文本消息，我们可以在这个方法里保存 openid 和 token，成功后提示读者：恭喜您已经解锁博客全部文章~

```java
protected void processInTextMsg(InTextMsg inTextMsg) {
String msgContent = inTextMsg.getContent().trim();

if ("2048".equals(msgContent)) {

} else if (msgContent.length() == 6) {
Weixin param = new Weixin();
param.setOpenid(inTextMsg.getFromUserName());
param.setToken(msgContent);
param.save();

OutTextMsg outMsg = new OutTextMsg(inTextMsg);
outMsg.setContent("恭喜您已经解锁博客全部文章~");
render(outMsg);
} else {
renderDefault();
}
}
```

**3）响应前端的定时查询**

`WeixinController` 类的 `index()` 方法用来响应前端的定时查询。

```java
public void index() {
// 跨域
getResponse().addHeader("Access-Control-Allow-Origin", "*");

String token = getPara("token");
String openid = service.findByToken(token);
if (openid == null || "".equals(openid)) {
renderJson("locked", true);
} else {
renderJson("locked", false);
}
}
```

①、`getResponse().addHeader("Access-Control-Allow-Origin", "*")` 这行代码可以解决跨域的问题。

②、根据 token 查询读者是否已经关注了公众号，关注过的话返回 false，否则返回 true。

**4）读者取消关注订阅号后删除记录**

`WeixinMsgController` 类的 `processInFollowEvent()` 方法用来处理接收到的关注/取消关注事件，如果取消关注的话，根据 openid 删除记录。

```java
protected void processInFollowEvent(InFollowEvent inFollowEvent) {
if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE.equals(inFollowEvent.getEvent())) {

else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE.equals(inFollowEvent.getEvent())) {
log.debug("取消关注：" + inFollowEvent.getFromUserName());
service.deleteByOpenid(inFollowEvent.getFromUserName());
}
}
```

**04、注意事项**

后端的工作完成后，就需要将其打包运行到服务器上了。

**1）打包项目**

命令行进入项目根目录，然后运行 `mvn clean package` 即可打包。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-8.png)

打包完成后，可以在 target 目录下看到以下内容。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-9.png)

tar.gz 文件为 `target/jfinal_weixin_demo_for_maven-release/jfinal_weixin_demo_for_maven` 目录的压缩包，方便上传至服务器。

**2）将 tar.gz 文件上传至服务器，并启动服务**。

上传工具可以使用 FileZilla，上传成功后可以通过 `tar -xzvf xxx.tar.gz` 命令进行解压。然后进入 `jfinal_weixin_demo_for_maven` 目录下，输入 `./jfinal.sh start` 即可启动服务。

**3）配置 Nginx**

由于服务器上 80 端口已经被占用，所以我们需要 Nginx 反向代理一下。简单介绍一下 Nginx（发音同 engine x），它是异步框架的网页服务器，也可以用作反向代理、负载平衡器和 HTTP 缓存。

打开 nginx.conf 文件，增加以下内容。

```
location ^~ /jfinal/ {
proxy_pass http://127.0.0.1:8089/;
rewrite http://127.0.0.1:8089/ last;
}
```

配置之前，假如域名是 itwanger.com，访问该服务的地址为：http://itwanger.com:8089。配置之后，访问该服务的地址就可以是：http://itwanger.com/jfinal。这样请求的 URL 中就不需要指定端口了——有没有感觉到 Nginx 的一丝牛逼之处？

**4）启用微信订阅号服务器配置**

一切准备就绪后，就可以进入微信订阅号后台，填写服务器地址、令牌，然后启用服务器配置了。

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-10.png)

**5）实际效果**

可能大家想知道效果如何，这里截几张图大家看看。这个功能已经在**小白学堂**（itmind.net）上线了，感兴趣的可以进去体验一把，测到 bug 有奖励哟。

首先进去文章是这个样子的：

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-11.png)

然后关注了订阅号，发送了口令：

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-12.png)

于是同时，博客上的文章也解锁了！

![](http://www.itwanger.com/assets/images/2019/10/boke-gongzhonghao-13.png)


牛掰！

### 05、后记

一周时间，我几乎把所有的事情都滞后了，但总算是把这个方案落地了！内心还是非常激动的。再次感谢崔庆才大佬的思路，也为自己顽强的斗志点个赞！

谢谢大家的阅读，希望能给你在技术的实现上提供一些思路。

