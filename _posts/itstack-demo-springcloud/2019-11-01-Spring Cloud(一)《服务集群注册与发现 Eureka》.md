---
layout: post
category: itstack-demo-springcloud
title: Spring Cloud(一)《服务集群注册与发现 Eureka》
tagline: by 付政委
tag: [spring,itstack-demo-springcloud]
---

## 前言介绍
1、对于能提供完整领域服务接口功能的RPC而言，例如；gRPC、Thrift、Dubbo等，服务的注册与发现都是核心功能中非常重要的一环，使得微服务得到统一管理。

2、在分布式领域中有个著名的CAP理论；一致性（Consistency）、可用性（Availability）、分区容错性（Partition tolerance），这三个要素在分布式系统中，最多满足两个，不可能三者兼顾。

3、通常我们在使用dubbo时zookeeper作为注册中心以选主配置为核心，保证CP特性，即任何时刻对 Zookeeper 的访问请求能得到一致的数据结果，同时系统对网络分割具备容错性，但是它不能保证每次服务请求的可用性。

4、而 Spring Cloud Netflix 在设计 Eureka 时遵守的就是 AP 原则，因为对于服务发现而言，可用性比数据一致性显得尤为重要。

5、Spring Cloud Eureka 是 Spring Cloud Netflix 微服务套件的一部分，主要负责完成微服务架构中的服务治理功能，服务治理可以说是微服务架构中最为核心和基础的模块，他主要用来实现各个微服务实例的自动化注册与发现。

6、另外Eureka服务集群有自我保护模式，在每分钟收到心跳低于阀值时，就会触发自我保护；
>阈值 = instance的数量 × (60 / instance的心跳间隔秒数) × 自我保护系数  {实际计算为；this.expectedNumberOfRenewsPerMin + 2}


## 案例说明
采用 Eureka Server 运行3个实例｛node01、node02、node03｝构建服务发现集群，解决单点问题(zookeeper也是至少部署三组以上构建一个集群)。但Eureka Server 采用的是去中心化的架构的 Peer to Peer 对等通信，没有 master/slave 区分，每一个 Peer 都是对等的。在这种架构中，节点通过彼此互相注册来提高可用性，每个节点需要添加一个或多个有效的 serviceUrl 指向其他节点。每个节点都可被视为其他节点的副本。

![微信公众号：bugstack虫洞栈 & Eureka 官网的架构图](https://bugstack.cn/wp-content/uploads/2019/11/SpringCloud-1-1.jpg)

## 环境准备
1、jdk 1.8
2、Spring Boot 2.0.6.RELEASE
3、Spring Cloud Finchley.SR2

## 代码示例
```java
itstack-demo-springcloud-01
├── itstack-demo-node01
│   └── src
│		└── main
│		    ├── java
│		    │   └── org.itstack.demo
│	        │        └── EurekaServerApplication.java
│           └── resources	
│               └── application.yml
├── itstack-demo-node02
│   └── src
│		└── main
│		    ├── java
│		    │   └── org.itstack.demo
│	        │        └── EurekaServerApplication.java
│           └── resources	
│               └── application.yml
└── itstack-demo-node03
    └── src
 		└── main
 		    ├── java
 		    │   └── org.itstack.demo
 	        │        └── EurekaServerApplication.java
            └── resources	
                └── application.yml
```

**完整代码欢迎关注公众号：bugstack虫洞栈 | 回复“SpringCloud专题”进行下载**

>EurekaServerApplication.java | 三组node代码一致，只需要一个普通的springboot添加@EnableEurekaServer即可启动

```java
/**
 * 微信公众号：bugstack虫洞栈 | 沉淀、分享、成长，专注于原创专题案例
 * 论坛：http://bugstack.cn
 * Create by 付政委 on @2019
 */
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run( EurekaServerApplication.class, args );
    }

}
```

>itstack-demo-node01/application.yml | node1 指向另外两台服务，registerWithEureka、fetchRegistry和单实例不同需要配置为true

```java
spring:
  application:
    name: itstack-demo-eureka-server

server:
  port: 8081

eureka:
  instance:
    hostname: node01
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: http://node02:8082/eureka/,http://node03:8083/eureka/
```

>itstack-demo-node02/application.yml | node2 指向另外两台服务

```java
spring:
  application:
    name: itstack-demo-eureka-server

server:
  port: 8082

eureka:
  instance:
    hostname: node02
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: http://node03:8083/eureka/,http://node01:8081/eureka/
```

>itstack-demo-node03/application.yml | node3 指向另外两台服务

```java
spring:
  application:
    name: itstack-demo-eureka-server

server:
  port: 8083

eureka:
  instance:
    hostname: node03
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: http://node01:8081/eureka/,http://node02:8082/eureka/
```

## 测试验证
1、配置host；127.0.0.1 node1 node2 node3
2、分别启动node1、node2、node3
3、访问；http://localhost:8081/
![微信公众号：bugstack虫洞栈 & Eureka集群](https://bugstack.cn/wp-content/uploads/2019/11/SpringCloud-1-2.jpg)

------------

