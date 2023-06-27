<template>
  <div style="min-height: 200px; max-height: 300px; overflow-y: auto; margin: 20px; overflow: auto; position:
  relative;" ref="myDiv">
    <div class="content-tip">
      <div class="item-row item-time" :style="itemCol()">
        <div
          class="col"
          v-for="(x, index) in timeList"
          :key="index"
          >
          <span class="time-text">{{x}}</span>
        </div>
      </div>
      <div
        class="item-row item-cols"
        :style="{...itemCol(), height: y.operationTimeList.length * 24 + 'px'}"
        v-for="(y, indexA) in contentList"
        :key="indexA"
        style="position: relative">
        <div
          v-for="(x, indexB) in timeList.length"
          :key="indexB"
          class="border-r center"
          >
          <span v-if="indexB === 0">{{y.title}}</span>
          <div v-else class="transformTranslate">
            <div  v-for="(i, indexC) in y.operationTimeList" :key="indexC" style="margin-bottom: 3px">
              <el-popover
                  placement="top-start"
                  title="标题"
                  width="200"
                  trigger="hover"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <div
                    slot="reference"
                    class="m-2b item-col item-noumenon"
                    :style="{
                height: '12px',
                width: `${i.realityTime}px`,
                background: statusColour(i.status),
                borderRadius: '2px',
                left: `${i.realityIntervalTime}px`}">
                </div>
              </el-popover>
      
              <div class="item-col"
                   :style="{
              position: 'relative',
              height: '12px',
              width: '1px',
              borderLeft: '1px dashed #ff0000',
              left: `${i.vHours}px`}">
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
    <div style="
      height: calc(100% - 46px);
      position: absolute;
      left: 300px;
      z-index: 2;
      border-left: 1px solid #F6F6F9;
      bottom: 24px">
    </div>
    <div style="position: relative;
    left: 278px;
    bottom: 0px;
     text-align: center;
    width: 48px;
    background: #fff;">低风险</div>
    <div style="
      border-radius: 4px;
      position: absolute;
      left: 278px;
      top: 20px;
      width: 48px;
      background: rgb(0, 255, 0);
      text-align: center;
      z-index: 3;">3.25</div>
  </div>
</template>

<script>
import { minMaxTime, allDate, getDiffTime } from '../../utils/ToolF'
const contentList = [
  {
    title: '上十级',
    operationTimeList: [
      {rStartTime: '2022-01-11 01: 00', rEndTime: '2022-01-11 3: 00', vEndTime: '2022-01-11 2: 15', status: 1},
      {rStartTime: '2022-01-11 00: 15', rEndTime: '2022-01-11 1: 00', vEndTime: '2022-01-11 1: 15', status: 2},
      {rStartTime: '2022-01-11 05: 00', rEndTime: '2022-01-11 7: 40', vEndTime: '2022-01-11 6: 40', status: 3},
      {rStartTime: '2022-01-11 01: 00', rEndTime: '2022-01-11 3: 00', vEndTime: '2022-01-11 2: 15', status: 1},
      {rStartTime: '2022-01-11 00: 15', rEndTime: '2022-01-11 1: 00', vEndTime: '2022-01-11 1: 15', status: 2},
      {rStartTime: '2022-01-11 05: 00', rEndTime: '2022-01-11 7: 40', vEndTime: '2022-01-11 6: 40', status: 3},
    ],
  },
  {
    title: '上九级',
    operationTimeList: [
      {rStartTime: '2022-01-11 00: 00', rEndTime: '2022-01-11 1: 00', vEndTime: '2022-01-11 3: 15', status: 1},
      {rStartTime: '2022-01-11 05: 00', rEndTime: '2022-01-11 9: 40', vEndTime: '2022-01-11 9: 40',status: 4},
    ],
  },
  {
    title: '上八级',
    operationTimeList: [
      {rStartTime: '2022-01-11 01: 00', rEndTime: '2022-01-11 3: 00', vEndTime: '2022-01-11 3: 15', status: 2},
      {rStartTime: '2022-01-11 01: 00', rEndTime: '2022-01-11 3: 00', vEndTime: '2022-01-11 2: 15', status: 1},
      {rStartTime: '2022-01-11 00: 15', rEndTime: '2022-01-11 1: 00', vEndTime: '2022-01-11 1: 15', status: 2},
      {rStartTime: '2022-01-11 05: 00', rEndTime: '2022-01-11 7: 40', vEndTime: '2022-01-11 6: 40', status: 3},
    ],
  },
  {
    title: '上七级',
    operationTimeList: [
      {rStartTime: '2022-01-11 01: 00', rEndTime: '2022-01-11 2: 00', vEndTime: '2022-01-11 4: 15', status: 1},
      {rStartTime: '2022-01-11 05: 00', rEndTime: '2022-01-11 6: 40', vEndTime: '2022-01-11 9: 40', status: 3},
      {rStartTime: '2022-01-11 01: 00', rEndTime: '2022-01-11 3: 00', vEndTime: '2022-01-11 2: 15', status: 1},
      {rStartTime: '2022-01-11 00: 15', rEndTime: '2022-01-11 1: 00', vEndTime: '2022-01-11 1: 15', status: 2},
      {rStartTime: '2022-01-11 05: 00', rEndTime: '2022-01-11 7: 40', vEndTime: '2022-01-11 6: 40', status: 3},
    ],
  },
  {
    title: '上六级',
    operationTimeList: [
      {rStartTime: '2022-01-11 01: 00', rEndTime: '2022-01-11 3: 00', vEndTime: '2022-01-11 3: 15', status: 1},
    ],
  },
];
export default {
  name: "index",
  data() {
    return {
      // dateList: [],
      timeList: [],
      len: undefined, // 记录时间col的长度
      hoursDiff: undefined, // 记录最大最小之间发时间差
      contentWidth: undefined, // 整个div的宽度
      contentHeight: undefined,
      wMinute: undefined, // 计算出一分钟的px
      minDateString: undefined, // 记录最小的时间
      contentList: [],
    }
  },
  async created() {
  
  },
  mounted() {
    this.$nextTick(async () => {
      // this.contentList = contentList;
      const dateList = await allDate(contentList);
      [this.timeList, this.len, this.hoursDiff, this.minDateString] = await minMaxTime(dateList);
      await this.handleResize();
      await this.getMinuteW();
      window.addEventListener('resize', this.handleResize);
      // console.log(minMaxTime(this.dateList));
    })
  },
  
  watch: {
  
  },
  // contentWidth: {
  //   handler(v) {
  //
  //   },
  //   immediate: true,
  // }
  methods: {
    // 状态颜色
    statusColour(type) {
      if (type === 1) {
        return '#1FC18D';
      } else if (type === 2) {
        return '#3462ED';
      } else if (type === 3) {
        return '#FFBF2A';
      } else if (type === 4) {
        return '#F4636B';
      }
    },
    handleResize() {
      this.contentWidth = this.$refs.myDiv.offsetWidth;
      this.contentHeight = this.$refs.myDiv.offsetHeight;
      this.getMinuteW();
      this.contentList = getDiffTime(contentList, this.minDateString, this.wMinute, 80);
      console.log(this.contentHeight, 'contentHeight');
    },
    itemCol() {
      let wLen = '1fr '.repeat(this.len)
      return {
        display: 'grid',
        gridTemplateColumns: `80px ${wLen}`,
      }
    },
    getMinuteW() {
      const {contentWidth, len} = this;
      this.wMinute = (contentWidth * 1 - 80)/(len * 60);
    },
  }
}
</script>

<style scoped lang="scss">
.m-2b{
  margin-bottom: 2px;
}
.item-col{
  position: absolute;
}
.transformTranslate {
  position: absolute;
  top: 50%;
  transform:translate(0, -50%);
}
.border-r{
  border-right: 1px solid #e6e6e6;
}
.center{
  display: inline-grid;
  place-items: center;
}
.item-time{
  height: 30px;
}

.content-tip{
  display: grid;
  /*grid-template-rows: repeat(5, minmax(30px, auto));*/
  width: 100%;
  .item-row {
    border-bottom: 1px solid #e6e6e6;
  }
  .item-cols:hover{
    background: #FBFCFF;
  }
}
.col{
  border-right: 1px solid #e6e6e6;
  // writing-mode: vertical-rl;
  text-align: center;
  .time-text{
    position: relative;
    // right: -20px;
  }
}
</style>
