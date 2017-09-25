<!-- 合伙人规则页面 -->
<template>
  <div class="evaluate">
    <div class="star">
      <img @click="selectEvent(index)" class="star-icon" v-bind:src="item.selected | getImgIcon" v-for="(item,index) in starList"/>
    </div>
    <div class="tips">
      {{ tip }}
    </div>
    
  </div>
</template>

<script>
  var env = 'product';// set env type for debug or product
  import ajax from '../../config/ajax'
  import utils from '../../config/utils'
  import ApiControl from '../../config/envConfig.home'
  var iconList = {
    0: require('../../static/images/evaluate/star_unselected.png'),
    1: require('../../static/images/evaluate/star_selected.png'),
  }
  const tips = {
      0: '不满意',
      1: '一般',
      2: '满意',
      3: '很满意',
      4: '非常满意',
  }
  export default {
     data() {
        return {
          starList:[
            {
              selected: 0,
            },
            {
              selected: 0,
            },
            {
              selected: 1,
            },
            {
              selected: 0,
            },
            {
              selected: 0,
            }
          ],
          tip: ""
       }
     },
    methods:{
      selectEvent: function(index){
        if(this.starList[index].selected == 0){
          for(var i = 0; i <= index; i ++){
            this.starList[i].selected = 1;
          }
        }else{
          for(var j = index + 1; j < 5; j++)
          this.starList[j].selected = 0;
        }
        this.tip = tips[index];
      }
    },  
    filters: {
      // filter for get image url from key
      getImgIcon: function(value){
        return iconList[value];
      }
    },
    created(){
      // var _vue = this;
      // _vue.$ajax.get(ApiControl.getApi(env, "evaluate"), {
      //     params:{
      //         act: 'set_off'
      //     }
      // }).
      // then(res => {
      //     if(res.data.code == 0){
      //         console.log(res.data.data.data_list)
      //         _vue.couponList = res.data.data.coupon_list;

      //     }else{
      //         _vue.setErrorMessage(res.data.mes);
      //     }
          
      // })
    }
  }
</script>
<style scoped lang="less" scoped>
  .evaluate{
    background: #fff;
    height: 100%;
    overflow: hidden;
    .star{
      padding-top: 50px;
      width: 238px;
      margin: 26px auto;
      .star-icon{
        width: 30px;
        height: 30px;
        margin-right: 22px;
      }
      .star-icon:last-child{
        margin-right: 0px;
      }
    }
    .tips{
      font-size: 19px;
      text-align: center;
      font-weight: bolder;
      color: #303134;
      padding-bottom: 47px;
      border-bottom: 1px dashed #eee;
      line-height: 20px;
      height: 20px;
    }
  }
</style>