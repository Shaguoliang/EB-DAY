<template>
<mainPage>
  <div class="page flex column center">
    <div class="flex1 cardBg">
      <a href="javascript:void(0)"><img class="txtimg" src="../../../assets/eb/btnImg/task2-page2-text.png" alt=""></a>
      <div class="flex wrap">
        <div class="imgItem" v-for="(item,index) in videoList" :key="index">
          <div>
            <div class="imgbg" @click="select(index)">
              <img :src="item.coverurl" alt="">
              <span class="icon-play"></span>
            </div>
            <div class="likeText">助力值：{{item.LikeCount}}</div>
            <!-- @click="go('/eb/tasktow/page3')"  :class="{gray:item.IsLike}"-->
            <div @click="likeOrUnlike(item,true)" v-if="item.IsLike"><a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task2-page2-11.png" alt=""></a></div>
            <div @click="likeOrUnlike(item,true)" v-else><a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task2-page2-1.png" alt=""></a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex center around btns">
      <div @click="goBack" class="flex1"><a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task1-page3-1.png" alt=""></a></div>
    </div>
    <div class="video-player-bg flex center justifycenter" v-if="show2" @click.self="close()">
      <!-- <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player> -->
      <vueMiniPlayer ref="vueMiniPlayer" :video="videoOptions" :mutex="true" @fullscreen="handleFullscreen" />
      <span class="vux-close" @click.self="close()"></span>
      <!-- <video ref="videoPlayer" class="video-player" controls controlsList="nodownload" :autoplay='true' :poster="videoList[activeIndex].coverurl" :src="videoList[activeIndex].Url"></video> -->
    </div>
  </div>
</mainPage>
</template>

<script>
import utils from "@/utils/utils";
import mainPage from "../main2"
import { mapState,mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      show2:false,
      activeIndex:0,
      videoList:[],
      
      userImg:"1",
      playerOptions : {
        // playbackRates: [0.75, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "https://upload.lyced.com/teaching/videos/video1.mp4" //url地址
        }],
        poster: "", //你的封面地址
        // poster: require("../../../assets/bg.png"), //你的封面地址
        // width: document.documentElement.clientWidth,
        // height: 260,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },
      searchObj:{
        PageIndex:1,
        PageSize:4
      },
      needPlay:false,
      videoOptions:{
        url: '',
        cover: '',
        muted: false,
        loop: false,
        preload: 'auto',
        poster: '',
        volume: 1,
        autoplay: true
      }
      // list:[{
      //   url:require('../../../assets/MP4/1.mp4')
      // },{
      //   url:require('../../../assets/MP4/2.mp4')
      // },{
      //   url:require('../../../assets/MP4/3.mp4')
      // },{
      //   url:require('../../../assets/MP4/4.mp4')
      // }]
    };
  },
  computed:{
    IsLiked(){
      let liked = true
      try {
        liked = this.videoList.filter(v=>v.IsLike).length>0
      } catch (error) {
        
      }
      return liked
    }
  },
  components:{
    mainPage,
  },
  methods:{
    ...mapActions("share", ["GetVideoList","TaskLike"]),
    ...mapMutations(['savehideBgm']),
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
    goreplace(name){
      this.$router.replace({path: name});
    },
    select(i){
      // if(!this.videoList[i].IsLike){
      //   return
      // }
      this.activeIndex = i
      this.playerOptions.sources[0].src = this.videoList[this.activeIndex].Url
      this.playerOptions.poster = this.videoList[this.activeIndex].coverurl
      this.videoOptions.url = this.videoList[this.activeIndex].Url
      this.videoOptions.cover = this.videoList[this.activeIndex].coverurl
      // this.playerOptions.sources[0].src = this.list[this.activeIndex].url
      
      // this.playerOptions.poster = this.unitList[this.activeIndex].displayImgPath
      this.savehideBgm(true)
      this.show2 = true
      let that = this
      setTimeout(()=>{
        // let player = that.$refs.videoPlayer.player
        let player = that.$refs.vueMiniPlayer.$video;
        
        // let player = that.$refs.videoPlayer
        debugger
        console.log(player)
        // player.enterFullWindow()
        try {
          if (player.requestFullscreen) {
            player.requestFullscreen()
          } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen()
          } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen()
          } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullScreen()
          }
        } catch (error) {}
        
        player.play();
        debugger
        // if(LYaudio&&!LYaudio.paused){
        //   that.needPlay = true
        // }
        LYaudio.pause()
      },200)
    },
    close(){
      this.savehideBgm(false)
      this.show2 = false
      if(this.needPlay){
        // LYaudio.play()
      }
    },
    likeOrUnlike(item,IsLike){
      if(this.lock){
        return
      }
      if(this.IsLiked){
        this.showTips('您已经投过票了')
        return
      }
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.lock = true
      this.TaskLike({
        ImageId:item.Id,
        Action:item.IsLike?1:0,
        Type:1,
      }).then(res=>{
        this.$vux.loading.hide()
        this.lock = false
        if(res.Code==0){
          item.IsLike = IsLike
          if(IsLike){
            item.LikeCount++
          }else{
            item.LikeCount--
          }
          let that = this
          setTimeout(()=>{
            // that.go('/eb/tasktow/page3')
            that.goreplace('/eb/tasktow/page3')
          },500)
        }
      })
    },
    initData(){
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.GetVideoList(this.searchObj).then(res=>{
        this.$vux.loading.hide()
        if(res.Code==0){
          this.videoList = res.Data.ResultData
        }else{
          this.showTips(res.Message||'获取视频列表出错')
        }
      })
    },
    handleFullscreen(e){
      console.log(e)
      if(!e){
        this.close()
      }
    }
  },
  activated(){
    this.show2 = false
    this.initData()
  }
  
};
</script>
<style lang="less" scoped>
@import '~vux/src/styles/close';
.page{
  height: 100%;
}
.cardBg{
  margin: 0 auto;
  width: 100%;
  // background: rgba(255,255,255,.4);
  // border-radius: 10px;
  overflow: auto;
  padding: 0 5%;
  >div{
    width: 100%;
    align-items: flex-end;
  }
  .txtimg{
    width: 70%;
    margin-bottom: 10px;
  }
  .imgItem{
    width: 45%;
    margin-right: 10%;
    // margin-bottom: 10px;
    &:nth-child(2n+2){
      margin-right: 0;
    }
    &:nth-child(2n+3){
      // margin-top: 10px;
    }
    .imgbg{
      background: rgba(0,0,0,.3);
      border: 2px solid #fff;
      border-radius: 4px;
      width: 100%;
      height: 0;
      position: relative;
      padding-bottom: 56%;
      >img{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: contain;
      }
      .icon-play{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(0,0,0,.6);
        color: #fff;
        font-size: 14px;
        border-radius: 50%;
        transform: translate(-50%,-50%);
      }
    }
    
    .likeText{
      margin: 5px 0;
      color: #000;
      font-size: 12px;
    }
    .like{
      width: 20px;
      height: 10px;
      background: url('../../../assets/eb/like1.png');
      background-size:100% 100%;
    }
    .gray{
      filter: grayscale(100%);
    }
  }
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
.video-player-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  .video-player{
    width: 100%;
  }
  .vux-close{
    position: fixed;
    top: 20px;
    right: 20px;
    color: #fff;
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
.vjs-custom-skin > .video-js .vjs-big-play-button{
  padding: 0;
  background: rgba(0,0,0,.5);
  color: #fff;
  transform: translate(-50%,-50%);
  border-radius: 30px;
  height: 60px !important;
  width: 60px !important;
  border: none !important;
  margin: 0 !important;
  line-height: 60px !important;
  margin-top: 0 !important;
}
</style>
