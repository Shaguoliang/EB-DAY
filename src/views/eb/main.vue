<template>
  <div class="main">
    <a href="javascript:void(0)"><img class="logo1" src="../../assets/eb/logo1.png" alt=""></a>
    <a href="javascript:void(0)"><img class="logo2" src="../../assets/eb/logo2.png" alt=""></a>
    <a href="javascript:void(0)"><img class="logo3" src="../../assets/eb/logo3.png" alt=""></a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import utils from "@/utils/utils";
export default {
  data() {
    return {
      
    };
  },
  components:{
  },
  methods:{
    ...mapActions("share", ["getSignature","GetRight"]),
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
      let that = this
      let url = location.href.split('#')[0]
      this.getSignature({url:url}).then(res=>{
        wx.config({
          debug: false, //调试阶段建议开启
          appId: "wxf86eeacd16b52e4a",//APPID
          timestamp: res.Data.timestamp,//上面main方法中拿到的时间戳timestamp
          nonceStr: res.Data.nonceStr,//上面main方法中拿到的随机数nonceStr
          signature: res.Data.signature,//上面main方法中拿到的签名signature
          jsApiList: ["updateAppMessageShareData","updateTimelineShareData","onMenuShareAppMessage","onMenuShareTimeline"],
          fail:function(res){
            that.showTips(res.errMsg||"checkJsApi:fail");
          }
        });
        wx.onMenuShareAppMessage({
          title: '以家为名，施家燃梦PARTY', // 分享标题
          desc: '12月2日-12月7日 施华洛世奇雇主品牌4周年庆互动预热进行中', // 分享描述
          link: 'http://swapi.mcutec.com/web/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://swapi.mcutec.com/static/shareIcon.jpg', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        });
        wx.onMenuShareTimeline({
          title: '以家为名，施家燃梦PARTY', // 分享标题
          link: 'http://swapi.mcutec.com/web/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://swapi.mcutec.com/static/shareIcon.jpg', // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })

        wx.ready(function() {
          // wx.updateAppMessageShareData({ 
          //   title: '我是分享标题', // 分享标题
          //   desc: '我是分享描述描述描述描述描述描述描述描述描述描述', // 分享描述
          //   link: 'http://swapi.mcutec.com/web/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   imgUrl: '', // 分享图标
          //   success: function () {
          //     // 设置成功
          //   }
          // })
          // wx.updateTimelineShareData({ 
          //   title: '我是分享标题', // 分享标题
          //   link: 'http://swapi.mcutec.com/web/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   imgUrl: '', // 分享图标
          //   success: function () {
          //     // 设置成功
          //   }
          // })

        })
      })
      this.GetRight().then(res=>{
        if(res.Code==0&&res.Data.TaskRight==1){
          // this.$router.push('/eb/taskMain');
          setTimeout(()=>{
            that.$router.replace({path: '/eb/taskMain'});
          },3000)
        }else{
          setTimeout(()=>{
            that.$router.replace({path: '/eb/page1'});
          },3000)
        }
      })
    }
  },
  mounted(){
    this.initData()
  }
};
</script>
<style lang="less" scoped>
.main{
  background: url('../../assets/eb/main-bg.png');
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: relative;
}
a:hover{
  -webkit-tap-highlight-color: transparent;
}
.logo1{
  position: absolute;
  left: 5%;
  top: 24%;
  width: 90%;
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
