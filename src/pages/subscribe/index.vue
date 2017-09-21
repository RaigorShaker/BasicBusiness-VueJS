<!-- 合伙人规则页面 -->
<template>
  <div>
    <!-- <mt-swipe :show-indicators="false" class="banner" :auto="0">
        <mt-swipe-item v-for="item in swipItems"><img :src="item.img"/></mt-swipe-item>
    </mt-swipe>
    <mt-button @click.native="handleClick">按钮</mt-button> -->
    <!-- <mt-popup v-model="popupVisible" class="popup-control" position="bottom" pop-transition="popup-fade">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup> -->
    <div class="result">
      <!-- <div class="result-item" v-for="item in searchResult"> -->
      <router-link v-for="item in searchResult" :to="'/croomDetail?id=' + item.room_id">
        <div class="result-item">
          <div class="title">
            <div class="lesson_icon"><img src="../../static/images/subscribe/subscribe-calendar.png"/></div>
            <div class="lesson_date">预约日期:{{ item.date }}</div>
          </div>
          <div class="teacher">
			<img :src="item.url"/><span class="teacher_name">{{ item.name }}</span>
          </div>
          <div class="order_room">
          	<img src="../../static/images/subscribe/subscribe-room.png"/>
          	<span>{{ item.room }}</span>
          </div>
          <div class="order_address">
			<img src="../../static/images/subscribe/subscribe-address.png"/>
			<span>{{ item.address }}</span>
          </div>
          <div class="status" v-if="item.status == 1">
     		<div class="order-status-end">已结束</div>
          </div>
          <div class="status" v-if="item.status == 2">
     		<div class="order-status-subscribe">已预约</div>
     		<img src="../../static/images/subscribe/subscribe-ma.png"/>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  
</template>
<script>
  var env = 'product';// set env type for debug or product
  import ajax from '../../config/ajax'
  import utils from '../../config/utils'
  import ApiControl from '../../config/envConfig.home'
  export default {
  name: 'profile',
  data(){
      return {
        baseUrl: 'http://www.mihuyu.top',
        searchResult:[
          {
            date: '8月29日/09:00-16:00',
            name: '欧阳老师',
            room: '徐汇区天钥桥路店/琴房',
            address: '徐汇区天钥桥路100号',
            avatorUrl: '',
            status: 1
          },
          {
            date: '8月29日/09:00-16:00',
            name: '欧阳老师',
            room: '徐汇区天钥桥路店/琴房',
            address: '徐汇区天钥桥路100号',
            avatorUrl: '',
            status: 2
          },
          {
            date: '8月29日/09:00-16:00',
            name: '欧阳老师',
            room: '徐汇区天钥桥路店/琴房',
            address: '徐汇区天钥桥路100号',
            avatorUrl: '',
            status: 1
          }
        ]
      }
    },
  created:function(){
    document.title = "教室列表"

    var _vue = this;
    _vue.$ajax.get(ApiControl.getApi(env, "lessonList"), {
        params:{
            act: 'lessonList',
        }
    }).
    then(res => {
        // if(res.data.code == 0){
        //   _vue.searchResult = [];
        //   _vue.searchResult.push(res.data.data.class_1);
        //   _vue.searchResult.push(res.data.data.class_2);

        //   _vue.typeSlots.values = res.data.data.all_subject;//类型列表
        //   _vue.typeSlots.values = [];
        //   _vue.distinctSlots.values = [];
        //   for(var type in res.data.data.all_subject){
        //     _vue.typeSlots.values.push(res.data.data.all_subject[type].name)
        //   }
          
        //   for(var distinct in res.data.data.all_qu){
        //     _vue.distinctSlots.values.push(res.data.data.all_qu[distinct].area)
        //   }
          // _vue.searchResult = res.data.data.all_class;
        // }else{
        //     _vue.setErrorMessage(res.data.message);
        // }

        _vue.searchResult = [];

        _vue.searchResult = res.data.data.all_class;
    })

  },
  methods:{
    
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
  .result{
    margin: 0 13px;
    overflow: hidden;
    margin-bottom: 60px;
    .result-item{
    	background: #fff;
    	margin-top: 20px;
      .title{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px dashed #ddd;
        margin-bottom: 30px;
        background: #ddd;
        .lesson_icon{
          display: inline-block;
          text-align: center;
          width: 30px;
          border-right: 1px solid #ddd;
          line-height: 25px;
          margin-left: 20px;
          img{
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
        }
        .lesson_date{
          display: inline-block;
        }
      }
      .teacher{
      	height: 50px;
      	line-height: 50px;
      	margin-left: 30px;
      	font-size: 18px;
      	font-weight: bolder;
      	color: #303134;
      	background: url('../../static/images/subscribe/subscribe-teacher.png') center right no-repeat;
      	background-size: 20px;
      	margin-right: 30px;
      	img{
      		width: 30px;
      		height: 30px;
      		border-radius: 30px;
      		margin-right: 10px;
      		vertical-align: middle;
      	}
      }
      .order_room{
      	margin: 20px 40px;
      	img{
      		width: 13px;
      		height:13px;
      		vertical-align: middle;
      		margin-right: 10px;
      	}
      }
      .order_address{
      	margin: 0px 40px 20px 40px;
      	img{
      		width: 13px;
      		height:13px;
      		vertical-align: middle;
      		margin-right: 10px;
      	}
      }
      .status{
      	height: 40px;
      	line-height: 40px;
      	text-align: center;
      	.order-status-end{
			display: inline-block;
		    margin: 0 auto;
		    border-left: 2px solid red;
		    line-height: 16px;
		    padding-left: 5px;
      	}
		.order-status-subscribe{
			display:inline-block;
			margin:0 auto;
		}
		img{
			width : 15px;
			height: 15px;
			vertical-align: middle;
		}
      }
      .detail{
        text-align:center;
        border-bottom: 1px dashed #ddd;
        padding-bottom: 17px;
        img{
          width: 38px;
          height: 38px;
          border-radius: 38px;
        }
        .teacher_name{
          font-size: 14px;
          font-weight: bolder;
          color: #000;
        }
      }
      .lesson_info{
        text-align: center;
        line-height: 25px;
        margin: 21px 0 53px 0;
        .lesson_name{
          img{
            width: 13px;
            height: 12px;
          }
          .lesson_area{
            display: inline-block;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis; 
            font-size: 14px;
            font-weight: bolder;
            color: #000;
            vertical-align: bottom;
          }
        }
        .lesson_address{
          font-size: 11px;
          color:#303134;
        }
      }
      .process{
        .process-title{
          margin: 0 13px 20px;
          .process-price{
            display: inline-block;
            font-weight: bolder;
            color: #000;
            font-size: 12px;
            span{
              font-size: 20px;
            }
          }
        }
        .process-people{
          display: inline-block;
          float: right;
          font-size: 11px;
          color: #303134;
        }
      }
    }
  }

  
}
</style>