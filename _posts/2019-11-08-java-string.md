---
layout: post
category: java
title: Java String，看这篇就够了
tagline: by 沉默王二
tag: java
---

String，是Java中最重要的类。这句肯定的推断不是Java之父詹姆斯·高斯林说的，而是沉默王二说的，因此你不必怀疑它的准确性。

<!--more-->

关于字符串，有很多的面试题，但我总觉得理论知识绕来绕去没多大意思。你比如说：`String cmower = new String("沉默王二");`定义了几个对象?

我总觉得问我这样的问题，就好像是在拷问我：“既然你家买了冰箱，你难道不应该知道冰箱制冷的原理？”

再说，为什么要用`String cmower = new String("沉默王二");`而不是`String cmower = "沉默王二";`？

我劝各位面试官不要再缠住这样的问题不放了，切记“学以致用”。理论知识如果一直是在绕弯弯，那真的毫无价值。如果要我来做面试官，我想要问的问题是：“你平常是怎么判断两个字符串相等的？是用equals()还是==？”

前言就说这么多。接下来，我们来探讨几个实用的知识点。

### 01、 字符串是不可变的
我们来看一下String类的定义：

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
}
```

可以发现，String类是final类型的，因此不能被继承。

如果类可以被继承，那么就会破坏类的不可变性机制。因为子类可以覆盖父类的方法，并且可以改变父类的成员变量值，一旦子类以父类的形式出现时，就不能保证类是不可变的。

String类的不可变性有什么好处呢？

1）作为HashMap的键。

因为字符串是不可变的，因此它在创建的时候哈希码（hash code）就计算好了。这也就意味着每次在使用一个字符串的哈希码的时候不用重新计算一次，这样更加高效，很适合作为HashMap中的键。

2）线程安全。

同一个字符串对象可以被多个线程共享，如果访问频繁的话，可以省略同步和锁等待的时间，从而提升性能。

3）字符串常量池的需要。


特别要注意的是，**String类的所有方法都没有改变字符串本身的值，都是返回了一个新的对象**。

[推荐阅读：为什么 Java 字符串是不可变的？](http://www.itwanger.com/java/2019/11/06/java-string-immutable.html)


### 02、 字符串常量池

在Java中，常用的创建字符串的方式有两种：

```java
String cmower = "沉默王二";

String cmowsan = new String("沉默王三");
```

cmower使用双引号，cmowsan使用new关键字，它们有什么区别呢？

答案如下：

```java
String cmower = "沉默王二";
String cmower1 = "沉默王二";
System.out.println(cmower == cmower1); // 输出true

String cmowsan = new String("沉默王三");
String cmowsan1 = new String("沉默王三");
System.out.println(cmowsan == cmowsan1); // 输出false
```

双引号创建的相同字符串使用`==`判断时结果为true，而new关键字创建的相同字符串使用`==`判断时结果为false。

这是为什么呢？

**String在Java中使用过于频繁，为了避免在系统中产生大量的String对象，Java的设计者引入了“字符串常量池”的概念**。

当使用双引号创建一个字符串时，首先会检查字符串常量池中是否有相同的字符串对象，如果有，则直接从常量池中取出对象引用；如果没有，则新建字符串对象，并将其放入字符串常量池中，并返回对象引用。

这也就是说，"沉默王二"是放在字符串常量池中的，cmower和cmower1两个字符串对象引用是相同的。

而new关键字创建的字符串对象是不涉及字符串常量池的，直接放在堆中，也就是说，虽然cmowsan和cmowsan1都叫沉默王三，但不一个人。

强烈建议：不要使用new关键字的形式创建字符串对象。

### 03、 +号和StringBuilder

由于字符串是不可变的，因此字符串在进行[拼接](http://www.itwanger.com/java/2019/11/08/java-string-join.html)的时候会创建新的字符串对象。大家都知道，内存是一定的，因此对象创建多了就会影响系统性能。

**StringBuilder正是为了解决字符串拼接产生太多中间对象的问题而提供的一个类**，可以通过append()方法把字符串添加到已有序列的末尾，非常高效。

那么有人在进行字符串拼接的时候，就会产生疑惑：“我到底是用+号还是StringBuilder？”

我们先来看这样一段代码：

```java
String chenmo = "沉默";
String wanger = "王二";
System.out.println(chenmo + wanger);
```

这段代码是怎么编译的呢？可以使用[JAD](http://www.itwanger.com/java/2019/10/22/javac-jad.html)（Java反编译工具）来看一看。


```
String s = "\u5A0C\u5910\u7CAF";
String s1 = "\u941C\u5B29\u7C29";
System.out.println((new StringBuilder()).append(s).append(s1).toString());
```

你是不是看到了`StringBuilder`的影子？

没错，使用+号进行字符串拼接的时候，Java编译器实际是通过StringBuilder类来完成的。

难道可以使用+号来随意拼接字符串？反正Java编译器已经自动地为我们优化了。

但事实并非如此，来看这样一段代码：

```java
String cmowers = "";
for (int i = 0; i < 9; i++) {
	cmowers += "沉默王二";
}
System.out.println(cmowers);
```

闭上眼睛先想一想，Java编译器会怎么做？我们期望的结果是在循环外部就创建StringBuilder，Java编译器能如我们所愿吗？

JAD反编译后的结果如下：

```
String s = "";
for(int i = 0; i < 10; i++)
    s = (new StringBuilder()).append(s).append("\u5A0C\u5910\u7CAF\u941C\u5B29\u7C29").toString();

System.out.println(s);
```

这么看来，StringBuilder是在for循环内部创建的，也就是说会创建10次。天呐，这可不是我们期望的结果！我们只希望StringBuilder创建一次。

没办法，Java编译器是做不到的，只能靠我们自己：

```java
StringBuilder cmowers = new StringBuilder();
for (int i = 0; i < 9; i++) {
	cmowers.append("沉默王二");
}
System.out.println(cmowers);
```

强烈建议：如果只是三四个字符串的拼接，尽管使用+号操作符，别想什么性能优化（举个例子，你离目的地只有100米，你是打算打个出租车，还是自己步行走过去？）；如果遇到多于四个字符串的拼接，或者需要用到循环来拼接，那就选择StringBuilder。

在我年轻的时候，我还会犯这样一个错误：

```java
StringBuilder cmowers = new StringBuilder();
for (int i = 0; i < 9; i++) {
	cmowers.append("沉默王二" + "和他的读者朋友们");
}
System.out.println(cmowers);
```

我去，竟然在append()方法的内部使用+号！因为这个错误，我差点没被领导打死。你可要小心点。

### 04、 关于concat()

除了使用+号和StringBuilder对字符串进行拼接，还可以使用String类的`concat()`方法。

concat()方法只不过是String类的一个方法而已，为什么我要单独拎出来说呢？

因为之前我要在JSP页面的EL表达式中拼接字符串，刚开始想到的是用+号操作符，但EL表达式不是Java，+号操作符是不能拼接字符串的。我当时竟然没想起来用`concat()`！

重新铭记一下：

```
${item.username.concat('-').concat(item.realname)}
```

### 05、 关于intern()
关于字符串的性能问题，我常在一些技术文章中看到这样的建议：“如果一个字符串使用的频率非常高，建议使用`String.intern()`将其缓存。”

但我并不建议你这么做，因为这个方法要显式的调用，这样很麻烦；况且，在代码编写阶段，怎么可能知道哪个字符串使用频率很高呢？

### 06、 关于StringUtils
据我的编程经验来看，字符串的操作往往需要用到一个工具类，那就是`org.apache.commons.lang3.StringUtils`（null安全的，也就是说，StringUtils类的方法可以接受为null的字符串，但不会抛出NullPointerException）。

不过，我最常用的方法就那么几个：

方法|等价
---|---
`IsEmpty(String str)` | `str == null or str.length == 0`
`isBlank(String str)` | `str == null or str.length == 0 or str.trim().length == 0`
`join(Object[] arrey)` |把数组中的元素连接成一个字符串返回

----

上一篇：[Java内部类](http://www.itwanger.com/java/2019/11/07/java-inner-class.html)

下一篇：[Java 数组，看这篇就够了](http://www.itwanger.com/java/2019/11/08/java-array.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。