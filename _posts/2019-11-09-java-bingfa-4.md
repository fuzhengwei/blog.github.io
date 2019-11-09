---
layout: post
category: java
title: Java 并发编程(四)：如何保证对象的线程安全性
tagline: by 沉默王二
tag: java
---

本篇来谈谈 Java 并发编程：如何保证对象的线程安全性。

<!--more-->




### 01、前言

先让我吐一句肺腑之言吧，不说出来会憋出内伤的。《Java 并发编程实战》这本书太特么枯燥了，尽管它被奉为并发编程当中的经典之作，但我还是忍不住。因为第四章“对象的组合”我整整啃了两周的时间，才啃出来点肉丝。

读者朋友们见谅啊。要怪只能怪我自己的学习能力有限，真读不了这种生硬无趣的技术书。但是为了学习，为了进步，为了将来（口号喊得有点大了），只能硬着头皮上。

请随我来，我尽量写得有趣点。

### 02、线程安全类

作者说了啊，设计一个线程安全类需要三个步骤：

>1）找出表示对象状态的所有变量
2）对变量进行有效性约束
3）增加类的并发访问策略

我在作者说的基础上做了微调，读起来更加容易理解。怎么和代码对应起来了，先来看一个普通的计数器类 Counter。

```java
public class Counter {
    private int value = 0;

    public int getValue() {
        return value;
    }

    public int increment() {
        return ++value;
    }
}
```

1）Counter 的状态变量只有一个，就是 value。

2）value 的有效性是什么呢，它最大不能超过 ` Integer.MAX_VALUE`，最小只能为 0（计数嘛，总不能记成负数）。换句话说就是，value 的有效范围是 0 ~ ` Integer.MAX_VALUE`。

```java
public int increment() {
    if (value == Integer.MAX_VALUE) {
        throw new IllegalStateException("counter overflow");
    }
    return ++value;
}
```

3）增加类的并发访问策略，直接上 synchronized。

```java
public class Counter {
    private int value = 0;

    public synchronized int getValue() {
        return value;
    }

    public synchronized int increment() {
        if (value == Integer.MAX_VALUE) {
            throw new IllegalStateException("counter overflow");
        }
        return ++value;
    }
}
```

### 03、非线程安全的对象

之前我们谈了如何设计一个线程安全的类。如果类是安全的，那么它作为对象使用的时候就是线程安全的。但如果一个类不是线程安全的，它作为对象使用的时候怎么保证是线程安全的呢？

作者提到了一个名词叫做“封闭机制”：

1）把对象作为类的私有成员变量；
2）把对象作为方法内部的局部变量；
3）线程 A 把对象传递到 B 线程，而不是与线程 B 共享这个对象；

大家来看下面这段代码。

```java
class StringList {
	private List<String> myList = new ArrayList<>();
	
	public synchronized void addString(String s) {
		myList.add(s);
	}
	
	public synchronized void removeString(String s) {
		myList.remove(s);
	}
}
```

本身 ArrayList 不是线程安全的，但 myList 是私有的，访问它的两个方法 `addString()` 和 `removeString()` 都加了关键字 `synchronized`，因此 myList 在使用的时候就变成了线程安全的对象，StringList 类就变成了一个线程安全的类——这种方式被称作 Java 监视器模式：可变的状态被封装在一个类中，访问它们只能通过加上锁的方法。

查看 Vector 的源码，你会发现，它之所以是线程安全的，就是采用的这种监视器模式

### 04、在已有的线程安全类上追加功能

假如现在有一个线程安全的类，比如之前提到的 StringList，它包含了大多数我们需要的功能，但还不够，那么怎么确保我们追加的功能不破坏原有的线程安全性呢？

最直接的方法当然是修改源码，假如源码掌握在我们自己手里的话。

```java
class StringList {
	private List<String> myList = new ArrayList<>();
	
	public synchronized void addString(String s) {
		myList.add(s);
	}
	
	public synchronized void addIfNotExist(String s) {
		boolean isExist = myList.contains(s);
		if (!isExist) {
			myList.add(s);
		}
	}
}
```

我们新增了一个 `addIfNotExist()` 方法：如果字符串 s 还没有添加到 List 当中，就添加一个。

新增的方法没有破坏 StringList 的线程安全性，因为当两个线程同时执行  `addIfNotExist()` 方法时，需要经过 `synchronized` 把守的这道大门。

但很多时候，我们无法直接修改源码，这时候就只好在原来的基础上进行改造。大家听过之前的“红芯”浏览器吗？在谷歌浏览器的内核上裹了一层层皇帝的新衣。

```java
class StringList {
	protected List<String> myList = new ArrayList<>();
	
	public synchronized void addString(String s) {
		myList.add(s);
	}
}

public class NewStringList extends StringList {
	public synchronized void addIfNotExist(String s) {
		boolean isExist = myList.contains(s);
		if (!isExist) {
			myList.add(s);
		}
	}
}
```

新建一个类 NewStringList，继承自 StringList，然后在 NewStringList 中新增一个方法 `addIfNotExist()`。当然了，这样做的前提是父类中的 myList 是 protected 而不是 private 的。因此，这种做法不具有普适性。

### 05、最后

站在我的角度来看，《Java 并发编程实战》的第四章“对象的组合”写得烂透了。导致我在写这篇文章的时候感觉到万分的痛苦。希望下一章不要写的这么烂。

上一篇：[如何保证共享变量的可见性？](https://mp.weixin.qq.com/s/gTAJdfylc19QwDws5I-2FQ)

上上篇：[如何保证共享变量的原子性？](http://www.itwanger.com/java/2019/11/09/java-bingfa-3.html)



微信搜索「**沉默王二**」公众号，关注后回复「**Java 并发编程实战**」即可获取该书的电子版（推荐购买纸质书）。



