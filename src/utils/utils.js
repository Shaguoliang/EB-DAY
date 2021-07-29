/**
 * Created by Administrator on 2017/5/17.
 */
var utils = {
  "log": function (message, level) {
    if (level > 0) {
      console.log(message);
    }
  },
  "base64encode": function (str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
  },
  "getBufferSize": function () {
    var ua = navigator.userAgent;
    if (/(Win(dows )?NT 6\.2)/.test(ua)) {
      return 1024; //Windows 8
    } else if (/(Win(dows )?NT 6\.1)/.test(ua)) {
      return 1024; //Windows 7
    } else if (/(Win(dows )?NT 6\.0)/.test(ua)) {
      return 2048; //Windows Vista
    } else if (/Win(dows )?(NT 5\.1|XP)/.test(ua)) {
      return 4096; //Windows XP
    } else if (/Mac|PPC/.test(ua)) {
      return 1024; //Mac OS X
    } else if (/Linux/.test(ua)) {
      return 8192; //Linux
    } else if (/iPhone|iPad|iPod/.test(ua)) {
      return 2048; //iOS
    } else {
      return 16384; //Otherwise
    }
  },
  "checkIsSupport": function () {
    if (!navigator.getUserMedia) {
      return false;
    }
    if (!window.AudioContext) {
      return false
    }
    if (!window.Worker) {
      return false
    }
    if (!window.URL) {
      return false;
    }
    return true
  },
  "extend": function (defaults, options) {
    var extended = {};
    var prop;
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop];
      }
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop];
      }
    }
    return extended;
  },
  "getBrowserId": function () {
    if (typeof (Fingerprint2) == "function") {
      new Fingerprint2().get(function (result) {
        env.browserId = result;
      });
    } else {
      env.browserId = "unknow:" + btoa(navigator.userAgent).substr(0, 16);
    }
  },
  // 播放 AudioContext
  playPcm: function (samples) {
    var ctx = new AudioContext();
    var src = ctx.createBufferSource();
    var buffer = ctx.createBuffer(1, samples.length, 8000);
    if (buffer.copyToChannel) {
      buffer.copyToChannel(samples, 0, 0)
    } else {
      var channelBuffer = buffer.getChannelData(0);
      channelBuffer.set(samples);
    }
    src.buffer = buffer;
    src.connect(ctx.destination);
    return src;
  },
  // File Reader 返回 buffer array
  readBlob: function (blob, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = new Uint8Array(e.target.result);
      callback(data);
    };
    reader.readAsArrayBuffer(blob);
  },
  // AMR 解码
  playAmrArray: function (array) {
    var samples = AMR.decode(array);
    if (!samples) {
      // alert('Failed to decode!');
      return;
    }
    console.log(this)
    this.playPcm(samples);
  }, 
  //转换wav => amr
  "convertAudioBlobToAmr": function (blob, audiocontext, callback) {
    this.readBlob(blob, function (data) {
      var ctx = audiocontext;
      ctx.decodeAudioData(data.buffer, function (audioBuffer) {
        var pcm;
        if (audioBuffer.copyFromChannel) {
          pcm = new Float32Array(audioBuffer.length);
          audioBuffer.copyFromChannel(pcm, 0, 0);
        } else {
          pcm = audioBuffer.getChannelData(0);
        }
        var amr = AMR.encode(pcm, audioBuffer.sampleRate, 7);
        callback(amr);
      });
    });
  },
  // amr => wav
  "convertAmrBlobToWav": function (blob) {

    this.readBlob(blob, function (data) {
      var buffer = AMR.toWAV(data);
      var url = URL.createObjectURL(new Blob([buffer], {
        type: 'audio/x-wav'
      }));
      var audio = new Audio(url);
      audio.onloadedmetadata = audio.onerror = function () {
        URL.revokeObjectURL(url);
      };
      audio.play();
    });
  },
  // 读取amr
  fetchBlob: function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      callback(this.response);
    };
    xhr.onerror = function () {
      alert('Failed to fetch ' + url);
    };
    xhr.send();
  },
  //  toAmr
  toAmr: function (path) {
    return new Promise(function (resolve, reject) {
      utils.fetchBlob(path, function (blob) {
        utils.readBlob(blob, function (data) {
          var buffer = AMR.toWAV(data);
          var url = URL.createObjectURL(
            new Blob([buffer], {
              type: "audio/x-wav"
            })
          );
          resolve(url);
        });
      });
    })
  },
  /**
 * @public 格式化日期
 * @param {pattern} 格式化正则
 * @param {date} 需格式化的日期对象
 */
  formatDate: function (pattern, date) {
    function formatNumber (data, format) {
      format = format.length;
      data = data || 0;
      return format == 1 ? data : (data = String(Math.pow(10, format) + data)).substr(data.length - format);
    }
    if (date === undefined) {
      date = new Date();
    }
    return pattern.replace(/([YMDhsm])\1*/g, function (format) {
      switch (format.charAt()) {
        case 'Y':
          return formatNumber(date.getFullYear(), format);
        case 'M':
          return formatNumber(date.getMonth() + 1, format);
        case 'D':
          return formatNumber(date.getDate(), format);
        case 'w':
          return date.getDay() + 1;
        case 'h':
          return formatNumber(date.getHours(), format);
        case 'm':
          return formatNumber(date.getMinutes(), format);
        case 's':
          return formatNumber(date.getSeconds(), format);
      }
    });
  },
  encode: function (input) {

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var _utf8_encode = function (string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
  
      }
      return utftext;
    }
    // public method for encoding
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
    
  
    // public method for decoding
    this.decode = function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = _utf8_decode(output);
      return output;
    }
  
    // private method for UTF-8 encoding
    
  
    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;
      while ( i < utftext.length ) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i+1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i+1);
          c3 = utftext.charCodeAt(i+2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
  
  
  },
  decode: function (input) {

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var _utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      // var c = c1 = c2 = 0;
      var c = 0; 
      var c3 = 0; 
      var c2 = 0;
      while ( i < utftext.length ) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i+1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i+1);
          c3 = utftext.charCodeAt(i+2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
    // public method for decoding
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }
};

export default utils;
// exports.Base64 = utils.Base64;
