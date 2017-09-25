<!-- 合伙人规则页面 -->
<template>
	<div class="validate">
    <div class="recommend">
      设置密码
    </div>
    <div class="phone">
      <input @keyup="keyupfunc" class="info-input" placeholder="请设置密码" type="password" maxlength="11" v-model="password"/>
      <img class="close-button" @click="removePass" src="../../static/images/mainIndex/close-button.png" v-show="clickable"/>
    </div>
		<div class="button">
			<div class="register-button" @click="submitPassword" v-bind:class="{'button-click': clickable}">确认新密码</div>
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
import VueInputCode from 'vue-input-code'
	export default {
	name: 'profile',
	data(){
		return {
          showingDialogBox: true,
          focusStatus: true,
        	password: '',
        	clickable: false,
        	pastle:false,
        	message: '',
          seconds: 10,
          code: [],
          text: ''
      	}
    },
    components: {
        VueInputCode
    },
    created:function(){
     	document.title = "注册"
      this.timer();
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
      onValuesChange(picker, values) {
            if (values[0] > values[1]) {
              picker.setSlotValue(1, values[0]);
            }
      },
      handleClick: function() {
        this.popupVisible = true
      },
      keyupfunc: function(){
      	if(this.password.length > 0){
      		this.clickable = true;
      	}else{
      		this.clickable = false;
      	}
      },
      submitPassword: function(){
      	if(this.clickable){
      		// if(this.password == '' || !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))){
      		//     // this.setMessage('请输入正确的手机号码');
      		//     // let instance = Toast('请输入正确的手机号码');
      		//     // Toast({
      		//     //   message: '请输入正确的手机号码',
      		//     //   duration: '-1',
      		//     //   className: 'toast-common'
      		//     // });
      		//     // setTimeout(() => {
      		//     //   instance.close();
      		//     // }, 2000);
      		//     this.setMessage('请输入正确的手机号')
      		// }else{
    			Indicator.open({
    				spinnerType: 'fading-circle'
    			})
      			//将手机号码发送至后台去发送验证码，同时将手机号参数带入下一个验证码填写页面，TBD
      		// }
          var _vue = this;
          _vue.$ajax.get(ApiControl.getApi(env, "setPwd"), {
              params:{
                  act: 'setPwd',
                  pwd: _vue.password
              }
          }).
          then(res => {
              Indicator.close();
              if(res.data.code == 0){
                  this.$router.push('/home');
              }else{
                  _vue.setMessage("密码设置失败");
              }
              
          })

      	}
      },
      removePass: function(){
        this.password = '';
        this.clickable = false;
      },
      timer: function () {
          if (this.seconds > 0) {
              this.seconds--;
              this.text = '发送验证码大概需要'  + this.seconds + '秒'
              setTimeout(this.timer, 1000);
          }else{
            this.seconds = -1;
            this.text = '重新发送';
          }
      },
      getInput: function(){

      },
      success: function(codeString){
        //send codestring to server, and page redirect to password page
        Indicator.open({
          spinnerType: 'fading-circle'
        })
        //close the indicator: Indicator.close();

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
  font-family:'PingFangSC-Regular';
  .validate{
    .recommend{
      font-size: 21px;
      font-weight: bolder;
      color: #303134;
      text-align: center;
      padding-top: 72px;
    }
    .phone{
      margin: 0px 30px 0 30px;
      padding-top: 82px;
      background: none;
      border-bottom: 1px solid #ddd;
      input{
        background: transparent;
      }
    .number-head{
      font-size: 15px;
      color: #000;
      margin-right: 17px;
      font-weight: bolder;

    }
    .info-input{
      font-size: 17px;
      font-weight: bolder;
      line-height: 34px;
      vertical-align: middle;
    }
    .close-button{
      float: right;
    }
    }
      .button{
        margin: 33px 30px 23px 30px;
        height: 50px;
        background:#c9c9c9;
        .register-button{
          background: #c9c9c9;
          line-height: 50px;
          font-size: 17px;
          color: #fff;
          text-align: center;
          font-weight: bold;
        }
        .register-button.button-click{
          background: #f6ab2c;
        }
      }
  }
}
</style>