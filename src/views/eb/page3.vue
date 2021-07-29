<template>
<mainPage>
  <div class="page flex column center">
    <div class="flex1 cardBg">
      <a href="javascript:void(0)"><img class="logo-text" src="../../assets/eb/btnImg/logo-text.png" alt=""></a>
      <div>
        <p class="title">声明</p>
        <p>　　本人在此免费授予施华洛世奇(上海)贸易有限公司及其关联公司(以上统称“被授权人“)，为宣传或促销被授权人的品牌形象、企业文化之目的，在“作品”(定义见下文)中使用本人肖像权及照片、录音录像资料，以及本人对使用施华洛世奇企业文化之体验、感受及反馈信息和相关内容(以下统称为“企业品牌体验”)的非排他性的、不可撤销的权利。该使用权包括但不限于以任何形式或媒介手段、全部或部分地对本人照片、录音录像资料或品牌体验的“作品”进行使用、修改、剪裁、润色、改编成新的或派生作品、复制、出版、发放、播放、传输、转让或者展示的权利。被授权人在全球范围内可以永久地独立决定对于任何“作品”的具体应用的权利，本人放弃任何审查或批准上述使用的权利。如“企业品牌体验”由本人撰写，则本人将相关著作权和其他知识产权转让给“被授权人”。</p>
        <p>　　上文提及的“作品”指由被授权人拥有著作权或使用权的含有本人肖像或本人“企业品牌体验”的任何载体，包括但不限于照片、图片、录音、录像、海报、书面文档、电子文件、博客、微博、其他形式的各类宣传材料等。</p>
        <p>　　本人确认，本人具有完全民事行为能力，完全理解上述授权的含义，有充分的权利自愿签署本协议书，并且不违反任何法律和第三方的任何合同、授权。</p>
        <p>特此授权。</p>
      </div>
    </div>
    <div class="flex center around btns">
      <div @click="gameStart" class="flex1">
        <a href="javascript:void(0)">
          <img src="../../assets/eb/btnImg/page3-1.png" alt="">
        </a>
      </div>
    </div>
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
      
    };
  },
  components:{
    mainPage
  },
  methods:{
    ...mapActions("share", ["FinishTask"]),
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
    },
    gameStart(){
      this.FinishTask({ taskOrder: 0 }).then(res=>{
        this.go('/eb/taskMain')
      })
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
  padding: 5%;
  // img{
  //   width: 100%;
  // }
  .logo-text{
    width: 100px;
  }
  p{
    text-align: left;
    color: #000;
    font-size: 12px;
    margin-bottom: 10px;
    line-height: 1.5;
    &.title{
      text-align: center;
      font-size: 16px;
      margin: 10px 0;
    }
  }
}
.btns{
  height: 80px;
  width: 100%;
  img{
    width: 70%;
    vertical-align: bottom;
  }
}
a:hover{
  -webkit-tap-highlight-color: transparent;
}
</style>
