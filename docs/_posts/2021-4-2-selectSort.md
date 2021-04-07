---
title: 经典排序算法(二)---选择排序
date: 2021-4-2
author: 张越
tags:
    - algorithm
location: DaLian
---

## 选择排序法（百度百科）

> 选择排序法是一种不稳定的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到全部待排序的数据元素排完。

## 代码实现

```js
/**
 * @param {Array} input
 * @return {Array}
 */

const selectionSort = function(input) {
    let count = input.length - 1;
    let index = 0;
    while (index < count) {
        let min = index;
        for (let i = index; i < count; i++) {
            if (input[min] < input[i + 1]) {
                min = i + 1;
                i + 1;
            }
        }
        if (min !== index) {
            let cache = input[index];
            input[index] = input[min];
            input[min] = cache;
        }
        index++;
    }
    return input;
};
```

时间复杂度：$O(n^2)$  
空间复杂度：$O(1)$

