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
        <div @click="handlerTypeClick" class="select-type"><img class="type-icon" src="../../static/images/mainIndex/type_icon.png" />{{ selectType }}</div>
        <div @click="handlerDistinctClick" class="select-distinct">
        <img class="distinct-icon" src="../../static/images/mainIndex/distinct_icon.png" />{{ selectDistinct }}</div>
        <div class="position-icon">
          <img src="../../static/images/mainIndex/position-icon.png"/>
        </div>
        <mt-popup v-model="typeVisible" class="popup-control" position="bottom" pop-transition="popup-fade" :closeOnClickModal="false">
          <div class="picker-toolbar">  
            <div class="type-pick-toolbar" @click="confirmTypeSelect">确定</div>  
          </div>
          <mt-picker :slots="typeSlots" @change="onTypeChange"></mt-picker>
        </mt-popup>

        <mt-popup v-model="disVisible" class="popup-control" position="bottom" pop-transition="popup-fade" :closeOnClickModal="false">
          <div class="picker-toolbar">  
            <div class="distinct-pick-toolbar" @click="confirmDistinctSelect">确定</div>  
          </div>
          <mt-picker :slots="distinctSlots" @change="onDistinctChange"></mt-picker>
        </mt-popup>
      </div>
    </div>
    <div id='search_module'>
        <img class="search-icon" src="../../static/images/mainIndex/search-icon.png" alt="">
       <input placeholder="搜索" v-model="keywords"></input>
       <div class="searching" @click="searching(keywords,'','')">搜索</div>
    </div>
    
    <div class="result">
      <!-- <div class="result-item" v-for="item in searchResult"> -->
      <router-link v-for="item in searchResult" :to="'/croomDetail?id=' + item.room_id">
        <div class="result-item">
          <div class="title">
            <div class="lesson_icon"><img src="../../static/images/mainIndex/lesson_icon.png"/></div>
            <div class="lesson_date">{{ item.date }}</div>
          </div>
          <div class="detail">
            <img :src="item.avatorUrl" />
            <div class="teacher_name">{{ item.teacher }}</div>
          </div>
          <div class="lesson_info">
            <div class="lesson_name">
              <img src="../../static/images/mainIndex/house-icon.png"/>
              <div class="lesson_area">{{ item.store }}</div>
            </div>
            <div class="lesson_address">{{ item.address }}</div>
          </div>
          <div class="process">
            <div class="process-title">
              <div class="process-price">¥<span>{{ item.price }}</span></div>
              <div class="process-people">{{ item.nowNum }}人 / {{ item.fullNum }}/人</div>
              <mt-progress :value="processValue" :bar-height="5"></mt-progress>
            </div>
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
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        distinctSlots:[
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        searchResult:[
          {
            date: '8月29日/09:00-16:00',
            teacher: '钢琴课/欧阳老师',
            store: '徐汇区天钥桥路店/琴房',
            address: '徐汇区天钥桥路100号',
            avatorUrl: '',
            price: 190,
            fullNum: 30,
            nowNum: 20
          }
        ],
        processValue: 20
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
        _vue.searchResult.push(res.data.data.class_1);
        _vue.searchResult.push(res.data.data.class_2);

        _vue.typeSlots.values = res.data.data.all_subject;//类型列表
        _vue.typeSlots.values = [];
        _vue.distinctSlots.values = [];
        for(var type in res.data.data.all_subject){
          _vue.typeSlots[0].values.push(res.data.data.all_subject[type].name)
        }
        console.log(_vue.typeSlots);
        
        for(var distinct in res.data.data.all_qu){
          _vue.distinctSlots[0].values.push(res.data.data.all_qu[distinct].area)
        }
        console.log(_vue.distinctSlots);
        _vue.searchResult = res.data.data.all_class;
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
              act: 'classList',
          }
      }).
      then(res => {
          if(res.data.code == 0){
            _vue.searchResult = [];
              _vue.searchResult.push(res.data.data.class_1);
              _vue.searchResult.push(res.data.data.class_2);

              _vue.typeSlots.values = res.data.data.all_subject;//类型列表
              _vue.typeSlots.values = [];
              _vue.distinctSlots.values = [];
              for(var type in res.data.data.all_subject){
                _vue.typeSlots.values.push(res.data.data.all_subject[type].name)
              }
              
              for(var distinct in res.data.data.all_qu){
                _vue.distinctSlots.values.push(res.data.data.all_qu[distinct].area)
              }
              _vue.searchResult = res.data.data.all_class;
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
    background: #fff;
    .select-area{
      display: inline-block;
      overflow: hidden;
      float: right;
      margin: 20px;
      .select-type{
        width: 100px;
        height: 30px;
        display:inline-block;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
        .type-icon{
          width: 10px;
          height: 17px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .select-distinct{
        width: 100px;
        height: 30px;
        display:inline-block;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
        .distinct-icon{
          width: 10px;
          height: 17px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .position-icon{
        float: right;
        width: 30px;
        height: 30px;
        img{
          width: 20px;
        }
      }
    }
  }
  #search_module {
      position: relative;
      height: 48px;
      background: #fff;
      margin-bottom: 10px;
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
    margin: 0 13px;
    background: #fff;
    overflow: hidden;
    .result-item{
      .title{
        height: 53px;
        line-height: 53px;
        border-bottom: 1px dashed #ddd;
        margin-bottom: 30px;
        .lesson_icon{
          display: inline-block;
          text-align: center;
          width: 53px;
          border-right: 1px solid #ddd;
          line-height: 25px;
          img{
            width: 25px;
            height: 25px;
            vertical-align: middle;
          }
        }
        .lesson_date{
          display: inline-block;
          margin-left: 13px;
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