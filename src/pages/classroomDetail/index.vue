<!-- 合伙人规则页面 -->
<template>
	<div class="course">
    <!-- 课程介绍 -->
    <div class="banner">
      <mt-swipe :show-indicators="false" class="banner" :auto="0">
          <mt-swipe-item v-for="item in detailInfo.class_image"><img :src="baseUrl + item.img_url"/></mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="subscribe">
      <div class="subscribe-price">
        ¥ <span>{{ detailInfo.class_detail.price }}</span> /小时
      </div>
      <router-link :to="'/placeOrder?tid=' + detailInfo.class_detail.room_id">
        <div class="submit">
          <img src="../../static/images/evaluate/subscribe.png"/>立即预约
        </div>
      </router-link>
    </div>

    <div class="room">
      <div class="room-left">
        <div class="room-name">
          <img src="../../static/images/mainIndex/house-icon.png"/>
          {{ detailInfo.class_detail.cat_name }}
        </div>
        <div class="room-address">
          {{ detailInfo.class_detail.address }}
        </div>
      </div>
      <div class="room-right">
        <img src="../../static/images/mainIndex/position-icon.png"/>
      </div>
    </div>
    <div class="intro">
      <div class="intro-icon">
        <img src="../../static/images/evaluate/classintro-icon.png"/>
      </div>
      <div class="intro-detail">
        <div class="detail-title">课程介绍</div>
        <div class="detail-info" v-html="detailInfo.class_detail.detail_desc"></div>
      </div>
    </div>
    <div class="another">
      <div class="another-icon">
        <img src="../../static/images/evaluate/tanhao-icon.png"/>
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
    name: 'profile',
    data(){
    	return {
        baseUrl : 'http://www.studyyx.com/',
        detailInfo: {
          class_image: [

          ],
          class_detail: {

          }
        }
      }
    },
    created:function(){
     	document.title = "课程介绍"
      var detailId = this.$route.query.id === "undefined" ? '1' : this.$route.query.id
      var _vue = this;
      _vue.$ajax.get(ApiControl.getApi(env, "croomDetail"), {
          params:{
              act: 'classDetail',
              cid: detailId
          }
      }).
      then(res => {
          // if(res.data.code == 0){
          //     console.log(res.data.data)
          //     _vue.mainIndexData = res.data.data;
          // }else{
          //     _vue.setErrorMessage(res.data.message);
          // }
          console.log(res.data.data);
          _vue.detailInfo = res.data.data;
          // _vue.processValue = _vue.item.course_info.sign_up / _vue.item.course_info.num;
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
  .course{
    background: #eee;
    overflow: hidden;
    .banner{
        height: 186px;
        margin: 0 0px 12px 0px;
        .banner-container{
            display: block;
        }
    }
    .subscribe{
      overflow: hidden;
      background: #fff;
      margin-bottom: 20px;
      padding-top: 18px;
      padding-bottom: 20px;
      padding: 30px 20px 20px 20px;
      border-bottom: 2px solid red;
      .subscribe-price{
        display: inline-block;
        width: 60%;
        span{
          font-size: 20px;
          font-weight: bolder;
          color: #000;
        }
      }
      .submit{
        display: inline-block;
        float: right;
        font-size: 16px;
        width: 40%;
        text-align: right;
        color:#000;
        img{
          width: 13px;
          height: 13px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }

    .room{
      height: 94px;
      background: #fff;
      margin-bottom: 20px;
      padding-top: 18px;
      .room-left{
        .room-name{
          font-size: 14px;
          font-weight: bolder;
          color: #303134;
          line-height: 20px;
          margin-bottom: 10px;
          img{
            width: 13px;
            height: 100%;
            vertical-align: middle;
            margin-right: 8px;
            margin-left: 20px;
          }
        }
        .room-address{
          font-size: 12px;
          color: #7d7a78;
          background-size: 13px;
          margin-left: 20px;
          padding-left: 20px;
          img{
            width: 13px;
            height: 100%;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
        display: inline-block;
      }
      .room-right{
        display: inline-block;
        float: right;
        margin-right: 20px;
        img{
          width: 20px;
          height: 25px;
          vertical-align: middle;
          border-left: solid 2px red;
          padding-left: 10px;
          margin-top: 10px;
        }
      }
    }

    .intro{
      .intro-icon{
        height: 25px;
        background: rgb(245,243,239); 
        text-align: center;
        img{
          width: 15px;
          vertical-align: bottom;
        }
      }
      .intro-detail{
        text-align: center;
        background: #fff;
        .detail-title{
          font-size: 18px;
          font-weight: bolder;
          color: #000;
          margin-top: 25px;
        }
        .detail-info{
          margin: 10px 20px 10px 20px;
        }
      }
    }

    .another{
      padding-top: 20px;
      .another-icon{
        height: 25px;
        background: rgb(245,243,239); 
        text-align: center;
        img{
          width: 15px;
          vertical-align: bottom;
        }
      }
    }
  }
</style>