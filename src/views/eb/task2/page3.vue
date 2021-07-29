<template>
<mainPage>
  <div class="page flex column center ">
    <div class="flex1 cardBg">
      <a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task2-page3-text.png" alt=""></a>
    </div>
    <div class="flex center around btns">
      <div @click="goBack" class="flex1"><a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task1-page3-1.png" alt=""></a></div>
    </div>
  </div>
</mainPage>
</template>

<script>
import utils from "@/utils/utils";
import mainPage from "../main2"
export default {
  data() {
    return {
      show2:false,
      menus2: {
        menu1: "拍照",
        menu2: "从相册选择"
      },
      userImg:"1"
    };
  },
  components:{
    mainPage,
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
      this.$router.push({path: name});
    },
    goBack(){
      this.$router.go(-1)
    },
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
  height: 40px;
  width: 100%;
  margin: 10px 0;
  img{
    width: 50%;
  }
}
a:hover{
  -webkit-tap-highlight-color: transparent;
}
.abc{
  position: absolute;
  top: -100px;
  opacity: 0;
}
.imgBg{
  width: 100vw;
  height: 100vw;
  background: #f7f7f7;
  flex-shrink: 0;
  position: relative;
  img{
    width: 100%;
    vertical-align: bottom;
  }
  .gjList{
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgba(0,0,0,.3);
    padding-top: 10px;
    padding-left: 20px;
    >div{
      width: 100%;
      >div{
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
</style>
<style lang="scss">
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
</style>
