<template>
  <div>
    <transition name="router-fade" mode="out-in">
        <router-view></router-view>
    </transition>
    <foot-guide ref="footGuide"></foot-guide>
</div>
</template>

<script>
var env = 'product';// set env type for debug or product
import ajax from './config/ajax'
import utils from './config/utils'
import ApiControl from './config/envConfig.home'
import getLoginUri from './config/loginConfig'
import talkingData from './plugins/talking.data'
import { mapState ,mapMutations} from 'vuex';
    export default {
      name: 'goodStuff',
      data() {
        return {
          device: '',
          hasMenu: false
        }
      },
      methods: {
        ...mapMutations([
            'setAppId'
        ]),
        isWeixinBrowser() { 
            return /micromessenger/i.test(navigator.userAgent)
        }
      },
      created() {
        this.device = utils.getDevice();
        // if not mobile ,set empty document
        if(this.device == 3) document.body.innerHTML = '';

        if(this.isWeixinBrowser()){
            var appId = 'wxa6eda0255e015b70';
            var redirectUri = 'http://www.studyyx.com/piano/piano/Index/Piano/wx_login';
            redirectUri = encodeURIComponent(redirectUri);

            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
        }

        // var _vue = this;
        // _vue.$ajax.get(ApiControl.getApi(env, "getAppId"),{

        // }).
        // then(res =>{
        //   if(res.data.code == 0){
        //     var appId = res.data.result.appid;
        //     // _vue.appId = res.data.result.appid;
        //     _vue.setAppId({appId});
        //   }
        //   if(_vue.$route.path.indexOf('login') == -1){
        //     //检测用户是否登录
        //     _vue.$ajax.get(ApiControl.getApi(env, "checkLogin"), {
        //     }).
        //     then(res => {
        //         if(res.data.code != 0){
        //           console.log(_vue.appId);
        //           //跳转至微信授权页面：https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
        //           //参数解释如下：state为重定向后需要添加的参数，redirect_url为重定向地址，我们这边统一为/login
        //           // window.location.href = '/login?pageType=stuff';
        //           var redirectUri = window.location.origin + window.location.pathname + '#/login?pageType=' + _vue.$route.path.split('/')[1];
        //           redirectUri = encodeURIComponent(redirectUri);
        //           // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + _vue.appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
        //           window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + _vue.appId+ '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
        //         }
        //     })
        //   }
        // })
        // get appID from nodejs server

        // document.cookie="token=oqRrbwNUag78tgiuklMAzKVsKIhU; path=/"; 
        // console.log(document.cookie);
        //bury point
        // this.buryPoint('test','label');
        
      },
      computed:{
        ...mapState([
            'appId'
        ])
      }
    }

</script>
<style lang="less">
@import './static/style/common.less';
</style>
<style lang="less" scoped>
    
    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }
    
    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }
    .toast-common{
        font-size: 20px;
        color: #000;
    }
    body {
        background-color: #eee;
    }
    
    #app {
        width: 100%;
        // height: 100%;
        background: #eee;
        >div {
            width: 100%;
            // height: 100%;
        }
    }
</style>
