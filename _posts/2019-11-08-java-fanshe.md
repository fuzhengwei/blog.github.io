---
layout: post
category: java
title: 如果有人再问你 Java 的反射，把这篇文章扔给他
tagline: by 沉默王二
tag: java
---

在 Java 中，并不是所有的类型信息都能在编译阶段明确，有一些类型信息需要在运行时才能确定，这种机制被称为 RTTI，英文全称为 `Run-Time Type Identification`，即运行时类型识别，有没有一点“知行合一”的味道？运行时类型识别主要由Class类实现。


<!--more-->



在日常的学习工作当中，有一些知识是我们在读书的时候就能够习得；但有一些知识不是的，需要在实践的时候才能得到真知——这或许就是王阳明提倡的“知行合一”。



### 01、 Class类

在Java中，我们常用“class”（首字母为小写的c）关键字来定义一个类，说这个类是对某一类对象的抽象。你比如说王二是一个网络知名作者，我们可以这样简单地定义作者类：

```java
package com.cmower.java_demo.fifteen;

class Author {
	private String pen_name;
	private String real_name;
}
```

现在，我们想知道Writer这个类本身的一些信息（比如说类名），该怎么办呢？这时候就需要用到“Class”（首字母为大写的C）类，该类包含了与类有关的信息。请看以下代码：

```java
public class Test {
	public static void main (String [] args) {
		Author wanger = new Author();
		Class c1 = wanger.getClass();
		System.out.println(c1.getName());
		//输出 com.cmower.java_demo.fifteen.Author
	}
}
```

当我们创建了作者对象wanger后，就可以通过`wanger.getClass()`获取wanger的Class对象，通过`c1.getName()`可获得wanger对象的类名。

想象一下，经过五年的刻意练习，王二从一名写作爱好者晋升为一名作家了。我们用代码来假装一下：

```java
package com.cmower.java_demo.fifteen;

class Author {
	private String pen_name;
	private String real_name;
}

class Writer extends Author {
	private String honour;
}

public class Test {
	public static void main (String [] args) {
		Author wanger = new Writer();
		Class c1 = wanger.getClass();
		System.out.println(c1.getName());
		//输出 com.cmower.java_demo.fifteen.Writer
	}
}
```

在上例中，即使我们将Writer的对象引用wanger向上转型为Author，wanger的Class对象类型依然是Writer（通过输出结果可以判定）。这也就是说，**Java能够在运行时自动识别类型的信息**，它不会因为wanger的引用类型是Author而丢失wanger真正的类型信息（Writer）。Java是怎么做到这一点呢？

当Java创建某个类的对象，比如Writer类对象时，Java会检查内存中是否有相应的Class对象。如果内存中没有相应的Class对象，那么Java会在.class文件中寻找Writer类的定义，并加载Writer类的Class对象。

一旦Class对象加载成功，就可以用它来创建这种类型的所有对象。这也就是说，每个对象在运行时都会有对应的Class对象，这个Class对象包含了这个对象的类型信息。因此，我们能够通过Class对象知道某个对象“真正”的类型，并不会因为向上转型而丢失。

### 02、 获取Class对象的其他方式

在使用`getClass()`方法获取一个类的Class对象时，我们必须要先获取这个类的对象，比如上面提到的wanger。如果我们之前没有获取这个类的对象，就需要用另外两种方式来获取类的Class对象：

```java
Class c2 = Writer.class;
System.out.println(c2.getName());

try {
	Class c3 = Class.forName("com.cmower.java_demo.fifteen.Writer");
	System.out.println(c3.getName());
} catch (ClassNotFoundException e) {
	e.printStackTrace();
}
```

1）当使用`.class`来获取Class对象时，不会自动地初始化该Class对象，初始化被延迟到了对静态方法或者非final静态域进行首次引用时才执行。这样做不仅更简单，而且更安全，因为它在编译时就会受到检查（因此不需要置于try语句块中）。

2）`Class.forName`会自动地初始化该Class对象，但需要指定类名，并且需要置于try语句块中。

### 03、 Class类提供的常用方法

Class类为我们提供了一些非常有用的方法，比如说`getName()`用来返回类名，`getPackage()`返回类所在的包名。

我们还可以利用Class类提供的`newInstance()`方法来创建相应类的对象，比如:

```java
Class c2 = Writer.class;
System.out.println(c2.getName());

try {
	Writer wangsan = (Writer) c2.newInstance();
	System.out.println(wangsan);
	// 输出：com.cmower.java_demo.fifteen.Writer@7852e922
} catch (InstantiationException | IllegalAccessException e1) {
	e1.printStackTrace();
}
```

由于我们在创建Class对象c2时没有使用泛型，所以`newInstance()`返回的对象类型需要强转为Writer。我们可以在此基础上进行改进，示例如下：

```java
Class<Writer> c4 = Writer.class;
System.out.println(c4.getName());

try {
	Writer wangsan = c4.newInstance();
	System.out.println(wangsan);
	// 输出：com.cmower.java_demo.fifteen.Writer@7852e922
} catch (InstantiationException | IllegalAccessException e1) {
	e1.printStackTrace();
}
```

### 04、 反射

我们还可以通过`getFields()`获取所有public修饰的字段，通过`getMethods() `返回所有public修饰的方法。

甚至，我们还可以通过`getDeclaredFields()`获取更多字段，包括公共、受保护、默认(包)访问和私有字段，但不包括继承字段。对应的，`getDeclaredMethods()`用来获取更多方法。示例如下：

```java
package com.cmower.java_demo.fifteen;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

class Author {
	private String pen_name;
	private String real_name;
}

class Writer extends Author {
	private String honour;

	private void makeMoney() {
		System.out.println("很多很多钱");
	}
}

public class Test {
	public static void main(String[] args) {

		Class<Writer> c4 = Writer.class;
		System.out.println(c4.getName());

		try {
			Writer wangsan = c4.newInstance();
			System.out.println(wangsan);

			Field[] fields = c4.getDeclaredFields();
			for (Field field : fields) {
				System.out.println(field.getName());
			}

			Method[] methods = c4.getDeclaredMethods();
			for (Method method : methods) {
				System.out.println(method.getName());
			}
		} catch (InstantiationException | IllegalAccessException e1) {
			e1.printStackTrace();
		}

	}
}
```

上面的例子其实涉及到了反射，Field、Method（还有例子中未提到的Constructor）都来自java.lang.reflect类库。Class类与java.lang.reflect类库一起对反射的概念进行了支持。

有时候，我们需要从磁盘文件或网络文件中读取一串字节码，并把它转换成一个类，这时候就需要用到反射。最常见的典型例子就是将一串JSON字符串（在网络传输中最初的形态可能是字节数组）反射为对应类型的对象。

阿里巴巴提供的FastJSON提供了 `toJSONString()` 和 `parseObject()` 方法来将 Java 对象与 JSON 相互转换。调用toJSONString方法即可将对象转换成 JSON 字符串，parseObject 方法则反过来将 JSON 字符串转换成对象。FastJSON的内部其实用的就是反射机制。

```java
package com.cmower.common.util;

import java.io.UnsupportedEncodingException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSON;

@SuppressWarnings("all")
public class JsonUtil {
	private static Log logger = LogFactory.getLog("json");

	public static byte[] objectToByte(Object obj) throws UnsupportedEncodingException {
		String jsonStr = JSON.toJSONString(obj);
		logger.debug("序列化后数据：" + jsonStr);
		return jsonStr.getBytes("UTF-8");
	}

	public static <T> T byteToObject(byte[] data, Class<T> obj) throws UnsupportedEncodingException {
		String objectString = new String(data, "UTF-8");
		logger.debug("反序列化后数据 : " + objectString);
		return JSON.parseObject(objectString, obj);
	}
	
	public static <T> Object stringToObject(String data, Class<T> obj) throws UnsupportedEncodingException {
		logger.debug("反序列化后数据 : " + data);
		return JSON.parseObject(data, obj);
	}
}
```

### 05、 总结

为了完成这篇文章，我特意和[沉默王二交流群](https://mp.weixin.qq.com/s/14UMG0_EX1v_o0zo6xI14w)的一名技术专家聊了聊，问他了几个很傻逼的问题：“‘运行时’是什么意思？是站在Java虚拟机的角度，还是程序员的角度？”

他给了我很好的解释和启发，我不由觉得非常的惭愧，作为一名年纪颇长的Java学习者，竟然对理论知识薄弱到令人发指的地步——不知道你是否也有这样的困惑？

但写作的好处就在于此，在向读者解释“Java如何在运行时识别类型信息”的过程中，我的思路逐渐地清晰了起来——这真是一个自我提升的好办法！

----

上一篇：[Java异常处理：给程序罩一层保险](http://www.itwanger.com/java/2019/11/08/java-exception.html)


下一篇：[Java枚举：小小enum，优雅而干净](http://www.itwanger.com/java/2019/11/09/java-enum.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。

