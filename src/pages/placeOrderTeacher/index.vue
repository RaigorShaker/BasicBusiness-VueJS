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
          <div class="order-total">{{ orderTotal }}元</div>
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
      <div class="order-submit">
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
          storeName: '徐汇区天钥桥路店',
          storeAddress: '上海市徐汇区天钥桥路100号',
          selectedClass: '贝多芬房间',
          selectedTime: '09:00-14:00',
          selectedDays: 0,
          selectMonth: 9,
          orderContent:"XX费：XX元，XX费：200元",
          orderTotal:"3000",
          orderTicket:"150",
          classVisible: false,
          timeVisible: false,
          monthVisible: false,
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
          classSlots:[
            {
              flex: 1,
              values: ['架子鼓', '钢琴', '小提琴', '三角铁'],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
          timeSlots:[
            {
              flex: 1,
              values: ['09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00'],
              className: 'slot1',
              textAlign: 'center'
            }
          ],
          searchResult:[

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
        }
      },
      created:function(){
        document.title = "下单"
        var _vue = this;
        var teacherId = this.$route.query.tid
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
        // 初始化一些东西
        init(){
            let now = new Date();
             // 没有默认值
            this.renderTrueDay(now.getFullYear(),now.getMonth());

        },
        onValuesChange(picker, values) {

              if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
              }
        },
        onClassChange(picker,values){
          if(values[0] == undefined){
            this.selectedClass = '架子鼓'
          }else{
            this.selectedClass = values[0];
            
          }
        },
        onTimeChange(picker,values){
          if(values[0] == undefined){
            this.selectedTime = '09:00-09:30'
          }else{
            this.selectedTime = values[0];
            
          }
        },
        handleClick: function() {
          this.popupVisible = true
        },
        handlerClassClick: function(){
          this.classVisible = true;
        },
        handlerTimeClick: function(){
          this.timeVisible = true;
        },
        clickDateLeft:function(){
          this.selectMonth = this.selectMonth - 1 < 1 ? 12 : this.selectMonth - 1;
          this.renderTrueDay(2017,this.selectMonth - 1 < 1 ? 12 : this.selectMonth - 1);
        },
        clickDateRight:function(){
          this.selectMonth = this.selectMonth + 1 > 12 ? 1 : this.selectMonth + 1;
          this.renderTrueDay(2017,this.selectMonth - 1 < 1 ? 12 : this.selectMonth - 1);
        },
        renderDays: function(year,month){
          let firstDayOfMonth = new Date(year,month,1).getDay();

        },
        selectDay:function(k1,k2){
          if(!this.days[k1][k2].disabled){
            if(this.days[k1][k2].selected){
              this.days[k1][k2].selected = false;
              this.selectedDays = this.selectedDays - 1;
            }else{
              this.days[k1][k2].selected = true;
              this.selectedDays = this.selectedDays + 1;
            }
          }
          
        },
        renderTrueDay(y,m){
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

            var options = Object.assign(
                        {day: i,selected:false},
            );
            temp[line].push(options);

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
        // 渲染日期
        render(y, m) {
            console.log('year is:' + y);
            console.log('month is:' + m);
            let firstDayOfMonth = new Date(y, m, 1).getDay()         //当月第一天
            let lastDateOfMonth = new Date(y, m + 1, 0).getDate()    //当月最后一天
            let lastDayOfLastMonth = new Date(y, m, 0).getDate()     //最后一月的最后一天
            console.log('firstDayOfMonth is:' + firstDayOfMonth);
            console.log('lastDateOfMonth is:' + lastDateOfMonth);
            console.log('lastDayOfLastMonth is:' + lastDayOfLastMonth);
            this.year = y
            let seletSplit = this.value
            let i, line = 0,temp = []
            for (i = 1; i <= lastDateOfMonth; i++) {
                let dow = new Date(y, m, i).getDay()
                let k
                // 第一行
                if (dow == 0) {
                    temp[line] = []
                } else if (i == 1) {
                    temp[line] = []
                    k = lastDayOfLastMonth - firstDayOfMonth + 1
                    for (let j = 0; j < firstDayOfMonth; j++) {
                        // console.log("第一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: k,disabled: true},
                        ))
                        k++;
                    }
                }
        
                // 范围
                if (this.range) {
                    // console.log("日期范围",this.getLunarInfo(this.year,this.month+1,i))
                    let options = Object.assign(
                        {day: i},
                     )
                    if (this.rangeBegin.length > 0) {
                        let beginTime = Number(new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2]))
                        let endTime = Number(new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]))
                        let stepTime = Number(new Date(this.year, this.month, i))
                        if (beginTime <= stepTime && endTime >= stepTime) {
                            options.selected = true
                        }
                    }
                    if (this.begin.length>0) {
                        let beginTime = Number(new Date(parseInt(this.begin[0]),parseInt(this.begin[1]) - 1,parseInt(this.begin[2])))
                        if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                    }
                    if (this.end.length>0){
                        let endTime = Number(new Date(parseInt(this.end[0]),parseInt(this.end[1]) - 1,parseInt(this.end[2])))
                        if (endTime <  Number(new Date(this.year, this.month, i))) options.disabled = true
                    }
                    temp[line].push(options)
                } else {
                     // console.log(this.lunar(this.year,this.month,i));
                    // 单选模式
                    let chk = new Date()
                    let chkY = chk.getFullYear()
                    let chkM = chk.getMonth()
                    // 匹配上次选中的日期
                    if (parseInt(seletSplit[0]) == this.year && parseInt(seletSplit[1]) - 1 == this.month && parseInt(seletSplit[2]) == i) {
                        // console.log("匹配上次选中的日期",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: i,selected: true},
                        ))
                        this.today = [line, temp[line].length - 1]
                    }
                     // 没有默认值的时候显示选中今天日期
                    else if (chkY == this.year && chkM == this.month && i == this.day && this.value == "") {

                        // console.log("今天",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: i,selected: true},
                        ))
                        this.today = [line, temp[line].length - 1]
                    }else{
                        // 普通日期
                        // console.log("设置可选范围",i,lunarYear,lunarMonth,lunarValue,lunarInfo)
                        let options = Object.assign(
                            {day: i,selected:false},
                        )
                        if (this.begin.length>0) {
                            let beginTime = Number(new Date(parseInt(this.begin[0]),parseInt(this.begin[1]) - 1,parseInt(this.begin[2])))
                            if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.end.length>0){
                            let endTime = Number(new Date(parseInt(this.end[0]),parseInt(this.end[1]) - 1,parseInt(this.end[2])))
                            if (endTime <  Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        temp[line].push(options)
                    }
                }
                // 最后一行
                if (dow == 6) {
                    line++
                } else if (i == lastDateOfMonth) {
                    let k = 1
                    for (dow; dow < 6; dow++) {
                        // console.log("最后一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
                        temp[line].push(Object.assign(
                            {day: k,disabled: true},
                        ))
                        k++
                    }
                }
            } //end for
            console.log(temp)
            this.days = temp
        },
        confirmClassSelect: function(){
          this.classVisible = false;
          this.searching('',this.selectType,'');
        },
        confirmTimeSelect: function(){
          this.timeVisible = false;
          this.searching('','',this.selectDistinct);
        },
        confirmMonthSelect: function(){
          this.monthVisible = false;
          this.searching('','',this.selectMonth);
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