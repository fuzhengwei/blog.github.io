---
layout: post
category: java
title: Java内部类
tagline: by 沉默王二
tag: java
---

Java内部类真的很难理解，但有必要搞懂，因为内部类让外部类更丰富多彩了，就好像一个人的心中还可以住着另外一个人。


<!--more-->

### 01 前言

昨天晚上，我把车停好以后就回家了。回家后才发现手机落在车里面了，但外面太冷，冷到骨头都能感受到寒意——实在是不想返回一趟去取了（小区的安保还不错，不用担心被砸车玻璃），于是打定主意过几个小时的“世外桃源”生活——别人找不到我，我也找不到别人，这种与世隔绝的状态非常适合读书写作。

把厚厚的《Java编程思想》摆在桌子上，正襟危坐，认认真真地读起了第十章——内部类。尽管我已经非常耐心和用心了，但内部类的这一章非常的枯燥，并且难以理解，我整个人几乎处于崩溃的边缘。

很早之前，有想要转行学习Java的朋友咨询我，有哪方面的书可以推荐，我郑重其事地介绍了《Java编程思想》，并且一再叮嘱他这是一本Java入门级的经典书，必须耐着性子读完它。现在想想，自己当时的推荐真是轻率！

我这样说，并不是为了否认《Java编程思想》这本书的价值，因为站在书本的角度，它可能会感慨说：这王二的学习能力有问题啊，读我竟然这么困难！

不是有那样一句话嘛：“**如果你手里有一把锤子，所有东西看上去都像钉子**。”我认为“内部类”这一章很难懂，其根本的原因在于我对“内部类”没有很好的理解。想要继续扎实Java的基础知识，唯一要做的就是——想尽一切办法搞懂“内部类”，并梳理成文。

### 02 内部类的定义

顾名思义，**内部类就是放在另外一个类的内部定义的类**。非常重要的一点是，内部类能够访问外部类的所有成员，包括`private`修饰的。

来看程序清单1-1：

```java
public class Wanger {
	private int age;
	public Wanger(int age) {
		this.age = age;
	}
	
	class Thought {
		public void know() {
			System.out.println("沉默王二的年龄" + age);
		}
	}
	
	public Thought getThought() {
		return new Thought();
	}

	public static void main(String[] args) {
		Wanger wanger = new Wanger(29);
		Wanger.Thought thought = wanger.getThought();
		thought.know(); // 输出：沉默王二的年龄29
		
		// 使用.new的形式创建内部类对象
		Wanger.Thought thought1 = wanger.new Thought();
		thought1.know();
	}
}
```

程序清单1-1要表达什么意思呢？

答案是：我，沉默王二，已经29岁了，89年出生（有人说89年出生明明是30岁）。上了年纪了，总想装点嫩，理解一下。我读书不多，但特别爱思考，于是我就给自己创建了一个会思考的内部类Thought。

从程序清单1-1可以看得出，尽管Thought是内部类，但可以访问外部类Wanger的私有成员变量age。

如果想创建内部类的对象，需要先指明对象引用的类型，格式为OuterClassName.InnerClassName，就像main()方法中的`Wanger.Thought`那样。

紧接着，就要来创建内部类对象了，有两种形式。第一种形式是先在外部类中定义一个方法`Thought getThought()`，返回使用`new`关键字创建的内部类对象，然后使用外部类对象调用该方法`wanger.getThought()`；第二种形式是直接通过外部类对象`.new`创建`wanger.new Thought()`。

### 03 匿名内部类

以我的编程经验来看，匿名内部类使用最频繁的场合就是在创建线程的时候。

来看程序清单2-1：

```java
public class Demo {

	public void test(String title) {
		Thread thread = new Thread(new Runnable() {

			@Override
			public void run() {
				// title = "我不要吃鸡";
				// 改变时会提示错误
				// 在封闭范围中定义的局部变量必须是final的。
				System.out.println(title);
			}
		});
		thread.start();
	}

	public static void main(String[] args) {
		for (int i = 0; i < 10; i++) {
			Demo demo = new Demo();
			demo.test("我要吃鸡" + i);
		}
	}
	
}
```

在程序清单2-1中，test()方法内部有一个线程对象thread，是通过new Thread()创建的。`new Thread()`可以接收一个实现了Runnable接口类型的对象，这个对象要怎么创建呢？可以通过匿名内部类的形式来创建——`new Runnable() {public void run(){......}}`——这段简短的代码等同于：

```java
// 实现Runnable接口
class MyRunnable implements Runnable {

	@Override
	public void run() {
		
	}
}

// 向上转型
Runnable myRunnable = new MyRunnable();
```

**匿名内部类的好处就在于不仅节省了定义实现类的过程，还能够自动向上转型**。

在程序清单2-1中，test()方法还有一个参数title，JDK1.8之前，编译器要求它必须是final类型的。但JDK1.8之后，如果我们在匿名内部类中需要访问局部变量，那么这个局部变量不再需要用`final`关键字修饰了。

但如果想要在匿名内部类中改变局部变量的值，编译器就会提醒你不能这样做，它会提示：“在封闭范围中定义的局部变量必须是final的。”

### 04 为什么需要内部类

Java的内部类让我很容易的想起来JavaScript的闭包，闭包就是定义在一个函数内部的函数——这听起来和Java的内部类定义一样一样的。本质上，闭包是将函数内部与函数外部连接起来的桥梁。内部类一样，它是将内部类与外部类连接起来的桥梁。

来看看什么是闭包吧：

```js
function wanger() {
	var age = 30;
	function know() {
		console.log(age);
	}
}

wanger();
// 控制台输出30
```

除此之外，内部类最引人注意的原因是：

**内部类可以独立地继承一个抽象类或者实现一个接口，无论外部类是否也这样做了，对内部类都没有影响**。

----

上一篇：[Java 抽象类和接口，看这一篇就够了](http://www.itwanger.com/java/2019/11/06/java-abstract-interface.html)

下一篇：[Java String，看这篇就够了](http://www.itwanger.com/java/2019/11/08/java-string.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G Java 高质量教学视频（已分门别类）。