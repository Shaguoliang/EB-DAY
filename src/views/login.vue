<template>
  <div class="login">
    <toast v-model="shown" type="text" :time="800" is-show-mask :text="showerrinfo" position="top"></toast>
    <!-- <div>{{code}}</div>
    <div>{{err}}</div> -->
  </div>
</template>

<script>
import config from "@/config/constant";
import { mapState, mapActions } from "vuex";
import { Toast } from "vux";
export default {
  data() {
    return {
      shown: false,
      showerrinfo: "",
      code:"",
      err:"",
      userAgent:""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    //savetoken
    ...mapActions("share", ["getOpenId","GetRight"]),
    //调取微信登录

    geturlparam(num) {
      var reg = new RegExp("(^|&)" + num + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    },
    wxauthor() {
      var code = this.geturlparam("code");
      debugger;
      var url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf86eeacd16b52e4a&redirect_uri=" +
        encodeURIComponent(config.loginUrl) +
        "&response_type=code&scope=snsapi_base#wechat_redirect";
      if (code) {
        this.code = code;
        this.getOpenId({ code: code,Type:0 })
          .then(res => {
            if(res.Code==0&&res.Data){
              this.$router.replace('/eb/main');
            }else{
              this.shown = true;
              this.showerrinfo = "登录失败，请稍后重试";
            }
          })
      } else {
        window.location.href = url;
      }
    },
    qywxauthor() {
      var code = this.geturlparam("code");
      debugger;
      var url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww4206919b243cfc6f&redirect_uri=" +
        encodeURIComponent(config.loginUrl) +
        "&response_type=code&scope=snsapi_base&agentid=1000002#wechat_redirect";
      if (code) {
        this.code = code;
        this.getOpenId({ code: code,Type:1 }).then(res => {
          if(res.Code==0&&res.Data){
            this.$router.replace('/eb/main');
          }else{
            this.shown = true;
            this.showerrinfo = "登录失败，请稍后重试";
          }
        })
      } else {
        window.location.href = url;
      }
    },
    // loginSuccess(){
      
    // }
  },
  components: {
    Toast
  },
  created() {
    var ua= window.navigator.userAgent.toLowerCase();
    if( (ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork') ){
      console.log("企业微信客户端");
      this.userAgent = 'qywx'
      this.qywxauthor();
    }else if( ua.match(/micromessenger/i) == 'micromessenger' ){
      console.log("微信客户端");
      this.userAgent = 'wx'
      this.wxauthor();
    }else{
      alert("请使用微信浏览器打开");
    }
    // this.wxauthor();
    // this.qywxauthor();
  }
};
</script>
<style scoped lang="less">
.login {
  text-align: center;
  .loginbtn {
    display: block;
    width: 150px;
    height: 40px;
    line-height: 40px;
    list-style: none;
    border-radius: 4px;
    text-decoration: none;
    background: #2b82f9;
    color: #fff;
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
