import Vue from 'vue'
import CryptoJS from 'crypto-js'

export default {//加密
  encrypt(word, keyStr){ 
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  uuid: 'E985CF8AB82A92A76540587C2556ABE0',
  //解密
  decrypt(word, keyStr){  
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}