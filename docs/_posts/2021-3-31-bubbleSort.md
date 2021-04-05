---
title: 经典排序算法(一)---冒泡排序
date: 2021-3-31
author: 张越
tags:
    - algorithm
location: DaLian
---


## 为什么要重新学习算法呢？
   工作一年半之后，大学学的算法基本都忘完了，而且我发现算法在实际工作中用的比较少，但为什么要花时间来重新学习算法呢？
   原因有主要有以下俩点：  
   + 为了锻炼思考能力和逻辑能力，更重要的为了更好的掌握数据结构
   + 算法是一些框架的核心，比如vue的diff，为将来解析源码做准备

   所以我决定从基础算法捡起，从易到难，首先就是最基本的冒泡算法，let's go

## 冒泡算法（百度百科）
>冒泡排序（Bubble Sort），是一种计算机科学领域的较简单的排序算法。  
它重复地走访过要排序的元素列，依次比较两个相邻的元素，如果顺序（如从大到小、首字母从Z到A）错误就把他们交换过来。走访元素的工作是重复地进行直到没有相邻元素需要交换，也就是说该元素列已经排序完成。  
这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端（升序或降序排列），就如同碳酸饮料中二氧化碳的气泡最终会上浮到顶端一样，故名“冒泡排序”。

## 代码实现
```js
/**
 * @param {Array} input
 * @return {Array}
 */
const bubbleSort = function (input) {
  let count = input.length - 1;
  while (count) {
    for (let i = 0; i < count; i++) {
      if (input[i] > input[i + 1]) {
        let cache = input[i];
        input[i] = input[i + 1];
        input[i + 1] = cache;
      }
    }
    count--;
  }
  return input;
};
```

时间复杂度：$O(n^2)$   
空间复杂度：$O(1)$

## 算法优化
优化的整体思路：减少循环的次数，从而减少时间
### 方案一
   `用空间换时间`  
   思路：如果在内部某一次循环（高亮部分）没有交换过元素，就证明已经完成排序，可以直接return  
   优化后的代码如下
   ```js {9}
/**
 * @param {Array} input
 * @return {Array}
 */
const bubbleSort = function (input) {
  let count = input.length - 1;
  while (count) {
    let isExchange = false;
    for (let i = 0; i < count; i++) {
      if (input[i] > input[i + 1]) {
        let cache = input[i];
        input[i] = input[i + 1];
        input[i + 1] = cache;
        isExchange = true;
      }
    }
    if (!isExchange) {
      return input;
    }
    count--;
  }
  return input;
};
   ```

### 方案二
   `用空间换时间`  
   思路：内部循环从某次交换完位置后再没有交换位置，证明从这次交换后，其后面的数组元素本身有序，所以记录最后一次交换的位置，下次排序从第一个到上次记录的位置即可  
   优化后代码如下
   ```js{9,16,22}
/**
 * @param {Array} input
 * @return {Array}
 */
const bubbleSort = function (input) {
  let count = input.length - 1;
  while (count) {
    let isExchange = false;
    let lastExchange = 0;
    for (let i = 0; i < count; i++) {
      if (input[i] > input[i + 1]) {
        let cache = input[i];
        input[i] = input[i + 1];
        input[i + 1] = cache;
        isExchange = true;
        lastExchange = i;
      }
    }
    if (!isExchange) {
      return input;
    }
    count = lastExchange;
  }
  return input;
};
   ```

