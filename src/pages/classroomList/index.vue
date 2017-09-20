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
    <div class="area-container">
      <div class="select-area">
        <div @click="handlerTypeClick" class="select-type">{{ selectType }}</div><div @click="handlerDistinctClick" class="select-distinct">{{ selectDistinct }}</div>
        <mt-popup v-model="typeVisible" class="popup-control" position="bottom" pop-transition="popup-fade" :closeOnClickModal="false">
          <div class="picker-toolbar">  
            <div class="type-pick-toolbar" @click="confirmTypeSelect">确定</div>  
          </div>
          <mt-picker :slots="typeSlots" @change="onTypeChange" showToolbar="false"></mt-picker>
        </mt-popup>

        <mt-popup v-model="disVisible" class="popup-control" position="bottom" pop-transition="popup-fade" :closeOnClickModal="false">
          <div class="picker-toolbar">  
            <div class="distinct-pick-toolbar" @click="confirmDistinctSelect">确定</div>  
          </div>
          <mt-picker :slots="distinctSlots" @change="onDistinctChange" showToolbar="false"></mt-picker>
        </mt-popup>
      </div>
    </div>
    <div id='search_module'>
        <img class="search-icon" src="../../static/images/mainIndex/search-icon.png" alt="">
       <input placeholder="搜索" v-model="keywords"></input>
       <div class="searching" @click="searching(keywords,'','')">搜索</div>
    </div>
    <div class="result">
      <div class="result-item" v-for="item in searchResult">
        <div class="title">
          <div class="name">{{ item.class_name }}</div>
          <div class="distance">{{ item.class_yuan }}</div>
        </div>
        <div class="detail">
          <div class="address">地址:{{ item.class_add }}</div>
          <div class="price">价格: ¥{{item.class_much}}起</div>
        </div>
        <div class="picture">
          <img :src="item.url + item.class_pic"/>
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
  name: 'profile',
  data(){
      return {
        selectType: '架子鼓',
        selectDistinct: '青浦区',
        typeVisible: false,
        disVisible: false,
        keywords:'',
        slots: [
                {
                  flex: 1,
                  values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                  className: 'slot1',
                  textAlign: 'center'
                }, {
                  divider: true,
                  content: '-',
                  className: 'slot2'
                }, {
                  flex: 1,
                  values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                  className: 'slot3',
                  textAlign: 'left'
                }
        ],
        typeSlots:[
          {
            flex: 1,
            values: ['架子鼓', '钢琴', '小提琴', '三角铁'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        distinctSlots:[
          {
            flex: 1,
            values: ['杨浦区', '青浦区', '浦东新区', '徐汇区', '黄浦区', '虹口区', '宝山区', '闵行区', '嘉定区', '南汇区'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        searchResult:[

        ],
      }
    },
    created:function(){
      document.title = "用户中心"


      var _vue = this;
      _vue.$ajax.get(ApiControl.getApi(env, "croomList"), {
          params:{
              act: '07'
          }
      }).
      then(res => {
          if(res.data.code == 0){
              console.log(res.data.data)
              _vue.searchResult = [];
              _vue.searchResult.push(res.data.data.class_1);
              _vue.searchResult.push(res.data.data.class_2);
          }else{
              _vue.setErrorMessage(res.data.message);
          }
          
      })

    },
    methods:{
      onValuesChange(picker, values) {

            if (values[0] > values[1]) {
              picker.setSlotValue(1, values[0]);
            }
      },
      onTypeChange(picker,values){
        if(values[0] == undefined){
          this.selectType = '架子鼓'
        }else{
          this.selectType = values[0];
          
        }
      },
      onDistinctChange(picker,values){
        if(values[0] == undefined){
          this.selectDistinct = '杨浦区'
        }else{
          this.selectDistinct = values[0];
          
        }
      },
      handleClick: function() {
        this.popupVisible = true
      },
      handlerTypeClick: function(){
        this.typeVisible = true;
      },
      handlerDistinctClick: function(){
        this.disVisible = true;
      },
      confirmTypeSelect: function(){
        this.typeVisible = false;
        this.searching('',this.selectType,'');
      },
      confirmDistinctSelect: function(){
        this.disVisible = false;
        this.searching('','',this.selectDistinct);
      },
      searching: function(keywords,type,distinct){

        // send search request to server, update result list
        var _vue = this;
        _vue.$ajax.get(ApiControl.getApi(env, "croomList"), {
            params:{
                act: '07',
                type: type,
                keywords: keywords,
                distinct: distinct
            }
        }).
        then(res => {
            if(res.data.code == 0){
              _vue.searchResult = [];
                _vue.searchResult.push(res.data.data.class_1);
                _vue.searchResult.push(res.data.data.class_2);
            }else{
                _vue.setErrorMessage(res.data.message);
            }
            
        })
      },
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
  .banner{
    height:100px;
    .banner-container{
      display: block;
    }
  }
  .popup-control{
    width: 100%;
  }
  .guides{
    background: #fff;
    .guides-container{
      width: 80%;
      margin: 0 auto;
      text-align: center;
      padding-top:100px;
      p{
        margin-bottom: 10px;
      }
      .to-partner{
        background: #f3214d;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        width: 100%;
        display: block;
        margin-top: 50px;
        border-radius: 8px;
      }
    }
    
  }
  .area-container{
    height: 70px;
    .select-area{
      display: inline-block;
      overflow: hidden;
      float: right;
      margin: 20px;
      .select-type{
        width: 100px;
        height: 30px;
        display:inline-block;

      }
      .select-distinct{
        width: 100px;
        height: 30px;
        float:right;
      }
    }
  }
  #search_module {
      position: relative;
      height: 48px;
      background: #fff;
      .search-icon {
          width: 15px;
          position: absolute;
          left: 30px;
          top: 17px;
          z-index: 999;
          float: left;
          // padding: 10px 5px 5px 10px;
      }
      input {
          -webkit-appearance: none;
          box-shadow: 0 0 1px #efeff4 inset;
          -moz-box-shadow: 0 0 1px #efeff4 inset;
          /*firefox*/
          -webkit-box-shadow: 0 0 1px #efeff4 inset;
          width: 80%;
          background: #efeff4;
          border: 1px solid #efeff4;
          color: #999;
          margin-left: 15px;
          border-radius: 15px;
          padding-left: 40px;
          font-size: 14px;
          height: 28px;
          margin-top: 10px;
          font-family: PingFang-SC-Regular!important;
          float: left;
          z-index: 10;
      }
      .searching {
          float: left;
          width: 15%;
          height: 38px;
          line-height: 48px;
          text-align: center;
          color: #fd472b;
          font-size: 15px;
          font-family: PingFang-SC-Regular!important;
      }
  }
  .result{
    border-top: 10px solid #ddd;
    border-left: 2px solid #ddd;
    border-right: 2px solid #ddd;
    .result-item{
      border-bottom: 10px solid #ddd;
      .title{
        height: 30px;
        margin: 10px 0 30px 0;
        .name{
          display: inline-block;
          float: left;
          font-size: 18px;
          font-weight: bolder;
          color: #000;
          line-height: 20px;
          margin-left: 20px;
        }
        .distance{
          display: inline-block;
          float: right;
          font-size: 14px;
          line-height: 16px;
          color: #000;
          margin-right: 10px;
          vertical-align: middle;
        }       
      }
      .detail{
        margin: 10px 30px;
        .address{
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 10px;
          color: #ddd;
        }
        .price{
          font-size: 14px;
          line-height: 20px;
          color: #ddd;
        }
      }
      .picture{
        width: 100%;
        height: 120px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .type-pick-toolbar{
    text-align: center;
    display: inline-block;
    margin-right: 20px;
    float: right;
    line-height: 30px;
    font-size: 16px;
    background: #ddd;
    width: 50px;
    margin-top: 10px;
    border-radius: 5px;
  }
  .distinct-pick-toolbar{
    text-align: center;
    display: inline-block;
    margin-right: 20px;
    float: right;
    line-height: 30px;
    font-size: 16px;
    background: #ddd;
    width: 50px;
    margin-top: 10px;
    border-radius: 5px;
  }
}
</style>