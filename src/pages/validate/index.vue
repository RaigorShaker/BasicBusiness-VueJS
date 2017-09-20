<!-- 合伙人规则页面 -->
<template>
	<div class="validate">
    <div class="recommend">
      短信验证码已发送到你的手机上
    </div>
    <div class="subtitle">
      输入我们发送至{{ phone }}的验证码
    </div>
    <div class="input-area">
      <vue-input-code span-size="20px" type="number" :number="6" height="80px" span-color="#000" input-color="#000" input-size="24px" :code="code" :getinput="getInput" :success="success"></vue-input-code>

    </div>
    <div class="code-timeout" :class="{'send-again':seconds === -1}">
      {{ text }}
    </div>
		<!-- <div class="button">
			<div class="register-button" @click="submitPhone" v-bind:class="{'button-click': clickable}">注册</div>
		</div> -->
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
        	phone: '',
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
      text-align: center;
      line-height: 21px;
      color: #303134;
      padding-top: 50px;
    }
    .input-area{
      width: 100%;
      height: 80px;
      padding: 20px;
    }
    .code-timeout{
      margin-top: 80px;
      text-align: center;
      font-size:13px;
      color:#afafaf;
    }
    .send-again{
      color: #1E90FF;
      text-decoration:underline;
    }
    .subtitle{
      padding-top: 24px;
      font-size: 13px;
      font-weight: bold;
      color: #cbcbcb;
      text-align: center;
    }
    .info-code{
      text-align: center;
      .code-item{
        display: inline-block;
        position: relative;
        width: 32px;
        border-bottom: 2px solid #000;
        height: 80px;
        margin-right: 10px;
        .code-number{
          position: absolute;
          bottom: 10px;
          height: 40px;
          width: 12px;
          left: 10px;
          font-size: 22px;
        }
      }
    }
  }
}
</style>