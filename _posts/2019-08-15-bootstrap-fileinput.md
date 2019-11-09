---
layout: post
category: web
title: Bootstrap File Input，最好用的文件上传组件
tagline: by 沉默王二
tags: 
  - Bootstrap
---

本篇介绍如何使用 Bootstrap File Input（最好用的文件上传组件）来进行图片的展示、上传，以及如何在服务器端进行文件保存。

<!--more-->
### 一、先来看效果图吧

![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTUxMDA3MTYwMTI4MzIy?x-oss-process=image/format,png)

![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTUxMDA3MTYwMTM2ODU5?x-oss-process=image/format,png)
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTUxMDA3MTYxMDQzOTMz?x-oss-process=image/format,png)

### 二、引入插件的样式和脚本

```jsp
<link type="text/css" rel="stylesheet" href="${ctx}/components/fileinput/css/fileinput.css" />
<script type="text/javascript" src="${ctx}/components/fileinput/js/fileinput.js"></script>
<script type="text/javascript" src="${ctx}/components/fileinput/js/fileinput_locale_zh.js"></script>
```

[http://plugins.krajee.com/file-input](http://plugins.krajee.com/file-input),这是其官方文档，里面有下载地址。

### 三、在页面上添加组件

```jsp
<input type="file" name="image" class="projectfile" value="${deal.image}"/>
```

1. type=file和class=projectfile，指明其为input file类型。
2. name指定其在后台的获取key。
3. value指定其在展示的时候图片路径。

### 四、初始化

```js
projectfileoptions : {
		showUpload : false,
		showRemove : false,
		language : 'zh',
		allowedPreviewTypes : [ 'image' ],
		allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
		maxFileSize : 2000,
	},
// 文件上传框
$('input[class=projectfile]').each(function() {
	var imageurl = $(this).attr("value");

	if (imageurl) {
		var op = $.extend({
			initialPreview : [ // 预览图片的设置
			"<img src='" + imageurl + "' class='file-preview-image'>", ]
		}, projectfileoptions);

		$(this).fileinput(op);
	} else {
		$(this).fileinput(projectfileoptions);
	}
});
```

1. 通过jquery获取对应的input file，然后执行fileinput方法。
2. showUpload 设置是否有上传按钮。
3. language指定汉化
**4. allowedFileTypes 、allowedFileExtensions 不知道为什么没有起到效果？**
5. maxFileSize 指定上传文件大小

### 五、带file文件的form表单通过ajax提交

我们先来看带file的form表单布局。

```jsp
<form class="form-horizontal required-validate" action="${ctx}/save?callbackType=confirmTimeoutForward" enctype="multipart/form-data" method="post" onsubmit="return iframeCallback(this, pageAjaxDone)">

	<div class="form-group">
		<label for="" class="col-md-1 control-label">项目封面</label>
		<div class="col-md-10 tl th">
			<input type="file" name="image" class="projectfile" value="${deal.image}" />
			<p class="help-block">支持jpg、jpeg、png、gif格式，大小不超过2.0M</p>
		</div>
	</div>	
	<div class="form-group text-center ">
		<div class="col-md-10 col-md-offset-1">
			<button type="submit" class="btn btn-primary btn-lg">保存</button>
		</div>
	</div>
</form>				
```
1. enctype="multipart/form-data"必不可少。
2. onsubmit="return iframeCallback(this, pageAjaxDone)"方法，通过ajax提交表单（iframeCallback），并且上传成功后调用回调函数（pageAjaxDone）进行下一步操作。

关于iframeCallback的介绍，请参照[ summernote所在form表单的数据提交](http://blog.csdn.net/qing_gee/article/details/51027040#t13)，这里就不多做介绍了。

然后我们来介绍一下回调函数pageAjaxDone。
```js
function pageAjaxDone(json) {
	YUNM.debug(json);
	YUNM.ajaxDone(json);

	if (json[YUNM.keys.statusCode] == YUNM.statusCode.ok) {
		var msg = json[YUNM.keys.message];
		// 弹出消息提示
		YUNM.debug(msg);

		if (YUNM.callbackType.confirmTimeoutForward == json.callbackType) {
			$.showSuccessTimeout(msg, function() {
				window.location = json.forwardUrl;
			});
		}
	}
}
```
其主要的功能就是通过ajaxDone方法处理服务端传递过来的错误消息，假如说服务端操作成功，那么会显示提示信息，进而跳转到对应的url。


### 六、服务器端保存图片

请参照[后端springMVC文件保存](http://blog.csdn.net/qing_gee/article/details/51027040#t8)

---------
ps：以上博客留了一个小疑问，一直没有去研究，直到有位非常棒的小伙伴 ihchenchen 给了我如下的提醒：

>allowedFileTypes 、allowedFileExtensions 我知道为什么没有效果，因为 fileinput() 方法调用了两次，一次在 fileinput.js 里面最后几行，还有一次就是你自己写的 `$(this).fileinput()`。在fileinput.js里的是没有设置allowedFileTypes 、allowedFileExtensions 值的。


有两种方法可以改：
1、把fileinput.js里的最后几行调用注释掉。
2、全部使用“data-”的方法来做，不写$(this).fileinput()。

对于ihchenchen善意的提醒，我非常的感谢，虽然他提供的解释并没有解决我的疑问，但是我很喜欢这样有互动的技术交流，之前写很多博客，基本上很少发生这样善意并且行之有效的回答。这让我想起[中国程序员和外国程序员](http://www.jianshu.com/p/90a19c5d5cf0)，里面的故事让人震撼之余，捎带着些许的惭愧。那么如何做到“**Ask questions, get answers, no distractions。**”就显得特别珍贵，而“ihchenchen”则充满这种精神！

### 六、解惑allowedFileTypes 、allowedFileExtensions
之前困惑为什么bootstrap fileinput为什么设置了这两个属性后，没有效果，其实是我自己的误解，如今经过一番痛彻的领悟后恍然大悟！

#### ①、allowedFileTypes
>allowedFileTypes
array the list of allowed file types for upload. This by default is set to null which means the plugin supports all file types for upload. If an invalid file type is found, then a validation error message as set in msgInvalidFileType will be raised. The following types as set in fileTypeSettings are available for setup.

>['image', 'html', 'text', 'video', 'audio', 'flash', 'object']

先从“allowedFileTypes”说起，该属性告知我们文件的选择类型，那么我们很容易想到这样的画面：
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMTI5MTYwODEyNDM1?x-oss-process=image/format,png)

也就是说，我们希望此时的“所有文件”处不是“所有文件”，而是“image”之类的。显然这样的逻辑并没有错，但却不适合bootstrap fileinput！

那么，这个时候我就很容易认为“allowedFileTypes” 没有起到作用！

但请看下图：
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMTI5MTYxMjU4Njky?x-oss-process=image/format,png)

吼吼，原来是在你选择了文件后发生的类型检查！

#### ②、allowedFileTypes工作原理
```js
			$(this).fileinput({
				showUpload : false,
				showRemove : false,
				language : 'zh',
				allowedPreviewTypes: ['image'],
		        allowedFileTypes: ['image'],
		        allowedFileExtensions:  ['jpg', 'png'],
				maxFileSize : 2000,
				
			});
```
通过fileinput方法我们加载一个bootstrap fileinput组件，那么其内部是如何实现allowedFileTypes的呢？

通过在fileinput.js文件中搜索“allowedFileTypes”关键字，我们得到如下代码：

```js
 var node = ctr + i, previewId = previewInitId + "-" + node, isText, file = files[i],
                    caption = self.slug(file.name), fileSize = (file.size || 0) / 1000, checkFile, fileExtExpr = '',
                    previewData = objUrl.createObjectURL(file), fileCount = 0, j, msg, typ, chk,
                    fileTypes = self.allowedFileTypes, strTypes = isEmpty(fileTypes) ? '' : fileTypes.join(', '),
                    fileExt = self.allowedFileExtensions, strExt = isEmpty(fileExt) ? '' : fileExt.join(', ');
```
然后我们继续看到如下的代码：
```js
 if (!isEmpty(fileTypes) && isArray(fileTypes)) {
                    for (j = 0; j < fileTypes.length; j += 1) {
                        typ = fileTypes[j];
                        checkFile = settings[typ];
                        chk = (checkFile !== undefined && checkFile(file.type, caption));
                        fileCount += isEmpty(chk) ? 0 : chk.length;
                    }
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileType.replace('{name}', caption).replace('{types}', strTypes);
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
```
我们可以发现，文件类型的检查是发生在checkFile方法上，那么checkFile方法到底做了些什么呢？

```js
 defaultFileTypeSettings = {
        image: function (vType, vName) {
            return (vType !== undefined) ? vType.match('image.*') : vName.match(/\.(png|jpe?g)$/i);
        },
        ...
```
以上就是checkFile的内容。

1. 也就是说当我们指定```allowedFileTypes: ['image'],```时，就会进行image的类型检查。
2. 显然我们选择的txt文件不属于image类型，那么就会匹配不上，出现以上界面。
3. 同时，该方法告诉我们，当不指定```allowedFileTypes: ['image'],```，只指定```allowedFileExtensions:  ['jpg', 'png'],```就会执行```vName.match(/\.(png|jpe?g)$/i)```，也就是文件后缀类型的检查，这点很关键啊，为我们接下来介绍“allowedFileExtensions”奠定基础。

#### ③、allowedFileExtensions什么时候起作用
上节我们讨论完“allowedFileTypes”，捎带说了“allowedFileExtensions”，那么如何让后缀进行check呢？
```js
			$(this).fileinput({
				showUpload : false,
				showRemove : false,
				language : 'zh',
				allowedPreviewTypes: ['image'],
		        allowedFileExtensions:  ['jpg', 'png'],
				maxFileSize : 2000,
				
			});
```
fileinput组件此时指定的属性如上，没有了“allowedFileTypes”，并且指定允许的后缀类型为“['jpg', 'png']”，也就是说，假如我们选择了gif的图片就会出现错误提示。
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwMTI5MTYyODQ1NzU5?x-oss-process=image/format,png)

错误预期的发生了，那么请特别注意：
```js
image: function (vType, vName) {
            return (vType !== undefined) ? vType.match('image.*') : vName.match(/\.(png|jpe?g)$/i);
        },
```
fileinput.js文件中原始的代码如下：
```js
 image: function (vType, vName) {
            return (vType !== undefined) ? vType.match('image.*') : vName.match(/\.(gif|png|jpe?g)$/i);
        },
```
image类型的后缀当然默认包含了gif，我只是为了举例说明，代码做了调整，请注意！



















