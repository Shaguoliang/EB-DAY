<template>
  <!-- <div id="app" :class="isMobile?'lw7':'lw3'"> -->
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="Router child-view" v-if="isRouterAlive"/>
      </keep-alive>
    </transition>
    <!-- <div class="audioStatus" @click="playOrpause">{{audioStatus=='paused'?'暂停中':'播放中'}}</div> -->
    <div class="audioStatus" @click="playOrpause" :class="audioStatus" v-show="!hideBgm">
      <img src="./assets/eb/icon-bgm.png" alt="">
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isMobile: true,
      isRouterAlive:true,
      transitionName: 'slide-left',
      routerArr:[""],
      audioStatus:'paused'
    };
  },
  computed:{
    ...mapState(['hideBgm']),
  },
  watch: {
    '$route' (to, from) {
      let toIndex = this.routerArr.indexOf(to.path);
      let fromIndex = this.routerArr.indexOf(from.path);
      // console.log(toIndex);
      // console.log(fromIndex);
      if (toIndex > -1 && fromIndex > -1) {  // 如果下标都存在
        if (toIndex < fromIndex) {     // 如果进入的下标小于离开的下标，那么是左滑
          this.transitionName = 'slide-right';
          // console.log("right")
        } else {
          this.transitionName = 'slide-left';
          this.routerArr.push(to.path);     // 如果进入的下标大于离开的下标，那么是右滑
          // console.log("left");
        }
      } else{
        this.transitionName = 'slide-left';
        this.routerArr.push(to.path);     // 如果进入的下标大于离开的下标，那么是右滑
        // console.log("left");
      }
      // this.initAudio()
    }
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    initAudio(){
      debugger
      var that = this;
      this.audioStatus = "playing";
      // var audio = document.getElemnentById("myAudio");
      if(LYaudio){
        LYaudio.removeEventListener("playing", that.setaudioStatus);
        LYaudio.removeEventListener("pause", that.setaudioStatus2);

        LYaudio.addEventListener("playing", that.setaudioStatus);
        LYaudio.addEventListener("pause", that.setaudioStatus2);
        

        // LYaudio.addEventListener("playing", function(){
        //   that.audioStatus = "playing";
        // });
        // LYaudio.addEventListener("pause", function(){
        //   debugger
        //   that.audioStatus = "paused";
        // });
      }
    },
    setaudioStatus(){
      this.audioStatus = "playing";
    },
    setaudioStatus2(){
      this.audioStatus = "paused";
    },
    playOrpause(){
      debugger
      if(LYaudio&&LYaudio.paused&&this.audioStatus == "playing"){
        LYaudio.play()
        return
      }
      // LYaudio&&LYaudio.play()
      if(this.audioStatus == "playing"){
        LYaudio.pause()
      }else{
        LYaudio.play()
      }
    }

  },
  created() {
    var UA = navigator.userAgent;
    var ipad = !!UA.match(/(iPad).*OS\s([\d_]+)/);
    var isIphone = !!(UA.match(/(iPhone\sOS)\s([\d_]+)/));
    var isAndroid = !!UA.match(/(Android)\s+([\d.]+)/);
    var isMobile = !!(isIphone || isAndroid);
    this.isMobile = isMobile;
  },
  mounted() {
    (function () {
      let myFunction
      let isWXAndIos = isWeiXinAndIos()
      if (isWXAndIos) {
      document.body.addEventListener('focusin', () => {
      clearTimeout(myFunction)
      })
      document.body.addEventListener('focusout', () => {
      clearTimeout(myFunction)
      myFunction = setTimeout(function() {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      }, 200)
      })
      }
    })()
    function isWeiXinAndIos () {
      let ua = '' + window.navigator.userAgent.toLowerCase()
      let isWeixin = /MicroMessenger/i.test(ua)
      let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua)
      return isWeixin && isIos
    }

    this.initAudio()
  }
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  // max-width: 300px;
  margin: 0 auto;
}
.lw7{
  max-width: 750px;
}
.lw3{
  max-width: 300px;
  transform: translate(0,0);
}
@media screen and (min-width: 1024px){
  .weui-dialog {
    width: 80%;
  }
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.audioStatus{
  position: fixed;
  right: 20px;
  top: 12vh;
  // background: rgba(0,0,0,.3);
  // color: #fff;
  // padding: 5px;
  z-index: 100;
  width: 30px;
  overflow: hidden;
  border-radius: 50%;
  img{
    width: 100%;
  }
  &.paused::before{
    content: " ";
    position: absolute;
    top: 14px;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255,255,255,.9);
    transform: rotate(45deg);
  }
}
</style>
