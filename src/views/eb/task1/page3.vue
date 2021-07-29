<template>
<mainPage>
  <div class="page flex column center">
    <div class="flex1 cardBg" id="imgPage">
    <scroller lock-x :height="boxHeight+'px'" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="flex wrap" style="padding:5%">
        <div class="imgItem" v-for="(item,index) in picList" :key="index">
          <div>
            <div class="imgbg">
              <img preview="1" :src="item.Url" alt="">
            </div>
            <div class="flex center justifycenter likeText">
              <div class="like" v-if="item.IsLike" @click="likeOrUnlike(item,false)"></div>
              <div class="unlike" v-else @click="likeOrUnlike(item,true)"></div>
              <span>{{item.LikeCount}}</span>
            </div>
          </div>
        </div>
      <!-- <scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="box2">
          <p v-for="i in bottomCount">placeholder {{i}}</p>
          <load-more tip="loading"></load-more>
        </div>
      </scroller> -->
      </div>
    </scroller>
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
import { Scroller } from 'vux'
export default {
  data() {
    return {
      picList:[],
      mylikeUser:[],
      searchObj:{
        PageIndex:1,
        PageSize:18
      },
      lock:false,
      loading:false,
      TotalRecords:0,
      boxHeight:0
    };
  },
  components:{
    mainPage,
    Scroller
  },
  methods:{
    ...mapActions("share", ["GetImageList","TaskLike"]),
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
    likeOrUnlike(item,IsLike){
      if(this.lock){
        return
      }
      this.lock = true
      this.TaskLike({
        ImageId:item.Id,
        Action:IsLike?1:0,
        Type:0,
      }).then(res=>{
        this.lock = false
        if(res.Code==0){
          item.IsLike = IsLike
          if(IsLike){
            item.LikeCount++
          }else{
            item.LikeCount--
          }
        }else{
          this.showTips(res.Message||'获取照片列表出错')
        }
      })
    },
    getlist(i){
      let that = this
      this.$vux.loading.show({
        text: 'Loading'
      })
      if(i){
        this.searchObj.PageIndex = i
      }
      this.loading = true
      this.GetImageList(this.searchObj).then(res=>{
        this.$vux.loading.hide()
        this.loading = false
        if(res.Code==0){
          if(this.searchObj.PageIndex==1){
            this.picList = []
          }
          this.picList = this.picList.concat(res.Data.ResultData)
          this.TotalRecords = res.Data.TotalRecords
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          setTimeout(()=>{
            that.$previewRefresh()
          },1000)
        }else{
          this.showTips(res.Message||'获取照片列表出错')
        }
      })
    },
    onScrollBottom(){
      if(this.TotalRecords>this.picList.length&&!this.loading){
        // this.$vux.loading.show({
         //   position:"absolute"
        // })
        this.getlist(this.searchObj.PageIndex+1)
      }
    }
  },
  activated(){
    // this.initData()
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0})
    })
    this.picList = []
    this.boxHeight = document.querySelector('#imgPage').clientHeight
    this.getlist(1)
  }
  
};
</script>
<style lang="less" scoped>
.page{
  height: 100%;
}
.cardBg{
  margin: 0 auto;
  width: 100%;
  // background: rgba(255,255,255,.4);
  // border-radius: 10px;
  overflow: auto;
  // padding: 5% 8%;
  >div{
    width: 100%;
  }
  .imgItem{
    width: 32%;
    margin-right: 2%;
    &:nth-child(3n+3){
      margin-right: 0;
    }
    .imgbg{
      // background: rgba(0,0,0,.3);
      // border: 2px solid #fff;
      border-radius: 4px;
      width: 100%;
      height: 0;
      position: relative;
      padding-bottom: 100%;
      >img{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: contain;
      }
    }
    .likeText{
      margin: 10px 0;
      font-size: 12px;
      color: #000;
    }
    .like{
      width: 16px;
      height: 16px;
      margin-right: 5px;
      background: url('../../../assets/eb/like2.png');
      background-size:100% 100%;
    }
    .unlike{
      width: 16px;
      height: 16px;
      margin-right: 5px;
      background: url('../../../assets/eb/like1.png');
      background-size:100% 100%;
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
