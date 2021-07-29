import * as API from '@/store/api/share/index'

const state = {

};

const mutations = {

};

const actions = {
    //eb
    getOpenId({commit },data) {
        return  API.getOpenId(data).then(res=>{
            commit('savetoken', res.Data,{root:true});
            return res
        });
    },
    getSignature({commit },data) {
        return  API.getSignature(data);
    },
    GetTaskRight({commit },data) {
        return  API.GetTaskRight(data);
    },
    UploadBase64({commit },data) {
        return  API.UploadBase64(data);
    },
    GetImageList({commit },data) {
        return  API.GetImageList(data);
    },
    FinishTask({commit },data) {
        return  API.FinishTask(data);
    },
    TaskLike({commit },data) {
        return  API.TaskLike(data);
    },
    GetVideoList({commit },data) {
        return  API.GetVideoList(data);
    },
    taskVerifyId({commit },data) {
        return  API.taskVerifyId(data);
    },
    GetAwardList({commit },data) {
        return  API.GetAwardList(data);
    },
    Lottery({commit },data) {
        return  API.Lottery(data);
    },
    GetRight({commit },data) {
        return  API.GetRight(data);
    },
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}