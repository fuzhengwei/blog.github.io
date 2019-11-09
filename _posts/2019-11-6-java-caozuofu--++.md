---
layout: post
category: java
title: 害死人的自动递增，不偿命的自动递减
tagline: by 沉默王二
tag: java
---

记得参加工作的第二年，我的同事小二就因为把“前缀递增”写成了“后缀递增”被一顿痛骂之后拉出去祭天了。至今我还耿耿于怀，因为我也是参与者之一（当时小王准备使用`p = p + 1`，但我劝小王使用`p++`，因为自动递增更加简洁）；但小二很讲义气，没有把我捅出去，我才苟且活到今日。往事不堪回首，但为了以后的Java程序员着想，我决定忍着记忆的苦涩把小二当年的那段代码记录下来：


<!--more-->



```java
public static void main(String[] args) {
int p = 0;
calculate(p);
}

public static void calculate(int p) {
if (p < 3) {
// 其他
calculate(p++);
}
}
```

按照以上的代码来看，这是一个死循环，calculate迭代是不会跳出的，直到程序报错。为什么会这样呢？

因为后缀递增会先生成值，再执行运算；也就是p++这个表达式的结果还是p。但前缀递增会先执行运算，再生成值；也就是++p这个表达式的结果是p+1。

那以上代码正确的写法是什么呢？答案如下：

```java
public static void main(String[] args) {
	int p = 0;
	calculate(p);
}

public static void calculate(int p) {
	if (p < 3) {
		// 其他
		calculate(p++);
	}
}
```

上一篇：[Java 的操作符——“=”号](http://www.itwanger.com/java/2019/11/06/java-caozuofu-denghao.html)

下一篇：[Java 流程控制语句](http://www.itwanger.com/java/2019/11/06/java-liuchengkongzhi.html)


如果你觉得文章对你有所帮助，也蛮有趣的，就微信搜索“**沉默王二**”关注一下我的公众号。嘘，回复关键字「Java」更有好礼相送哦。
