<!-- 合伙人规则页面 -->
<template>
	<div class="register">
		<div class="phone">
			<span class="country">中国</span><span class="number-head">+86</span><input @keyup="keyupfunc" class="info-input" placeholder="手机号码" type="tel" maxlength="11" v-model="phone"/>
		</div>
		<div class="button">
			<div class="register-button" @click="submitPhone" v-bind:class="{'button-click': clickable}">注册</div>
		</div>
		<div class="recommend">
			注册代表你同意服务条款，法律声明，隐私权政策
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
        	phone: '',
        	clickable: false,
        	pastle:false,
        	message: ''
      	}
    },
    created:function(){
     	document.title = "注册"

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
      	if(this.phone.length == 11){
      		this.clickable = true;
      	}else{
      		this.clickable = false;
      	}
      },
      submitPhone: function(){
      	if(this.clickable){
      		if(this.phone == '' || !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))){
      		    // this.setMessage('请输入正确的手机号码');
      		    // let instance = Toast('请输入正确的手机号码');
      		    // Toast({
      		    //   message: '请输入正确的手机号码',
      		    //   duration: '-1',
      		    //   className: 'toast-common'
      		    // });
      		    // setTimeout(() => {
      		    //   instance.close();
      		    // }, 2000);
      		    this.setMessage('请输入正确的手机号')
      		}else{
      			Indicator.open({
      				spinnerType: 'fading-circle'
      			})
      			//将手机号码发送至后台去发送验证码，同时将手机号参数带入下一个验证码填写页面，TBD
      		}
      	}
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
  .register{
  	background: #fff;
  	height: 100%;
  	.phone{
  		margin: 0px 30px 0 30px;
  		padding-top: 82px;
		.country{
			font-size: 15px;
			color: #000;
			font-weight: bolder;
			margin-right: 15px;
		}
		.number-head{
			font-size: 15px;
			color: #000;
			margin-right: 17px;
			font-weight: bolder;
		}
		.info-input{
			font-size: 15px;
			font-weight: bolder;
			line-height: 34px;
			vertical-align: middle;
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
	.recommend{
		margin: 0 30px;
		font-size: 12px;
		font-weight: bold;
		color: #CBCBCB
	}
  }
}
</style>