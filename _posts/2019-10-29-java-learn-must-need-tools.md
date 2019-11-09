---
layout: post
category: java
title: 学习 Java 需要安装的软件
tagline: by 沉默王二
tag: java
---

工欲善其事必先利其器，战斗之前我们要先配备好武器。

<!--more-->



1）JDK

JDK 是 Java Development ToolKit 的简称，也就是 Java 开发工具包。JDK 是整个 Java 的核心，包括 Java 运行环境（Java Runtime Envirnment，简称 JRE），Java 工具（比如 javac、java、javap 等等），以及 Java 基础类库（比如 rt.jar）。

[Windows 安装 JDK 与环境变量配置](http://www.itwanger.com/java/2019/10/19/java-jdk-install-windows.html)



2）IDE

集成开发环境（IDE，Integrated Development Environment ）是用于提供程序开发环境的应用程序，一般包括代码编辑器、编译器、调试器和图形用户界面工具。集成了代码编写功能、分析功能、编译功能、调试功能等一体化的开发软件服务套。

在我初学 Java 的时候，老师竟然告诫我们不要使用 IDE（当时是 MyEclipse 风靡的年代），而要使用文本编辑工具，比如说 Editplus、Nodepad++。

老师说的有一定的道理，比如说，在没有代码提醒的帮助下，我们能够通过不停的手敲记住一些 Java 的常见名词。但在我看来也就仅此而已。

没有 IDE 的帮助，让初学者对编程望而生畏，因为那些名词实在是太多了。我们班当时很多同学就是因为觉得太痛苦了，就放弃编程了。

我到现在也不太会敲 `extends`、`implements`（在 Eclipse 中复制出来的），不会敲又怎样呢？**有好的工具，我们就应该利用，不应该受苦**。

下面是最为受欢迎的 IDE 的榜单。

![](http://www.itwanger.com/assets/images/2019/10/java-learn-must-need-tools-1.png)

对于我来说，一直喜欢的是 Eclipse，这可能是一种情怀吧。


[安装 Eclipse](http://www.itwanger.com/it/2019/10/22/eclipse-install.html)

据说，喜欢 IntelliJ IDEA 的 Java 程序员越来越多了。

[安装 IntelliJ IDEA ](http://www.itmind.net/java/4849/)

[IntelliJ IDEA 激活码](http://www.itwanger.com/it/2019/10/22/idea-jihuoma.html)

3）JAD

将源代码转换成二进制执行代码的过程叫做“编译”，一般指的是将 Wanger.java 编译成 Wanger.class 字节码文件；而将字节码文件转换成源代码的过程叫做“反编译”，比如将 Wanger.class 转成 Wanger.java。

JAD 是一款老牌的、经典的 Java 反编译工具。更重要的是，JAD 能够让我们深入的了解 Java 代码的工作机制。

比如说有这样一段代码：

```java
String chenmo = "沉默";
String wanger = "王二";

System.out.println(chenmo + wanger);
```

它的“庐山真面目”是下面这样子的。

```java
String chenmo = "\u6C89\u9ED8"; // 沉默
String wanger = "\u738B\u4E8C"; // 王二
System.out.println((new StringBuilder(String.valueOf(chenmo))).append(wanger).toString());
```

[JAD 下载、配置、使用说明](http://www.itwanger.com/java/2019/10/22/javac-jad.html)

4）Enhanced Class Decompiler

Enhanced Class Decompiler 的中文直译就是“增强的字节码反编译工具”。

Enhanced Class Decompiler 将 `JD`、`Jad`、`FernFlow`、`CFR`、`Procyon` 与 `Eclipse` 无缝集成，并且允许 Java 开发人员直接调试类文件而不需要源代码。这还不算完啊，它还集成了 Eclipse 类编辑器 M2E 插件，支持 Javadoc、参考搜索、库源附加、字节码视图和 `JDK 8 lambda` 表达式的语法。

[Enhanced Class Decompiler 安装、配置、使用说明](http://www.itwanger.com/java/2019/10/22/javac-ecd.html)


5）Maven

Maven 是一个项目管理和自动化构建工具，基于项目对象模型（POM）的概念，可以管理项目的构建、报告以及文档。作为 Apache 组织中的一个颇为成功的开源项目，Maven 主要服务于基于 Java 的项目构建、依赖管理和项目信息管理。

[Maven入门，读这篇文章就够了](http://www.itwanger.com/java/2019/10/24/maven-rumen.html)

《Java自学指南》上一篇：[哪些 Java 知识不需要再学了](http://www.itwanger.com/java/2019/10/28/java-no-learn.html)


