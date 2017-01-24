## re 简介

为了了解正则引擎的内部工作原理，使用 javascript 实现的一个最简的正则引擎，它支持了如下的正则元素:

* ()
* ?
* \+
* \*
* |


它内部的基本工作流程如下：

1. 将正则表达式转换为后缀表达式的形式
2. 使用转换后的后缀表达式来构造一个非确定有限状态自动机(NFA)
3. 逐个的取出需要进行匹配的字符串中的字符，对状态机进行状态转换
4. 如果状态机最终停留在接收状态，则说明正则表达式与需要匹配的字符串相匹配
5. 否则如果状态机提前终止或者最终不是停留在接收状态，则说明正则表达式与需要匹配的字符串不匹配

## 使用方式

```bash
npm install # 安装依赖
npm run test # 运行单元测试
npm run build # 构建
npm run re 'a|b' a # 运行程序查看效果
```

## 参考资料

[Regular Expression Matching Can Be Simple And Fast ](https://swtch.com/~rsc/regexp/regexp1.html)





