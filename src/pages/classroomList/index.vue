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
        <div @click="handlerTypeClick" class="select-type"><img class="type-icon" src="../../static/images/mainIndex/type_icon.png" />{{ selectType }}</div><div @click="handlerDistinctClick" class="select-distinct"><img class="distinct-icon" src="../../static/images/mainIndex/distinct_icon.png" />{{ selectDistinct }}</div>
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
            <div class="name">{{ item.name }}</div>
            <div class="distance">{{ item.class_yuan }}</div>
          </div>
          <div class="detail">
            <div class="address">地址:{{ item.address }}</div>
            <div class="price">价格: ¥{{item.price}}起</div>
          </div>
          <div class="picture">
            <img :src="item.thumb"/>
          </div>
        </div>
      </router-link>
    </div>
    <!-- <div id="map-container"></div> -->
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
        // baseUrl: 'http://www.mihuyu.top',
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

        ],
      }
    },
    created:function(){
      document.title = "教室列表"

      var _vue = this;
      _vue.$ajax.get(ApiControl.getApi(env, "croomList"), {
          params:{
              act: 'classList',
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
          for(var type in res.data.data.all_subject){
            _vue.typeSlots[0].values.push(res.data.data.all_subject[type].name)
          }
          
          for(var distinct in res.data.data.all_qu){
            _vue.distinctSlots[0].values.push(res.data.data.all_qu[distinct].area)
          }
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
      // var marker, map = new AMap.Map("map-container", {
      //         resizeEnable: true,
      //         center: [116.397428, 39.90923],
      //         zoom: 13
      //     });

      // marker = new AMap.Marker({
      //     icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      //     position: [116.405467, 39.907761]
      // });
      // marker.setMap(map);
       // AMap.event.addDomListener(document.getElementById('addMarker'), 'click', function() {
       //        addMarker();
       //    }, false);
       // AMap.event.addDomListener(document.getElementById('updateMarker'), 'click', function() {
       //        marker && updateMarker();
       //    }, false);
       // AMap.event.addDomListener(document.getElementById('clearMarker'), 'click', function() {
       //        if (marker) {
       //            marker.setMap(null);
       //            marker = null;
       //        }
       //    }, false);
       // 实例化点标记
          // function addMarker() {
          //     if (marker) {
          //         return;
          //     }
          //     marker = new AMap.Marker({
          //         icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          //         position: [116.405467, 39.907761]
          //     });
          //     marker.setMap(map);
          // }
      // function updateMarker() {
      //         // 自定义点标记内容
      //         var markerContent = document.createElement("div");

      //         // 点标记中的图标
      //         var markerImg = document.createElement("img");
      //         markerImg.className = "markerlnglat";
      //         markerImg.src = "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png";
      //         markerContent.appendChild(markerImg);
      //   // 点标记中的文本
      //         var markerSpan = document.createElement("span");
      //         markerSpan.className = 'marker';
      //         markerSpan.innerHTML = "Hi，我换新装备啦！";
      //         markerContent.appendChild(markerSpan);
      //         marker.setContent(markerContent); //更新点标记内容
      //         marker.setPosition([116.391467, 39.927761]); //更新点标记位置
      //     }
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
    overflow: hidden;
    .result-item{
      margin-bottom: 12px;
      background: #fff;
      .title{
        height: 30px;
        margin: 10px 0 20px 0;
        .name{
          display: inline-block;
          float: left;
          font-size: 18px;
          font-weight: bolder;
          color: #000;
          line-height: 20px;
          margin-left: 20px;
          margin-top: 20px;
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
        margin-top: 0px;
        .address{
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 5px;
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
        height: 160px;
        padding: 0 10px;
        padding-bottom: 20px;
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
  #map-container{
    height: 350px;
  }
}
</style>