<template>
  <div class="main" :style="{height:windowHeight?windowHeight+'px':'100vh'}">
    <a href="javascript:void(0)"><img class="logo1" src="../../assets/eb/logo1.png" alt=""></a>
    <a href="javascript:void(0)"><img class="logo2" src="../../assets/eb/logo2.png" alt=""></a>
    <a href="javascript:void(0)"><img class="logo3" src="../../assets/eb/logo3.png" alt=""></a>
    <div class="mainPage">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/utils";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  props:['windowHeight'],
  components:{
  },
  methods:{
    ...mapActions("share", [""]),
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
    }
  },
  mounted(){

  }
  
};
</script>
<style lang="less" scoped>
.main{
  // background: url('../../assets/eb/main-bg2.png');
  // background-size: 100% 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.mainPage{
  padding: 24vh 0 10vh 0;
  height: 100%;
  position: relative;
  z-index: 10;
}
.logo1{
  position: absolute;
  left: 0;
  top: 0;
  // width: 65%;
  height: 24%;
}
.logo2{
  position: absolute;
  right: 5%;
  top: 5%;
  width: 23%;
}
.logo3{
  position: absolute;
  left: 50%;
  bottom: 6%;
  width: 25%;
  transform: translateX(-50%);
}

</style>
<style lang="less">
img{
  vertical-align: bottom;
}
</style>
