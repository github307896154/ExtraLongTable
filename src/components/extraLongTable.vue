<template>
  <div>
    <div style="position:relative">
      <div class="table-div" :style="{height:`${tableHeight}px`}">
        <div id="topDiv" class="table-top" :style="{right:`${isScroll}px`}">
          <table id="topTable" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;">
            <tr>
              <td v-for="top in columns" class="top-td" :style="top.width?`width:${top.width}px`:'width:auto'">
                {{top.title?top.title:""}}</td>
            </tr>
          </table>
        </div>
        <div id="bottomDiv" class="table-bottom" @scroll.stop="handleScroll" v-if="showTableList.length>0">
          <div :style="{height:`${tableOtherTop}px`}"></div>
          <table id="bottomTable" cellpadding="0" cellspacing="0" border="0" style="width:100%;table-layout:fixed;" :style="{height:`${loadedNum*40}px`}">
            <tr v-for="(items,indexs) in showTableList" @click="trSelect(indexs)" :class="selectTr==indexs?'trselect':'trhover'">
              <td class="bottom-td" v-if="columns[0].type=='index'" :style="columns[0].width?`width:${columns[0].width}px`:'width:auto'">
                {{indexs+dataTop/tdHeight+1}}</td>
              <td class="bottom-td" v-if="columns[0].type=='select'"></td>
              <td v-for="(item,index) in columnsBottom" class="bottom-td" :style="item.width?`width:${item.width}px`:'width:auto'">
                {{item.logic==undefined?items[item.key]:item.logic(items)}}
              </td>
            </tr>
          </table>
          <div :style="{height:`${tableOtherBottom}px`}"></div>
        </div>
        <div v-if="showTableList.length==0">
          暂无数据
        </div>
      </div>
      <div class="table-bottom-load" v-if="showLoad" :style="{right:`${isScroll}px`,top:`${tdHeight}px`,height:`${tableHeight-tdHeight}px`}">
        <svg class="icon loading " aria-hidden="true">
          <use xlink:href="#icon-jiazai"></use>
        </svg>
        <div class="msg">正在拼命加载</div>
      </div>
    </div>
    <div style="line-height:40px">
      {{`显示了${loadedNum}条数据`}}
    </div>
    <div style="line-height:40px">
      {{`总数据${dataTotal}条数据`}}
    </div>
    <div style="line-height:40px">
      {{`顶部高度${tableOtherTop}`}}
    </div>
    <div style="line-height:40px">
      {{`底部高度${tableOtherBottom}`}}
    </div>
    <div style="line-height:40px">
      {{`表格高度${tableHeight}`}}
    </div>
  </div>
</template>
 
<script>
export default {
  name: "extraLongTable",
  props: {
    loadNum: {
      //默认加载行数
      type: [Number, String],
      default() {
        return 20;
      }
    },
    tdHeight: {
      //表格行高
      type: [Number, String],
      default() {
        return 40;
      }
    },
    tableHeight: {
      //表格高度
      type: [Number, String],
      default() {
        return "200";
      }
    },
    tableList: {
      //所有表格数据
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      //所有表格匹配规则
      type: Array,
      default() {
        return [];
      }
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isScroll: 17,
      showLoad: false,
      columnsBottom: [], //实际渲染表格规则
      showTableList: [], //实际显示的表格数据
      loadedNum: 0, //实际渲染的数据数量
      dataTotal: 0, //总数据条数
      dataTop: 0, //渲染数据顶部的高度
      scrollTop: 0, //滚动上下的距离
      interval: null, //判断滚动是否停止的定时器
      scrollHeight: 0, //数据滚动的高度
      selectTr: -1 //选择的行
    };
  },
  computed: {
    tableOtherTop() {
      //表格剩余数据顶部高度
      return this.dataTop;
    },
    tableOtherBottom() {
      //表格剩余数据底部高度
      return (
        this.dataTotal * this.tdHeight -
        this.dataTop -
        this.loadedNum * this.tdHeight
      );
    }
  },
  methods: {
    //滚动条滚动
    handleScroll(event) {
      let bottomScroll = document.getElementById("bottomDiv");
      let topScroll = document.getElementById("topDiv");
      if (bottomScroll.scrollTop > this.scrollTop) {
        //记录上一次向下滚动的位置
        this.scrollTop = bottomScroll.scrollTop;
        //向下滚动
        this.handleScrollBottom();
        
      } else if (bottomScroll.scrollTop < this.scrollTop) {
        //记录上一次向上滚动的位置
        this.scrollTop = bottomScroll.scrollTop;
        //向上滚动
        this.handleScrollTop();
      } else {
        //左右滚动
        this.handleScrollLeft(topScroll, bottomScroll);
      }
    },
    //滚动条向上滚动
    handleScrollTop() {
      //如果加载的数据小于默认加载的数据量
      if (this.dataTotal > this.loadNum) {
        let computeHeight = this.dataTop; //数据需要处理的时候的高度
        if (
          this.scrollTop < computeHeight &&
          this.scrollTop >= computeHeight - this.loadNum * this.tdHeight
        ) {
          this.showLoad = true;
          //如果滚动高度到达数据显示顶部高度
          if (this.dataTotal > this.loadedNum) {
            //如果数据总数大于已经渲染的数据
            let dataTopNum = parseInt(this.dataTop / this.tdHeight); //数据顶部条数
            if (dataTopNum-this.loadNum>=0) {
              //如果数据总数减去已经渲染的数据大于等于loadNum
              this.dataProcessing(
                this.loadNum,
                this.loadedNum - this.loadNum,
                "top"
              );
            } else {
              this.dataProcessing(
                dataTopNum,
                dataTopNum,
                "top"
              );
            }
          }
        } else if (
          this.scrollTop <
          computeHeight - this.loadNum * this.tdHeight
        ) {
          this.showLoad = true;
          let scrollNum = parseInt(this.scrollTop / this.tdHeight); //滚动的位置在第几条数据
          if (scrollNum - this.loadNum >= 0) {
            this.dataProcessing(this.loadNum * 2, scrollNum, "topAll");
          } else {
            this.dataProcessing(scrollNum + this.loadNum, scrollNum, "topAll");
          }
        }
      }
    },
    //滚动条向下滚动
    handleScrollBottom() {
      let computeHeight =
        this.dataTop +
        this.loadedNum * this.tdHeight; //数据需要处理的时候的高度
      if (
        this.scrollTop > computeHeight &&
        this.scrollTop <= computeHeight + this.tdHeight * this.loadNum
      ) {
        this.showLoad = true;
        //如果滚动高度到达数据显示底部高度
        if (this.dataTotal > this.loadedNum) {
          let dataTopNum = parseInt(this.dataTop / this.tdHeight); //数据顶部条数
          if (dataTopNum + this.loadedNum+this.loadNum <= this.dataTotal) {//如果数据总数减去已经渲染的数据底部条数大于等于20 
            this.dataProcessing(
              this.loadedNum - this.loadNum,
              this.loadNum,
              "bottom"
            );
          } else {
            this.dataProcessing(
              this.dataTotal-(dataTopNum+ this.loadedNum),
              this.dataTotal-(dataTopNum+ this.loadedNum),
              "bottom"
            );
          }
        }
      } else if (
        this.scrollTop >
        computeHeight + this.tdHeight * this.loadNum
      ) {
        this.showLoad = true;
        let scrollNum = parseInt(this.scrollTop / this.tdHeight); //滚动的位置在第几条数据
        if (scrollNum + this.loadNum <= this.dataTotal) {
          this.dataProcessing(scrollNum, this.loadNum * 2, "bottomAll");
        } else {
          this.dataProcessing(
            scrollNum,
            this.dataTotal - scrollNum + this.loadNum,
            "bottomAll"
          );
        }
      }
    },
    //滚动条左右滚动
    handleScrollLeft(topScroll, bottomScroll) {
      //顶部表头跟随底部滚动
      topScroll.scrollTo(bottomScroll.scrollLeft, topScroll.pageYOffset);
    },
    //上下滚动时数据处理
    dataProcessing(topNum, bottomNum, type) {
      let topPosition = parseInt(this.dataTop / this.tdHeight);
      if (type === "top") {
        this.showTableList.splice(this.loadedNum - bottomNum, bottomNum); //减去底部数据
        for (var i = 1; i <= topNum; i++) {
          //加上顶部数据
          let indexNum = topPosition - i;
          this.showTableList.unshift(this.tableList[indexNum]);
        }
        this.loadedNum = this.loadedNum + topNum - bottomNum; //重新计算实际渲染数据条数
        this.dataTop = this.dataTop - topNum * this.tdHeight; //重新计算渲染数据的高度
        document.getElementById("bottomDiv").scrollTop =
          document.getElementById("bottomDiv").scrollTop +
          bottomNum * this.tdHeight;
        this.scrollTop = document.getElementById("bottomDiv").scrollTop;
      } else if (type == "bottom") {
        this.showTableList.splice(0, topNum); //减去顶部数据
        for (var i = 0; i < bottomNum; i++) {
          //加上底部数据
          let indexNum = topPosition + this.loadedNum + i;         
          this.showTableList.push(this.tableList[indexNum]);
        }
        this.loadedNum = this.loadedNum - topNum + bottomNum; //重新计算实际渲染数据条数
        this.dataTop = this.dataTop + topNum * this.tdHeight; //重新计算渲染数据的高度
        document.getElementById("bottomDiv").scrollTop =
          document.getElementById("bottomDiv").scrollTop -
          topNum * this.tdHeight;
        this.scrollTop = document.getElementById("bottomDiv").scrollTop;
      } else if (type == "bottomAll") {
        this.showTableList = []; //减去顶部数据
        let scrollNum = topNum;
        for (var i = 0; i < bottomNum; i++) {
          //加上底部数据
          let indexNum = scrollNum - this.loadNum + i;    
          this.showTableList.push(this.tableList[indexNum]);
        }
        this.loadedNum = bottomNum; //重新计算实际渲染数据条数
        this.dataTop = (scrollNum - this.loadNum) * this.tdHeight; //重新计算渲染数据的高度
        this.scrollTop = document.getElementById("bottomDiv").scrollTop;
      } else if (type == "topAll") {
        this.showTableList = []; //减去顶部数据
        let scrollNum = bottomNum;
        for (var i = 0; i < topNum; i++) {
          //加上底部数据
          let indexNum = scrollNum - topNum + this.loadNum + i;       
          this.showTableList.push(this.tableList[indexNum]);
        }
        this.loadedNum = topNum; //重新计算实际渲染数据条数
        this.dataTop = (scrollNum - topNum + this.loadNum) * this.tdHeight; //重新计算渲染数据的高度
        this.scrollTop = document.getElementById("bottomDiv").scrollTop;
      }
      this.showLoad = false;
    },
    trSelect(index) {
      this.selectTr = index;
    }
  },
  mounted() {},
  watch: {
    tableList: {
      handler(newValue, oldValue) {
        this.loadedNum = 0; //实际渲染的数据数量
        this.dataTotal = 0; //总数据条数
        this.dataTop = 0; //渲染数据顶部的高度
        this.scrollTop = 0; //滚动上下的距离
        this.interval = null; //判断滚动是否停止的定时器
        this.showTableList=[];
        if (newValue.length > 0) {
          this.dataTotal = newValue.length; //获取数据长度
          if (this.dataTotal >= this.loadNum) {
            //判断数据长度是否大于设置的每次渲染长度
            this.loadedNum = this.loadNum; //设置实际渲染条数
            for (var i = 0; i < this.loadNum; i++) {
              let data = newValue[i];
              this.showTableList.push(data);
            }
          } else if (this.dataTotal < this.loadNum) {
            this.loadedNum = this.dataTotal;
            for (var i = 0; i < this.dataTotal; i++) {
              let data = newValue[i];
              this.showTableList.push(data);
            }
          }
        }
      },
      deep: true,
      immediate: true
    },
    columns: {
      handler(newValue, oldValue) {  
        if (newValue.length > 0) {
          if (this.columns[0].type != undefined) {
            this.columnsBottom = this.columns.slice(1, this.columns.length);
          } else {
            this.columnsBottom = this.columns;
          }
        }
        console.log(this.columnsBottom);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang='scss' scoped>
.tableBody {
  width: 100%;
}
.top-td {
  border-right: 1px solid #e9eaec;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #f8f8f9;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  text-overflow: ellipsis;
  vertical-align: middle;
  font-weight: 600;
  border-bottom: 1px solid #e9eaec;
  color: #495060;
  font-size: 12px;
  overflow: hidden;
}
.table-bottom {
  position: absolute;
  top: 41px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.table-top {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}

.table-bottom-load {
  position: absolute;
  z-index: 99;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.3;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .icon {
    font-size: 30px;
    animation: ani-demo-spin 2s linear infinite;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .msg {
    margin-top: 10px;
    color: #000;
    line-height: 30px;
  }
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.table-div {
  width: inherit;
  max-width: 100%;
  color: #495060;
  font-size: 12px;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  margin: auto;
  border: 1px solid #e9eaec;
  overflow: auto;
}
.bottom-td {
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  text-overflow: ellipsis;
  vertical-align: middle;
  border-bottom: 1px solid #e9eaec;
  border-right: 1px solid #e9eaec;
  background-color: #fff;
  -webkit-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
}
.trselect {
  td {
    background-color: #ebf7ff;
  }
}
.trhover:hover {
  td {
    background-color: #ebf7ff;
  }
}
</style>
