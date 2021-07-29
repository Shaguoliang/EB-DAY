<template>
<mainPage>
  <div class="page flex column center">
    <div class="flex1 cardBg">
      <a href="javascript:void(0)"><img src="../../assets/eb/btnImg/page2-text.png" alt=""></a>
      <!-- <div>
        <p>活动规则</p>
        <p>全文</p>
        <p>XXX</p>

      </div> -->
    </div>
    <div class="flex center around btns">
      <div class="flex1" @click="go('/eb/page3')"><a href="javascript:void(0)"><img src="../../assets/eb/btnImg/page1-1.png" alt=""></a></div>
    </div>
  </div>
</mainPage>
</template>

<script>
import utils from "@/utils/utils";
import mainPage from "./main2"
export default {
  data() {
    return {
      
    };
  },
  components:{
    mainPage
  },
  methods:{
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
      // this.$router.push({path: name});
      this.$router.replace({path: name});
    }
  },
  mounted(){

  }
  
};
</script>
<style lang="less" scoped>
.page{
  height: 100%;
}
.cardBg{
  margin: 0 auto;
  width: 70%;
  background: rgba(255,255,255,.4);
  border-radius: 10px;
  overflow: auto;
  padding: 5% 8%;
  img{
    width: 100%;
  }
  .logo-text{
    width: 100px;
    vertical-align: bottom;
  }
}
.btns{
  height: 80px;
  width: 100%;
  img{
    width: 50%;
    vertical-align: bottom;
  }
}
a:hover{
  -webkit-tap-highlight-color: transparent;
}
</style>
