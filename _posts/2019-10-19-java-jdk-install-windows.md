---
layout: post
category: java
title: Windows 安装 JDK 与环境变量配置
tagline: by 沉默王二
tag: java
---

Windows 安装 JDK 与环境变量配置，超级详细。

<!--more-->

### 一、下载 JDK

目前，JDK 最流行的版本依然是 JDK 1.8，它的官网下载地址为：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

新手可以点击这个链接查看[什么是 JDK](http://www.itwanger.com/java/2019/10/19/java-jdk.html)

查看自己的 Windows 系统，是 64 位还是 32 位。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-1.png)


选择对应版本的 JDK 下载。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-2.png)

下载成功后，会有这样一份文件。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-3.png)


### 二、安装 JDK 和 JRE

新手可以点击这个链接查看[什么是 JRE](http://www.itwanger.com/java/2019/10/19/java-jre.html)。顺带还可以查看[JDK 和 JRE 有什么区别](http://www.itwanger.com/java/2019/10/19/java-jdk-jre.html)。



1）双击 exe文件 进行安装。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-4.png)

2）点击“下一步”继续。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-5.png)


3）等待安装结束之后。选择 JRE 安装的路径，点击下一步。


![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-6.png)







4）安装完成后，进入如下界面。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-7.png)

可以直接点击关闭。


### 三、配置环境变量

配置环境变量的入口：右击“我的电脑”-->"高级"-->"环境变量"。

1）JAVA_HOME 环境变量。

它指向 JDK 的安装目录，[Eclipse](http://www.itwanger.com/it/2019/10/22/eclipse-install.html)（我最爱的集成开发工具）等软件就是通过搜索 JAVA_HOME 变量来找到并使用安装好的 JDK 的。

配置方法：在系统变量里点击新建，变量名填写 JAVA_HOME，变量值填写 JDK 的安装路径。（根据自己的安装路径填写）

JAVA_HOME：D:\Java\jdk1.8.0_151

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-8.png)



2）PATH 环境变量

指定命令的索引路径，在命令行下面执行命令如 javac 编译 Java 程序时，它会到 PATH 变量所指定的路径中查找相应的命令程序。

我们需要把 JDK 的 bin 目录增加到现有的 PATH 变量中，bin 目录中包含了经常要用到的可执行文件如 javac/java/javadoc/javap 等，设置好 PATH 变量后，就可以在任何目录下执行之前提到的命令了。

在系统变量里找到 PATH 变量，这是系统自带的，不用新建。双击 PATH，由于原来的变量值已经存在，所以在已有的变量后添加上`;%JAVA_HOME%\bin;` 即可，注意前后的分号。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-9.png)


然后点击确定完成。

### 四、 测试环境

运行 cmd，可以输入 `javac -verson` 或者 `java -version` 测试 JDK 是否配置成功。

![](http://www.itwanger.com/assets/images/2019/10/java-jdk-install-10.png)

出现以上结果则表明安装成功。



