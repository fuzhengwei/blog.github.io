---
layout: post
category: java
title: Java代码复用的三种常用方式：继承、组合和代理
tagline: by 沉默王二
tag: java
---

复用代码是 Java 众多引人注目的功能之一。这句话很通顺，没什么问题，但问题在于很多人并不清楚“复用”是什么。就好像我说“沉默王二是一个有趣的程序员”，唉，沉默王二是谁？

我们需要来给“复用”下一个定义。复用，说白了就是重复使用。

举个例子，很多名人说了很多名言，我们在说话、写作的时候，就经常有意无意的重复这些名言。比如说我，就特别喜欢重复使用王小波的那句名言：“**从话语中，你很少能学到人性，从沉默中却能。假如还想学得更多，那就要继续一声不吭** 。”

上面这个例子，只能说是“复用”的一种低级的应用，其实就是复制粘贴了。还有高级的复用方式吗？

有，当然有。Java 作为一种优秀的面向对象设计的语言，在复用的应用上就高级得多了。


<!--more-->



### 01、继承

最常见的复用方法就是继承——使用 `extends` 关键字在基类的基础上创建新类，新类可以直接复用基类的非 `private` 的属性和方法；就像程序清单1-1那样。

程序清单1-1：
```java
public class Wangxiaosan extends Wangsan {
public Wangxiaosan() {
System.out.println("我是新类王小三");

setName("王老三");

System.out.println(getName());
}

public static void main(String[] args) {
new Wangxiaosan();
}
}

class Wangsan {
private String name;

Wangsan() {
System.out.println("我是基类王三");
}

public String getName() {
return name;
}

public void setName(String name) {
this.name = name;
}
}
```

从程序清单 1-1 中我们可以看得出，getName() 和 setName() 方法虽然是在基类 Wangsan 中创建的，但可以在新类 Wangxiaosan 中使用，代码的复用工作就这样轻松地完成了。


### 02、组合

另外一种常见的复用方法就是组合——在新类中创建已有类的对象，通过该对象来调用已有类中的非 private 的属性和方法；就像程序清单2-1那样。

程序清单2-1：
```java
public class Tongxiangyu {
private Baizhantang boyFriend = new Baizhantang();

public Tongxiangyu() {
System.out.println("我是同福客栈的掌柜佟湘玉");

boyFriend.pointHand("郭芙蓉");
}

public static void main(String[] args) {
new Tongxiangyu();
}
}

class Baizhantang {
Baizhantang() {
System.out.println("我是退隐江湖的盗圣白展堂");
}

public void pointHand(String name) {
System.out.println("那谁" + name + "，准备一下——葵花点穴手");
}
}
```

从程序清单 2-1 中我们可以看得出，葵花点穴手虽然是白展堂的绝技，但作为佟掌柜的男朋友，佟掌柜要展堂点个穴，展堂也是不敢推辞的。你看，佟掌柜虽然是个弱女子，但自从有了展堂这个武功数一数二的男朋友，再没有谁敢不听话啊——厉害的组合啊。

需要注意的是，如何在继承和组合之间做出选择呢？

如果新类和已有类需要具有一些相似的方法和属性时，就采用继承的形式；如果新类只是为了借用已有类的一些方法和属性时，而两者没有很多相似之处时就需要采用组合的形式。


### 03、 代理

还有一种复用方法是代理——在新类中创建代理，通过代理来操作已有类的非 private 的属性和方法；就像程序清单 3-1 那样。

程序清单3-1：
```java
public class Member {
public static void main(String[] args) {
Proxy proxy = new Proxy();
System.out.println("代理说一个药丸十五块");
proxy.buy(15);
}
}

class Proxy {
private Shop shop = new Shop();

public void buy(int money) {
System.out.println("一个药丸十五块");
shop.sale(money - 5);
}
}

class Shop {
public void sale(int money) {
System.out.println("一个药丸十块钱");
}
}
```

从程序清单 3-1 中我们可以看得出，代理的模式和组合有点类似，但又有差别——代理成功的隔开了新类（会员）和已有类（店铺）的直接关系，使得已有类的方法不直接暴露在新类面前（组合的方式会将已有类的非private的方法和属性直接暴露在新类中）；与此同时，代理拿到了足够的好处。

### 04、final

作为代码的生产者来说，我们有时候希望代码被复用，有的时候又希望代码不被复用。当我们不想代码被复用时，final 关键字就派上用场了。final 这个关键字很形象，它本身就说明了一切——最后的，最终的；决定性的；不可更改的。

使用 final 的场景有三种，分别是数据、方法和类。我们来稍作说明。

1）final 数据

最常见的 final 数据就是常量了，例如：

```java
public class Consts {
public static final String CMOWER = "沉默王二";
}
```

对于常量来说，它对于整个应用内的所有类都是可见的，因此是 public 的；它可以直接通过类名.常量名访问，所以是 static 的；它是不可修改的，因此是 final 的。

另外一种常见的 final 数据就是参数了，参照程序清单 4-1。

程序清单4-1：
```java
public class Cmower {

public void write(final String content) {
// content += "犹未雪"; // final修饰的参数是无法在方法内部被再次修改的
System.out.println(content);
}

public void write1(String content) {
content += "犹未雪";
System.out.println(content);
}

public static void main(String[] args) {
Cmower cmower = new Cmower();
cmower.write("精忠报国");
cmower.write1("靖康耻");
}
}
```

2）final 方法

在 Java 类中，所有的 private 方法都隐式地指定为 final 的（也就是说，如果你在 private 方法上加上 final 修饰符，其实是没啥意义的）。在介绍继承的时候，你应该注意到我强调的一句话，就是新类可以直接复用基类的非 private 的属性和方法，也就是说 private 方法是无法被继承者修改的，因为 private 方法是 final 的。

来看程序清单 4-2，你会发现 Wangsan 类型的 san 引用是不能调用 `say(String words)` 方法的，因为 private 方法是无法被继承者修改的，尽管 Wangxiaosan 中重新定义了 `say(String words)` 方法。

程序清单4-2：
```java
public class Wangxiaosan extends Wangsan {
public Wangxiaosan() {
say("吃中饭没");
}

public void say(String words) {
System.out.println("王小三在说：" + words);
}

public static void main(String[] args) {
Wangsan san = new Wangxiaosan();
// san.say("吃晚餐没"); // 无法访问，并不会被覆盖
}
}

class Wangsan {
public Wangsan() {
say("吃早饭没");
}

private void say(String words) {
System.out.println("王三在说：" + words);
}
}
```

3）final 类

当我们认为某个类就是最终的形态了，它很完美，不应该被继承，就可以使用final关键字来修饰；参照程序清单 4-3。

程序清单 4-3：

```java
// 无法继承
public class Wangxiaosan extends Wangsan {
}

final class Wangsan {
public Wangsan() {
System.out.println("我就是最终形态，别继承我！");
}
}
```



-------

上一篇：[Java 访问权限控制：public、private、protected](http://www.itwanger.com/java/2019/11/07/java-public-private-protected.html)

下一篇：[Java：多态乃幸福本源](http://www.itwanger.com/java/2019/11/06/java-duotai.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G Java 高质量教学视频（已分门别类）。