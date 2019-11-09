---
layout: post
category: java
title: Java 并发编程(二)：如何保证共享变量的原子性？
tagline: by 沉默王二
tag: java
---

线程安全性是我们在进行 Java 并发编程的时候必须要先考虑清楚的一个问题。这个类在单线程环境下是没有问题的，那么我们就能确保它在多线程并发的情况下表现出正确的行为吗？

<!--more-->


我这个人，在没有副业之前，一心扑在工作上面，所以处理的蛮得心应手，心态也一直保持的不错；但有了副业之后，心态就变得像坐过山车一样。副业收入超过主业的时候，人特别亢奋，像打了鸡血一样；副业迟迟打不开局面的时候，人就变得惶惶不可终日。

仿佛我就只能是个单线程，副业和主业并行开启多线程模式的时候，我就变得特别没有安全感，尽管整体的收入比没有副业之前有了很大的改善。

怎么让我自己变得有安全感，我还没想清楚（你要是有好的方法，请一定要告诉我）。但怎么让一个类在多线程的环境下是安全的，有 3 条法则，让我来告诉你：

1、不在线程之间共享状态变量。
2、将状态变量改为不可变。
3、访问状态变量时使用同步。

那你可能要问，状态变量是什么？

我们先来看一个没有状态变量的类吧，代码示例如下。

```java
class Chenmo {
    public void write() {
        System.out.println("我寻了半生的春天，你一笑便是了。");
    }
}
```

Chenmo 这个类就是无状态变量的，它只有一个方法，既没有成员变量，也没有类变量。任何访问它的线程都不会影响另外一个线程的结果，因为两个线程之间没有共享任何的状态变量。所以可以下这样一个结论：**无状态变量的类一定是线程安全的**。

然后我们再来看一个有状态变量的类。假设沉默（Chenmo 类）每写一行字（`write()` 方法），就要做一次统计，这样好找出版社索要稿费。我们为 Chenmo 类增加一个统计的字段，代码示例如下。

```java
class Chenmo {
    private long count = 0;
    public void write() {
        System.out.println("我寻了半生的春天，你一笑便是了。");
        count++;
    }
}
```

Chenmo 类在单线程环境下是可以准确统计出行数的，但多线程的环境下就不行了。因为递增运算 `count++` 可以拆分为三个操作：读取 count，将 count 加 1，将计算结果赋值给 count。多线程的时候，这三个操作发生的时序可能是混乱的，最终统计出来的 count 值就会比预期的值小。

*PS：具体的原因可以回顾上一节《[Java 并发编程(一)：摩拳擦掌](https://mp.weixin.qq.com/s/ksUUHbt6Nfchy1E00ANg_w)》*。

写作不易，咱不能亏待了沉默，对不对？那就想点办法吧。

假定线程 A 正在修改 count 变量，这时候就要防止线程 B 或者线程 C 使用这个变量，从而保证线程 B 或者线程 C 在使用 count 的时候是线程 A 修改过后的状态。

怎么防止呢？可以在 `write()` 方法上加一个 `synchronized` 关键字。代码示例如下。

```java
class Chenmo {
    private long count = 0;
    public synchronized void write() {
        System.out.println("我寻了半生的春天，你一笑便是了。");
        count++;
    }
}
```

关键字 `synchronized` 是一种最简单的同步机制，可以确保同一时刻只有一个线程可以执行 `write()`，也就保证了 `count++` 在多线程环境下是安全的。

在编写并发应用程序时，我们必须要保持一种正确的观念，那就是——首先要确保代码能够正确运行，然后再是如何提高代码的性能。

但众所周知，`synchronized` 的代价是昂贵的，多个线程之间访问 `write()` 方法是互斥的，线程 B 访问的时候必须要等待线程 A 访问结束，这无法体现出多线程的核心价值。

`java.util.concurrent.atomic.AtomicInteger` 是一个提供原子操作的 Integer 类，它提供的加减操作是线程安全的。于是我们可以这样修改 Chenmo 类，代码示例如下。

```java
class Chenmo {
    private AtomicInteger count = new AtomicInteger(0);
    public void write() {
        System.out.println("我寻了半生的春天，你一笑便是了。");
        count.incrementAndGet();
    }
}
```

`write()` 方法不再需要 `synchronized` 关键字保持同步，于是多线程之间就不再需要以互斥的方式来调用该方法，可以在一定程度上提升统计的效率。

某一天，出版社统计稿费的形式变了，不仅要统计行数，还要统计字数，于是 Chenmo 类就需要再增加一个成员变量了。代码示例如下。

```java
class Chenmo {
    private AtomicInteger lineCount = new AtomicInteger(0);
    private AtomicInteger wordCount = new AtomicInteger(0);
    public void write() {
        String words = "我这一辈子，走过许多地方的路，行过许多地方的桥，看过许多次的云，喝过许多种类的酒，却只爱过一个正当年龄的人。";
        System.out.println(words);
        lineCount.incrementAndGet();
        wordCount.addAndGet(words.length());
    }
}
```

你觉得这段代码是线程安全的吗？

结果显而易见，这段代码不是线程安全的。因为 lineCount 和 wordCount 是两个变量，尽管它们各自是线程安全的，但线程 A 进行 lineCount 加 1 的时候，并不能够保证线程 B 是在线程 A 执行完 wordCount 统计后开始 lineCount 加 1 的。

![](http://www.itwanger.com/assets/images/2019/11/java-bingfa-2-1.png)


该怎么办呢？方法也很简单，代码示例如下。

```java
class Chenmo {
    private int lineCount = 0;
    private int wordCount = 0;
    public void write() {
        String words = "我这一辈子，走过许多地方的路，行过许多地方的桥，看过许多次的云，喝过许多种类的酒，却只爱过一个正当年龄的人。";
        System.out.println(words);
        
        synchronized (this) {
            lineCount++;
            wordCount++;
        }
    }
}
```

对行数统计（lineCount++）和字数统计（wordCount++）的代码进行加锁，保证这两行代码是原子性的。也就是说，线程 B 在进行统计的时候，必须要等待线程 A 统计完之后再开始。

``` synchronized (lock) {...}``` 是 Java 提供的一种简单的内置锁机制，用于保证代码块的原子性。线程在进入加锁的代码块之前自动获取锁，并且退出代码块的时候释放锁，可以保证一组语句作为一个不可分割的单元被执行。


----

上一篇：[Java 并发编程(一)：简介](http://www.itwanger.com/java/2019/11/09/java-bingfa-1.html)

下一篇：[如何保证共享变量的原子性？](http://www.itwanger.com/java/2019/11/09/java-bingfa-3.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。



