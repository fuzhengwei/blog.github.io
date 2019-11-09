---
layout: post
category: java
title: Java 数组，看这一篇就够了
tagline: by 沉默王二
tag: java
---

在 Java 泛型出现之前，只有数组可以用来存储指定类型的对象；在[自动装箱](http://www.itwanger.com/java/2019/11/01/java-int-integer.html)机制出现之前，只有数组可以用来存储基本数据类型；也就是说，在泛型和自动装箱机制出现之前，数组在 Java 当中的分量举足轻重。


<!--more-->

况且数组还是一种效率最高的存储和随机访问对象序列的方式，但遗憾的是，数组的长度是固定的——举个例子，创建它的时候指定长度是 6，就只能存储 6 个元素，当你想放第 7 个元素时，是无法做到的。

随着计算机硬件能力的提升，开发人员在存储一组数据的时候更愿意使用 ArrayList 而不是数组。尽管 ArrayList 内部是通过数组实现的，但与数组相比，它的容量能够自动增长，还有很多数组没有的特性。能不使用数组就别使用数组，除非要用数组来改善性能问题。


### 01、创建数组

让我们来给Java数组下一个明确的定义——数组用来存储**固定长度**的**同类型**元素。

示例如下：

```java
int[] ints = new int[3];
ints[0] = 1;
ints[1] = 2;
ints[2] = 3;

int ints1[] = new int[3];

int[] ints2 = { 1, 2, 3 };
```

`int[] ints`相较于`int ints1[]`是优选的声明方式， `int ints1[]`风格来自于 C/C++ 语言 ，便于 C/C++ 程序员能够快速地理解Java语言。

数组的创建方式有两种，一种是通过`new`关键字，同时指定长度，然后通过`array[index] = value`的方式赋值；另外一种方式是通过`{value1, value2, ...}`的方式直接创建并同时赋值。

最常见的应用如下（日期的占位符字符串）：

```java
private static String[] parsePatterns = { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy-MM", "yyyy/MM/dd",
			"yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm", "yyyy/MM", "yyyy.MM.dd", "yyyy.MM.dd HH:mm:ss", "yyyy.MM.dd HH:mm", "yyyy.MM" };
```

### 02、小心length

在使用List和Map的时候，可以直接通过`size()`方法获取容器的实际大小（长度）。数组也有一个关键字`length`来获取大小（长度），但意思大不相同。`length`只表示数组所能够容纳元素的大小，而并非数组的实际大小。

举例如下：

```java
int[] ints = new int[3];
ints[0] = 1;
ints[1] = 2;

System.out.println(ints.length); // 输出3
```

尽管ints的实际长度为2，但`ints.length`的长度却为3——要小心了。

### 03、Arrays工具类

Java的设计者可谓良苦用心，特意为数组设计了一个专属工具类——`java.util.Arrays`，里面有几个常用的方法我们来介绍一下。

1）sort()

`sort()`方法用来对数组进行排序，该方法要求数组的元素要实现Comparable接口。如果排序的元素不是String或者基本数据类型，就需要主动实现Comparable接口（基本数据类型和String本身已经实现了Comparable接口）。

示例如下：

```java
String[] strs = {"沉", "默","王", "二"};

Arrays.sort(strs);
System.out.println(Arrays.toString(strs));
// 输出[二, 沉, 王, 默]
```

`sort()`方法排序后的结果就是[二, 沉, 王, 默]。

2）binarySearch()

`binarySearch()`方法用来对数组进行二分查找（返回值所在的下标，未找到的话返回-1），调用该方法之前必须要先排序。

示例如下：

```java
String[] strs = {"沉", "默","王", "二"};

Arrays.sort(strs);
System.out.println(Arrays.binarySearch(strs, "二"));
// 排序后的结果为[二, 沉, 王, 默]
// 二分查找的结果范围0
```

由于`sort()`方法排序后的结果为[二, 沉, 王, 默]，所以`Arrays.binarySearch(strs, "二")`返回下标值0。

3）asList()

`asList()`方法用来将数组转化成List（ArrayList），源码如下：

```java
public static <T> List<T> asList(T... a) {
    return new ArrayList<>(a);
}
```

那如何将List转化成数组呢？通过List的`toArray()`方法。可参照下例体验由数组定义方式不同带来的细微差别。

```java
String[] strs = {"沉", "默","王", "二"};

List<String> list = Arrays.asList(strs);
System.out.println(list);
// 输出[沉, 默, 王, 二]

String[] strs1 = new String[list.size()];
System.out.println(Arrays.toString(list.toArray(strs1)));
// 输出 [沉, 默, 王, 二]

String[] strs2 = new String[5];
System.out.println(Arrays.toString(list.toArray(strs2)));
// 输出 [沉, 默, 王, 二, null]

String[] strs3 = new String[1];
System.out.println(Arrays.toString(list.toArray(strs3)));
// 输出 [沉, 默, 王, 二]

String[] strs4 = {};
System.out.println(Arrays.toString(list.toArray(strs4)));
// 输出 [沉, 默, 王, 二]
```

当声明的数组大小超出List的大小后，`toArray()`方法会对转换后的数组进行补位（`null`）。

4）toString()

`toString()`方法用来将数组进行字符串格式的输出（`[value1, value2, value3, ...]`的格式），源码如下：

```java
public static String toString(Object[] a) {
    if (a == null)
        return "null";

    int iMax = a.length - 1;
    if (iMax == -1)
        return "[]";

    StringBuilder b = new StringBuilder();
    b.append('[');
    for (int i = 0; ; i++) {
        b.append(String.valueOf(a[i]));
        if (i == iMax)
            return b.append(']').toString();
        b.append(", ");
    }
}
```


----


上一篇：[Java String，看这篇就够了](http://www.itwanger.com/java/2019/11/08/java-string.html)

下一篇：[Java 集合类入门篇](http://www.itwanger.com/java/2019/11/08/java-jihe-rumen.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。
