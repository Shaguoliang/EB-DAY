<template>
<mainPage>
  <div class="page flex column center ">
    <div class="flex1 cardBg">
      <div class="cardBg-bg" :class="{p8:awardId==99}" >
        <!-- :class="{w8:awardId==4}" -->
        <a href="javascript:void(0)"><img :class="[awardId==4?'w6':'w8']" :src="require('../../../assets/eb/aw/aw'+awardId+'.png')" alt=""></a>
      </div>
      <div v-if="awardId==5" class="flex column center jdc">
        <div class="km">卡密：{{jdCard}}</div>
        <div class="w8 pp">
          <span>STEP 1</span>
          <a href="javascript:void(0)"><img class="w6" @click="copyLink(jdCard)" src="../../../assets/eb/prizejdc-btn1.png" alt=""></a>
        </div>
        <div class="w8 pp">
          <span>STEP 2</span>
          <a href="javascript:void(0)"><img class="w6" @click="openjd()" src="../../../assets/eb/prizejdc-btn2.png" alt=""></a>
        </div>
        <div class="w8"><a href="javascript:void(0)"><img class="w6" src="../../../assets/eb/prizejdc-btn3.png" alt=""></a></div>
      </div>
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      awardId:0,
      jdCard:""
    };
  },
  components:{
    mainPage,
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
    },
    go(name){
      // this.$router.push(name)
      this.$router.push({path: name});
    },
    goBack(){
      this.$router.go(-1)
    },
    copyLink(text) {
      // 数字没有 .length 不能执行selectText 需要转化成字符串
      const textString = text.toString();
      let input = document.querySelector("#copy-input");
      if (!input) {
        input = document.createElement("input");
        input.id = "copy-input";
        input.readOnly = "readOnly"; // 防止ios聚焦触发键盘事件
        input.style.position = "absolute";
        input.style.left = "-1000px";
        input.style.zIndex = "-1000";
        document.body.appendChild(input);
      }

      input.value = textString;
      // ios必须先选中文字且不支持 input.select();
      this.selectText(input, 0, textString.length);
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$vux.toast.text('复制成功','bottom')
      } else {
        this.$vux.toast.text('复制失败，请手动复制','bottom')
      }
      input.blur();
    },
    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    selectText(textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {
        //ie
        const range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex); //起始光标
        range.moveEnd("character", stopIndex - startIndex); //结束光标
        range.select(); //不兼容苹果
      } else {
        //firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
      }
    },
    openjd(){
      window.open('https://m.jd.com/')
    }
  },
  activated(){
    this.awardId = this.$route.params.id||0
    if(this.awardId==5){
      this.jdCard = window.sessionStorage.getItem('jd-card')
    }
  }
  
};
</script>
<style lang="less" scoped>
.page{
  height: 100%;
}
.cardBg{
  margin: 0 auto;
  width: 80%;
  overflow: auto;
  .cardBg-bg{
    padding: 2%;
    background: rgba(255,255,255,.4);
    border-radius: 10px;
    width: 100%;
    &.p8{
      padding: 8% 2%;
    }
    img{
      margin-bottom: 5px;
    }
  }
  img{
    width: 100%;
  }
  .w8{
    width: 80%;
  }
  .w7{
    width: 70%;
  }
  .w6{
    width: 60%;
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
.jdc{
  // padding: 10px 0 0 15%;
  width: 100%;
  // padding-top: 10px;
  // text-align: left;
  >div{
    margin-top: 10px;
  }
  .km{
    background: #fff;
    padding: 5px 10px;
    font-size: 12px;
    color: #000;
    font-weight: bold;
    // width: 80%;
  }
  .pp{
    position: relative;
    span{
      position: absolute;
      left: 20%;
      top: 50%;
      color: #000;
      font-size: 12px;
      font-weight: bold;
      zoom: 0.9;
      transform: translate(-105%,-50%);
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
