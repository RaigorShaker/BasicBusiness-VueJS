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
      <router-link v-for="item in searchResult" :to="'/teacherDetail?id=' + item.id">
        <div class="result-item">
          <div class="detail">
            <div class="teacher_img">
              <img :src="baseUrl + item.head_img" />
            </div>
            <div class="teacher-info">
              <div class="teacher_detail">
                <span class="teacher_name">{{ item.name }}</span>
                <span class="teacher_price">¥{{ item.price }}</span>
              </div>
              <div class="teacher_time">
                <img src="../../static/images/mainIndex/calendar_icon.png"/>
                <div class="teacher_time_info">{{ item.info }}</div>
              </div>
            </div>
          </div>
          <div class="type-list">
            <span class="each-type" v-for="type in item.typeList">
              {{ type }}
            </span>
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
        baseUrl: 'http://www.studyyx.com',
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
            info: "每周二三四日上课(已满)",
            typeList: [
              "声乐","吉他","小提琴","大提琴"
            ],
            teacher_id: 1
          },
          {
            date: '8月29日/09:00-16:00',
            teacher: '钢琴课/欧阳老师',
            store: '徐汇区天钥桥路店/琴房',
            address: '徐汇区天钥桥路100号',
            avatorUrl: '',
            price: 190,
            info: "每周二三四日上课(已满)",
            typeList: [
              "声乐","吉他","小提琴","大提琴"
            ],
            teacher_id: 1
          },
          {
            date: '8月29日/09:00-16:00',
            teacher: '钢琴课/欧阳老师',
            store: '徐汇区天钥桥路店/琴房',
            address: '徐汇区天钥桥路100号',
            avatorUrl: '',
            price: 190,
            info: "每周二三四日上课(已满)",
            typeList: [
              "声乐","吉他","小提琴","大提琴"
            ],
            teacher_id: 1
          }
        ],
        processValue: 20
      }
    },
  created:function(){
    document.title = "老师列表"

    var _vue = this;
    _vue.$ajax.get(ApiControl.getApi(env, "teacherList"), {
        params:{
            act: 'teacherList',
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
        _vue.typeSlots.values = [];
        _vue.distinctSlots.values = [];

        for(var type in res.data.data.subject_list){
          _vue.typeSlots[0].values.push(res.data.data.subject_list[type].name)
        }
        console.log(_vue.typeSlots);
        
        for(var distinct in res.data.data.area_list){
          _vue.distinctSlots[0].values.push(res.data.data.area_list[distinct].area)
        }
        console.log(_vue.distinctSlots);
        _vue.searchResult = res.data.data.teacher_list;
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
    height: 55px;
    background: #fff;
    .select-area{
      display: inline-block;
      overflow: hidden;
      float: left;
      margin: 20px;
      margin-bottom: 0px;
      width: calc(~"(100% - 40px)");
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
          width: 70%;
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
          float: right;
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
    background: #fff;
    overflow: hidden;
    .result-item{
      padding: 20px 25px 40px 25px;
      border-bottom: 10px solid #ddd;
      .detail{
        height: 80px;
        border-bottom: 1px solid #ddd;
        .teacher_img{
          display: inline-block;
          float: left;
          width: 44px;
          height: 44px;
          margin-right: 15px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 44px;
          }
        }
        .teacher-info{
          display: inline-block;
          .teacher_detail{
            padding-bottom: 10px;
            .teacher_name{
              font-size: 16px;
              font-weight: bolder;
              color: #303134;
            }
            .teacher_price{
              font-size: 12px;
              color: #303134;
            }
          }
          .teacher_time{
            img{
              width: 11px;
              height: 12px;
            }
            font-size: 12px;
            color: #7d7a78;
            .teacher_time_info{
              display: inline-block;
            }
          }
        }
      }
      .type-list{
        height: 30px;
        padding-top: 20px;
        line-height: 30px;
        .each-type{
          margin-right: 15px;
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