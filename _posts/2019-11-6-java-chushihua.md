---
layout: post
category: java
title: Java是通过什么机制来确保对象初始化呢？
tagline: by 沉默王二
tag: java
---

在 Java 中，无论是对象，还是基本类型，都不允许在未经初始化的情况下使用它们；否则，Java 编译器就会热情地提醒你——请初始化后再使用。

<!--more-->

那，Java 是通过什么机制来确保对象初始化呢？

答案就是“**构造器**”——类的对象要被正确的初始化，就必须先过构造器这一关。

程序清单1-1：一个带有构造器的简单类

```java
class Writer {
	public Writer() {
		System.out.println("我是一名写作爱好者");
	}
	
	public static void main(String[] args) {
		new Writer();
	}
}
```

当使用关键字 new 来创建一个对象 Writer 时，就会调用构造器（与类名 Writer 相同的方法 `Writer()`）进行初始化，因此上述程序就会输出“我是一名写作爱好者”。

构造方法 `Writer()` 没有参数，因此被称为无参构造器；事实上，无参构造器是可以省略的——编译器会自动创建一个无参构造器，被称为“默认构造器”（Java 设计者真的无比明智啊——帮助程序员省去了创建默认构造器的麻烦）。

程序清单1-2：默认构造器

```java
class Writer {
	public static void main(String[] args) {
		new Writer();
	}
}
```

默认构造器并不会一直“默认”存在，如果已经定义了一个构造器，无论有参还是无参，编译器将不再自动创建默认构造器。

程序清单1-3：不会一直存在的默认构造器

```java
class Writer {
	public Writer(String name) {
		System.out.println(name + "是一名写作爱好者");
	}
	
	public static void main(String[] args) {
		new Writer();
		new Writer("沉默王二");
	}
}
```

一旦定义了一个有参构造器，那么在创建对象的时候就必须传递构造器需要的参数，否则编译器会提示“The constructor Writer() is undefined”（使用 `new Writer()` 创建对象对）——这样做的好处就是，确保对象在初始化的时候符合类设计的初衷（上例中，Writer 需要指定作者姓名，所以你在创建 Writer 对象时不能不传递作者姓名）。

读王小波的《沉默的大多数》，我喜欢上了一句话：“参差不齐乃幸福本源”。王小波的意思可能是想说：一个能容忍不同观点与不同的生活方式的社会，才是一个幸福的社会。那么，在 Java 的世界里，也有一个幸福的社会。

由于构造器的特殊性（不能与其他成员方法的名字冲突），导致构造器的名字必须和类名保持一致，也就是说，一个类，只能有一个构造器名。这似乎局限了构造器的使用方式。但其实不然，Java 允许方法重载——可以只有一个方法名，但方法的参数列表可不尽相同；哎，问题就这么巧妙的解决了。

程序清单2-1：构造方法的重载

```java
class Writer {
	private String name;
	private String bookName;

	public Writer(String name) {
		this.name = name;
		System.out.println(name + "是一名写作爱好者");
	}

	public Writer(String name, String bookName) {
		this.name = name;
		this.bookName = bookName;

		System.out.println(name + "不仅是一名写作爱好者，还出版了书籍" + bookName);
	}

	public static void main(String[] args) {
		new Writer("沉默王二");
		new Writer("沉默王三", "《Web全栈开发进阶之路》");
	}
}
```

你看，沉默王二没出版书籍，可以是一名写作爱好者；沉默王三虽然出版了书籍《Web全栈开发进阶之路》，但仍然和王二是好兄弟，并没有看不起王二（从来没说过：“王二，你个渣渣，连本书都没有出版，好意思说自己是写作爱好者？”）。是不是很和谐？

Java 该如何区分重载方法（毕竟参数名相同）呢？上例中，你也看到了，参数个数的不同就可以区分；另外，参数的类型和顺序（不建议使用，因为这样做会让代码难以维护，见下例）也可以用来作为区分的条件。

程序清单2-2：难以维护的方法重载（靠顺序，别这样！）

```java
class Writer {
	private String name;
	private int age;
	
	public Writer(String name, int age) {
		this.name = name;
		this.age = age;
	}
	
	public Writer(int age, String name) {
		this.age = age;
		this.name = name;
	}
}
```

----

上一篇：[Java 流程控制语句](http://www.itwanger.com/java/2019/11/06/java-liuchengkongzhi.html)

下一篇：[Java 访问权限控制：public、private、protected](http://www.itwanger.com/java/2019/11/07/java-public-private-protected.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G Java 高质量教学视频（已分门别类）。