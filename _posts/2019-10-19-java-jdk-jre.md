---
layout: post
category: java
title: JDK 和 JRE 有什么区别？
tagline: by 沉默王二
tag: java
---

很多初学者容易搞混 [JDK](http://www.itwanger.com/java/2019/10/19/java-jdk.html) 和 [JRE](http://www.itwanger.com/java/2019/10/19/java-jre.html)，我也一直搞混（忍不住笑）。

<!--more-->



JDK 是 Java Development ToolKit 的简称，也就是 Java 开发工具包。JDK 是整个 Java 的核心，包括 Java 运行环境（Java Runtime Envirnment，简称 JRE），Java 工具（比如 javac、java、javap 等等），以及 Java 基础类库（比如 rt.jar）。针对 Java 程序的开发者来说。

JRE 是 `Java Runtime Environment` 的缩写，是 Java 程序的运行环境。针对 Java 程序的使用者来说。

如果你本机上安装了 JDK 和 JRE，可以发现：JDK 的 bin 目录比 JRE 的 bin 目录多了一个 javac（Java 语言编译器），这一点很好理解，因为 JRE 只是一个运行环境而已，与开发无关，与编译无关。

总结一下，JDK 是 Java 的开发包，包含有 JRE，面向的是开发人员；JRE 仅仅是 Java 的运行时环境，面向的是 Java 程序的使用者；而 JDK 包含了同版本的 JRE，此外还包含有编译器和其它工具。


原文链接：[http://www.itwanger.com/java/2019/10/19/java-jdk-jre.html](http://www.itwanger.com/java/2019/10/19/java-jdk-jre.html)



