<template>
  <div id="app">
    <extra-long-table :tableHeight="400" :tdHeight="30" :loadNum="20" ref="currentRowTable" :columns="columns" :tableList="dataTable"></extra-long-table>
  </div>
</template>

<script>
import ExtraLongTable from "./pageages/extra-long-table";
export default {
  name: 'app',
  components:{
    ExtraLongTable
  },
  data () {
    return {
      columns: [
        //表头
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "这",
          key: "columns1",
          width: 150,
          align: "center",
          sortable: true
        },
        {
          title: "是",
          key: "columns2",
          width: 150,
          align: "center"
        },
        {
          title: "一",
          key: "columns3",
          width: 150,
          align: "center"
        },
        {
          title: "个",
          key: "columns4",
          width: 150,
          align: "center"
        },
        {
          title: "超",
          key: "columns5",
          width: 150,
          align: "center"
        },
        {
          title: "大",
          key: "columns6",
          width: 150,
          align: "center"
        },
        {
          title: "数",
          key: "columns7",
          width: 150,
          align: "center"
        },
        {
          title: "据",
          key: "columns8",
          width: 150,
          align: "center"
        },
        {
          title: "量",
          key: "columns9",
          width: 150,
          align: "center"
        },
        {
          title: "的",
          key: "columns10",
          width: 150,
          align: "center"
        },
        {
          title: "表",
          key: "columns11",
          width: 150,
          align: "center"
        },
        {
          title: "格",
          key: "columns12",
          width: 150,
          align: "center"
        },
        {
          title: "希",
          key: "columns13",
          width: 150,
          align: "center"
        },
        {
          title: "望",
          key: "columns14",
          width: 150,
          align: "center"
        },
        {
          title: "您",
          key: "columns15",
          width: 150,
          align: "center"
        },
        {
          title: "能",
          key: "columns16",
          width: 150,
          align: "center"
        },
        {
          title: "喜",
          key: "columns17",
          width: 150,
          align: "center"
        },
        {
          title: "欢",
          key: "columns18",
          width: 150,
          align: "center"
        }
      ],
      dataTable: [] //表格数据
    }
  },
  methods: {
    showOther() {
      let List=[];
      for (let i = 0; i < 100; i++) {
        let data = {};
        for (let m = 0; m < this.columns.length; m++) {
          data[`columns${m}`] = i + 1; //`${i+1}行${m+1}列`;
          data.index = i + 1;
        }
        List.push(data);
      }
      this.dataTable=List;
    }
  },
  mounted() {
    for (let i = 0; i < 10000; i++) {
      let data = {};
      for (let m = 0; m < this.columns.length; m++) {
        data[`columns${m}`] = i + 1; //`${i+1}行${m+1}列`;
        data.index = i + 1;
      }
      this.dataTable.push(data);
    }
  }
}
</script>

<style>

</style>
