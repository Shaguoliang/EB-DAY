<template>
  <mainPage>
    <div id="rotary-table">
      <div
        class="award"
        v-for="(award, index) in awards"
        :key="index"
        :class="['award' + index, { active: index == current }]"
      >
        <!-- {{ award.name }} -->
        <a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task3-page2-1.png" alt=""></a>
      </div>
      <div id="start-btn" @click="start">
        <a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task3-page2-2.png" alt=""></a>
      </div>
    </div>
  </mainPage>
</template>

<script>
import utils from "@/utils/utils";
import mainPage from "../main2";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      current: -1,
      awards: [
        { id: 1, name: "施华洛世奇雪花挂饰" },
        { id: 2, name: "施华洛世奇双肩包" },
        { id: 3, name: "施华洛世奇首饰盒" },
        { id: 4, name: "施华洛世奇手链" },
        { id: 5, name: "e京东卡" },
        { id: 6, name: "施华洛世奇项链" },
        { id: 8, name: "正山堂普安红红茶" },
        { id: -1, name: "谢谢参与" },
      ],
      speed: 200,
      diff: 15,
      award: {},
      time: 0,
      LotteryCount:1
    };
  },
  components: {
    mainPage,
  },
  methods: {
    ...mapActions("share", ["GetAwardList","Lottery"]),
    showTips(str) {
      this.$vux.alert.show({
        title: "提示",
        content: str,
        onShow() {
          console.log("Plugin: I'm showing");
        },
        onHide() {
          console.log("Plugin: I'm hiding");
        },
      });
    },
    go(name) {
      // this.$router.push(name)
      this.$router.push({ path: name });
    },
    start() {
      // 开始抽奖
      this.drawAward();
      this.time = Date.now();
      this.speed = 200;
      this.diff = 13;
    },
    drawAward() {
      this.LotteryCount--
      // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
      this.Lottery().then(res=>{
        if(res.Code==0){
          // let index = parseInt(Math.random()*7)
          // this.award = this.awards[index]
          if(res.Data.Id>-1&&res.Data.Id<9){
            this.award = this.awards.filter(v=>v.id==res.Data.Id)[0]
            if(this.award.id==5){
              window.sessionStorage.setItem('jd-card',res.Data.Card)
            }
          }else{
            this.award = {
              id:99,
              name:"奖品抽完了"
            }
          }

          this.current = 0
          this.move();
        }else{
          this.showTips(res.Message||'没有抽奖机会了！')
        }
      })
      // setTimeout(() => {
      //   let index = parseInt(Math.random()*7)
      //   this.award = this.awards[index]
      //   // this.award = {
      //   //   id: "4",
      //   //   name: "手链",
      //   // };
      // }, 1000);

      // this.move();
    },
    move() {
      window.timeout = setTimeout(() => {
        this.current++;
        if (this.current > 7) {
          this.current = 0;
        }
        if (this.award.id && (Date.now() - this.time) / 1000 > 4) {
          // if(this.speed<200){
            this.speed += (this.diff+2);
          // }
          if (
            (Date.now() - this.time) / 1000 > 6 &&
            this.award.id == this.awards[this.current].id
          ) {
            clearTimeout(window.timeout);
            setTimeout(() => {
              // alert("恭喜你，抽中了" + this.award.name);
              if(this.award.name=="谢谢参与"){
                this.showTips('谢谢参与!')
              }else{
                let that = this
                setTimeout(()=>{
                  // that.go('/eb/taskthird/page3/'+that.award.id)
                  this.$router.replace({path: '/eb/taskthird/page3/'+that.award.id});
                },500)
              }
            }, 0);
            return;
          }
        } else {
          if(this.speed>50){
            this.speed -= this.diff;
          }
        }

        console.log(this.speed);
        this.move();
      }, this.speed);
    },
  },
  activated() {
    this.current = -1
    // this.GetAwardList().then(res=>{

    // })
  },
};
</script>
<style lang="less" scoped>
.page {
  height: 100%;
}
.cardBg {
  margin: 0 auto;
  width: 80%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  overflow: auto;
  padding: 5% 2%;
  padding-right: 5%;
  img {
    width: 100%;
  }
  .logo-text {
    width: 100px;
  }
}
.btns {
  height: 80px;
  width: 100%;
  img {
    width: 100%;
  }
}
a:hover {
  -webkit-tap-highlight-color: transparent;
}
.abc {
  position: absolute;
  top: -100px;
  opacity: 0;
}
.imgBg {
  width: 100vw;
  height: 100vw;
  background: #f7f7f7;
  flex-shrink: 0;
  position: relative;
  img {
    width: 100%;
    vertical-align: bottom;
  }
  .gjList {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    padding-top: 10px;
    padding-left: 20px;
    > div {
      width: 100%;
      > div {
        width: 25%;
        // height: 25vw;
        padding-right: 20px;
        padding-bottom: 10px;
        // margin-right: 10PX;
        // &:nth-child(4n+4){
        //   margin-right: 0;
        // }
        // &:nth-child(4n+5){
        //   margin-top: 10PX;
        // }
      }
    }
  }
}
.formItem {
  height: 26px;
  line-height: 26px;
  margin-bottom: 25px;
  .label {
    width: 70px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
  }
  .value {
    flex: 1;
    position: relative;
    input {
      width: 100%;
      height: 26px;
      line-height: 26px;
      font-size: 16px;
      padding: 0 5px;
    }
    .tips {
      position: absolute;
      right: 0;
      top: 30px;
      width: 100%;
      line-height: 20px;
      // padding-right: 10%;
      text-align: right;
    }
  }
}
#rotary-table {
  width: 310px;
  height: 273px;
  position: relative;
  margin: auto;
  // background-color: antiquewhite;
  background: url('../../../assets/eb/btnImg/aw-bg.png');
  background-size: 100% 100%;

  .award {
    width: 90px;
    height: 76px;
    // line-height: 90px;
    text-align: center;
    float: left;
    position: absolute;
    overflow: hidden;
    // background-color: aquamarine;
    border-radius: 10px;
    background: transparent;
    transition: all 100ms linear;
    img{
      width: 100%;
    }
    &.active {
      background-color: darkgoldenrod;
      transition: all 0ms linear;
    }
    &.award0 {
      top: 10px;
      left: 10px;
    }
    &.award1 {
      top: 10px;
      left: 110px;
    }
    &.award2 {
      top: 10px;
      right: 10px;
    }
    &.award3 {
      top: 96px;
      right: 10px;
    }
    &.award4 {
      bottom: 15px;
      right: 10px;
    }
    &.award5 {
      bottom: 15px;
      right: 110px;
    }
    &.award6 {
      bottom: 15px;
      left: 10px;
    }
    &.award7 {
      top: 96px;
      left: 10px;
    }
  }
  #start-btn {
    position: absolute;
    top: 96px;
    left: 110px;
    width: 90px;
    height: 76px;
    // line-height: 90px;
    text-align: center;
    // background-color: coral;
    img{
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
.popup0 {
  padding-bottom: 15px;
  height: 200px;
}
.popup1 {
  width: 100%;
  height: 100%;
}
</style>
