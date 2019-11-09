---
layout: post
category: java
title: Java 抽象类和接口，看这一篇就够了
tagline: by 沉默王二
tag: java
---

本篇来谈谈 Java 的抽象类和接口。

<!--more-->

曹操在《短歌行》中为杜康酒打过一个价值一亿个亿的广告——“何以解忧，唯有杜康”，我替曹操感到惋惜的是他本人并不会收到这笔不菲的代言费。想一想，要是三国时期的明星人物们有这个代言意识的话，保证各家的军费收入会多出来一个重量级的来源。

不过，酒真的能解忧吗？我不大敢相信。李白就曾质疑过：“举杯消愁愁更愁，抽刀断水水更流。”我和李白持相同的观点，酒啊，真的不容易解忧，但绝对可以增加作者莫名的写作冲动。

我在写本篇之前就小酌了一杯，一不小心激发了我强烈的创作欲望。不过我要奉劝各位，**寒冬之际，如果遇到烦心事，千万别肆意地追求一醉方休，万事要懂得适可而止**。

### 01、 抽象类

一种比较苍白的说法是：在 Java 中，通过关键字 `abstract` 定义的类叫做抽象类。Java 是一门面向对象的语言，因此所有的对象都是通过类来描述的；但反过来，并不是所有的类都是用来描述对象的，抽象类就是其中的一种。

以下示例展示了一个简单的抽象类：
```java
// 个人认为，一名教练必须攻守兼备
abstract class Coach {
	public abstract void defend();

	public abstract void attack();
}
```

在一个抽象类中，至少有一个抽象方法（通过关键字 `abstract` 定义的方法，并且没有方法体，如上例中的 `defend()` 方法和 `attack()` 方法），否则就没有必要称之为抽象类。需要注意的是，**抽象类是不能实例化的！** 它需要被一个子类继承，就像以下示例那样。

```java
abstract class Coach {
	public abstract void defend();

	public abstract void attack();
}


class Hesai extends Coach {

	@Override
	public void defend() {
		System.out.println("防守赢得冠军");
	}

	@Override
	public void attack() {
		System.out.println("控球是把双刃剑");
	}
}

public class Demo {
	public static void main(String[] args) {
		Coach moliniao = new Hesai();
		moliniao.defend();
		moliniao.attack();
	}
}
```

我们都知道，一个好的教练，必须攻守兼备，但每个教练的进攻理念和防守理念不尽相同。因此，我在教练这个抽象类（Coach）中定义两个抽象方法，一个进攻（attack）一个防守（defend），这两个方法的具体实现都要由抽象类的子类确定，抽象类本身并不负责。

我们也都知道，何塞·穆里尼奥是足球界的顶级教练。他是我最爱的足球教练，没有之一。尽管他在曼联的失败有他自身的原因，但我依然崇拜他，因为：“请不要说我傲慢，因为我只是实话实说，我是欧洲冠军，因此我并非籍籍无名，而是特殊的一个！”他是固执的反控球主义者，坚信控球是把双刃剑，防守赢得冠军。

好了，对于抽象类我们简单总结一下：

1、抽象类不能被实例化。
2、抽象类应该至少有一个抽象方法，否则它没有任何意义。
3、抽象类中的抽象方法没有方法体。
4、抽象类的子类必须给出父类中的抽象方法的具体实现，除非该子类也是抽象类。

### 02、 接口

我们知道，有抽象方法的类被称为抽象类，也就意味着抽象类中还能有不是抽象方法的方法。这样的类就不能算作纯粹的接口，尽管它也可以提供接口的功能——只能说抽象类是普通类与接口之间的一种中庸之道。

**接口（英文：Interface），在 Java 中是一个抽象类型，是抽象方法的集合**；接口通过关键字 `interface` 来定义。接口与抽象类的不同之处在于：

1、抽象类可以有方法体的方法，但接口没有。
2、接口中的成员变量隐式为 `static final`，但抽象类不是的。
3、一个类可以实现多个接口，但只能继承一个抽象类。

以下示例展示了一个简单的接口：

```java
// 隐式的abstract
interface Coach {
	// 隐式的public
	void defend();
	void attack();
}
```

接口是隐式抽象的，所以声明时没有必要使用 `abstract` 关键字；接口的每个方法都是隐式抽象的，所以同样不需要使用 `abstract` 关键字；接口中的方法都是隐式 `public` 的。

和抽象类一样，接口也不能直接被实例化，它需要一个类来实现它，就像以下示例展示那样。

```java
class Hesai implements Coach {

	@Override
	public void defend() {
		System.out.println("防守赢得冠军");
	}

	@Override
	public void attack() {
		System.out.println("控球是把双刃剑");
	}
}

public class Demo2 {
	public static void main(String[] args) {
		Coach moliniao = new Hesai();
		moliniao.defend();
		moliniao.attack();
	}
}
```

实现一个接口需要用到关键字 `implements`，它表示：“我这个类遵从了接口的协议，如果你想使用我，看接口就行了，具体实现不用关心。”

### 03、 实现多个接口

在现实生活中，**何塞·穆里尼奥不止是一名足球教练，他还是一个值得被尊重的英雄**——凭借自身的努力，他从一名籍籍无名的跟班翻译，逐渐蜕变为一名家喻户晓的顶级教练。

如果要在程序的世界里体现何塞·穆里尼奥的多重角色，就可以使用接口，就像以下示例展示那样。

```java
package com.cmower.java_demo.nine.inf;

interface Coach {
	// 隐式的public
	void defend();
	void attack();
}

interface Hero {
	void fight();
}


class Hesai implements Coach, Hero {

	@Override
	public void defend() {
		System.out.println("防守赢得冠军");
	}

	@Override
	public void attack() {
		System.out.println("控球是把双刃剑");
	}

	@Override
	public void fight() {
		System.out.println("只要一息尚存，就应该战斗到最后");
	}
}

public class Demo2 {
	public static void defend(Coach coach) {
		coach.defend();
	}
	
	public static void fight(Hero hero) {
		hero.fight();
	}
	
	public static void main(String[] args) {
		Hesai moliniao = new Hesai();
		defend(moliniao);
		fight(moliniao);
	}
}
```

可以看到，创建的 Hesai 对象可以向上转型为 Coach 和 Hero，然后调用各自接口中实现的具体方法，因为 Hesai 这个类同时实现了两个接口，分别是 Coach 和 Hero（`class Hesai implements Coach, Hero`，接口之间通过英文逗号隔开）。

### 04、 接口在应用中常见的三种模式

**在编程领域，好的设计模式能够让我们的代码事半功倍**。在使用接口的时候，经常会用到三种模式，分别是策略模式、适配器模式和工厂模式。

1）策略模式

策略模式的思想是，针对一组算法，将每一种算法封装到具有共同接口的实现类中，接口的设计者可以在不影响调用者的情况下对算法做出改变。示例如下：

```java
// 接口：教练
interface Coach {
	// 方法：防守
	void defend();
}

// 何塞·穆里尼奥
class Hesai implements Coach {

	@Override
	public void defend() {
		System.out.println("防守赢得冠军");
	}
}

// 德普·瓜迪奥拉
class Guatu implements Coach {

	@Override
	public void defend() {
		System.out.println("进攻就是最好的防守");
	}
}

public class Demo {
	// 参数为接口
	public static void defend(Coach coach) {
		coach.defend();
	}
	
	public static void main(String[] args) {
		// 为同一个方法传递不同的对象
		defend(new Hesai());
		defend(new Guatu());
	}
}
```

`Demo.defend()` 方法可以接受不同风格的 Coach，并根据所传递的参数对象的不同而产生不同的行为，这被称为“策略模式”。

2）适配器模式

适配器模式的思想是，针对调用者的需求对原有的接口进行转接。生活当中最常见的适配器就是HDMI（英语：`High Definition Multimedia Interface`，中文：高清多媒体接口）线，可以同时发送音频和视频信号。适配器模式的示例如下：

```java
interface Coach {
	void defend();
	void attack();
}

// 抽象类实现接口，并置空方法
abstract class AdapterCoach implements Coach {
	public void defend() {};
	public void attack() {};
}

// 新类继承适配器
class Hesai extends AdapterCoach {
	public void defend() {
		System.out.println("防守赢得冠军");
	}
}

public class Demo {
	public static void main(String[] args) {
		Coach coach = new Hesai();
		coach.defend();
	}
}
```
Coach 接口中定义了两个方法（`defend()` 和 `attack()`），如果类直接实现该接口的话，就需要对两个方法进行实现。

如果我们只需要对其中一个方法进行实现的话，就可以使用一个抽象类作为中间件，即适配器（AdapterCoach），用这个抽象类实现接口，并对抽象类中的方法置空（方法体只有一对花括号），这时候，新类就可以绕过接口，继承抽象类，我们就可以只对需要的方法进行覆盖，而不是接口中的所有方法。

3）工厂模式

所谓的工厂模式理解起来也不难，就是什么工厂生产什么，比如说宝马工厂生产宝马，奔驰工厂生产奔驰，A 级学院毕业 A 级教练，C 级学院毕业 C 级教练。示例如下：

```java
// 教练
interface Coach {
	void command();
}

// 教练学院
interface CoachFactory {
	Coach createCoach();
}

// A级教练
class ACoach implements Coach {

	@Override
	public void command() {
		System.out.println("我是A级证书教练");
	}
	
}

// A级教练学院
class ACoachFactory implements CoachFactory {

	@Override
	public Coach createCoach() {
		return new ACoach();
	}
	
}

// C级教练
class CCoach implements Coach {

	@Override
	public void command() {
		System.out.println("我是C级证书教练");
	}
	
}

// C级教练学院
class CCoachFactory implements CoachFactory {

	@Override
	public Coach createCoach() {
		return new CCoach();
	}
	
}

public class Demo {
	public static void create(CoachFactory factory) {
		factory.createCoach().command();
	}
	
	public static void main(String[] args) {
		// 对于一支球队来说，需要什么样的教练就去找什么样的学院
		// 学院会介绍球队对应水平的教练。
		create(new ACoachFactory());
		create(new CCoachFactory());
	}
}
```

有两个接口，一个是 Coach（教练），可以 `command()`（指挥球队）；另外一个是 CoachFactory（教练学院），能 `createCoach()`（教出一名优秀的教练）。然后 ACoach 类实现 Coach 接口，ACoachFactory 类实现 CoachFactory 接口；CCoach 类实现 Coach 接口，CCoachFactory 类实现 CoachFactory 接口。当需要 A 级教练时，就去找 A 级教练学院；当需要 C 级教练时，就去找 C 级教练学院。

依次类推，我们还可以用 BCoach 类实现 Coach 接口，BCoachFactory 类实现 CoachFactory 接口，从而不断地丰富教练的梯队。

### 05、 总结

尽管接口使得抽象更进一步，但任何抽象性都应该根据真正的需求而产生，因此恰当的原则是优先选择类而不是接口，只有在真正需要接口的时候再重构代码。

----

上一篇：[Java：多态乃幸福本源](http://www.itwanger.com/java/2019/11/06/java-duotai.html)

下一篇：[Java内部类真的那么难以理解？](http://www.itwanger.com/java/2019/11/07/java-inner-class.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G Java 高质量教学视频（已分门别类）。