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

  //或者 demo.vue
  <extra-long-table></extra-long-table>
  import extraLongTable from 'extra-long-table'
  export default {
    components: {
      extraLongTable
    }
  }
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


| 事件 | 说明 |返回值 |
| ------ | ------ | ------ |
| on-row-click | 单击某一行时触发 | index、当前行的数据 |
| on-row-dblclick | 双击某一行时触发 | index、当前行的数据 |
# 更新日志
**0.0.3**
1.添加单击回调事件
2.添加双击回调事件
3.解决高度变化导致的渲染问题


