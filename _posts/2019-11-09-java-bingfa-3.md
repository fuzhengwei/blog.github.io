---
layout: post
category: java
title: Java 并发编程(三)：如何保证共享变量的可见性？
tagline: by 沉默王二
tag: java
---

[上一篇](https://mp.weixin.qq.com/s/HRAabyY-cLcAK_v9x0pMXw)，我们谈了谈如何通过**同步**来保证共享变量的原子性（一个操作或者多个操作要么全部执行并且执行的过程不会被任何因素打断，要么就都不执行），本篇我们来谈一谈如何保证共享变量的可见性（多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值）。

<!--more-->




我们使用**同步**的目的不仅是，不希望某个线程在使用对象状态时，另外一个线程在修改状态，这样容易造成混乱；我们还希望某个线程修改了对象状态后，其他线程能够看到修改后的状态——这就涉及到了一个新的名词：内存（可省略）可见性。

要了解可见性，我们得先来了解一下 Java 内存模型。

Java 内存模型（Java Memory Model，简称 JMM）描述了 Java 程序中各种变量（线程之间的共享变量）的访问规则，以及在 JVM 中将变量存储到内存→从内存中读取变量的底层细节。

要知道，所有的变量都是存储在主内存中的，每个线程会有自己独立的工作内存，里面保存了该线程使用到的变量副本（主内存中变量的一个拷贝）。见下图。

![](http://www.itwanger.com/assets/images/2019/11/java-bingfa-3-1.png)

也就是说，线程 1 对共享变量 chenmo 的修改要想被线程 2 及时看到，必须要经过 2 个步骤:

1、把工作内存 1 中更新过的共享变量刷新到主内存中。
2、将主内存中最新的共享变量的值更新到工作内存 2 中。

那假如共享变量没有及时被其他线程看到的话，会发生什么问题呢？

```java
public class Wanger {
	private static boolean chenmo = false;

	public static void main(String[] args) {
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				while (!chenmo) {
				}
			}
		});
		thread.start();
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		chenmo = true;

	}

}
```

这段代码的本意是：在主线程中创建子线程，然后启动它，当主线程休眠 500 毫秒后，把共享变量 chenmo 的值修改为 true 的时候，子线程中的 while 循环停下来。但运行这段代码后，程序似乎进入了死循环，过了 N 个 500 毫秒，也没有要停下来的意思。

为什么会这样呢？

因为主线程对共享变量 chenmo 的修改没有及时通知到子线程（子线程在运行的时候，会将 chenmo 变量的值拷贝一份放在自己的工作内存当中），当主线程更改了 chenmo 变量的值之后，但是还没来得及写入到主存当中，那么子线程此时就不知道主线程对 chenmo 变量的更改，因此还会一直循环下去。

换句话说，就是：普通的共享变量不能保证可见性，因为普通共享变量被修改之后，什么时候被写入主内存是不确定的，当其他线程去读取时，此时内存中可能还是原来的旧值，因此无法保证可见性。

那怎么解决这个问题呢？

>使用 volatile 关键字修饰共享变量 chenmo。

因为 volatile 变量被线程访问时，会强迫线程从主内存中重读变量的值，而当变量被线程修改时，又会强迫线程将最近的值刷新到主内存当中。这样的话，线程在任何时候总能看到变量的最新值。 

我们来使用 volatile 修饰一下共享变量 chenmo。

```java
private static volatile boolean chenmo = false;
```

再次运行代码后，程序在一瞬间就结束了，500 毫秒毕竟很短啊。在主线程（main 方法）将 chenmo 修改为 true 后，chenmo 变量的值立即写入到了主内存当中；同时，导致子线程的工作内存中缓存变量 chenmo 的副本失效了；当子线程读取 chenmo 变量时，发现自己的缓存副本无效了，就会去主内存读取最新的值(由 false 变为 true 了)，于是 while 循环也就停止了。

也就是说，在某种场景下，我们可以使用 volatile 关键字来安全地共享变量。这种场景之一就是：**状态真正独立于程序内地其他内容，比如一个布尔状态标志（从 false 到 true，也可以再转换到 false），用于指示发生了一个重要的一次性事件**。

至于 volatile 的原理和实现机制，本篇不再深入展开了（小编自己没搞懂，尴尬而不失礼貌的笑一笑）。

需要再次强调地是：

>volatile 变量可以被看作是一种 “程度较轻的 synchronized”；与 synchronized 相比，volatile 变量运行时地开销比较少，但是它所能实现的功能也仅是 synchronized 的一部分（只能确保可见性，不能确保原子性）。

原子性我们[上一篇](https://mp.weixin.qq.com/s/HRAabyY-cLcAK_v9x0pMXw)已经讨论过了，增量操作（i++）看上去像一个单独操作，但实际上它是一个由“读取－修改－写入”组成的序列操作，因此 volatile 并不能为其提供必须的原子特性。

除了 volatile 和 synchronized，Lock 也能够保证可见性，它能保证同一时刻只有一个线程获取锁然后执行同步代码，并且在释放锁之前会将对变量的修改刷新到主存当中。关于 Lock 的更多细节，我们后面再进行讨论。

好了，共享变量的可见性就先介绍到这。希望本篇文章能够对大家有所帮助，谢谢大家的阅读。

上一篇：[如何保证共享变量的原子性？](http://www.itwanger.com/java/2019/11/09/java-bingfa-2.html)

下一篇：[如何保证对象的线程安全性](http://www.itwanger.com/java/2019/11/09/java-bingfa-4.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。



