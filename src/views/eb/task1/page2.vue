<template>
  <div class="page-wrapper" @click.self="clickOutArea">
    <ul v-clickoutside="close">
      <li v-for="(url, index) in fingerDatas" :key="index">
        <Finger :imgSrc="url.imgUrl" :index="index" :isActive="url.isActive" @deleteElemet="parentDelete" @tapSelect="parentTapSelect" :clientTop="clientTop" :clientLeft="clientLeft"></Finger>
      </li>
    </ul>
    <div style="margin: 0 auto" @click="pop" v-if="false">
      <h1>弹框</h1>
    </div>
    <div class="mint-popup-4" :class="{show2:popupVisible}">
      <div class="tietu" @click.stop="pop" >
        <a href="javascript:void(0)" v-if="!popupVisible"><img src="../../../assets/eb/btnImg/task1-page1-up.png" alt=""></a>
        <a href="javascript:void(0)" v-else><img src="../../../assets/eb/btnImg/task1-page1-down.png" alt=""></a>
      </div>
      <div class="swipe-item" v-for="(item, index) in imgUrls" :key="index">
        <ImgTable :imgSrcs="item" @selectIndex="addImgTouchLi" :isSwipeFinish="isSwiped"></ImgTable>
      </div>
    <!-- <Pop v-model="popupVisible" position="bottom"  class="mint-popup-4"  @input="currentValue" :closeOnClickModal="true"> -->
      <!-- <div class="control">
        <div @click="cancelImg" class="iconfont icon-guanbi"></div>
        <p>选择贴纸</p>
        <div @click="addImg" class="iconfont icon-duihao" style="color: #34cf66"></div>
      </div> -->
      <!-- <swipe :auto="0" @swipeFinish="swipedOrClose">
        <swipe-item  v-for="(item, index) in imgUrls" :key="index">
          <ImgTable :imgSrcs="item" @selectIndex="addImgTouchLi" :isSwipeFinish="isSwiped"></ImgTable>
        </swipe-item>
      </swipe> -->
    <!-- </Pop> -->
    </div>
  </div>
</template>

<script>
  import Finger from '@/components/photoFinger/finger.vue';
  import Pop from '@/components/photoFinger/popup/popup.vue';
  import Swipe from '@/components/photoFinger/swipe/swipe.vue';
  import SwipeItem from '@/components/photoFinger/swipe/swipe-item.vue';
  import ImgTable from '@/components/photoFinger/grid/table.vue';

  export default {
    name: '',
    data () {
      return {
        selectImgUrl: '',
        popupVisible: true,
        imgUrls: [
          [ {imgUrl: require('../../../assets/eb/gj1.png'), select: false},
            {imgUrl: require('../../../assets/eb/gj2.png'), select: false},
            {imgUrl: require('../../../assets/eb/gj3.png'), select: false},
            {imgUrl: require('../../../assets/eb/gj4.png'), select: false},
            {imgUrl: require('../../../assets/eb/gj5.png'), select: false},
            {imgUrl: require('../../../assets/eb/gj6.png'), select: false},
            {imgUrl: require('../../../assets/eb/gj7.png'), select: false},
            {imgUrl: require('../../../assets/eb/gj8.png'), select: false}
          ]
        ],
        fingerData: { imgUrl: "", isActive: false},
        fingerDatas: [],
        currentSelectFinger: 0,
        isShown: true,
        isSwiped: false,
        clientTop: 0,
        clientLeft: 0
      };
    },
    props:['showPop'],
    mounted: function () {
      // this.clientLeft = window.innerWidth / 2 - 30;
      // this.clientTop =  window.innerHeight / 3 - 30;
      this.clientLeft = 30;
      this.clientTop =  30;
    },
    methods: {
      pop: function () {
        this.popupVisible = !this.popupVisible;
      },
      close: function () {

      },
      currentValue: function (val) {
        this.swipedOrClose();
      },
      addImgTouchLi: function (index, url) {
        debugger
        this.selectImgUrl = url;
        this.addImg()
      },
      addImg: function () {
        if (this.selectImgUrl.length > 0) {
          this.reductionFingerData();
          let data = { imgUrl: this.selectImgUrl, isActive: true};
          this.fingerDatas.push(data);
        }
        this.popupVisible = false;
      },
      cancelImg: function () {
        this.popupVisible = false;
      },
      parentDelete: function (isShown) {
        this.fingerDatas.splice(this.currentSelectFinger, 1);
      },
      swipedOrClose: function () {
        this.isSwiped = !this.isSwiped;
      },
      tapActive: function (index) {
        alert(index);
      },
      clickOutArea: function () {
        this.reductionFingerData();
      },
      reductionFingerData: function () {
        this.fingerDatas.forEach(function (value) {
          value.isActive = false;
        });
      },
      parentTapSelect: function (index) {
        this.reductionFingerData();
        this.currentSelectFinger = index;
        this.fingerDatas[index].isActive = true;
      }
    },
    components: {
      Finger,
      Pop,
      Swipe,
      SwipeItem,
      ImgTable
    },
    watch:{
      popupVisible(){
        this.$emit('update:showPop', this.popupVisible)
      }
    }
  };
</script>

<style lang="less" scoped>

  // @import "../../../assets/common/css/reset.css";
  @import "../../../assets/common/icon/iconfont.css";
  div.finger {
    position: absolute;
  }

  .tietu{
    height: 30px;
    line-height: 30px;
    
    padding: 0 20px;
    width: 100%;
    color: #fff;
    z-index: 20;
    img{
      height: 30px;
    }
    &.fixed{
      position: fixed !important;
      bottom: 0;
      left: 0;

    }
  }

  .page-wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 20px;
    color: #26a2ff;
  }

  .mint-popup-4 {
    background: rgba(100,100,100,.6);
    width: 100%;
    height: 208px;
    position: fixed;
    left: 0;
    bottom: -178px;
    transition: all 200ms linear;
    &.show2{
      bottom: 0;
    }
  }

  .mint-popup-4 h1{
    backface-visibility: hidden;
  }

  .control {
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px 0 10px;
  }
</style>
