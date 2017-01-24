## re 简介

为了了解正则引擎的内部工作原理，使用 javascript 实现的一个最简的正则引擎，它支持了如下的正则元素:

* ()
* ?
* \+
* \*
* |


## 基本工作流程

1. 对给定的正则表达式使用使用[调度场算法](https://zh.wikipedia.org/wiki/%E8%B0%83%E5%BA%A6%E5%9C%BA%E7%AE%97%E6%B3%95)，将其转换为[后缀表达式](https://zh.wikipedia.org/wiki/%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)的形式
2. 对转换后的后缀表达式，使用[Thompson构造法](https://zh.wikipedia.org/wiki/Thompson%E6%9E%84%E9%80%A0%E6%B3%95)来构造一个[非确定有限状态自动机(NFA)](https://zh.wikipedia.org/wiki/%E9%9D%9E%E7%A1%AE%E5%AE%9A%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E8%87%AA%E5%8A%A8%E6%9C%BA)
3. 逐个的取出需要进行匹配的字符串中的字符，对状态机进行状态转换
4. 如果状态机最终停留在接收状态(Accepting State)，则说明正则表达式与需要匹配的字符串相匹配
5. 否则如果状态机提前终止或者最终不是停留在接收状态，则说明正则表达式与需要匹配的字符串不匹配

## 使用方式

```bash
npm install # 安装依赖
npm run test # 运行单元测试
npm run build # 构建
npm run re 'a|b' a # 运行程序查看匹配结果
```

## 参考资料

[Regular Expression Matching Can Be Simple And Fast ](https://swtch.com/~rsc/regexp/regexp1.html)





