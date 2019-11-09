---
layout: post
category: java
title: HashMap，难的不在Map，而在Hash
tagline: by 沉默王二
tag: java
---

在平常的开发当中，HashMap是我最常用的[Map类](http://www.itwanger.com/java/2019/11/08/java-jihe-rumen.html)（没有之一），它支持null键和null值，是绝大部分利用键值对存取场景的首选。需要切记的一点是——HashMap不是线程安全的数据结构，所以不要在多线程场景中应用它。


<!--more-->



通常情况下，我们使用Map的主要目的是用来放入（put）、访问（get）或者删除（remove），而对顺序没有特别的要求——HashMap在这种情况下就是最好的选择。

### 01、Hash

对于HashMap来说，难理解的不在于Map，而在于Hash。

Hash，一般译作“散列”，也有直接音译为“哈希”的，这玩意什么意思呢？就是把任意长度的数据通过一种算法映射到固定长度的域上（散列值）。 

再直观一点，就是对一串数据wang进行杂糅，输出另外一段固定长度的数据er——作为数据wang的特征。我们通常用一串指纹来映射某一个人，别小瞧手指头那么大点的指纹，在你所处的范围内很难找出第二个和你相同的（人的散列算法也好厉害，有没有？）。

对于任意两个不同的数据块，其散列值相同的可能性极小，也就是说，对于一个给定的数据块，找到和它散列值相同的数据块极为困难。再者，对于一个数据块，哪怕只改动它的一个比特位，其散列值的改动也会非常的大——这正是Hash存在的价值！

在Java中，String字符串的散列值计算方法如下：

```java
public int hashCode() {
    int h = hash;
    if (h == 0 && value.length > 0) {
        char val[] = value;

        for (int i = 0; i < value.length; i++) {
            h = 31 * h + val[i];
        }
        hash = h;
    }
    return h;
}
```

看得懂看不懂都没关系，我们就当是一个“乘加迭代运算”的算法。借此机会，我们来看一下“沉”、“默”、“王”、“二”四个字符串的散列值是多少。

```java
String[] cmower = { "沉", "默", "王", "二" };
for (String s : cmower) {
	System.out.println(s.hashCode());
}
```

输出的结果如下（5位数字）：

>沉的散列值：27785
默的散列值：40664
王的散列值：29579
二的散列值：20108


对于HashMap来说，Hash（key，键位）存在的目的是为了加速键值对的查找（你想，如果电话薄不是按照人名的首字母排列的话，找一个人该多困难「我的微信好友有不少在昵称前加了A，好狠」）。通常情况下，我们习惯使用String字符串来作为Map的键，请看以下代码：

```java
Map<String, String> map = new HashMap<>();
String[] cmower = { "沉", "默", "王", "二" };
for (String s : cmower) {
	map.put(s, s + "月入25万");
}
```

那HashMap会真的会将String字符串作为实际的键吗？我们来看HashMap的put方法源码：

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}
```

虽然只有一个`putVal()`方法的调用，但是你应该已经发现，HashMap内部会把key进行一个hash运算，具体代码如下：

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

假如key是String字符串的话，`hash()`会先获取字符串的hashCode（散列值），再对散列值进行位于运算，最终的值为HashMap实际的键（int值）。

既然HashMap在put的时候使用键的散列值作为实际的键，那么在根据键获取值的时候，自然也要先对`get(key)`方法的key进行hash运算，请看以下代码：

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}
```

### 02、散列值冲突怎么解决

尽管散列值很难重复，我们还是要明白，这种转换是一种压缩映射，也就是，散列值的空间通常远小于输入的空间，不同的输入可能会散列成相同的输出。

也就是说，key1 ≠ key2，但function(key1)有可能等于function(key2)——散列值冲突了。怎么办？

最容易想到的解决办法就是：当关键字key2的散列值value与key1的散列值value出现冲突时，以value为基础，产生另一个散列值value1，如果value1与value不再冲突，则将value1作为key2的散列值。

依照这个办法，总会找到不冲突的那个。

### 03、初始容量和负载因子

HashMap的构造方法主要有三种：

```java
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    this.loadFactor = loadFactor;
    this.threshold = tableSizeFor(initialCapacity);
}


public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}


public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
}
```

其中initialCapacity为初始容量（默认为1 << 4 = 16），loadFactor为负载因子（默认为0.75）。初始容量是HashMap在创建时的容量（HashMap中桶的数量）；负载因子是HashMap在其容量自动增加之前可以达到多满的一种尺度。

当HashMap中的条目数超出了负载因子与当前容量的乘积时，则要对HashMap扩容，增加大约两倍的桶数。 

通常，默认的负载因子 (0.75) 是时间和空间成本上的一种折衷。负载因子过高虽然减少了空间开销，但同时增加了查询成本。如果负载因子过小，则初始容量要增大，否则会导致频繁的扩容。

在设置初始容量时应该考虑到映射中所需的条目数及其加载因子，以便最大限度地减少扩容的操作次数。

如果能够提前预知要存取的键值对数量的话，可以考虑设置合适的初始容量（大于“预估元素数量 / 负载因子”，并且是2的幂数）。 

### 04、小结

在之前很长的一段时间内，我对HashMap的认知仅限于会用它的`put(key, value)`和`value = get(key)`。

但，当我强迫自己每周要输出一篇Java方面的技术文章后，我对HashMap真的“深入浅出”了——散列值（哈希值）、散列冲突（哈希冲突）、初始容量和负载因子，竟然能站在我面前一直笑——而原先，我见到这些关键字就逃之夭夭了，我怕见到它们。

----


上一篇：[Java 集合类入门篇](http://www.itwanger.com/java/2019/11/08/java-jihe-rumen.html)

下一篇：[Java泛型的重要目的：别让猫别站在狗队里](http://www.itwanger.com/java/2019/11/08/java-fanxing.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。
