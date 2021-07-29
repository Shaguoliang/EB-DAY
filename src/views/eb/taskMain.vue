<template>
<mainPage>
  <div class="page flex column">
    <div @click="go('/eb/taskone/page1')" class="task-btn">
      <a href="javascript:void(0)"><img class="btnimg" src="../../assets/eb/btnImg/taskBtn-1.png" alt=""></a>
      <a href="javascript:void(0)" v-if="taskStatus.Task1"><img class="tipsImg" src="../../assets/eb/btnImg/task-finish.png" alt=""></a>
    </div>
    <div @click="go('/eb/taskTow/page1')" class="task-btn">
      <a href="javascript:void(0)"><img class="btnimg" src="../../assets/eb/btnImg/taskBtn-2.png" alt=""></a>
      <a href="javascript:void(0)" v-if="taskStatus.Task2"><img class="tipsImg" src="../../assets/eb/btnImg/task-finish.png" alt=""></a>
    </div>
    <div @click="goAward()"><a href="javascript:void(0)"><img class="btnimg" src="../../assets/eb/btnImg/taskBtn-3.png" alt=""></a></div>

    <div @click="zhibo" v-if="showCode"><a href="javascript:void(0)"><img class="btnimg" src="../../assets/eb/btnImg/taskBtn-4.png" alt=""></a></div>

    <!-- <div v-if="showCode"><img class="qrCode" src="../../assets/eb/qrCode.png" alt=""></div>
    <div v-else><a href="javascript:void(0)"><img class="qrCode" src="../../assets/eb/qrCode.png" alt=""></a></div> -->

    <!-- <div class="flex center around btns">
      go('/eb/taskthird/page1')
      <div><a href="javascript:void(0)"><img src="../../assets/eb/btnImg/page3-1.png" alt=""></a></div>
    </div> -->
  </div>
</mainPage>
</template>

<script>
import utils from "@/utils/utils";
import mainPage from "./main2"
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      loading:true,
      finish:false,
      respData:{},
      taskStatus:{},
      showCode:false
    };
  },
  components:{
    mainPage
  },
  methods:{
    ...mapActions("share", ["GetTaskRight","GetRight"]),
    showTips(str){
      this.$vux.alert.show({
        title: '提示',
        content: str,
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding')
        }
      })
    },
    go(name){
      // this.$router.push(name)
      this.$router.push({path: name});
    },
    initData(){
      this.$vux.loading.show({
        text: 'Loading'
      })
      Promise.all([this.GetTaskRight(),this.GetRight()]).then(resp=>{
        console.log(resp)
        this.$vux.loading.hide()
        if(resp[0].Code==0){
          this.finish = true
          this.respData = resp[0].Data
        }else{
          this.finish = false
        }
        if(resp[1].Code==0){
          this.taskStatus = resp[1].Data
          window.sessionStorage.setItem('taskOne',JSON.stringify(resp[1].Data))
        }
      })

      let now = new Date().getTime()
      //new Date().getTime('2020-12-11 00:00:00')
      debugger
      if(now>1607616001000){
      }
      this.showCode = true

      // this.GetTaskRight().then(res=>{
      //   this.$vux.loading.hide()
      //   if(res.Code==0){
      //     this.finish = true
      //     this.respData = res.Data
      //   }else{
      //     // this.showTips(res.Message||'获取任务进度出错')
      //     this.finish = false
      //   }
      // })

      // this.GetRight().then(res=>{
      //   if(res.Code==0){
      //     this.taskStatus = res.Data
      //   }
      // })

    },
    goAward(){
      let that = this
      if(!this.finish){
        this.showTips('请先完成前两项任务')
      }else{
        if(this.respData.Id!=0){
          // this.go('/eb/taskthird/page3/'+this.respData.Id)
          // this.go('/eb/taskthird/page3/'+99)//99抢完了
          if(this.respData.Id==-1){
            // this.showTips('谢谢参与！您未中奖')
            this.go('/eb/taskthird/page3/'+99)
          }else if(this.respData.Id==-2){
            //已经绑定直接抽奖
            // this.showTips('谢谢参与！您未中奖')
            this.go('/eb/taskthird/page2');
          }else{
            if(this.respData.Id==5){
              window.sessionStorage.setItem('jd-card',this.respData.Card)
            }
            this.go('/eb/taskthird/page3/'+that.respData.Id);
          }

        }else{
          this.go('/eb/taskthird/page1')
        }
      }
    },
    zhibo(){
      window.open('https://live.photoplus.cn/live/pc/29871155/#/live')
    }
  },
  activated(){
    this.initData()
  }
  
};
</script>
<style lang="less" scoped>
.page{
  height: 100%;

  >div{
    width: 100%;
    margin: 15px 0;
    .btnimg{
      width: 70%;
    }
  }
  .task-btn{
    position: relative;
    .tipsImg{
      position: absolute;
      height: 120%;
      right: 10%;
      bottom: 0;
    }
  }
}
a:hover{
  -webkit-tap-highlight-color: transparent;
}
.qrCode{
  width: 40vw;
  height: 40vw;
}
</style>
