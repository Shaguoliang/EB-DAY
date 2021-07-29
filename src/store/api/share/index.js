import * as request from '@/utils/request'
let ebApi = process.env.VUE_APP_API_ebApi;

//eb
export function getOpenId(data) {
    return request.Post(`${ebApi}/api/common/OpenId`,data);
}
//分享签名获取
export function getSignature(data) {
    return request.Post(`${ebApi}/api/common/Signature`,data);
}
//第三任务状态判断
export function GetTaskRight(data) {
    return request.Get(`${ebApi}/api/task/GetTaskRight`,data);
}
//
//上传照片
export function UploadBase64(data) {
    return request.Post(`${ebApi}/api/common/UploadBase64`,data);
}
//获取照片列表
export function GetImageList(data) {
    return request.Get(`${ebApi}/api/task/GetImageList`,data);
}
//完成第一个任务
export function FinishTask(data) {
    return request.Post(`${ebApi}/api/task/FinishTask`,data);
}
//点赞 投票
export function TaskLike(data) {
    return request.Post(`${ebApi}/api/task/Like`,data);
}
//获取视频列表
export function GetVideoList(data) {
    return request.Get(`${ebApi}/api/task/GetVideoList`,data);
}
//验证工号
export function taskVerifyId(data) {
    return request.Post(`${ebApi}/api/task/VerifyId`,data);
}
//获取奖品列表
export function GetAwardList(data) {
    return request.Get(`${ebApi}/api/task/GetAwardList`,data);
}
//抽奖
export function Lottery(data) {
    return request.Post(`${ebApi}/api/task/Lottery`,data);
}
//
export function GetRight(data) {
    return request.Get(`${ebApi}/api/task/GetRight`,data);
}