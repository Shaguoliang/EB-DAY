import Vue from 'vue'
import Vuex from 'vuex'
import share from "./module/share/index"

import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      //       HeadImgUrl: "http://thirdwx.qlogo.cn/mmopen/vi_32/2Wsibd6e07XoXVlthNuQWsyGVmXA06iaPpHq8G1jKROauUef8sqTYQIGhia0gg7W26Aw3nOI5cuzAibGclnaloxibpg/132",
      // NickName: "null-学生",
      // OpenId: "S_o-OgOwELLph012NI9C0ZkDSh3tZk",
      // Token: "222",
      // Type: "S",
      // Unionid: "oMotFwV47fbwDVK8VAxoYT2GtL7k",
      // UserId: 995125,
      // UserName: "S_o-OgOwELLph012NI9C0ZkDSh3tZk",
      // UserRealName: "null-学生"
    },
    token:"oHOVe6Mf2meJFk0cTPEln8vPx5Hc",
    teacherlist: [{ existsTypes: [] }],
    query: {},
    actId: "",//课程id
    examId: {},//当前考试id({ containerId: 10198, resourcePackageId: 28 })
    studentExamId: 0,//开始考试的Id
    pauseAll: false,//暂停考试
    hideBgm:false
  },
  mutations: {
    setteacherlist(state, data) {
      this.dataarr = [];
      data.forEach(item => {
        if (item.existsTypes) {
          item.existsTypes.forEach(v => {
            if (v.existsTypes) {
              if (this.dataarr.indexOf(item) == -1) {
                this.dataarr.push(item);
              }
            }
          });
        }
      });
      console.log(this.dataarr)
      state.teacherlist = this.dataarr;
    },
    setquery(state, data) {
      state.query = data;
    },
    saveuserInfo(state, data) {
      state.userInfo = data;
    },
    savetoken(state, data) {
      state.token = data;
    },
    setActId(state, data) {
      state.actId = data;
    },
    saveExamId(state, data) {
      state.examId = data;
    },
    savestudentExamId(state, data) {
      state.studentExamId = data;
    },
    savepauseAll(state, data) {
      state.pauseAll = data;
    },
    savehideBgm(state, data) {
      state.hideBgm = data;
    },
  },
  actions: {

  },
  modules: {
    share, 
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})

