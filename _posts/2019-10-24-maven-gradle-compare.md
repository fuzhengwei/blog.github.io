---
layout: post
category: java
title: Maven 和 Gradle 有什么区别
tagline: by 沉默王二
tag: java
---
在 Maven 出现之前，流行的构建工具是 Ant；在 Maven 出现之后，还有一种新兴的构建工具 Gradle，它有意选择了和 Maven 相反的原则，不会强制使用者遵循刻板的构建周期。这是我之前写 [Maven 入门](http://www.itwanger.com/java/2019/10/24/maven-rumen.html) 的时候里面的一句话。

<!--more-->

如果你要把软件发布到生产环境中产生商业价值，那么就需要运行测试、构建分布、分析代码质量，甚至为不同目标环境提供不同版本，然后部署。整个过程进行自动化操作是很有必要的。而 Maven 和 Gradle 都是优秀的项目自动构建工具。

一个项目构建的过程包括：

- 编译源代码
- 运行单元测试和集成测试
- 执行静态代码分析、生成分析报告
- 创建发布版本
- 部署到目标环境
- 部署传递过程
- 执行冒烟测试和自动功能测试

手工去执行每一个步骤无疑效率比较低而且容易出错。还是交给自动化构建工具比较合适。

Maven 是行业标准，而 Gradle 是后起之秀。后者抛弃了前者基于 XML 的配置原则，取而代之的是 Groovy 这种风格的简洁配置。举个例子。

```xml
<properties>
    <kaptcha.version>2.3</kaptcha.version>
</properties>
<dependencies>
    <dependency>
    <groupId>com.google.code.kaptcha</groupId>
    <artifactId>kaptcha</artifactId>
    <version>${kaptcha.version}</version>
    <classifier>jdk15</classifier>
    </dependency>
    <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    </dependency>
    <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
    </dependency>
    <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    </dependency>
    <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    </dependency>
</dependencies>
```

以上是 Maven 配置依赖的示例。Gradle 呢？

```xml
dependencies {
    compile('org.springframework:spring-core:2.5.6')
    compile('org.springframework:spring-beans:2.5.6')
    compile('org.springframework:spring-context:2.5.6')
    compile('com.google.code.kaptcha:kaptcha:2.3:jdk15')
    testCompile('junit:junit:4.7')
}
```

比较之下，我们都会更倾向于选择 Gradle，它就像一个皮肤紧致的少女。但是，不要忘了，Maven 是当前行业内的标准，大家都在用。看你怎么选择吧。



