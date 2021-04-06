---
title: 微任务和宏任务
date: 2021-4-1
author: 张越
tags:
    - front_end
location: DaLian
---

## 浏览器的主线程

参考文章[浏览器的主线程](https://developer.mozilla.org/zh-CN/docs/Glossary/Main_thread)

> 主线程用于浏览器处理用户事件和页面绘制等。默认情况下，浏览器在一个线程中运行一个页面中的所有 JavaScript 脚本，以及呈现布局，回流，和垃圾回收

主线程中即可以执行 js，也可以执行渲染工作，但由于主线程是单线程，所以 js 的执行和页面渲染是互斥的，只有在 js 执行完(js 引擎空闲时)才会进行 UI 渲染


对于浏览器来说，不同的标签页有着不同的主线程，每个标签页都是靠同一个 JS 引擎来执行，但是他们的主线程是分离的，执行上下文也是分离的。  
`总结：每个标签页都是独立的`


## 浏览器的多线程

首先来了解一下浏览器都有哪些主要的线程

-   GUI 渲染线程
-   JS 引擎 -> V8 引擎
-   事件触发线程
-   定时触发线程
-   ajax 请求线程

## 任务的分类

-   同步任务：同步任务就是`不依赖其它线程`,能在 js 引擎直接执行并且能够立即得到结果的代码
-   宏任务（MacroTask）：setTimeout、I/O(ajax)、UI 渲染、setImmediate(Node)等
-   微任务（MicroTask）：Promise、MutationObserver、Object.observer 等
-   用户交互事件（User Interaction Event）：onclick、onkeydown、onmousemove 等等

## Event Loop

Event Loop 是一种机制，直白的理解就是循环去任务队列中去取异步任务的 callback 来执行

## 执行顺序

![执行顺序](https://www.blackyue.com/microtask-macrotask.png)

[pdf](https://www.blackyue.com/microtask-macrotask.pdf)

## 浏览器的 debug

`本身ui渲染是在js代码完全执行完毕之后，但是浏览器的debug特殊，因为debug需要实时看到效果，所以不要怀疑ui渲染时宏任务`
