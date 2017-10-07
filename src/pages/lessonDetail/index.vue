<!-- 合伙人规则页面 -->
<template>
	<div class="course">
    <!-- 课程介绍 -->
    <div class="lesson">
      <div class="lesson-name">{{ item.course_info.subject_name }}</div>
      <div class="lesson-info"><span class="lesson-price">¥ {{ item.course_info.price }}</span><span class="lesson-num">{{ item.course_info.sign_up }}人报名/</span><span class="lesson-leave">剩余{{ item.course_info.leave_num }}名额</span>
      </div>
      <mt-progress :value="processValue" :bar-height="5"></mt-progress>
      <router-link :to="'/placeOrder?rid=' + item.course_info.id">
        <div class="subscribe">去预约</div>
      </router-link>
    </div>
    <!-- 课程详情 -->
    <div class="teacher">
      <div class="teacher-left">
        <div class="teacher-name">
          <img src="../../static/images/subscribe/subscribe-teacher.png"/>
          {{ item.teacher_info.name }}
        </div>
        <div class="teacher-awards">
          <img src="../../static/images/evaluate/awards-icon.png"/>
          <span v-html="item.teacher_info.honor_info"></span>
        </div>
      </div>
      <div class="teacher-right">
        <img :src="item.teacher_info.avatorUrl"
/>      </div>
    </div>
    <div class="room">
      <div class="room-left">
        <div class="room-name">
          <img src="../../static/images/mainIndex/house-icon.png"/>
          {{ item.class_info.cat_name }}
        </div>
        <div class="room-address">
          {{ item.teacher_info.address }}
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
        <div class="detail-info">{{ item.room_info.detail_desc }}</div>
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
        processValue: 20,
        item: {
          course_info:{
            subject_name: '架子鼓课程',
            price: 190,
            num: 20,
            leave_num: 10,
            sign_up: 10,
          },
          teacher_info:{
            name: '景老师',
            honor_info: '各种大奖获得者',
            avatorUrl: ''
          },
          class_info:{
            cat_name: '培训班XXXXXX',
            address: '徐汇区天钥桥路100号'
          },
          room_info:{
            detail_desc: "测试课程一二三"
          }
        }
      }
    },
    created:function(){
     	document.title = "课程介绍"
      var detailId = this.$route.query.detailId
      var _vue = this;
      _vue.$ajax.get(ApiControl.getApi(env, "lessonDetail"), {
          params:{
              act: 'courseDetail',
              course_id: detailId
          }
      }).
      then(res => {
          // if(res.data.code == 0){
          //     console.log(res.data.data)
          //     _vue.mainIndexData = res.data.data;
          // }else{
          //     _vue.setErrorMessage(res.data.message);
          // }
          _vue.item = res.data.data;
          // _vue.processValue = _vue.item.course_info.sign_up / _vue.item.course_info.num;
          _vue.processValue = (_vue.item.course_info.sign_up / _vue.item.course_info.num).toFixed(2) * 100;
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
    .lesson{
      text-align: center;
      padding-top: 20px;
      overflow: hidden;
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
      .lesson-name{
        font-size :18px;
        font-weight: bolder;
        color: #303134;
        line-height: 20px;
        margin-bottom: 12px;
      }
      .lesson-info{
        margin-bottom: 12px;
        .lesson-price{
          font-size: 14px;
          font-weight: bolder;
          color: #303134;
          line-height: 16px;
          margin-right: 8px;
        }
        .lesson-num,.lesson-leave{
          font-size: 12px;
          color: #303134;
        }
      }
      .subscribe{
        margin: 20px auto;
        width: 88px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #fff;
        background: #f7941d;
        text-align: center;
      }
    }

    .teacher{
      height: 94px;
      background: #fff;
      margin-bottom: 20px;
      padding-top: 18px;
      .teacher-left{
        .teacher-name{
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
        .teacher-awards{
          font-size: 12px;
          color: #7d7a78;
          background-size: 13px;
          margin-left: 20px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow: ellipsis;
          max-width: 230px;
          img{
            width: 13px;
            height: 100%;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
        display: inline-block;
      }
      .teacher-right{
        display: inline-block;
        float: right;
        margin-right: 20px;
        img{
          width: 49px;
          height: 49px;
          border-radius: 49px;
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
          width: 25px;
          vertical-align: bottom;
        }
      }
      .intro-detail{
        text-align: center;
        .detail-title{
          font-size: 18px;
          font-weight: bolder;
          color: #000;
        }
        .detail-info{
          margin: 10px 25px 0px 25px;
          color: #a6a6a6;
        }
      }
    }
  }
</style>