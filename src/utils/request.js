import axios from "axios";
import store from '../store/'
//axios.defaults.withCredentials = true;

function build(url, method, data ,ispay) {
  debugger
  let headers = {'Content-Type': 'application/json'};
  // let headers = {};
  //token
  var token = store.state.token
  if (token != null) {
    headers.Authorization = token;
  }
  var options = { url: url, method: method,headers:headers};

  if (method == "get" || method == "delete") {
    options.params = data;
  } else if (method == "post" || method == "put" || method == "patch") {
    // console.log(typeof(data))
    if(ispay){
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      let param = new URLSearchParams();
      for(var k in data){
        param.append(k,data[k])
      }
      options.data = param
    }else{
      options.headers['Content-Type'] = 'application/json'
      options.data = data;
    }
  }

  return axios(options);
}

function callback(url, obj) {
  return obj
    .then(function (response) {
      // console.log(response,"111")
      return response.data;
    })
    .catch(function (error) {
      // console.log(error,"222")
      return Promise.reject(error);
    });
}

export function Get(url, data) {
  var obj = build(url, "get", data);
  return callback(url, obj);
}

export function Post(url, data) {
  debugger
  var obj = build(url, "post", data);
  return callback(url, obj);
}

export function Put(url, data) {
  var obj = build(url, "put", data);
  return callback(url, obj);
}

export function Delete(url, data) {
  var obj = build(url, "delete", data);
  return callback(url, obj);
}

export function Patch(url, data) {
  var obj = build(url, "patch", data);
  return callback(url, obj);
}

export function Postpay(url, data) {
  var obj = build(url, "post", data,true);
  return callback(url, obj);
}