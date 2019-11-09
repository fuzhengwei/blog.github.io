---
layout: post
category: java
title: Java 集合类入门篇
tagline: by 沉默王二
tag: java
---

开门见山地说吧，Java 提供了一套完整的集合类（也可以叫做容器类）来管理一组长度可变的对象（也就是集合的元素），其中常见的类型包括 List、Set、Queue 和 Map。从我个人的编程经验来看，List 的实现类 ArrayList 和 Map 的实现类 HashMap 使用频率最高，其它实现类只能望其项背了。

<!--more-->


![](http://www.itwanger.com/assets/images/2019/11/java-jihe-rumen-1.png)



List、Set 和 Queue 都是 Collection 的子接口，但各有各的好。List 按照插入的顺序保存元素，Set 不会有重复的元素，Queue 通常（但并非一定）以 FIFO（先进先出）的方式排序各个元素。

Map 与 Collection 最大的不同就在于，它是一组“键值对”，可以快速地通过键来查找值；Collection 是没有键的，因此需要按照某种规则来查找值（这里说的值就是元素）。

怎么使用集合类呢？示例如下：

```java
public class Wanger {
	public static void main(String[] args) {
		List<String> list = new ArrayList<String>();
		list.add("李孝利");
		System.out.println(list.get(0));

		Map<String, String> map = new HashMap<String, String>();
		map.put("lixiaoli", "李孝利");
		System.out.println(map.get("lixiaoli"));
	}
}
```

### 01、ArrayList 和 LinkedList

通常情况下，ArrayList 是我们在选择 List 的时候的首选。别问我为什么，就好像你问我为什么 1＋1 = 2 ？我回答不上来啊。

有人会问，如果我的应用操作偏向于插入和删除，而不是随机访问，我还要选用 ArrayList 吗？我知道 LinkedList 在处理插入和删除的时候更高效，而 ArrayList 更适合随机访问。

那么我的回答是，你已经知道了答案，就做出自己的选择吧。

List 的应用经常会涉及到一些经典的排序算法，我们不妨来重温一下冒泡排序，冒泡排序的规则是：假如有 N 个数，是无序的；从第一个数开始和后面 N-1 的数比较，发现有比自己小的就交换位置；从第二个数开始和后面 N-2 的数比较，同样发现有比自己小的就交换位置；直到 N-1 结束。

来看程序清单1-1：

```java
public class BubbleSort {
	public static void main(String[] args) {
		List<Integer> list = new ArrayList<Integer>();
		Collections.addAll(list, 2, 1, 5, 4, 9, 8, 6, 7, 10, 3, 3);

		// 从第1个数开始比较，直到N-1
		for (int i = 0; i < list.size(); i++) {
			// 从第i+1开始，和i位置的数进行比较
			for (int j = i + 1; j < list.size(); j++) {
				// 记录原来的数
				int temp = list.get(j);

				// 如果i位置的数大，就和j位置的数进行交换
				if (list.get(i) > temp) {
					list.set(j, list.get(i));
					list.set(i, temp);
				}
			}
		}
		
		System.out.println(list);
	}
}
```

Collections 类是操作 Collection 的一个工具集，提供了很多可以操作和返回 Collection 的静态方法，非常好用。`Collections.addAll()` 方法可以将所有指定元素添加到指定 Collection 中，可以分别指定要添加的元素，就像 `Collections.addAll(list, 2, 1, 5);` 这样；或者将要添加的元素指定为一个数组；此方法的行为与 `list.addAll(Arrays.asList(elements))` 的行为是相同的，但在大多数实现下，此方法运行起来可能要快得多。

`list.set(int index,  E element)` 用于指定元素替代此列表中指定位置上的元素，非常便捷。

### 02、HashMap

HashMap 是最常见的 Map 实现，应用非常的广泛；支持 null 键和 null 值，是绝大部分利用键值对存取场景的首选；比如，查询数据库的时候经常使用 HashMap 来进行灵活的（可选择一个表的部分列，而不是所有列）列名和列值的绑定。

HashMap 的值中还可以存放新的键值对，就像下面的这张示意图。

![](http://www.itwanger.com/assets/images/2019/11/java-jihe-rumen-2.png)


### 03、PriorityQueue

考虑这样一种场景，王二现在是一个写作大咖了，不再只是一个会写代码的程序员了。有一天，他和几个热情的读者相遇在厕所的门口，为了表示对王二的尊重，读者们觉得礼让王二先去解决问题是必要的。

PriorityQueue 是一种优先级队列（Priority 即为优先的意思），可以应用于这种场景。代码示例如下：

```java
public class WriterAndReader implements Comparable<WriterAndReader> {
	static PriorityQueue<WriterAndReader> queue = new PriorityQueue<WriterAndReader>();

	private String name;

	public WriterAndReader(String name) {
		this.name = name;
	}

	@Override
	public int compareTo(WriterAndReader o) {
		// o为之前的
		if (this.getName().equals("王二")) {
			return -1;
		}
		return this.getName().compareTo(o.getName());
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return this.getName();
	}

	public static void main(String[] args) {
		
		// 第一次，没有发生比较，因为只有一个
		queue.add(new WriterAndReader("读者2"));
		// 第二次，与第一次放入的比较，发现读者1比读者2小
		queue.add(new WriterAndReader("读者1"));
		// 第三次，与读者1进行比较，发现王二小；
		queue.add(new WriterAndReader("王二"));
		
		while (!queue.isEmpty()) {
			System.out.println(queue.poll());
		}
	}
}
```

PriorityQueue 既然要排出优先级，那么就要有一定的规则，排列的对象就要实现 Comparable 接口。

建议在学习的时候 debug 一下，你会发现 queue 的变化非常的有意思；每次 add 添加或者 poll 取出时就会执行对应的 compareTo。

PriorityQueue 常用的功能函数如下：

方法名	|功能描述
---|---
add(E e)	|添加元素
clear()	|清空
contains(Object o)	|检查是否包含当前参数元素
offer(E e)	|添加元素
peek()	|读取元素，（不删除）
poll()	|取出元素，（删除）
remove(Object o)	|删除指定元素
size()	|返回长度


----


上一篇：[Java 数组，看这篇就够了](http://www.itwanger.com/java/2019/11/08/java-array.html)

下一篇：[HashMap，难的不在Map，而在Hash](http://www.itwanger.com/java/2019/11/08/java-hashmap.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。