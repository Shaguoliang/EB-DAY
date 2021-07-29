// import {EXIF} from './exif.js'
import { detectImageAutomaticRotation } from "./IsAutoRotateImg.js"
//获取图片方向
function getPhotoOrientation(img) {
    var orient;
    // var EXIF = new Worker('./static/js/exif.js');
    EXIF.getData(img, function () {
        orient = EXIF.getTag(this, 'Orientation');
        // console.log("666orient:"+orient)
    });
    return orient;
}
/*
三个参数
file：一个是文件(类型是图片格式)，
w：一个是文件压缩的后宽度，宽度越小，字节越小
objDiv：一个是容器或者回调函数
photoCompress()
    */
export function photoCompress(file, w, objDiv) {
    var ready = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload = function () {
        var re = this.result;
        canvasDataURL(re, w, objDiv)
    }
}
function canvasDataURL(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
         h = that.height,
         scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        if (w > 600) {
            h = (600 / w) * h;
            w = 600;
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

        var orient = getPhotoOrientation(img);
        debugger
        console.log("orient:" + orient)

        // 判断浏览器是否支持对图片进行回正操作
        detectImageAutomaticRotation().then(res => {
        debugger
        let IsAutoRotateImg = false
        //res为true时。浏览器支持对带 EXIF 信息的图片进行自动回正
        if (res) {
            IsAutoRotateImg = true
            // return resolve(imgData)
        }
        //res为false时。执行js，对带 EXIF 信息的图片进行回正
        // 8 表示 顺时针转了90
        // 3 表示 转了 180
        // 6 表示 逆时针转了90
        




        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if ((isiOS || u.indexOf('iPhone') > -1)) {
            if (orient != "" && orient != 1 &&!IsAutoRotateImg) {
                switch (orient) {
                    case 6://需要顺时针（向左）90度旋转  
                        rotateImg(img, 'left', canvas, h, w);
                        // console.log("ios:第一次90")
                        // rotateImg(img, 'right', canvas, h, w);
                        // console.log("ios:第二次90")
                        // rotateImg(img, 'no', canvas, h, w);
                        break;
                    case 8://需要逆时针（向右）90度旋转  
                        rotateImg(img, 'right', canvas, h, w);
                        console.log("ios:向右90度旋转")
                        break;
                    case 3://需要180度旋转  
                        rotateImg(img, 'right', canvas, h, w);//转两次  
                        rotateImg(img, 'right', canvas, h, w);
                        break;
                    default:
                        rotateImg(img, 'no', canvas, h, w);
                        break;
                }
            } else {
                console.log("ios:不旋转")
                rotateImg(img, 'no', canvas, h, w);
            }
        } else if (navigator.userAgent.match(/Android/i)) {
            if (orient != "" && orient != 1) {
                switch (orient) {
                    case 6://需要顺时针（向左）90度旋转  
                        rotateImg(img, 'left', canvas, h, w);
                        break;
                    case 8://需要逆时针（向右）90度旋转  
                        rotateImg(img, 'right', canvas, h, w);
                        break;
                    case 3://需要180度旋转  
                        rotateImg(img, 'right', canvas, h, w);//转两次  
                        rotateImg(img, 'right', canvas, h, w);
                        break;
                    default:
                        rotateImg(img, 'no', canvas, h, w);
                        break;
                }
            }
            else {
                rotateImg(img, 'no', canvas, h, w);
            }
        } else {
            if (orient != "" && orient != 1) {
                switch (orient) {
                    case 6://需要顺时针（向左）90度旋转  
                        rotateImg(img, 'left', canvas, h, w);
                        break;
                    case 8://需要逆时针（向右）90度旋转  
                        rotateImg(img, 'right', canvas, h, w);
                        break;
                    case 3://需要180度旋转  
                        rotateImg(img, 'right', canvas, h, w);//转两次  
                        rotateImg(img, 'right', canvas, h, w);
                        break;
                    default:
                        rotateImg(img, 'no', canvas, h, w);
                        break;
                }
            } else {
                rotateImg(img, 'no', canvas, h, w);
            }
        }

        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/png', quality);
        // 回调函数返回base64的值
        callback(base64);
        })
    }
}
/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  
 */
export function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

//翻转图片
function rotateImg(img, direction, canvas, h, w) {
    //最小与最大旋转方向，图片旋转4次后回到原方向    
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);    
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
    var height = h;
    var width = w;
    //var step = img.getAttribute('step');    
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值    
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数    
    var degree = step * 90 * Math.PI / 180;
    console.log('旋转角度：'+degree)
    console.log('direction：'+direction)
    var ctx = canvas.getContext('2d');
    if (direction != "no") {
        switch (step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, w, h);
                break;
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height, w, h);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height, w, h);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0, w, h);
                break;
        }
    } else {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, w, h);
    }
}

// export default {
//     canvasDataURL,convertBase64UrlToBlob
// };
// module.exports = photoCompress;
// module.exports = convertBase64UrlToBlob;

// export function Get(url, data) {
//     var obj = build(url, "get", data);
//     return callback(url, obj);
// }