---
layout: post
category: java
title: Java泛型的重要目的：别让猫别站在狗队里
tagline: by 沉默王二
tag: java
---

《Java编程思想》第四版足足用了75页来讲**泛型**——厚厚的一沓内容，很容易让人头大——但其实根本不用这么多，只需要一句话：我是一个泛型队列，狗可以站进来，猫也可以站进来，但最好不要既站猫，又站狗！


<!--more-->



### 01、泛型是什么

泛型，有人拆解这个词为“参数化类型”。这种拆解其实也不好理解，还是按照沉默王二的意思来理解一下吧。

现在有一只玻璃杯，你可以让它盛一杯白开水，也可以盛一杯二锅头——泛型的概念就在于此，**制造这只杯子的时候**没必要在说明书上定义死，指明它只能盛白开水而不能盛二锅头！

可以在说明书上指明它用来盛装液体，但最好也不要这样，弄不好用户想用它来盛几块冰糖呢！

这么一说，你是不是感觉不那么抽象了？泛型其实就是在定义类、接口、方法的时候不局限地指定某一种特定类型，而让类、接口、方法的调用者来决定具体使用哪一种类型的参数。

就好比，玻璃杯的制造者说，我不知道使用者用这只玻璃杯来干嘛，所以我只负责造这么一只杯子；玻璃杯的使用者说，这就对了，我来决定这只玻璃杯是盛白开水还是二锅头，或者冰糖。

### 02、什么时候用泛型

我们来看一段简短的代码：

```java
public class Cmower {

	class Dog {
	}

	class Cat {
	}

	public static void main(String[] args) {
		Cmower cmower = new Cmower();
		Map map = new HashMap();
		map.put("dog", cmower.new Dog());
		map.put("cat", cmower.new Cat());

		Cat cat = (Cat) map.get("dog");
		System.out.println(cat);
	}

}
```

这段代码的意思是：我们在map中放了一只狗（Dog），又放了一只猫（Cat），当我们想从map中取出猫的时候，却一不留神把狗取了出来。

这段代码编译是没有问题的，但运行的时候就会报`ClassCastException`（狗毕竟不是猫啊）：

```
Exception in thread "main" java.lang.ClassCastException: com.cmower.java_demo.sixteen.Cmower$Dog cannot be cast to com.cmower.java_demo.sixteen.Cmower$Cat
	at com.cmower.java_demo.sixteen.Cmower.main(Cmower.java:20)
```

为什么会这样呢？

1）写代码的程序员粗心大意。要从map中把猫取出来，你不能取狗啊！

2）创建map的时候，没有明确指定map中要放的类型。如果指定是要放猫，那肯定取的时候就是猫，不会取出来狗；如果指定是要放狗，也一个道理。

第一种情况不太好解决，总不能把程序员打一顿（我可不想做一个天天背锅的程序员，很重的好不好）；第二种情况就比较容易解决，因为Map支持泛型（泛型接口）。

```java
public interface Map<K,V> {
}
```

注：在Java中，经常用T、E、K、V等形式的参数来表示泛型参数。

T：代表一般的任何类。
E：代表 Element 的意思，或者 Exception 异常的意思。
K：代表 Key 的意思。
V：代表 Value 的意思，通常与 K 一起配合使用。

既然Map支持泛型，那作为Map的实现者HashMap（泛型类）也支持泛型了。

```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {
    
}
```

其中的put方法（泛型方法）是这样定义的：

```java
public V put(K key, V value) {
  return putVal(hash(key), key, value, false, true);
}
```

好了，现在使用泛型的形式来定义一个只能放Cat的Map吧！

```java
public class Cmower {

	class Dog {
	}

	class Cat {
	}

	public static void main(String[] args) {
		Cmower cmower = new Cmower();
		Map<String, Cat> map = new HashMap<>();
//		map.put("dog", cmower.new Dog()); // 不再允许添加
		map.put("cat", cmower.new Cat());

		Cat cat = map.get("cat");
		System.out.println(cat);
	}
}
```

当使用泛型定义map（键为String类型，值为Cat类型）后：

1）编译器就不再允许你向map中添加狗的对象了。

2）当你从map中取出猫的时候，也不再需要强制转型了。

### 03、类型擦除

有人说，Java的泛型做的只是表面功夫——泛型信息存在于编译阶段（狗队在编译时不允许站猫），运行阶段就消失了（运行时的队列里没有猫的信息，连狗的信息也没有）——这种现象被称为“类型擦除”。

来，看代码解释一下：

```java
public class Cmower {

	class Dog {
	}

	class Cat {
	}

	public static void main(String[] args) {
		Cmower cmower = new Cmower();
		Map<String, Cat> map = new HashMap<>();
		Map<String, Dog> map1 = new HashMap<>();
		
		// The method put(String, Cmower.Cat) in the type Map<String,Cmower.Cat> is not applicable for the arguments (String, Cmower.Dog)
		//map.put("dog",cmower.new Dog());
		
		System.out.println(map.getClass());
		// 输出：class java.util.HashMap
		System.out.println(map1.getClass());
		// 输出：class java.util.HashMap
	}

}
```

map的键位上是Cat，所以不允许put一只Dog；否则编译器会提醒`The method put(String, Cmower.Cat) in the type Map<String,Cmower.Cat> is not applicable for the arguments (String, Cmower.Dog)`。编译器做得不错，值得点赞。

但是问题就来了，map的Class类型为HashMap，map1的Class类型也为HashMap——也就是说，Java代码在运行的时候并不知道map的键位上放的是Cat，map1的键位上放的是Dog。

那么，试着想一些可怕的事情：既然运行时泛型的信息被擦除了，而反射机制是在运行时确定类型信息的，那么利用反射机制，是不是就能够在键位为Cat的Map上放一只Dog呢？

我们不妨来试一试：

```java
public class Cmower {

	class Dog {
	}

	class Cat {
	}

	public static void main(String[] args) {
		Cmower cmower = new Cmower();
		Map<String, Cat> map = new HashMap<>();
		
		try {
			Method method = map.getClass().getDeclaredMethod("put",Object.class, Object.class);
			
			method.invoke(map,"dog", cmower.new Dog());
			
			System.out.println(map);
			// {dog=com.cmower.java_demo.sixteen.Cmower$Dog@55f96302}
		} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			e.printStackTrace();
		}
	}

}
```

看到没？我们竟然在键位为Cat的Map上放了一只Dog！

注：Java的设计者在JDK 1.5时才引入了泛型，但为了照顾以前设计上的缺陷，同时兼容非泛型的代码，不得不做出了一个折中的策略：编译时对泛型要求严格，运行时却把泛型擦除了——要兼容以前的版本，还要升级扩展新的功能，真的很不容易！

### 04、泛型通配符

有些时候，你会见到这样一些代码：

```java
List<? extends Number> list = new ArrayList<>();
List<? super Number> list = new ArrayList<>();
```

`?`和关键字`extends`或者`super`在一起其实就是泛型的高级应用：通配符。

我们来自定义一个泛型类——PetHouse（宠物小屋），它有一些基本的动作（可以住进来一只宠物，也可以放出去）：

```java
public class PetHouse<T> {
	private List<T> list;

	public PetHouse() {
	}

	public void add(T item) {
		list.add(item);
	}

	public T get() {
		return list.get(0);
	}
}
```

如果我们想要住进去一只宠物，可以这样定义小屋（其泛型为Pet）：

```java
PetHouse<Pet> petHouse = new PetHouse<>();
```

然后，我们让小猫和小狗住进去：

```java
petHouse.add(new Cat());
petHouse.add(new Dog());
```

如果我们只想要住进去一只小猫，打算这样定义小屋：

```java
PetHouse<Pet> petHouse = new PetHouse<Cat>();
```

但事实上，编译器不允许我们这样定义：因为泛型不直接支持向上转型。该怎么办呢？

可以这样定义小屋：

```java
PetHouse<? extends Pet> petHouse = new PetHouse<Cat>();
```

也就是说，宠物小屋可以住进去小猫，但它必须是宠物（Pet或者Pet的子类）而不是一只野猫。

但很遗憾，这个宠物小屋实际上住不了小猫，看下图。

![](http://www.itwanger.com/assets/images/2019/11/java-fanxing-1.png)

这是因为Java虽然支持泛型的向上转型（使用 `extends` 通配符），但我们却无法向其中添加任何东西——编译器并不知道宠物小屋里要住的是小猫还是小狗，或者其他宠物，因此干脆什么都不让住。

看到这，你一定非常疑惑，既然`PetHouse<? extends Pet>`定义的宠物小屋什么也不让住，那为什么还要这样定义呢？思考一下。

### 05、读者将军的总结


泛型限定符有一描述：上界不存下界不取。

上界不存的原因：例如 List，编译器只知道容器内是 Father 及其子类，具体是什么类型并不知道，编译器在看到 extends 后面的 Father 类，只是标上一个 `CAP#1` 作为占位符，无论往里面插什么，编译器都不知道能不能和 `CAP#1` 匹配，所以就不允许插入。

extends的作用：可以在初始化的时候存入一个值，并且能保证数据的稳定性，只能取不能存。读取出来的数据可以存在父类或者基类里。

下界不取的原因：下界限定了元素的最小粒度，实际上是放松了容器元素的类型控制。例如 List， 元素是 Father 的基类，可以存入 Father 及其子类。但编译器并不知道哪个是 Father 的超类，如 Human。读取的时候，自然不知道是什么类型，只能返回 Object，这样元素信息就全部丢失了。

super的作用：用于参数类型限定。

PECS 原则：

1.频繁往外读取内容的，适合用extends
2.经常往里插入的，适合用super


----


上一篇：[HashMap，难的不在Map，而在Hash](http://www.itwanger.com/java/2019/11/08/java-hashmap.html)

下一篇：[Java异常处理：给程序罩一层保险](http://www.itwanger.com/java/2019/11/08/java-exception.html)

微信搜索「**沉默王二**」公众号，关注后回复「**免费视频**」获取 500G 高质量教学视频（[已分门别类](https://mp.weixin.qq.com/s/GjkEyPW0vgIvuDLYQkBM0A)）。