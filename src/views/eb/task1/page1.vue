<template>
<mainPage>
  <div class="page flex column center" v-if="userImg" @click="clickOutArea">
    <div class="imgBg imgBgPage1" >
      <div ref="imgBg" style="display: inline-block">
        <!-- <a href="javascript:void(0)"><img :src="userImg" alt=""></a> -->
        <img v-if="imgIsOk" :src="userImg" preview="0" :style="userBgStyle" class="userBg" alt="">
        <a v-else href="javascript:void(0)"><img :src="userImg" :style="userBgStyle" class="userBg" alt=""></a>
        <div class="tietuBox" v-if="!imgIsOk"><tietu ref="tietu"></tietu></div>
      </div>
      <!-- <div class="tietu" @click.stop="pop" v-if="!showPop&&!imgIsOk">
        <a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task1-page1-up.png" alt=""></a>
      </div> -->
    </div>
    <div class="flex center around btns" v-if="!imgIsOk">
      <div class="flex1" @click="toImg()"><a href="javascript:void(0)"><img class="step2" src="../../../assets/eb/btnImg/task1-page1-2.png" alt=""></a></div>
      <div class="flex1" @click="goreplace('/eb/taskone/page3')"><a href="javascript:void(0)"><img class="step2" src="../../../assets/eb/btnImg/task1-page1-3.png" alt=""></a></div>
    </div>
    <div class="flex center around btns" v-else>
      <div class="flex1" @click="goreplace('/eb/taskone/page3')"><a href="javascript:void(0)"><img class="step2" src="../../../assets/eb/btnImg/task1-page1-3.png" alt=""></a></div>
      <div class="flex1" @click="goBack"><a href="javascript:void(0)"><img class="step2" src="../../../assets/eb/btnImg/task1-page3-1.png" alt=""></a></div>
    </div>

  </div>
  <div class="page flex column center " v-else>
    <div class="flex1 cardBg">
      <a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task1-page1-text.png" alt=""></a>
    </div>
    <div class="flex center around btns">
      <div class="flex1" @click="show2=true"><a href="javascript:void(0)"><img class="step2" src="../../../assets/eb/btnImg/task1-page1-1.png" alt=""></a></div>
      <div class="flex1" @click="goreplace('/eb/taskone/page3')"><a href="javascript:void(0)"><img class="step2" src="../../../assets/eb/btnImg/task1-page1-32.png" alt=""></a></div>
    </div>
  </div>
  <input id="upload1" ref="upload1" type="file" accept="image/*" @change="readFile" capture="camera" class="abc">
  <input id="upload2" ref="upload2" type="file" accept="image/png, image/jpeg" @change="readFile" class="abc">
  <!-- <t1 ref="cropperjs" @callback="readFile2"></t1> -->
  <actionsheet v-model="show2" :menus="menus2" @on-click-menu="checkMenu" show-cancel></actionsheet>
  <x-dialog v-model="showToast" class="dialog-demo">
    <div class="dialog-title">上传成功！</div>
    <div class="dialog-body">
      <p>请长按保存图片</p>
      <p>并将图片发至朋友圈</p>
      <p>或其他任何社交媒体</p>
    </div>
    <div class="dialog-body">点击“浏览更多”，还能为其他伙伴们的打卡照片点赞</div>
    <div @click="showToast=false">
      <span class="vux-close"></span>
    </div>
  </x-dialog>
</mainPage>
</template>

<script>
import { Actionsheet,XDialog  } from 'vux'
import utils from "@/utils/utils";
import mainPage from "../main2"
// import t1 from "@/components/t1"
import tietu from "./page2"
import html2canvas from 'html2canvas';
import { mapState, mapActions } from "vuex";
import * as CompressImg from "@/utils/CompressImg";
export default {
  data() {
    return {
      show2:false,
      menus2: {
        menu1: "拍照",
        menu2: "从相册选择"
      },
      userImg:"",
      showPop:false,
      userBgStyle:{
        width:'100%',
        height:'100%'
      },
      outPut:{
        width:0,
        height:0
      },
      imgIsOk:false,
      lock:false,
      dealWithTimes:10,
      showToast:false,
      times:0
    };
  },
  components:{
    mainPage,
    Actionsheet,
    XDialog,
    tietu
  },
  methods:{
    ...mapActions("share", ["UploadBase64","FinishTask"]),
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
    goreplace(name){
      this.$router.replace({path: name});
    },
    goBack(){
      this.$router.go(-1)
    },
    checkMenu(key) {
      console.log(key)
      if(key=='menu1'){
        this.$refs.upload1.click()
      }
      if(key=='menu2'){
        this.$refs.upload2.click()
      }
    },
    readFile(e){
      var that = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var file  = files[0];
      if(!/image\/\w+/.test(file.type)){
        this.$toast("请检查图像格式");
        return false;
      }
      this.$vux.loading.show({
        text: 'Loading'
      })
      console.log(file.size/1024)
      var reader = new FileReader();
      //图片矫正
      CompressImg.photoCompress(
        file,
        {
          quality: 0.9
        },
        function(base64Codes) {
          file = CompressImg.convertBase64UrlToBlob(base64Codes);
          console.log(file.size/1024)
          reader.readAsDataURL(file);
          reader.onload = that.readerOnload
          // that.$refs.tietu.pop()
        }
      );
      // this.$refs.cropperjs.change(e)
    },
    readerOnload (e,url){
      debugger
      let _that = this
      this.$vux.loading.hide()
      this.userImg = url||e.srcElement.result
      let userImg = url||e.srcElement.result
      if(url){
        this.$previewRefresh()
      }
      // console.log(that.userImg)
      let fileImage = new Image()
      fileImage.src = userImg
      fileImage.onload = () => {
        debugger
        let width = fileImage.width
        let height = fileImage.height
        let cw = document.querySelector('.imgBgPage1').clientWidth
        let ch = document.querySelector('.imgBgPage1').clientHeight

        let newW = 0
        let newH = 0
        if((width/height)>(cw/ch)){
          newW = cw
          newH = cw*height/width
        }else{
          newH = ch
          newW = ch*width/height
        }
        _that.userBgStyle.width = newW + 'px'
        _that.userBgStyle.height = newH + 'px'

        _that.outPut.width = width + 'px'
        _that.outPut.height = height + 'px'
        
        // if((cw*height)/width<ch){
        //   newidth = cw
        // }else{
        //   newidth = ch*width/height
        // }
        // that.userBgStyle.width = newidth + 'px'
        // that.userBgStyle.height = newidth* width/height + 'px'
        // that.userImg = userImg
      }
    },
    readFile2(data){
      console.log(data)
      this.userImg = data
    },
    pop(){
      this.$refs.tietu.pop()
      this.showPop = !this.showPop
    },
    clickOutArea(){
      this.$refs.tietu&&this.$refs.tietu.clickOutArea()
    },
    toImg(){
      if(this.lock){
        return
      }
      let that = this;
      this.showPop = true;
      this.$refs.tietu.clickOutArea()
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.lock = true
      that.times = 0
      setTimeout(()=>{
        html2canvas(that.$refs.imgBg,{backgroundColor:null}).then(canvas => {//html 转 canvas
          
          //canvas转img
          
          // that.uploadImg(canvas.toDataURL("image/png"))

          // that.dealWithImage(canvas.toDataURL("image/png"),function(base64Codes) {
          //   that.uploadImg(base64Codes)
          //   // that.uploadSuccess(base64Codes)
          // })

          that.dealWithImage(canvas.toDataURL("image/jpeg"),callback)
          function callback(base64Codes,isOk){
            // if(isOk){
            //   that.uploadImg(base64Codes)
            // }else{
            //   that.dealWithImage(canvas.toDataURL("image/png"),callback)
            // }
            var file = CompressImg.convertBase64UrlToBlob(base64Codes);
            console.log(file.size/1024)
            
            if(file.size>1024*1024&&that.times<2){
              that.dealWithImage(base64Codes,callback)
            }else{
              // that.dealWithImage(base64Codes,(base64Codes)=>{
              //   var file = CompressImg.convertBase64UrlToBlob(base64Codes);
              //   console.log(file.size/1024)
                that.uploadImg(base64Codes)
              // },'png')
            }
          }
        }).catch(err=>{
          console.log(err)
        });
      },200)
    },
    uploadImg(base64){
      let that = this
      this.UploadBase64({
        base64: base64,
        fileExt: ".jpg"
      }).then(res=>{
        if(res.Code==0&&res.Data){
          this.FinishTask({
            url: res.Data,
            taskOrder: 1
          }).then(resp=>{
            if(resp.Code==0){
              // that.userImg = base64
              // that.imgIsOk = true
              // that.$previewRefresh()
              // that.$refs.tietu.fingerDatas = []
              // this.showToast = true
              that.uploadSuccess(base64)
            }else{
              this.showTips(res.Message||'提交失败')
            }
          })
        }else{
          this.showTips(res.Message||'图片保存失败')
        }
        
      })
    },
    uploadSuccess(path){
      this.$vux.loading.hide()
      let that = this
      that.userImg = path
      that.imgIsOk = true
      that.$previewRefresh()
      that.$refs.tietu.fingerDatas = []
      that.showToast = true
      this.lock = false
    },
    dealWithImage(path,callback,fileType){
      this.times++
      var img = new Image();
      img.src = path;
      img.onload = function () {
        debugger
        var that = this;
        // 默认按比例压缩
        var w = that.width,
        h = that.height,
        scale = w / h;
        if (w > 1024) {
          h = (1024 / w) * h;
          w = 1024;
        }
        console.log("w:" + w)
        var quality = 0.3;  // 默认图片质量为0.6
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        // rotateImg(img, 'no', canvas, h, w);
        ctx.drawImage(img, 0, 0, w, h);
        if(fileType){
          var base64 = canvas.toDataURL('image/png');
        }else{
          var base64 = canvas.toDataURL('image/jpeg',0.6);
        }
        // 回调函数返回base64的值
        callback(base64);
      }
    }
  },
  activated(){
    this.show2 = false;
    this.userImg = "";
    this.imgIsOk = false;
    this.lock = false;
    this.showToast = false;

    let taskOne = window.sessionStorage.getItem('taskOne')
    if(taskOne){
      taskOne = JSON.parse(taskOne)
      if(taskOne.Task1&&taskOne.Url){

        // this.imgIsOk = true;
        // this.readerOnload({},taskOne.Url)

      }
    }
  }
};
</script>
<style lang="less" scoped>
.page{
  height: 100%;
  padding-bottom: 80px;
  position: relative;
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
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 80px;
  img.step1{
    width: 60%;
    vertical-align: bottom;
  }
  img.step2{
    width: 100%;
    vertical-align: bottom;
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
  width: 100%;
  height: 100%;
  // background: #f7f7f7;
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  >div{
    overflow: hidden;
    position: relative;
  }
  img{
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
.tietu{
  position: fixed !important;
  bottom: 0;
  left: 0;
  height: 30px;
  line-height: 30px;
  background: rgba(0,0,0,.3);
  padding: 0 20px;
  width: 100%;
  color: #fff;
  z-index: 20;
  img{
    height: 30px;
  }
}
.tietuBox{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
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
<style lang="less" scoped>
@import '~vux/src/styles/close';

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 40px;
    margin-top: 10px;
    color: #000;
    font-size: 14px;
    font-weight: bold;
  }
  .dialog-body {
    color: #333;
    font-size: 14px;
    margin: 10px 0;
    padding: 0 20px;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
    position: absolute;
    right: 10px;
    top: 0;
  }
}
</style>
