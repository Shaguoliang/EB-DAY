import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
//百度统计
import ba from 'vue-ba'
Vue.use(ba, "572d86656797ab1421f3c83dd3f459e9");
Vue.use(ba, { siteId: "572d86656797ab1421f3c83dd3f459e9" });

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import AlloyFinger from 'alloyfinger/alloy_finger'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger_vue'
import ClickOutSide from './components/photoFinger/utils/clickoutside'
import VueLazyload from 'vue-lazyload'
Vue.use(AlloyFingerVue, { AlloyFinger })
Vue.use(ClickOutSide)
Vue.use(VueLazyload)
Vue.config.productionTip = false

import { ToastPlugin , LoadingPlugin,AlertPlugin  } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

import { Select, Option } from 'element-ui';
Vue.use(Select);
Vue.use(Option);

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
var options={
  fullscreenEl:false, //关闭全屏按钮
  zoomEl:false
}
Vue.use(preview,options)

import vueMiniPlayer from 'vue-mini-player'
import 'vue-mini-player/lib/vue-mini-player.css'
Vue.use(vueMiniPlayer)

try {
  const scrollPrototype = require('vux-xscroll/build/cmd/simulate-scroll.js').prototype;
  const Util = require('vux-xscroll/build/cmd/util.js');
  const transform = Util.prefixStyle("transform");
  scrollPrototype.getScrollTop=function () {
      var transY = window.getComputedStyle(this.container)[transform].match(/[-\d.+e]+/g);
      return transY ? Math.round(transY[5]) === 0 ? 0 : -Math.round(transY[5]) : 0;
  };
  scrollPrototype.getScrollLeft=function () {
      var transX = window.getComputedStyle(this.content)[transform].match(/[-\d.+e]+/g);
      return transX ? Math.round(transX[4]) === 0 ? 0 : -Math.round(transX[4]) : 0;
  };
}catch (e) {

}

// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化

// 默认参数
// Vue.use(ToastPlugin, {position: 'top'})

// import 'lib-flexible/flexible.js'
import 'lib-flexible'
//字体图标
import './styles/icomoon/style.css';
import './styles/common.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
