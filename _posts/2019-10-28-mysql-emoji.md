---
layout: post
category: mysql
title: 如果有人问你 MySql 怎么存取 Emoji，把这篇文章扔给他
tagline: by 沉默王二
tag: mysql
---

### 01、前言
Emoji 在我们生活中真的是越来越常见了，几乎每次发消息的时候不带个 Emoji，总觉得少了点什么，似乎干巴巴的文字已经无法承载我们丰富的感情了。对于我们开发者来说，如何将 Emoji 存入 MySql 数据库或者取出来，就变成了一种必须掌握的技能了。


<!--more-->





Emoji 是一种图形符号，能够很直观地反应出某种文字含义。它让我想起远古时代的象形文字。

![](http://www.itwanger.com/assets/images/2019/10/mysql-emoji-1.png)

Emoji 其实是一个日语词（えもじ），`E` 表示"絵"，`moji` 表示"文字"；连在一起就是"絵文字"，可以更形象化地表情达意。

### 02、糟糕

如果我们直接将 Emoji 表情存入数据库的话，通常会出现下面这个错误。

![](http://www.itwanger.com/assets/images/2019/10/mysql-emoji-2.png)

因为数据库的字符编码一般是  utf8（支持的编码范围为 `\u0000-\uFFFF`），而 Emoji 所在的编码范围是 `\u1F601-\u1F64F`，超出 MySql 的边界了。

怎么解决这个问题呢？

### 03、utf8mb4

可以将 MySql 的字符集由 utf8 调整为 utf8mb4。utf8mb4 是 MySql 在 5.5.3 版本之后增加的一个编码方式，用来兼容四字节的 Unicode（包括 Emoji）。

理论上，utf8mb4 是 utf8 的超集，其中 mb4 是 `most bytes 4` 的意思，将字符集修改为“utf8mb4”，并不会对已有的 utf8 编码读取产生任何问题。

但通常这种方式并不是最优解，因为应用层还需要将 MySql 的连接方式作出以下调整：

```
jdbcUrl = jdbc:mysql://localhost/jfinal_demo?characterEncoding=utf8mb4&useSSL=false&zeroDateTimeBehavior=convertToNull
```

由原来的 `characterEncoding=utf8` 调整为 `characterEncoding=utf8mb4`。

### 04、EmojiConverter

更友好的解决方式应该将 Emoji 当做字符串存储，然后在取出来的时候再转成 Emoji，这样可以兼容所有的数据库版本。

我在 GitHub 上找到了这样的一个库——EmojiConverter，它可以很方便地将 Emoji 转换为字符串的别名，同时也支持将这个别名转换为 Emoji。

1）在 pom.xml 文件中加入 EmojiConverter

```xml
<dependency>
<groupId>com.github.binarywang</groupId>
<artifactId>java-emoji-converter</artifactId>
<version>0.1.1</version>
</dependency>
```

2）存储 Emoji 之前调用 `toHtml()` 方法转换一下

```java
EmojiConverter emojiConverter = EmojiConverter.getInstance();

String html = emojiConverter.toHtml(keywords.getContent().trim());

// JFinal 的保存方式
Record record = new Record().set("content", html)
Db.save("keywords", record);
```

比如说，要存储的内容当中包含了一个点赞的 Emoji。

![](http://www.itwanger.com/assets/images/2019/10/mysql-emoji-3.png)

那么通过 `emojiConverter.toHtml()` 转了之后的内容是什么样子呢？是一个码点：`&#128077`，debug 的时候截图如下所示。

![](http://www.itwanger.com/assets/images/2019/10/mysql-emoji-4.png)

这样的话，MySql 保存的内容就是一个普通的字符串了，编码方式仍然可以是 utf8。

3）显示 Emoji 的时候调用 `toUnicode()` 方法格式化一下

```java
String unicode = emojiConverter.toUnicode(content);
outMsg.setContent(unicode);
```

格式化后的内容可以正常显示在微信公众号回复的文本消息中，截图如下所示。

![](http://www.itwanger.com/assets/images/2019/10/mysql-emoji-5.png)




