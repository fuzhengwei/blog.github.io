---
layout: post
category: java
title: 哪些 Java 知识不需要再学了
tagline: by 沉默王二
tag: java
---

张无忌在学太极拳的时候，他爹的师父张三丰告诫他一定要把之前所学习的武功全部忘掉，忘得越多就会学得越快。

同样的，[自学 Java](http://www.itwanger.com/java/2019/10/28/java-learn-why.html) 的时候一定要先知道哪些 Java 知识不需要再学了，毕竟技术的更新迭代就好像火箭一样快，Java 的一些知识点早已经过时了。如果不懂得断舍离，那学起来就不免太痛苦了。

<!--more-->


1）AWT 和 Swing

真不知道为什么，有些书籍还在介绍 AWT 和 Swing，这就好像不知道大清朝早已经亡了几百年一样。已经 9102 了，谁还会用 AWT 和 Swing 去开发桌面应用呢？

就我所知，C++ 程序员会用 MFC，C# 程序员会用 Winform 和 WPF。甚至还可以用一种更时髦的技术（比如 Electron）把 Web 网页裹一层华丽的外衣，变成可执行文件。

2）Applet

作为网页插件技术，Applet 压根就没流行起来，就连曾经的热门 Flash 也要淘汰了。

3）XML

XML 还没有被淘汰，应用的地方还有不少。但是作为一种数据传输格式，它正在被 JSON 替代。

4）JDBC

我个人不建议再学习偏底层的 JDBC 了，尤其是对于时间宝贵的自学程序员来说。与其花这点时间，不如把精力投入到 MyBatis 的学习上。

5）Struts

Struts 是早年一个优秀的 MVC 框架，单从技术的角度来看，还是蛮不错的。但是自从有了 SpringMVC 后，Struts 就被拍死在沙滩上了。

6）Hibernate

在我刚参加工作那会（2010 年的时候），持久层框架用的正是 Hibernate。但时过境迁，Hibernate 太重量级了，学习成本太高，取而代之的是轻量级的 MyBatis（支持定制化 SQL、存储过程以及高级映射）。

7）JSP

说起来惭愧，我现在维护的一个项目，视图层用的依然是 JSP。但如今流行的是“前后端分离”，JSP 就显得不合时宜了。

部分内容参照的[沈世钧](https://www.zhihu.com/people/zhang-xu-guang-21)老师的答案，侵删。


