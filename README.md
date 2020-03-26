# extra-long-table  当前版本: "version": "0.03"

> 重点: 一个基于vue的简易表格插件（完美解决超大数据量渲染、操作卡顿问题）。

> 重点： extra-long-table不需要其他ui组件

> 注: extra-long-table的api暂时不多 如果想要扩展可以在issue中提出


[点击查看效果图](https://github.com/github307896154/ExtraLongTable/blob/master/xgt.png)

# 安装方式 and 引入方式
  ** npm方式安装 **
``` javascript
   // npm i extra-long-table -S

  // npm引入方式 如下
  // main.js
  import extraLongTable from 'extra-long-table'

  Vue.use(extraLongTable);

  new Vue({
    el: '#app',
    render: h => h(App)
  });
  //demo.vue
  <extra-long-table :loadNum='20' :columns='columns' :tableList='dataTable'></extra-long-table>
```

# API
| 属性 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| tableList | 用于展示的表格数据 | Array | [] |
| columns | 表格列的配置描述，具体项见后文 | Array | [] |
| show-header | 是否显示表头 | Boolean | true |
| highlight-row | 是否支持高亮选中的行，即单选 | Boolean | false |
| loadNum | 默认加载行数 | Number,String | 20 |
| tdHeight | 表格行高 | Number,String | 20 |
| tableHeight | 表格高度 | Number,String | 400 |
//columns扩展
| 属性 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
type | 列类型，可选值为 | index | - |
title |	列头显示文字 |	String |	#
key |	对应列内容的字段名 |	String |	-
width |	列宽 |	Number |	-
align |	对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐 |	String |	left
sortable |	对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序，需要监听 Table 的 on-sort-change 事件 |	Boolean | 'custom'	false
sortMethod |	自定义排序使用的方法，接收三个参数 a 、 b 和 type，当设置 sortable: true 时有效。type 值为 asc 和 desc |	Function |	-
//事件
| 事件 | 说明 |返回值 |
| ------ | ------ | ------ |
| on-row-click | 单击某一行时触发 | index、当前行的数据 |
| on-row-dblclick | 双击某一行时触发 | index、当前行的数据 |
# 更新日志
**0.0.3**
1.添加单击回调事件
2.添加双击回调事件
3.解决高度变化导致的渲染问题


