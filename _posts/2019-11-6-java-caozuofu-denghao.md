---
layout: post
category: java
title: Java 的操作符——“=”号
tagline: by 沉默王二
tag: java
---

本篇来说道说道 Java 的操作符——“=”号：我不是判官，我只是用来赋值的。


<!--more-->

记得 2010 年刚参加工作的时候，我的同事小王就因为一行简单的代码被领导骂的狗血喷头。当时小王被骂的那个惨啊，至今我还历历在目。究竟是一行什么代码呢？据我惨痛的回忆，大概是这样的：

```java
if (b = c) {
// ...
}
```

我那同事小王很明显是想要判断 b 和 c 是否相等（==），然而却莫名其妙的少了一个 = 号，变成了赋值操作；我相信小王绝对不是故意的，只是当时急于和女朋友聊天少写了一个=号而已。但这样的错误竟然没有被编译器发现，因为当 b 和 c 是布尔（boolean）类型时，编译器就不会报错提示——这真是小之又小的概率，就这么不幸的被小王撞上了（重要的是被领导当众羞辱）——从此以后，小王对编程失去了信心，实习期没结束，小王就转行做汽车销售了。

悲哀啊！

我和小王相处的时间大概有 3 个月吧，对他的印象蛮好的，蛮聪明伶俐的一个少年；可惜被这样一个不经意的错误给耽搁了。

是时候给“=”号一个明确的宣言了：**我不是判官，我只是用来赋值的**；什么意思呢？意思是，取“=”号右边的值（右值），把它复制给左边（左值）；右值可以是任何常数、变量或者生成一个值得表达式；但左值必须是一个明确的、已命名的变量。例如，可以将一个字符串赋值给一个变量：

```java
String cmower = "沉默王二，一个不止写程序的全栈工程师";
```

**关键点：**

1）得到你的人却得不到你的心；来看这么一段代码：

```java
int i = 520, j = 521;
// 此时的i和j非常恩爱
System.out.println("i=" + i + "，j=" + j);
// 输出：i=520，j=521

// 就当他俩结婚了
i = j;
// 然而i却疯了
i = 250;

// 但j却不为所动
System.out.println("i=" + i + "，j=" + j);
// 输出：i=250，j=521
```

怎么解释上面这段代码呢？答案是：

基本数据类型在赋值（生动而又不恰当的说法就是结婚吧）的时候，其实是把右值复制给了左值；但在左值发生改变的时候，右值却不会改变。这样的说法其实很绕，简单点的说法是基本类型的赋值是不会相互影响的，和对象引用的赋值是完全不同的；对象引用的赋值是会相互影响的。

2）你若不爱，我便不爱；来看这么一段代码：

```java
class Lover {
int level;
}
public class OperationalCharacter {

public static void main(String[] args) {
testTrueLove();
}

public static void testTrueLove() {
Lover boy = new Lover();
boy.level = 520;

Lover girl = new Lover();
girl.level = 521;

// 此时的男孩和女孩非常恩爱
System.out.println("boy.level=" + boy.level + "，girl.level=" + girl.level);
// boy.level=520，girl.level=521

// 就当他俩结婚了
boy = girl;
// 女孩不爱了
girl.level = 582;

// 男孩也不爱了
System.out.println("boy.level=" + boy.level + "，girl.level=" + girl.level);
// boy.level=582，girl.level=582
}

}
```

怎么解释上面这段代码呢？答案是：

对象引用在赋值的时候，其实改变的是引用的地址；`boy = girl;` 使 boy 也指向了 girl 的那个地址。因此，当 girl.level 改变的时候，boy.level 也发生了变化。

3）有钱之后还能保持自我吗？来看这么一段代码：

```java
class Money {
int coin;
}
public class OperationalCharacter {

public static void main(String[] args) {
// 穷光蛋a
int a = 0;

// 穷光蛋b
Money b = new Money();
b.coin = 0;

testQuality(a, b);
System.out.println("a=" + a + "，b.coin=" + b.coin);
// 输出：a=0，b.coin=10000000
}

public static void testQuality(int a, Money b) {
// 有钱了
a = 10000000;
b.coin = 10000000;
}
}
```

怎么解释上面这段代码呢？答案是：

基本数据类型作为参数传递给方法之后，尽管在方法中发生了改变，但跳出方法之后的值并不会发生变化；就像 a 同学，在传递给 testQuality 方法前是个穷光蛋，尽管在 testQuality 方法中变成了千万富翁，但跳出 testQuality 方法后依然是个穷光蛋。

对象引用作为参数传递给方法之后，一旦在方法中发生了改变，跳出方法之后的值也会发生变化；就像 b 同学，在传递给 testQuality 方法前是个穷光蛋，在 testQuality 方法中变成了千万富翁，那么跳出 testQuality 方法后仍然是个千万富翁。

*话外音：如果你把这种情形归结为**命**，我是认同的。*

上一篇：[吃人的那些 Java 名词：对象、引用、堆、栈](http://www.itwanger.com/java/2019/11/05/java-eat-human-words.html)

下一篇：[害死人的自动递增，不偿命的自动递减](http://www.itwanger.com/java/2019/11/06/java-caozuofu-++.html)



如果你觉得文章对你有所帮助，也蛮有趣的，就微信搜索“**沉默王二**”关注一下我的公众号。嘘，回复关键字「Java」更有好礼相送哦。
