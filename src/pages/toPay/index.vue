<!-- 合伙人规则页面 -->
<template>
  <div class="topay">
    <div class="banner">
      ¥{{ amount }}
    </div>
    <div class="pay-area">
      <div class="wechat-pay">
        <img class="left-icon" src="../../static/images/evaluate/wechat-icon.png"/><span>微信</span><img class="right-icon" src="../../static/images/evaluate/toPay-icon.png"/>
      </div>
    </div>
    

    <div class="submit-pay" @click="submitPay">
      支付
    </div>
    <error-message v-bind="{pastle: pastle,message: message}"></error-message>
  </div>
</template>
<script>
var env = 'product';// set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
  export default {
  name: 'profile',
  data(){
    return {
          amount: 0,
          oid: 0,
          pastle:false,
          message: ''
        }
    },
    created:function(){
      document.title = "支付"
      var _vue = this;
      this.amount = this.$route.query.amount;
      this.oid = this.$route.query.oid;
    },
    methods:{
      setMessage(message){
          var _vue = this;
          this.pastle = true;
          this.message = message;
          setTimeout(function(){
              _vue.pastle = false;
              _vue.message = '';
          },2000)
      },
      submitPay: function(){
        // alert('pay')
        window.location.href = '/zm/aop/jsapi.php?oid=' + this.oid;
      }
    },
    computed:{
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
body{
  height: 100%;
  background: #fff;
  font-family:'PingFangSC-Regular';
  #app{
    height: 100%;
  }
  .topay{
    background: #fff;
    height: 100%;
    .banner{
      height: 169px;
      background: #f6ab2c;   
      background:#f6ab2c;  
      background:-moz-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));  
      background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f6ab2c), to(rgba(173, 90, 34, 0.9)));  
      background:-o-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));
      filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22);
      -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22)";
      color: #fff;
      line-height: 169px;
      text-align: center;
      font-size: 80px;
      font-weight: bolder;
    }
    .wechat-pay{
      height: 50px;
      margin: 69px 30px 0 30px;
      .left-icon{
        line-height: 35px;
        width: 35px;
        height: 35px;
        vertical-align:middle;
        margin-right: 16px;
      }
      .right-icon{
        width: 14px;
        height: 14px;
        float: right;
        margin-top: 10px;
      }
    }
    .submit-pay{
      height: 50px;
      // background: #c9c9c9;
      background: #f6ab2c;
      line-height: 50px;
      font-size: 15px;
      color: #ffffff;
      text-align: center;
      margin-top: 56px;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>