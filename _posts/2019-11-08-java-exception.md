---
layout: post
category: java
title: Java异常处理：给程序罩一层保险
tagline: by 沉默王二
tag: java
---

本着负责任的态度，我们程序员在写代码的时候，都非常的严谨。但程序在运行的时候，往往会出现一些令人意想不到的错误，导致那些不被期望的事件发生，最终，程序没有按照我们的预期正常地执行下去——异常发生了，是任程序自生自灭，还是将错误输出给用户？

Java为此提供的解决方案是——异常处理机制。


<!--more-->



异常处理机制能够让程序在异常发生时，按照代码预先设定的异常处理规则，针对性地处理异常——要么恢复到程序一开始的样子，要么停止运行把详细的错误信息抛出来，让我们程序员知道哪里出了错，然后做出对应的优化。

人这一生，总会遇到一些不可预料的麻烦，这些麻烦可能会让我们遭受沉重的打击。为了减轻因此承受的负担，我们就会买保险。

**异常处理机制在一定程度上保证了程序的健壮性，就好像给程序罩了一层保险**。

### 01、 异常的分类

在Java中，异常被称为Throwable，可分为Error和Exception（英文直译为例外，但通常被称为真的‘异常’）。

Error：代表了Java虚拟机（Java Virtual Machine）本身的错误，不能通过代码进行处理。我们程序员最熟悉的Error就是OutOfMemoryError，该错误的原因是由于程序不严谨，产生了过多的垃圾，导致Java虚拟机内存溢出。

Exception：代表了程序运行时出现的各种例外（不被期望发生的事件），可分为检查（checked）异常和非检查（unchecked）异常。

编译器强制要求程序员为检查异常做预处理工作——捕获异常并处理或者抛出异常，否则编译器就会提示错误。常见的这类异常有`SQLException`、`IOException`和`ClassNotFoundException`。

编译器不会提示非检查异常，也不要求在程序中处理这些异常。但通常情况下，程序员应该对这些异常有所防范 。比如说在进行除法运算的时候要对除数进行检查，保证其不能为0，否则程序在运行时就会抛出`ArithmeticException`，如果这样的异常发生了，那只能说明编写这段代码的程序员很粗心。

可查看下图了解Java异常的分类：

![](http://www.itwanger.com/assets/images/2019/11/java-exception-1.png)

### 02、 异常发生了

来看程序清单3-1：

```java
package com.cmower.java_demo.twelve;

public class Cmower {

	public static void main(String[] args) {
		System.out.println(2 / 0);
		System.out.println("程序已终止执行");
	}

}
/*****************************************
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at com.cmower.java_demo.twelve.Cmower.main(Cmower.java:6)
*****************************************/
```

当除数为0时，将抛出ArithmeticException异常，程序不再继续执行——异常信息打印得非常详细，我们可以找到哪一行出了错，并且知道错误是由于除数为0引发的；假如不知道错误怎么解决，可以把第一行的错误信息复制粘贴进行搜索，有不少答案正是你需要的。

### 03 异常处理


程序清单3-1没有使用异常处理机制，也可以顺利编译，因为ArithmeticException异常是非检查异常。那如果遇到检查异常呢？

编译器会提醒异常未处理，见下图：

![](http://www.itwanger.com/assets/images/2019/11/java-exception-2.png)

具体的代码如下：

```java
public class Cmower {

	public static void main(String[] args) {
		FileInputStream fileIn = new FileInputStream("cmower.jpg");
	}

}
```

那该如何处理异常呢？

如果是非检查异常，就需要在编码阶段对可能发生的错误进行规避，比如说，检查除数是否为0，如果为0就不要再做除法运算了。

如果是检查异常，做法大致有两种。

**1）直接抛出错误**

大学快毕业的时候，我感觉很迷茫，不知道未来要做什么，于是就打电话向父母求助，他们就劝我去一家软件培训园接受培训——自己决定不了的，就向上级请示。

这种现实的场景在Java中竟然也能找到相似之处。当一个方法不知道该怎么处理异常时，就可以使用`throws`关键字将编译器提醒的错误抛出，抛出的错误直接交给方法调用者来处理。示例如下：

```java
public class Cmower {

	public static void main(String[] args) throws FileNotFoundException {
		FileInputStream fileIn = new FileInputStream("cmower.jpg");
	}

}
```

**2）捕获错误**

在软件培训园接受了两个月的培训后，我就被江苏富士通录用了，然后一干就是三年半。这三年多时间，我成长了很多，技术得到了很大的锻炼，于是就在五年前回到了洛阳——这一次，我没再向父母请示，因为我翅膀硬了，可以自己做决定了。

这种现实的场景在Java中仍然能找到相似之处。当一个方法知道自己该怎么处理异常时，就可以使用`try`块将编译器提醒出错的代码段进行捕获，然后在`catch`块中做出对应的处理。示例如下：

```java
public class Cmower {

	public static void main(String[] args) {
		try {
			FileInputStream fileIn = new FileInputStream("cmower.jpg");
		} catch (FileNotFoundException e) {
			System.err.println("读取的文件未找到：" + e.getMessage());
		}
	}

}
```

在我初学Java的时候，总喜欢直接捕获通用异常`Exception`，而不是特定的异常（比如`FileNotFoundException`），因为这样做很省事，除了少写几个字母之外，还不必担心其他异常出现时再另外捕获。

但这样做是有问题的。因为在日常的开发中，我们希望代码能够直观地体现出尽量多的信息，但不具体的`Exception`会隐藏掉那些应该呈现出来的信息。

### 04、 异常处理的实战

**1）表单验证**

当我们需要在服务器端对用户输入的内容进行检查时，就可以利用异常处理机制。怎么做呢？

第一步，自定义异常类，继承RuntimeException（那些不受检查的异常类都继承自该类）。

```java
public class OrderException extends RuntimeException {

	public OrderException() {
		super();
	}
	
	public OrderException(String message) {
		super(message);
	}

}
```

第二步，表单验证的时候，遇到不符合要求的用户输入时使用`throw`关键字抛出自定义异常。

```java
public static void check(String input) {
	if (input == null) {
		throw new OrderException("输入值不能为空");
	}
	
	if (input.length() < 10) {
		throw new OrderException("字符串长度不能少于10个");
	}
}
```

第三步，对自定义异常捕获，做出对应处理。

```java
public class Cmower {
	public static void main(String[] args) {
		try {
			check(args[0]);
		} catch (OrderException e) {
			System.err.println("用户输入条件有误：" + e.getMessage());
		}
	}

}
```

为什么要使用自定义异常来处理用户输入呢？因为用户输入需要检查很多项，而异常处理机制会在遇到第一项错误的时候就停下来，后面的代码是不会执行的——很贴合表单验证的场景。

**2）使用日志记录异常的堆栈信息**

在之前的例子当中，我们一直把错误信息打印在控制台，但正式的应用当中，日志是要被记录在日志文件中的，因为控制台记录的信息是有限的。

限于篇幅原因，日志相关的组件log4j、slf4j以及他们在项目中的配置请查阅资料。

当配置好日志组件后，就可以在需要记录日志信息的类中创建Logger，然后在catch块中使用`logger.error(e.getMessage(), e);`记录详细的异常堆栈信息。具体示例如下：

```java
package com.cmower.java_demo.twelve;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Cmower {
	protected static Logger logger = LoggerFactory.getLogger(Cmower.class);
	public static void check(String input) {
		if (input == null) {
			throw new OrderException("输入值不能为空");
		}
		
		if (input.length() < 10) {
			throw new OrderException("字符串长度不能少于10个");
		}
	}

	public static void main(String[] args) {
		try {
			check(null);
		} catch (OrderException e) {
			logger.error(e.getMessage(), e);
		}
	}

}
/*****************************************
ERROR 2019-01-08 21:38:35,696 com.cmower.java_demo.twelve.Cmower: 输入值不能为空
com.cmower.java_demo.twelve.OrderException: 输入值不能为空
	at com.cmower.java_demo.twelve.Cmower.check(Cmower.java:10)
	at com.cmower.java_demo.twelve.Cmower.main(Cmower.java:20)
*****************************************/
```

### 05、 finally

对于一些代码，我们希望无论`try`块中的异常是否抛出，它们都能够得到执行，这就需要用到`finally`——不管异常是否发生，只要对应的`try`执行了，则它一定也执行。

finally块通常用来做资源释放操作：关闭文件、关闭socket连接、关闭数据库连接等等。示例如下：

```java
try {
	Socket socket = new Socket(serverIp, serverPort);
} catch (IOException e) {
	logger.error(e.getMessage(), e);
} finally {
	socket.close();
}
```


----

上一篇：[Java泛型的重要目的：别让猫别站在狗队里](http://www.itwanger.com/java/2019/11/08/java-fanxing.html)

下一篇：[如果有人再问你 Java 的反射，把这篇文章扔给他](http://www.itwanger.com/java/2019/11/08/java-fanshe.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。

