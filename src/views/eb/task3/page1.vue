<template>
<mainPage :windowHeight="windowHeight">
  <div id="formPage" class="page flex column center" :style="{height:boxHeight?boxHeight+'px':'100%'}">
    <div class="flex1 cardBg">
      <!-- <a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task1-page1-text.png" alt=""></a> -->
      <div>
        <div class="flex center formItem">
          <div class="label"><span>Employee</span><span>ID</span><span>:</span></div>
          <div class="value">
            <input type="text" v-model="form.WorkNumber">
            <div class="tips">(与workday登记信息一致)</div>
          </div>
        </div>
        <div class="flex center formItem">
          <div class="label"><span>中</span><span>文</span><span>姓</span><span>名</span><span>:</span></div>
          <div class="value">
            <input type="text" v-model="form.Name">
            <div class="tips">(与workday登记信息一致)</div>
          </div>
        </div>
        <div class="flex center formItem">
          <div class="label"><span>收</span><span>件</span><span>地</span><span>址</span><span>:</span></div>
          <div class="value">
            <input type="text" v-model="form.Address">
            <div class="tips">(与workday登记信息一致)</div>
          </div>
        </div>
        <div class="flex center formItem">
          <div class="label"><span>手</span><span>机</span><span>号</span><span>码</span><span>:</span></div>
          <div class="value">
            <input type="text" v-model="form.Phone">
            <div class="tips">(与workday登记信息一致)</div>
          </div>
        </div>
      </div>
      <div class="cr">请注意！</div>
      <div class="tl">个人信息填写时，请务必输入与您在 Workday 登记时一致的中文姓名及手机号，并填写详细办公 / 零售店铺地址。</div>
      <div class="tl">礼品将在 5-10 个工作日内为您寄出</div>
    </div>
    <div class="flex center around btns">
      <div @click="submit" class="flex1"><a href="javascript:void(0)"><img src="../../../assets/eb/btnImg/task3-page1-1.png" alt=""></a></div>
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
      form:{
        Address: '',
        Phone: '',
        Name: '',
        WorkNumber: ''
      },
      windowHeight:0,
      boxHeight:0
    };
  },
  components:{
    mainPage,
  },
  methods:{
    ...mapActions("share", ["taskVerifyId"]),
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
    submit(){ 
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.taskVerifyId(this.form).then(res=>{
        this.$vux.loading.hide()
        if(res.Code==0){
          // this.go('/eb/taskthird/page2')
          this.$router.replace({path: '/eb/taskthird/page2'});
        }else{
          this.showTips(res.Message||'信息验证有误')
        }
      })
    }
  },
  mounted(){
    this.windowHeight = document.querySelector('#app').clientHeight
    this.boxHeight = document.querySelector('#formPage').clientHeight
    console.log(this.windowHeight)
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
  background: rgba(255,255,255,.4);
  border-radius: 10px;
  overflow: auto;
  padding: 5% 5% 2% 2%;
  color: #000;
  font-weight: bold;
  img{
    width: 100%;
  }
  .logo-text{
    width: 100px;
  }
  .cr{
    color: red;
    font-weight: bold;
    margin: 5px;
  }
  .tl{
    text-align: left;
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
.formItem{
  height: 26px;
  line-height: 26px;
  margin-bottom: 25px;
  .label{
    width: 70px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
  }
  .value{
    flex: 1;
    position: relative;
    input{
      width: 100%;
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      padding: 0 5px;
    }
    .tips{
      position: absolute;
      right: 0;
      top: 30px;
      width: 100%;
      line-height: 20px;
      // padding-right: 10%;
      text-align: right;
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
