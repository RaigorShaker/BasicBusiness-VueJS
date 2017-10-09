<!-- 合伙人规则页面 -->
<template>
    <div class="message">
      <router-link :to="'/actList'">
        <div class="message-act">
          <div class="act-left">
            <img src="../../static/images/message/hot-act.png"/>
          </div>
          <div class="act-info">
            <div class="act-normal">热门活动<div class="info-num">{{ msgData.info_acti.no_read }}</div></div>
            <div class="act-title">{{ msgData.info_acti.acti.coment }}</div>
          </div>
        </div>
      </router-link>
      <router-link :to="'/payResultList'">
        <div class="message-pay">
          <div class="pay-left">
            <img src="../../static/images/message/pay-msg.png"/>
          </div>
          <div class="pay-info">
            <div class="act-normal">消费通知<div class="info-num">{{ msgData.info_pay.no_read }}</div></div>
            <div class="pay-title">{{ msgData.info_pay.pay.coment }}</div>
          </div>
        </div>
      </router-link>
      <router-link :to="'/sysMsgList'">
        <div class="message-sys">
          <div class="sys-left">
            <img src="../../static/images/message/sys-msg.png"/>
          </div>
          <div class="sys-info">
            <div class="act-normal">系统消息<div class="info-num">{{ msgData.info_sysm.no_read }}</div></div>
            <div class="sys-title">{{ msgData.info_sysm.info.coment }}</div>
          </div>
        </div>
      </router-link>
      <error-message v-bind="{pastle, message}"></error-message>
    </div>
</template>

<script>
var env = 'product';// set env type for debug or product
import ajax from '../../config/ajax'
import utils from '../../config/utils'
import ApiControl from '../../config/envConfig.home'
export default {
   data() {
      return {
        pastle: false,
        message: '',
        baseUrl: '',
        msgData: []
     }
   },
  methods:{
    setErrorMessage: function(...message) {
        var _vue = this;
        this.pastle = true;
        this.message = message;
        setTimeout(function() {
            _vue.pastle = false;
            _vue.message = [];
        }, 2000)
    },
  },  
  created(){
    var _vue = this;
    _vue.$ajax.get(ApiControl.getApi(env, "mesList"), {
        params:{
            act: 'mesList'
        }
    }).
    then(res => {
        if(res.data.code == 0){
            _vue.msgData = res.data.data;
        }else{
            _vue.setErrorMessage(res.data.message);
        }
        
    })
  }
}
</script>
<style scoped lang="less" scoped>
  .message{
    .act-normal{
      font-size: 15px;
      font-weight: bolder;
      color: #303134;
      line-height: 20px;
    }
    .info-num{
      display: inline-block;
      background: rgb(247,97,45);
      width: 30px;
      height: 20px;
      color: #fff;
      font-size: 12px;
      line-height: 20px;
      border-radius: 10px;
      margin-left: 10px;
      text-align: center;
    }
    .message-act{
      height: 100px;
      background: #fff;
      padding: 30px 10px;
      margin-top: 23px;
      .act-left{
        display: inline-block;
        width: 37px;
        height: 37px;
        margin-right: 15px;
        vertical-align: top;
        padding-top: 5px;
        img{
          width :100%;
          height: 37px;
        }
      }
      .act-info{
        display: inline-block;
        font-size: 14px;
        color: #ddd;
        width: calc(~"(100% - 55px)");
        float: right;
        .act-title{
          padding-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .message-pay{
      height: 100px;
      background: #fff;
      padding: 30px 10px;
      margin-top: 23px;
      .pay-left{
        display: inline-block;
        width: 37px;
        height: 37px;
        margin-right: 15px;
        vertical-align: top;
        padding-top: 5px;
        img{
          width :100%;
          height: 37px;
        }
      }
      .pay-info{
        display: inline-block;
        font-size: 14px;
        color: #ddd;
        width: calc(~"(100% - 55px)");
        float: right;
        .pay-title{
          padding-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .message-sys{
      height: 100px;
      background: #fff;
      padding: 30px 10px;
      margin-top: 23px;
      .sys-left{
        display: inline-block;
        width: 37px;
        height: 37px;
        margin-right: 15px;
        vertical-align: top;
        padding-top: 5px;
        img{
          width :100%;
          height: 37px;
        }
      }
      .sys-info{
        display: inline-block;
        font-size: 14px;
        color: #ddd;
        width: calc(~"(100% - 55px)");
        float: right;
        .sys-title{
          padding-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>