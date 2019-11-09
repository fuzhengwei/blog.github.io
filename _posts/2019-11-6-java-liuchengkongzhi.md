---
layout: post
category: java
title: Java 流程控制语句
tagline: by 沉默王二
tag: java
---

Java 中涉及控制执行流程的关键字有 if-else、while-do-while、for、switch、return、break、continue 等等；我们来挑几个来说道说道。


<!--more-->

### 1、要么生，要么死

在网络上看到这么一句话：“**人生不过三条路，要么生，要么死，要么生不如死**”，经典啊！这句话套用在 `if-else` 语句上也非常的贴切，不信你看：

只有一个 if 语句

```java
if (布尔表达式) {
// 语句
}
```

或者一个if语句加上一个else语句
```java
if (布尔表达式) {
// 语句
} else {
// 语句
}
```
或者一个if语句加上一个 `else if` 语句，再加一个 else 语句

```java
if (布尔表达式) {
// 语句
} else if (布尔表达式) {
// 语句
} else {
// 语句
}
```
### 2、想清楚再走，还是先走一步再说

while 和 `do-while` 语句常用来控制不确定次数的循环语句，除了形式上稍显不同之外，`do-while` 会比 while 多执行一次（同等条件下哦）；其格式如下：

while

```java
while(布尔表达式) {
// 语句
}
```

do-while

```java
do {
// 语句
} while(布尔表达式)
```
### 3、次数确定请用 for

for 循环有两种形式，分别如下：

①、创建int变量的形式（可以主动指定循环次数，比如说可以把 `i < strs.length()` 改为 `i < 3` ，这样就只循环 3 次而不是 4 次）

```java
String [] strs = {"沉", "默", "王", "二"};
for(int i = 0; i < strs.length(); i++) {
    String str = strs[i];
}
```
稍微解释一下：第一次循环之前要进行变量初始化 `int i = 0`，随后进行条件测试 `i < strs.length()`，然后执行语句 `String str = strs[i];`，语句结束后进行“步进” `i++`。

②、俗称“foreach”的形式（不必指定下标就能取出元素）

```java
String [] strs = {"沉", "默", "王", "二"};
for (String str : strs) {
}
```
也稍微解释一下：冒号 `:` 之前声明了 String 类型的变量 str；冒号 `:` 之后是数组 strs；在执行循环的时候，Java 内部会依次取出数组 strs 中的每一个元素，然后赋值给变量 str，直到最后一个元素。

### 4、可以 switch 字符串了

当 if-else 的条件超出三个以上时（看起来有点臃肿），可使用 switch 语句来进行替代。switch 语句的形式如下：

```java
switch(condition) {
    case calue1 :
        // 语句
        break;
    case calue2 :
        // 语句
        break;
    case calue3 :
        // 语句
        break;
    default :
        // 语句
}
```

使用 switch 语句时需要特别注意的就是 break 关键字，该用的地方一定不要忘记！ 否则，switch 语句就会触发下一个 case 分支，而忽略掉没有 break 关键字的当前分支。

从 Java SE 7 开始，switch 语句支持字符串形式的条件了；在这之前，switch 只支持类型为 char、byte、short 或 int 的常量表达式，以及枚举常量。

### 5、斐波那契数列

斐波那契数列几乎是每一个学习编程的人都绕不开的一道笔试题；斐波那契数列是“斐波那契”（伟大的数学家）在养兔子时候发现的非常有意思的数列：

- 第一个月小兔子没有繁殖能力，所以还是一对；
- 两个月后，生下一对小兔总数共有两对；
- 三个月以后，老兔子又生下一对，因为小兔子还没有繁殖能力，所以一共是三对；

……依次类推可以列出下表：

![](https://upload-images.jianshu.io/upload_images/1179389-a7b408cfd85cd5ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 )


人们发现自然规律的能力好强，有没有？怎么使用 Java 实现斐波那契数列呢？

规律：第一个数+第二个数=第三个数，第二个数+第三个数=第四个数，第三个数+第四个数=第五个数，以此类推

流程控制语句有没有掌握，把这道斐波那契数列的面试题做出来就能测试出来了。具体代码：

```java
public class Fibonacci {
    public static void main(String[] args) {
        int start = 1;
        int next = 1;
        System.out.print(start + "、" + next + "、");
        // 从3开始到第num个斐波那契数
        for (int i = 3; i <= 12; i++) {
            int last = start + next;
            System.out.print(last + "、");
            start = next;
            next = last;
        }
        System.out.println();
        // 通过迭代计算，效率很低
        for (int i = 1; i <= 12; i++) {
            System.out.print(getFibonacci(i) + "、");
        }
    }

    private static int getFibonacci(int index) {
        if (index == 1 || index == 2) {
            return 1;
        }
        return getFibonacci(index - 1) + getFibonacci(index - 2);
    }
}
```

思路1：先指定前两个数，然后在 for 循环中计算接下来的数，然后用后一个数替换前一个。

思路2：通过迭代完成，下标是 1 或者 2 的时候返回 1，其余的数等于前一个数和前前一个数的和。

----

上一篇：[害死人的自动递增，不偿命的自动递减](http://www.itwanger.com/java/2019/11/06/java-caozuofu-++.html)

下一篇：[Java是通过什么机制来确保对象初始化呢？](http://www.itwanger.com/java/2019/11/06/java-chushihua.html)



微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G Java 高质量教学视频（已分门别类）。