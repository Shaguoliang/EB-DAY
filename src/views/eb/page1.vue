<template>
  <mainPage>
    <div class="page flex column center">
    <div class="flex1 cardBg">
      <a href="javascript:void(0)"><img src="../../assets/eb/btnImg/page1-text.png" alt=""></a>
      <!-- <a href="javascript:void(0)"><img class="logo-text" src="../../assets/eb/btnImg/logo-text.png" alt=""></a>
      <div>
        <p>2020年12月12日</p>
        <p>施华洛世奇中国雇主品牌</p>
        <p>迎来四周年纪念！</p>
        <p>关爱、尊重、支持</p>
        <p>在这特殊的一年,更显珍贵。</p>
        <p>因此</p>
        <p>让我们</p>
        <p>以家为名,开启施家燃梦派对</p>
        <p>共同携手,燃情梦想</p>
        <p>迎接注定闪耀的未来</p>
      </div> -->
    </div>
    <div class="flex center around btns">
      <div class="flex1" @click="go('/eb/page3')"><a href="javascript:void(0)"><img src="../../assets/eb/btnImg/page1-1.png" alt=""></a></div>
      <div class="flex1" @click="go('/eb/page2')"><a href="javascript:void(0)"><img src="../../assets/eb/btnImg/page1-2.png" alt=""></a></div>
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
  }
}
.btns{
  height: 80px;
  width: 100%;
  img{
    width: 100%;
  }
}
a:hover{
  -webkit-tap-highlight-color: transparent;
}
</style>
