<template>
	<div class="profile">
		<div class="top">
			<div class="content">
				<img :src="baseUrl + user.user_pic"/>
				<div class="name">{{ user.nickname }}</div>
				<div class="phone">{{ user.phone }}</div>
			</div>
			<div class="credit">
				<img v-if="user.is_real == '1' " src="../../static/images/profile/credit-yes.png"/>
				<img v-if="user.is_real == '0'" src="../../static/images/profile/credit-not.png"/>
				<div class="credit-title">信用押金</div>
			</div>
			<div class="auth">
				<img v-if="user.is_teacher == '1'" src="../../static/images/profile/teacher-credit-yes.png"/>
				<img v-if="user.is_teacher == '0'" src="../../static/images/profile/credit-not.png"/>
				<div class="credit-title">老师认证</div>
			</div>
		</div>
		<div class="menu">
			<!-- 我的订单 -->
			<div class="my-order">
				<router-link :to="'/myOrder'" class="order-link">
					<div class="my-order-title">
						<img src="../../static/images/profile/order-icon.png"/>
						<div class="normal-text">我的订单</div>
					</div>
				</router-link>
				<div class="order-menu">
					<router-link :to="'/myOrder?status=1'">
						<div class="order-prepay">
							<img src="../../static/images/profile/daifukuan.png"/>
							<div class="order-type-text">待付款</div>
						</div>
					</router-link>
					<router-link :to="'/myOrder?status=2'">
						<div class="order-preservice">
							<img src="../../static/images/profile/daifuwu.png"/>
							<div class="order-type-text">待服务</div>
						</div>
					</router-link>
					<router-link :to="'/myOrder?status=3'">
						<div class="order-pretalk">
							<img src="../../static/images/profile/daipingjia.png"/>
							<div class="order-type-text">待评价</div>
						</div>
					</router-link>
				</div>
			</div>
			<!-- 优惠券 -->
			<router-link :to="'/couponList'">
				<div class="ticket">
					<div class="ticket-title">
						<img src="../../static/images/profile/ticket-icon.png"/>
						<div class="normal-text">优惠券</div>
					</div>
					<div class="ticket-info">
						<div class="ticket-number">{{ user.pay_off_count }}张</div>
					</div>
				</div>
			</router-link>
			<div class="intro">
				<div class="intro-title">
					<img src="../../static/images/profile/gift-icon.png"/>
					<div class="normal-text">推荐有礼</div>
				</div>
				<div class="intro-info">
					<div class="intro-number">推荐领奖金</div>
				</div>
			</div>
			<div class="exit">
				<div class="exit-title">
					<img src="../../static/images/profile/exit-icon.png"/>
					<div class="normal-text">退出账户</div>
				</div>
			</div>
		</div>
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
	      	user:{
	      		nickname: '景老师',
	      		phone: '18916582906',
	      		ticket:'5',
	      		gift: '30',
	      	},
	      	baseUrl: 'http://www.studyyx.com',
	     }
	   },
	  methods:{
	       
	  },  
	  created(){
	  	document.title = '个人中心';
	    var _vue = this;
	    _vue.$ajax.get(ApiControl.getApi(env, "userCenter"), {
	        params:{
	            act: 'user_center'
	        }
	    }).
	    then(res => {
	        if(res.data.code == 0){
	            _vue.user = res.data.data.user_info;

	        }else{
	            _vue.setErrorMessage(res.data.message);
	        }
	        
	    })
	  }
	}
</script>
<style lang="less" scoped>
 	.profile{
 		padding-bottom: 50px;
 		.top{
 			height: 245px;
 			background: url('../../static/images/profile/top-background.png') center center no-repeat;
 			background-size: cover;
 			.content{
 				text-align: center;
 				img{
 					width: 83px;
 					height: 83px;
 					border-radius: 83px;
 					margin-top: 70px;
 				}
 				.name{
 					font-size: 20px;
 					font-weight: bolder;
 					color: #ffffff;
 					margin-bottom: 10px;
 					margin-top: 17px;
 				}
 				.phone{
					font-size: 13px;
					font-weight: bolder;
					color: #ffffff;
					margin-bottom: 10px;
 				}
 			}
 			.credit{
 				position: absolute;
 				top: 90px;
 				left: 50px;
 				width:60px;
 				text-align:center;
 				img{
 					width: 45px;
 					height: 45px;
 				}
 				.credit-title{
 					font-size: 10px;
 					color: #ffffff;
 				}
 			}
 			.auth{
 				position: absolute;
 				top: 90px;
 				right: 50px;
 				width:60px;
 				text-align:center;
 				img{
 					width: 45px;
 					height: 45px;
 				}
 				.credit-title{
 					font-size: 10px;
 					color: #ffffff;
 				}
 			}
 		}
 		.menu{
 			.my-order{
 				margin: 14px 25px 0 25px;
 				border-bottom: 1px solid #e6e6e6;
 				.order-link{
 					text-decoration: none;
 				}
 				.my-order-title{
 					img{
 						width: 20px;
 						height: 20px;
 						vertical-align: middle;
 						margin-right: 7px;
 					}
					.normal-text{
						display: inline-block;
						font-size: 15px;
						font-weight: bolder;
						color: #303134;
						line-height: 20px;
					}
 				}
 				.order-menu{
 					margin: 31px 15px 31px 15px;
 					.order-prepay{
 						width: 30%;
 						display: inline-block;
 						text-align: left;
 						img{
 							width: 34px;
 							height: 30px;
 						}
 						.order-type-text{
 							font-size: 11px;
 							color: #313134;
 						}
 					}
 					.order-preservice{
						width: 30%;
						display: inline-block;
						text-align: center;
						img{
							width: 34px;
							height: 30px;
						}
						.order-type-text{
							font-size: 11px;
							color: #313134;
						}
 					}
 					.order-pretalk{
						width: 30%;
						display: inline-block;
						text-align: right;
						img{
							width: 34px;
							height: 30px;
						}
						.order-type-text{
							font-size: 11px;
							color: #313134;
						}
 					}
 				}
 			}
 			.ticket{
				margin: 0 25px 0 25px;
				height: 59px;
				border-bottom: 1px solid #e6e6e6;
 				.ticket-title{
 					display: inline-block;
 					line-height: 59px;
 					img{
 						width: 20px;
 						height: 20px;
 						vertical-align: middle;
 						margin-right: 7px;
 					}
					.normal-text{
						display: inline-block;
						font-size: 15px;
						font-weight: bolder;
						color: #303134;
						line-height: 20px;
					}
 				}
 				.ticket-info{
 					display: inline-block;
 					float: right;
 					width: 50px;
 					line-height: 59px;
 					font-size: 13px;
 					color: #e6e6e6;
 					background: url('../../static/images/mainIndex/arrow.png') center right no-repeat;
 					background-size: 9px;
 				}
 			}
 			.intro{
				margin: 0 25px 0 25px;
				height: 59px;
				border-bottom: 1px solid #e6e6e6;
 				.intro-title{
 					display: inline-block;
 					line-height: 59px;
 					img{
 						width: 20px;
 						height: 20px;
 						vertical-align: middle;
 						margin-right: 7px;
 					}
					.normal-text{
						display: inline-block;
						font-size: 15px;
						font-weight: bolder;
						color: #303134;
						line-height: 20px;
					}
 				}
 				.intro-info{
 					display: inline-block;
 					float: right;
 					width: 100px;
 					line-height: 59px;
 					font-size: 13px;
 					color: #e6e6e6;
 					background: url('../../static/images/mainIndex/arrow.png') center right no-repeat;
 					background-size: 9px;
 				}
 			}
 			.exit{
				margin: 0 25px 0 25px;
				height: 59px;
				border-bottom: 1px solid #e6e6e6;
 				.exit-title{
 					display: inline-block;
 					line-height: 59px;
 					img{
 						width: 20px;
 						height: 20px;
 						vertical-align: middle;
 						margin-right: 7px;
 					}
					.normal-text{
						display: inline-block;
						font-size: 15px;
						font-weight: bolder;
						color: #303134;
						line-height: 20px;
					}
 				}
 			}
 		}
 	}
</style>