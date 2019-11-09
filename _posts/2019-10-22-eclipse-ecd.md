---
layout: post
category: java
title: 增强的字节码反编译工具：Enhanced Class Decompiler
tagline: by 沉默王二
tag: java
---

Enhanced Class Decompiler 的中文直译就是“增强的字节码反编译工具”，下文简称为 ECD。

ECD 将 `JD`、`Jad`、`FernFlow`、`CFR`、`Procyon` 与 `Eclipse` 无缝集成，并且允许 Java 开发人员直接调试类文件而不需要源代码。这还不算完啊，它还集成了 Eclipse 类编辑器 M2E 插件，支持 Javadoc、参考搜索、库源附加、字节码视图和 `JDK 8 lambda` 表达式的语法。

<!--more-->


### 01、安装 ECD

第一步，在 `Eclipse Marketplace` 搜索 jad。

![](http://www.itwanger.com/assets/images/2019/10/eclipse-ecd-1.png)

第二步，点击「Installed」按钮进行安装。安装完成后重启 Eclipse。

### 02、使用 ECD

设置 ECD 为默认的 class 打开方式，配置→通用→Editors→File Assoclations→*.class→Class Decompiler Viewer，如下图所示。

![](http://www.itwanger.com/assets/images/2019/10/eclipse-ecd-2.png)

当我们查看 Java 源代码的时候就看到解析工具发生了变化，如下图所示。

![](http://www.itwanger.com/assets/images/2019/10/eclipse-ecd-3.png)


原文链接：[http://www.itwanger.com/java/2019/10/22/eclipse-ecd.html](http://www.itwanger.com/java/2019/10/22/eclipse-ecd.html)

