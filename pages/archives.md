---
layout: page
title: All articles are here
titlebar: archives
subtitle: <span class="mega-octicon octicon-calendar"></span>&nbsp;&nbsp;专题系列： &nbsp;&nbsp; <a href ="/itstack-demo-netty/itstack-demo-netty.html"><font color="#1A0DAB">Netty4.x专题案例</font></a>&nbsp;&nbsp; <a href ="/itstack-demo-jvm/itstack-demo-jvm.html"><font color="#EB9439">用Java实现Jvm</font></a>&nbsp;&nbsp; <a href ="/itstack-demo-agent/itstack-demo-agent.html"><font color="#1E90FF">全链路监控</font></a>
menu: archives
css: ['blog-page.css']
permalink: /archives.html
---

<ul class="archives-list">
  {% for post in site.posts %}

    {% unless post.next %}
      <h3>{{ post.date | date: '%Y' }}</h3>
    {% else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {% if year != nyear %}
        <h3>{{ post.date | date: '%Y' }}</h3>
      {% endif %}
    {% endunless %}

    <li><span>{{ post.date | date:'%m-%d' }}</span> <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>