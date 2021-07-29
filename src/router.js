import Vue from 'vue'
import Router from 'vue-router'
import store from './store/'


const wxlogin = () => import('@/views/login')

//eb主页
const ebMain = () => import('@/views/eb/main')
// const ebMain2 = () => import('@/views/eb/main2')
const page1 = () => import('@/views/eb/page1')
const page2 = () => import('@/views/eb/page2')
const page3 = () => import('@/views/eb/page3')
const taskMain = () => import('@/views/eb/taskMain')
//任务1
const taskOnepage1 = () => import('@/views/eb/task1/page1')
const taskOnepage2 = () => import('@/views/eb/task1/page2')
const taskOnepage3 = () => import('@/views/eb/task1/page3')
//任务2
const taskTowpage1 = () => import('@/views/eb/task2/page1')
const taskTowpage2 = () => import('@/views/eb/task2/page2')
const taskTowpage3 = () => import('@/views/eb/task2/page3')
//任务3
const taskThirdpage1 = () => import('@/views/eb/task3/page1')
const taskThirdpage2 = () => import('@/views/eb/task3/page2')
const taskThirdpage3 = () => import('@/views/eb/task3/page3')


Vue.use(Router)
let router;
 router= new Router({
 // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/wxlogin'
    },{
      path: '/eb/main',
      name: 'ebMain',
      component: ebMain,
      meta: { verification: false }
    },{
      path: '/eb/page1',
      name: 'page1',
      component: page1,
      meta: { verification: false }
    },{
      path: '/eb/page2',
      name: 'page2',
      component: page2,
      meta: { verification: false }
    },{
      path: '/eb/page3',
      name: 'page3',
      component: page3,
      meta: { verification: false }
    },{
      path: '/eb/taskMain',
      name: 'taskMain',
      component: taskMain,
      meta: { verification: false }
    },{
      path: '/eb/taskone/page1',
      name: 'taskOnepage1',
      component: taskOnepage1,
      meta: { verification: false }
    },{
      path: '/eb/taskone/page2',
      name: 'taskOnepage2',
      component: taskOnepage2,
      meta: { verification: false }
    },{
      path: '/eb/taskone/page3',
      name: 'taskOnepage3',
      component: taskOnepage3,
      meta: { verification: false }
    },{
      path: '/eb/tasktow/page1',
      name: 'taskTowpage1',
      component: taskTowpage1,
      meta: { verification: false }
    },{
      path: '/eb/tasktow/page2',
      name: 'taskTowpage2',
      component: taskTowpage2,
      meta: { verification: false }
    },{
      path: '/eb/tasktow/page3',
      name: 'taskTowpage3',
      component: taskTowpage3,
      meta: { verification: false }
    },{
      path: '/eb/taskthird/page1',
      name: 'taskThirdpage1',
      component: taskThirdpage1,
      meta: { verification: false }
    },{
      path: '/eb/taskthird/page2',
      name: 'taskThirdpage2',
      component: taskThirdpage2,
      meta: { verification: false }
    },{
      path: '/eb/taskthird/page3/:id?',
      name: 'taskThirdpage3',
      component: taskThirdpage3,
      meta: { verification: false }
    },{
      path: '/wxlogin',
      name: 'wxlogin',
      component: wxlogin
    }

    
    
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  // ba.trackPageview(to.fullPath)
  if(to.meta.verification){
    //store.state.userInfo.UserId
    let userobj=store.state.userInfo.UserId
    if(!userobj){
      // if(to.name=="easyExam"){
      //   // window.sessionStorage.setItem("examId",to.params.id)
      //   window.sessionStorage.setItem("back",to.path)
      // }else if(to.name=="Order"){
      //   window.sessionStorage.setItem("back",to.path)
      // }
      window.sessionStorage.setItem("back",to.path)
      let back = encodeURIComponent(to.path);

      next({path:"/wxlogin?back="+back})
    }else{
      next()
    }
  }else{
    next()
  }
 })
export default router