---
layout: post
category: java
title: Java：多态乃幸福本源
tagline: by 沉默王二
tag: java
---

多态就是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编译时并不确定，而是在程序运行期间才确定；即一个引用变量倒底会指向哪个类的实例对象，该引用变量发出的方法调用到底是哪个类中实现的方法，必须在由程序运行期间才能决定。


<!--more-->

### 01、 多态是什么

在我刻板的印象里，西游记里的那段孙悟空和二郎神的精彩对战就能很好的解释“多态”这个词：一个孙悟空，能七十二变；一个二郎神，也能七十二变；他们都可以变成不同的形态，但只需要悄悄地喊一声“变”。

Java的多态是什么呢？其实就是一种能力——同一个行为具有不同的表现形式；换句话说就是，执行一段代码，Java 在运行时能根据对象的不同产生不同的结果。和孙悟空和二郎神都只需要喊一声“变”，然后就变了，并且每次变得还不一样；一个道理。

多态的前提条件有三个：

* 子类继承父类
* 子类覆盖父类的方法
* 父类引用指向子类对象

多态的一个简单应用，来看程序清单1-1：

```java
//子类继承父类
public class Wangxiaoer extends Wanger {
	public void write() { // 子类覆盖父类方法
		System.out.println("记住仇恨，表明我们要奋发图强的心智");
	}

	public static void main(String[] args) {
		// 父类引用指向子类对象
		Wanger[] wangers = { new Wanger(), new Wangxiaoer() };

		for (Wanger wanger : wangers) {
			// 对象是王二的时候输出：勿忘国耻
			// 对象是王小二的时候输出：记住仇恨，表明我们要奋发图强的心智
			wanger.write();
		}
	}
}

class Wanger {
	public void write() {
		System.out.println("勿忘国耻");
	}
}
```

### 02、 多态与后期绑定

现在，我们来思考一个问题：程序清单1-1在执行 `wanger.write()` 时，由于编译器只有一个 Wanger 引用，它怎么知道究竟该调用父类 Wanger 的 `write()` 方法，还是子类 Wangxiaoer 的 `write()` 方法呢？

答案是在运行时根据对象的类型进行后期绑定，编译器在编译阶段并不知道对象的类型，但是Java的方法调用机制能找到正确的方法体，然后执行出正确的结果。

多态机制提供的一个重要的好处程序具有良好的扩展性。来看程序清单2-1：

```java
//子类继承父类
public class Wangxiaoer extends Wanger {
	public void write() { // 子类覆盖父类方法
		System.out.println("记住仇恨，表明我们要奋发图强的心智");
	}
	
	public void eat() {
		System.out.println("我不喜欢读书，我就喜欢吃");
	}

	public static void main(String[] args) {
		// 父类引用指向子类对象
		Wanger[] wangers = { new Wanger(), new Wangxiaoer() };

		for (Wanger wanger : wangers) {
			// 对象是王二的时候输出：勿忘国耻
			// 对象是王小二的时候输出：记住仇恨，表明我们要奋发图强的心智
			wanger.write();
		}
	}
}

class Wanger {
	public void write() {
		System.out.println("勿忘国耻");
	}
	
	public void read() {
		System.out.println("每周读一本好书");
	}
}
```

在程序清单 2-1 中，我们在 Wanger 类中增加了 read() 方法，在 Wangxiaoer 类中增加了eat()方法，但这丝毫不会影响到 write() 方法的调用。write() 方法忽略了周围代码发生的变化，依然正常运行。这让我想起了金庸《倚天屠龙记》里九阳真经的口诀：“他强由他强，清风拂山岗；他横由他横，明月照大江。”

多态的这个优秀的特性，让我们在修改代码的时候不必过于紧张，因为多态是一项让程序员“将改变的与未改变的分离开来”的重要特性。

### 03、 多态与构造器

在构造器中调用多态方法，会产生一个奇妙的结果，我们来看程序清单3-1：

```java
public class Wangxiaosan extends Wangsan {
	private int age = 3;
	public Wangxiaosan(int age) {
		this.age = age;
		System.out.println("王小三的年龄：" + this.age);
	}
	
	public void write() { // 子类覆盖父类方法
		System.out.println("我小三上幼儿园的年龄是：" + this.age);
	}
	
	public static void main(String[] args) {
		new Wangxiaosan(4);
//		上幼儿园之前
//		我小三上幼儿园的年龄是：0
//		上幼儿园之后
//		王小三的年龄：4
	}
}

class Wangsan {
	Wangsan () {
		System.out.println("上幼儿园之前");
		write();
		System.out.println("上幼儿园之后");
	}
	public void write() {
		System.out.println("老子上幼儿园的年龄是3岁半");
	}
}
```

从输出结果上看，是不是有点诧异？明明在创建 Wangxiaosan 对象的时候，年龄传递的是 4，但输出结果既不是“老子上幼儿园的年龄是 3 岁半”，也不是“我小三上幼儿园的年龄是：4”。

为什么？

因为在创建子类对象时，会先去调用父类的构造器，而父类构造器中又调用了被子类覆盖的多态方法，由于父类并不清楚子类对象中的属性值是什么，于是把int类型的属性暂时初始化为 0，然后再调用子类的构造器（子类构造器知道王小二的年龄是 4）。

### 04、 多态与向下转型

向下转型是指将父类引用强转为子类类型；这是不安全的，因为有的时候，父类引用指向的是父类对象，向下转型就会抛出 ClassCastException，表示类型转换失败；但如果父类引用指向的是子类对象，那么向下转型就是成功的。

来看程序清单4-1：

```java
public class Wangxiaosi extends Wangsi {
	public void write() {
		System.out.println("记住仇恨，表明我们要奋发图强的心智");
	}

	public void eat() {
		System.out.println("我不喜欢读书，我就喜欢吃");
	}

	public static void main(String[] args) {
		Wangsi[] wangsis = { new Wangsi(), new Wangxiaosi() };

		// wangsis[1]能够向下转型
		((Wangxiaosi) wangsis[1]).write();
		// wangsis[0]不能向下转型
		((Wangxiaosi)wangsis[0]).write();
	}
}

class Wangsi {
	public void write() {
		System.out.println("勿忘国耻");
	}

	public void read() {
		System.out.println("每周读一本好书");
	}
}
```

### 05、总结

我喜欢把复杂的事情尽量简单化，把简单的事情有趣化——多态是 Java 的三大特性之一，它本来需要长篇大论的介绍，但我觉得实在没有必要，把关键的知识点提炼出来就足够了。更重要的是，你要通过实践去感知多态的优秀之处。

chenssy 大佬对多态下了一个非常经典的结论，我们不妨大声的朗读几遍：

***多态就是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编译时并不确定，而是在程序运行期间才确定；即一个引用变量倒底会指向哪个类的实例对象，该引用变量发出的方法调用到底是哪个类中实现的方法，必须在由程序运行期间才能决定。因为在程序运行时才确定具体的类，这样，不用修改源程序代码，就可以让引用变量绑定到各种不同的类实现上，从而导致该引用调用的具体方法随之改变，即不修改程序代码就可以改变程序运行时所绑定的具体代码，让程序可以选择多个运行状态，这就是多态性。***

----

上一篇：[Java代码复用的三种常用方式：继承、组合和代理](http://www.itwanger.com/java/2019/11/06/java-code-fuyong.html)

下一篇：[Java 抽象类和接口，看这一篇就够了](http://www.itwanger.com/java/2019/11/06/java-abstract-interface.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G Java 高质量教学视频（已分门别类）。