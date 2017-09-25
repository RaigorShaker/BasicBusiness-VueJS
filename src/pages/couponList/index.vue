<!-- 合伙人规则页面 -->
<template>
  <div class="list">
    <div class="coupon" v-for="item in couponList">
      <div class="coupon-left">
        ¥ {{ item.price }}
      </div>
      <div class="icon-top"></div>
      <div class="icon-bottom"></div>
      <div class="coupon-right">
        <div class="title">{{ item.title }}</div>
        <div class="date">
          <div class="date-icon"></div>
          <div class="date-value"> {{ item.start_date }} - {{ item.end_date }}</div>
        </div>
        <div class="info">说明:{{ item.remark }}</div>
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
          couponList:[
          ]
       }
     },
    methods:{

    },  
    created(){
      document.title = '抵用券'
      var _vue = this;
      _vue.$ajax.get(ApiControl.getApi(env, "couponList"), {
          params:{
              act: 'set_off'
          }
      }).
      then(res => {
          if(res.data.code == 0){
              console.log(res.data.data.data_list)
              _vue.couponList = res.data.data.coupon_list;

          }else{
              _vue.setErrorMessage(res.data.mes);
          }
          
      })
    }
  }
</script>
<style scoped lang="less" scoped>
  .list{
    padding-top: 20px;
    .coupon{
      height: 121px;
      background: #fff;
      margin: 20px 18px;
      position: relative;
      .coupon-left{
        height: 121px;
        width: 98px;
        float: left;
        background: rgb(244,170,62);
        font-size: 23px;
        font-weight: bolder;
        color: #fff;
        text-align: center;
        line-height: 121px;
      }
      .icon-top{
        position: absolute;
        left: 90px;
        top: -7px;
        width: 14px;
        height: 14px;
        border-radius: 14px;
        background: #eee;
      }
      .icon-bottom{
        position: absolute;
        left: 90px;
        top: 114px;
        width: 14px;
        height: 14px;
        border-radius: 14px;
        background: #eee;
      }
      .coupon-right{
        margin-left: 98px;
        .title{
          font-size: 20px;
          color: #000;
          line-height: 20px;
          padding: 20px 0 15px 30px;
        }
        .date{
          font-size: 11px;
          color: #afafaf;
          padding-left: 30px;
          padding-bottom: 20px;
          .date-icon{
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 5px;
            background: rgb(51,179,97);
          }
          .date-value{
            display: inline-block;
            font-size: 13px;
            vertical-align: middle;
          }
        }
        .info{
          color: #b1b4b6;
          font-size: 12px;
          padding-left: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space:nowrap;
        }
      }
    }
  }
</style>