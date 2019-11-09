---
layout: post
category: java
title: 如何理解 Java 中的继承？
tagline: by 沉默王二
tag: java
---


编点俏皮话吧，这样可以[更好地理解继承](http://www.itwanger.com/java/2019/11/01/java-extends.html)（extends）——小明他爸是个七品芝麻官，那么小明就是个管二代；小明他爸当年走过雪山草地，越过鸭绿江边，那么小明就是个宏二代；小明他爸有三亩地，拆迁后分了 10 套房，那么小明就是柴二代。
<!--more-->


```java
// 老华
class Laohua {

}
// 小华
class Xiaohua extends Laohua {

}
```

请允许我继续编下去：小华和小华他爸都是手艺人，特别喜欢画画。小华他爸是自学成才，而小华由于继承了他爸的好基因，属于天才型；等小华长到 20 岁的时候，他觉得不能就这么一直和他爸一样只画风景画，因为那样的话，他取得的成就注定不会高过他爸。于是呢，小华改画人像画了，经过十年的努力，小华在艺术界的地位终于超过了他爸，人称“华·芬奇”。

按照 Java 术语来看，小华由画风景画改画人像画就属于“重写（overriding）”的行为——子类和父类产生差异的一种方法。

```java
class Laohua {
public void paint() {
System.out.println("风景画");
}
}
class Xiaohua extends Laohua {
public void paint() {
System.out.println("人像画");
}
}
```

小华画呀画呀，就这么一直画到了 40 岁，他感觉到画画已经不能使他感到满足了。于是他就开始了探索，希望能够找到一个新的领域，慰藉他那不羁的才华。

有一天，小华在网上看到了一篇文章，题目叫做“黑客与画家”，作者署名为“沉默王二，一枚特别有趣的程序员”。他觉得这篇文章写得真不错耶，于是小华就下定决心，立志一年后成为一名“黑客”。

按照 Java 编程思想来看，小华和他爸就不再只是纯粹的替代关系了（`is-a`），变成了一种相似的关系（他们都是画家，但小华又是一名黑客，有点 `is-like-a` 的意思）。

```java
class Laohua {
public void paint() {
System.out.println("风景画");
}
}
class Xiaohua extends Laohua {
public void paint() {
System.out.println("人像画");
}

public void hack() {
System.out.println("黑客");
}
}
```

Java 中的继承可以分为单继承、多重继承和不同类继承同一个类。

1）单继承

![](http://www.itwanger.com/assets/images/2019/11/java-extends-1.png)


2）多重继承


![](http://www.itwanger.com/assets/images/2019/11/java-extends-2.png)


3）不同类继承同一个类

![](http://www.itwanger.com/assets/images/2019/11/java-extends-3.png)

上一篇：[什么是面向对象编程（OOP）](http://www.itwanger.com/java/2019/11/01/oop.html)

下一篇：[吃人的那些 Java 名词：对象、引用、堆、栈](http://www.itwanger.com/java/2019/11/05/java-eat-human-words.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G Java 高质量教学视频（已分门别类）。
