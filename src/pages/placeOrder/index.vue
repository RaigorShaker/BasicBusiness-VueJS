<!-- 下单页面 -->
<template>
  <div>
    <div class="order-title">
      <div class="store-name">{{ storeName }}</div>
      <div class="store-address">{{ storeAddress }}</div>
    </div>
    <div class="order-container">
      <div class="order-class">
        <div class="order-desp">
          <img src="../../static/images/placeOrder/class-icon.png"/><div class="normal-text">选择教室的房间</div>
        </div>
        <div class="class-select" @click="handlerClassClick">
          {{ selectedClass}}
        </div>
      </div>
      <div class="order-time">
        <div class="order-desp">
          <img src="../../static/images/placeOrder/time-icon.png"/><div class="normal-text">选择上课时间</div>
        </div>
        <div class="time-select" @click="handlerTimeClick">
          {{ selectedTime}}
        </div>
      </div>
      <!-- to be done -->
      <div class="order-date">
        <div class="order-desp">
          <img src="../../static/images/placeOrder/date-icon.png"/><div class="normal-text">选择上课日期</div>
          <div class="selected-date">已选{{ selectedDays }}天</div>
        </div>
        <div class="month-select">
          <img src="../../static/images/placeOrder/arrow-left.png" @click="clickDateLeft" class="date-left"/>
          {{ selectMonth}}月
          <img src="../../static/images/placeOrder/arrow-right.png" class="date-right" @click="clickDateRight"/>
        </div>
      
        <table cellpadding="5">
          <thead>
              <tr>
                  <td v-for="week in weeks" class="week">{{week}}</td>
              </tr>
          </thead>
          <tr v-for="(items,k1) in days">
              <!-- <td v-for="(child,k2) in day" :class="{'selected':child.selected,'disabled':child.disabled}" @click="select(k1,k2,$event)">
                  <span :class="{'red':k2==0||k2==6}">{{child.day}}</span>
              </td> -->
              <td v-for="(item,k2) in items" @click="selectDay(k1,k2)" :class="{'selected':item.selected,'disabled':item.disabled}">
                  <span>{{item.day}}</span>
              </td>
          </tr>
        </table>
      </div>

      <div class="order-money">
        <div class="order-desp-first">
          <div class="order-image-container">
            <img src="../../static/images/placeOrder/pay-icon.png"/>
          </div>
          <div class="order-info">
            <div class="order-intro">实际支付</div>
            <div class="order-content">{{ orderContent }}</div>
            <div class="order-all">总价: {{orderTotal }}</div>
          </div>
          <div class="order-total">{{ orderReal }}元</div>
        </div>
        <div class="order-desp-second">
          <div class="order-act">
            <div class="act-ticket">抵用券</div>
          </div>
          <div class="order-ticket">-¥{{ orderTicket }}</div>
        </div>
      </div>

      <div class="order-recommend">
        <div class="recommend-icon">
          <img src="../../static/images/placeOrder/recommend-icon.png"/>
        </div>
        <div class="recommend-container">
          <div class="recommend-title">温馨提示</div>
          <div class="recommend-detail">开始时间前12个小时前取消预约，支持全额退款;</div>
          <div class="recommend-detail">开始时间前6个小时后取消预约，不支持退款</div>
        </div>
      </div>
      <div class="order-submit" @click="submitOrder">
        提交订单，去支付
      </div>
    </div>

    <mt-popup v-model="classVisible" class="popup-control" position="bottom" pop-transition="popup-fade" :closeOnClickModal="false">
      <div class="picker-toolbar">  
        <div class="class-pick-toolbar" @click="confirmClassSelect">确定</div>  
      </div>
      <mt-picker :slots="classSlots" @change="onClassChange"></mt-picker>
    </mt-popup>

    <mt-popup v-model="timeVisible" class="popup-control" position="bottom" pop-transition="popup-fade" :closeOnClickModal="false">
      <div class="picker-toolbar">  
        <div class="time-pick-toolbar" @click="confirmTimeSelect">确定</div>  
      </div>
      <mt-picker :slots="timeSlots" @change="onTimeChange"></mt-picker>
    </mt-popup>
    <error-message v-bind="{pastle, message}"></error-message>
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
          pastle: false,
          message: [],
          valuableDays: [
            
          ],
          type: 2,
          tid: 0,
          roomId: '',
          classId: '',
          timeLimit: 0,
          storeName: '徐汇区天钥桥路店',
          storeAddress: '上海市徐汇区天钥桥路100号',
          selectedClass: '贝多芬房间',
          selectedRoom: '',
          selectedTime: '09:00-09:30',
          selectedDays: 0,
          selectedTotal: [],
          selectMonth: 9,
          selectedYear: 2017,
          orderContent:"",
          orderTotal:0,
          orderReal: 0,
          orderTicket:0,
          coupon: [],
          couponId: 0,
          price: 0,
          roomVisible: false,
          classVisible: false,
          timeVisible: false,
          monthVisible: false,
          targetDays: [],
          keywords:'',
          roomSlots:[
            {
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
          classSlots:[
            {
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
          timeSlots:[
            {
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
          weeks:[
            "周日","周一","周二","周三","周四","周五","周六"
          ],
          days:[
            [
              {
                day: 28,
                disabled: true,
                selected: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              }
            ],
            [
              {
                day: 28,
                disabled: true,
                selected: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              }
            ],
            [
              {
                day: 28,
                disabled: true,
                selected: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              }
            ],
            [
              {
                day: 28,
                disabled: true,
                selected: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              }
            ],
            [
              {
                day: 28,
                disabled: true,
                selected: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              }
            ],
            [
              {
                day: 28,
                disabled: true,
                selected: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              },
              {
                day: 28,
                disabled: true
              }
            ]
          ],
          range:{
              type: Boolean,
              default: false
          },
          value: {
              type: Array,
              default: function(){
                  return []
              }
          },
          year: 0,
          month: 0,
          day: 0,
          rangeBegin:[],
          rangeEnd:[],
          begin:  {
              type: Array,
              default: function(){
                  return []
              }
          },
          end:  {
              type: Array,
              default: function(){
                  return []
              }
          },
          allInfo: []
        }
      },
      created:function(){
        document.title = "教室下单"
        var _vue = this;
        this.tid = this.$route.query.tid;
        // var teacherId = this.$route.query.tid
        _vue.$ajax.get(ApiControl.getApi(env, "add_order"), {
          params: {
            act: "payForTeacher",
            tid: 11
          }
        }).
        then(res => {
            if(res.data.code == 0){
                _vue.allInfo = res.data.data.teacher_info.all_class;
                _vue.initRoomSlots(res.data.data.teacher_info.all_class);
                _vue.initTimeSlots(res.data.data.time_list);
                _vue.coupon = res.data.data.coupon;
            }else{
                _vue.setErrorMessage(res.data.message);
            } 
        })
      },
      methods:{
        // 初始化一些东西
        init(){
          let now = new Date();
           // 没有默认值
          this.renderTrueDay(now.getFullYear(),now.getMonth());

        },
        initRoomSlots: function(data){
          var roomArr = [];
          for(var item in data){
            roomArr.push(data[item].name);
          }
          this.roomSlots[0].values = roomArr;
          this.selectedRoom = data[0].name;
          this.roomId = data[0].all_room[0].id;

          for(var item in this.allInfo){
            var classArr = [];
            for(var index in this.allInfo[item].all_room){
              classArr.push(this.allInfo[item].all_room[index].name);
            }
            this.classSlots[0].values = classArr;
          }


        },
        initTimeSlots: function(data){
          var timeArr = [];
          for(var item in data){
            var temp = data[item].start + '-' + data[item].end;
            timeArr.push(temp);
          }
          this.timeSlots[0].values = timeArr;
        },
        setErrorMessage: function(message){
            var _vue = this;
            this.pastle = true;
            this.message = message;
            setTimeout(function(){
                    _vue.pastle = false;
                    _vue.message = '';
            },2000)
        },
        onClassChange(picker,values){
          if(values[0] == undefined){
            this.selectedClass = ''
          }else{
            this.selectedClass = values[0];
          }
          for(var item in this.allInfo){
            for(var index in this.allInfo[item].all_room){
              if(this.allInfo[item].all_room[index].name == this.selectedClass){
                this.price = this.allInfo[item].all_room[index].price;
                this.roomId = this.allInfo[item].all_room[index].id;
              }
            }
          }
        },
        onRoomChange(picker,values){
          if(values[0] != undefined){
            this.selectedRoom = values[0];
          }
          // change the classSlots
          for(var item in this.allInfo){
            if(this.selectedRoom == this.allInfo[item].name){
              this.classId = this.allInfo[item].cat_id;
            }
          }
        },
        onTimeChange(picker,values){
          if(values[0] == undefined){
            this.selectedTime = '09:00-09:30'
          }else{
            this.selectedTime = values[0];
          }
          if(this.timeLimit > 0){
            var now = new Date();
             // 没有默认值
            // this.renderTrueDay(now.getFullYear(),now.getMonth(),this.valuableDays);
            // this.getVaribleDate(now.getFullYear(),now.getMonth() + 1);
          }
          this.timeLimit++;
        },
        handleClick: function() {
          this.popupVisible = true
        },
        handlerRoomClick: function(){
          this.roomVisible = true;
        },
        handlerClassClick: function(){
          this.classVisible = true;
        },
        handlerTimeClick: function(){
          this.timeVisible = true;
        },
        clickDateLeft:function(){
          if(this.selectMonth - 1 < 1){
            this.selectMonth = 12;
            this.selectedYear = this.selectedYear - 1;
          }else{
            this.selectMonth = this.selectMonth - 1
          }
          // this.selectMonth = this.selectMonth - 1 < 1 ? 12 : this.selectMonth - 1;
          let now = new Date();
          this.getVaribleDate(this.selectedYear,this.selectMonth);
          // this.renderTrueDay(2017,this.selectMonth - 1 < 1 ? 12 : this.selectMonth - 1,this.valuableDays);
        },
        clickDateRight:function(){
          if(this.selectMonth + 1 > 12){
            this.selectMonth = 1;
            this.selectedYear = this.selectedYear + 1;
          }else{
            this.selectMonth = this.selectMonth + 1
          }

          // this.selectMonth = this.selectMonth + 1 > 12 ? 1 : this.selectMonth + 1;
          let now = new Date();
          this.getVaribleDate(this.selectedYear,this.selectMonth );
          // this.renderTrueDay(2017,this.selectMonth - 1 < 1 ? 12 : this.selectMonth - 1,this.valuableDays);
        },
        renderDays: function(year,month){
          let firstDayOfMonth = new Date(year,month,1).getDay();

        },
        getTicket: function(price){
          var maxTicket = 0;
          if(this.coupon.length > 0){
            for(var item in this.coupon){  
              if(parseFloat(this.coupon[item].quota) <= price && parseFloat(this.coupon[item].quota) >= maxTicket){
                maxTicket = parseFloat(this.coupon[item].quota);
                this.orderTicket = parseFloat(this.coupon[item].price);
                this.couponId = this.coupon[item].id;
              }
            }
          }
          this.orderReal = this.orderTotal - this.orderTicket;
        },
        getVaribleDate: function(year,month){
          var _vue = this;
          // var teacherId = this.$route.query.tid
          _vue.$ajax.post(ApiControl.getApi(env, "free_date"), {
              type: _vue.type,
              room_id: _vue.roomId,
              id: _vue.tid,
              time: _vue.selectedTime,
              month: year + '-' + month          
          }).
          then(res => {
              if(res.data.code == 0){
                  console.log(res.data.data);
                  if(res.data.data.length > 0){
                    for(var x in res.data.data){
                      var day = res.data.data[x].split('-')[2];
                      this.valuableDays = [];
                      this.valuableDays.push(x);
                    }
                    var now = new Date();
                     // 没有默认值
                    this.renderTrueDay(year,month,this.valuableDays);
                  }                 
              }else{
                  _vue.setErrorMessage(res.data.message);
              }
              
          })
        },
        selectDay:function(k1,k2){
          if(!this.days[k1][k2].disabled){
            if(this.days[k1][k2].selected){
              this.days[k1][k2].selected = false;
              this.selectedDays = this.selectedDays - 1;
              this.targetDays.splice(this.getIndexInTargetDays(this.days[k1][k2].day),1);
            }else{
              this.days[k1][k2].selected = true;
              this.selectedDays = this.selectedDays + 1;
              if(this.getIndexInTargetDays(this.days[k1][k2].day) == -1){
                this.targetDays.push(this.selectedYear + '-' + this.selectMonth + '-' + this.days[k1][k2].day);
              }
            }
            console.log(this.targetDays);
            this.orderTotal = this.price * this.selectedDays;
            this.getTicket(this.orderTotal);
          }
          
        },
        containsDay: function(item){
          for(let i in this.valuableDays){
            if(item == this.valuableDays[i]){
              return true;
            }
          }

            return false;
        },
        renderTrueDay(y,m,v){
          // var y = 2017;
          // var m = 8;//实际计算的是9月份
          var firstDayOfMonth = new Date(y, m, 1).getDay()
          var lastDateOfMonth = new Date(y, m + 1, 0).getDate()
          var lastDateOfLastMonth = new Date(y, m, 0).getDate()

          var i,line = 0,temp = [],dow;
          for(i = 1; i <= lastDateOfMonth;i++){
            dow = new Date(y,m,i).getDay();//计算当前i日期是星期几
            var k;
            if(dow == 0){//星期天，第一行第一列开始
              temp[line] = [];
            }else if(i == 1){
              temp[line] = [];
              k = lastDateOfLastMonth - firstDayOfMonth + 1
              for (let j = 0; j < firstDayOfMonth; j++) {
                  // console.log("第一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
                  temp[line].push(Object.assign(
                      {day: k,disabled: true,selected:false},
                  ))
                  k++;
              } 
            }

            if(this.containsDay(i)){
              var options = Object.assign(
                          {day: i,disabled:true,selected:false},
              );
              temp[line].push(options);
            }else{
              var options = Object.assign(
                          {day: i,selected:false},
              );
              temp[line].push(options);
            }

            if(dow == 6){
              line ++;
            }else if (i == lastDateOfMonth) {
                    let k = 1
                    for (dow; dow < 6; dow++) {
                        // console.log("最后一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: k,disabled: true,selected:false},
                        ))
                        k++
                    }
            }
          }
          this.days = temp
        },
        confirmClassSelect: function(){
          this.classVisible = false;
          // this.searching('',this.selectType,'');
          for(var item in this.allInfo){
            if(this.selectedRoom == this.allInfo[item].name){
              this.classId = this.allInfo[item].cat_id;
            }
          }
        },
        confirmRoomSelect: function(){
          this.roomVisible = false;
          // this.searching('',this.selectType,'');
          for(var item in this.allInfo){
            for(var index in this.allInfo[item].all_room){
              if(this.allInfo[item].all_room[index].name == this.selectedClass){
                this.price = this.allInfo[item].all_room[index].price;
                this.roomId = this.allInfo[item].all_room[index].id;
              }
            }
          }
        },
        confirmTimeSelect: function(){
          this.timeVisible = false;
          // this.searching('','',this.selectDistinct);
          var now = new Date();
           // 没有默认值
          // this.renderTrueDay(now.getFullYear(),now.getMonth(),this.valuableDays);
          this.getVaribleDate(this.selectedYear,now.getMonth() + 1);
        },
        confirmMonthSelect: function(){
          this.monthVisible = false;
          // this.searching('','',this.selectMonth);
        },
        getIndexInTargetDays: function(item){
          for(var x in this.targetDays){
            if(this.targetDays[x].split('-')[2] == item){
              return x;
            }
          }
          return -1;
        },
        submitOrder: function(){
          var _vue = this;
          // var teacherId = this.$route.query.tid
          _vue.$ajax.post(ApiControl.getApi(env, "order_submit"), {
              type: _vue.type,
              room_id: _vue.roomId,
              id: _vue.tid,
              time: _vue.selectedTime,
              class_id: _vue.classId,
              date: _vue.targetDays         
          }).
          then(res => {
              if(res.data.code == 0){
                  console.log(res.data.data);
                  if(res.data.data.length > 0){
                    for(var x in res.data.data){
                      var day = res.data.data[x].split('-')[2];
                      this.valuableDays = [];
                      this.valuableDays.push(x);
                    }
                    var now = new Date();
                     // 没有默认值
                    this.renderTrueDay(year,month,this.valuableDays);
                  }                 
              }else{
                  _vue.setErrorMessage(res.data.message);
              }
              
          })
        },
      },
      computed:{
      },
      mounted(){
        this.init();
      }
}
</script>
<style lang="less" scoped>
body{
  height: 100%;
  font-family:'PingFangSC-Regular';
  .popup-control{
    width: 100%;
  }
  .order-title{
    margin: 0px 48px 45px 42px;
    padding-top: 38px;
    border-bottom: 2px solid orange;
    text-align: center;
    .store-name{
      font-size: 15px;
      font-weight: bolder;
      color: #303134;
      line-height: 20px;
      margin-bottom: 9px;
    }
    .store-address{
      font-size: 10px;
      color: #7D7A78;
      line-height: 14px;
      margin-bottom: 14px;
    }
  }
  .order-container{
    margin: 0 30px 0 20px;
    .order-room{
      padding-bottom: 30px;
      border-bottom: 1px solid #ddd;
      position: relative;
      .room-address{
        position: absolute;
        top: 30px;
        left: 40px;
        font-size: 12px;
        line-height: 15px
      }
      .order-desp{
        display: inline-block;
        img{
          width: 22px;
          height: 20px;
          margin-right: 19px;
          vertical-align: middle;
        }
        .normal-text{
          font-size: 15px;
          line-height: 20px;
          color: #303030;
          font-weight: bolder;
          display: inline-block;
        }
      }
      .room-select{
        display: inline-block;
        float: right;
        font-size: 15px;
        color: #f6ab2c;
        font-weight: bolder;
      }
    }
    .order-class{
      padding-bottom: 30px;
      border-bottom: 1px solid #ddd;
      .order-desp{
        display: inline-block;
        img{
          width: 22px;
          height: 20px;
          margin-right: 19px;
          vertical-align: middle;
        }
        .normal-text{
          font-size: 15px;
          line-height: 20px;
          color: #303030;
          font-weight: bolder;
          display: inline-block;
        }
      }
      .class-select{
        display: inline-block;
        float: right;
        font-size: 15px;
        color: #f6ab2c;
        font-weight: bolder;
      }
    }
    .order-time{
      padding-top: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #ddd;
      .order-desp{
        display: inline-block;
        img{
          width: 22px;
          height: 20px;
          margin-right: 19px;
          vertical-align: middle;
        }
        .normal-text{
          font-size: 15px;
          line-height: 20px;
          color: #303030;
          font-weight: bolder;
          display: inline-block;
        }
      }
      .time-select{
        display: inline-block;
        float: right;
        font-size: 15px;
        color: #f6ab2c;
        font-weight: bolder;
      }
    }
    .order-date{
      padding-top: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #ddd;
      .order-desp{
        display: inline-block;
        height: 50px;
        img{
          width: 22px;
          height: 20px;
          margin-right: 19px;
          vertical-align: middle;
        }
        .normal-text{
          font-size: 15px;
          line-height: 20px;
          color: #303030;
          font-weight: bolder;
          display: inline-block;
        }
        .selected-date{
          text-align: left;
          font-size: 10px;
          margin-left: 40px;
          margin-top: 10px;
        }
      }
      .month-select{
        display: inline-block;
        float: right;
        font-size: 15px;
        color: #f6ab2c;
        font-weight: bolder;
        .date-left{
          margin-right:5px;
        }
        .date-right{
          margin-left: 5px;
        }
      }
      table{
        margin-top: 20px;
      }
      td{
        text-align: center;
      }
      td.disabled{
        color: #ccc;
        pointer-events: none !important;
        cursor: default !important;
        background: #BEBEBE;
        border-radius: 8px;
      }
      td.selected{
        background: #f6ab2c;
        border-radius: 8px;
      }
      td span{
        display: block;
        max-width: 40px;
        height: 26px;
        font-size: 16px;
        line-height: 26px;
        margin: 0px auto;
        border-radius: 2px;
      }
      td.disabled span{
        
      }
    }
    .order-money{
      padding-top: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #ddd;
      .order-desp-first{
        .order-image-container{
          display: inline-block;
          vertical-align: top;
          img{
            width: 22px;
            height: 20px;
            margin-right: 19px;
            vertical-align: middle;
          }
        }
        .order-info{
          display: inline-block;
          .order-intro{
            font-size: 15px;
            line-height: 20px;
            color: #303030;
            font-weight: bolder;
            display: inline-block;
            margin-bottom: 11px;
          }
          .order-content{
            font-size: 10px;
            color: #7D7A78;
            line-height: 14px;
            margin-bottom: 5px;
          }

        }
        .order-total{
          display: inline-block;
          float: right;
          font-size: 15px;
          color: #f6ab2c;
          font-weight: bolder;
          margin-top: 20px;
        }
      }
      .order-desp-second{
        margin-top: 25px;
        .order-act{
          display: inline-block;
          margin-left: 41px;
          font-size: 15px;
          line-height: 20px;
          color: #303030;
          font-weight: bolder;
        }
        .order-ticket{
          display: inline-block;
          float: right;
          font-size: 15px;
          color: #f6ab2c;
          font-weight: bolder;
        }
      }
    }
    .order-recommend{
      padding-top: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      .recommend-icon{
        display: inline-block;
        vertical-align: top;
        img{
          width: 22px;
          height: 20px;
          margin-right: 19px;
          vertical-align: middle;
        }
      }
      .recommend-container{
        display:inline-block;
        width: calc(~"(100% - 45px)");
        float: right;
        .recommend-title{
          font-size: 15px;
          line-height: 20px;
          color: #303030;
          font-weight: bolder;
          margin-bottom: 11px;
        }
        .recommend-detail{
          font-size: 13px;
          line-height: 20px;
          color: #7d7a78;
          font-weight: bolder;
        }
      }
    }
    .order-submit{
      height: 50px;
      // background: #c9c9c9;
      background: #f6ab2c;
      line-height: 50px;
      font-size: 15px;
      color: #ffffff;
      text-align: center;
      margin-top: 56px;
    }
  }
  .room-pick-toolbar{
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
  .class-pick-toolbar{
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
  .time-pick-toolbar{
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
  .month-pick-toolbar{
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