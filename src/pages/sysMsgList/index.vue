<!-- 合伙人规则页面 -->
<template>
    <div class="activity-container">
      <div class="activity-content" v-for="(item,index) in activityList">
        <div class="activity-time">{{ item.create_at }}</div>
        <div class="activity-swiper-item">
          <div class="slider">
            <div class="content" 
                @touchstart='touchStart(index)'
                @touchmove='touchMove(index)'
                @touchend='touchEnd(index)'
                :style="item.slider"
            >
              <div class="activity-item">
                  <div class="item-title">{{ item.title }}</div>
                  <div class="item-amount">{{ item.msg }}</div>
              </div>
            </div>
            <div class="remove" ref='remove' @click="removeItem(item.act_id,index)">
              <img class="garbage" src="../../static/images/mainIndex/garbage.png"/>
            </div>
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
   data() {
      return {
        startX:0,   //触摸位置
        endX:0,     //结束位置
        moveX: 0,   //滑动时的位置
        disX: 0,    //移动距离
        deleteSlider1: '',//滑动时的效果,使用v-bind:style="deleteSlider"
        // styleList: [
        //   0: "deleteSlider1",
        //   1: "deleteSlider2",
        //   2: "deleteSlider3"
        // ],
        // deleteSlider2: '',
        // deleteSlider3: '',
        // activityList: [
        //   {
        //     id: 1,
        //     slider: "",
        //     create_at: '2017-09-20',
        //     title:"中山北路那啥啥啥啥是阿莎",
        //     msg: "中山北路那啥啥啥啥是阿莎"
        //   },
        //   {
        //     id: 2,
        //     slider: "",
        //     create_at: '2017-09-20',
        //     title:"中山北路那啥啥啥啥是阿莎",
        //     msg: "中山北路那啥啥啥啥是阿莎"
        //   },
        //   {
        //     id: 3,
        //     slider: "",
        //     create_at: '2017-09-20',
        //     title:"中山北路那啥啥啥啥是阿莎",
        //     msg: "中山北路那啥啥啥啥是阿莎"
        //   }
        // ]
          activityList: []
     }
   },
  methods:{
      touchStart(id,ev){
        ev= ev || event
          //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
  
        if(ev.touches.length == 1){
          // 记录开始位置
          this.startX = ev.touches[0].clientX;
        }
      },
      touchMove(id,ev){
        ev = ev || event;
           //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
        let wd=this.$refs.remove.offsetWidth;
            if(ev.touches.length == 1) {
                // 滑动时距离浏览器左侧实时距离
                this.moveX = ev.touches[0].clientX
        
                //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                this.disX = this.startX - this.moveX;
                // 如果是向右滑动或者不滑动，不改变滑块的位置
                if(this.disX < 0 || this.disX == 0) {
                    this.activityList[id].slider = "transform:translateX(0px)";
                // 大于0，表示左滑了，此时滑块开始滑动 
                }else if (this.disX > 0) {
                     //具体滑动距离我取的是 手指偏移距离*5。
                    // this.activityList[id-1].slider = "transform:translateX(-" + this.disX*3 + "px)";
                    
                    // 最大也只能等于删除按钮宽度 
                    if (this.disX*3 >=90) {
                        this.activityList[id].slider = "transform:translateX(-" +90+ "px)";
                     
                    }else{
                      this.activityList[id].slider = "transform:translateX(-" + this.disX + "px)";
                    }
                }
            }
      },
      touchEnd(id,ev){
            ev = ev || event;
            let wd=this.$refs.remove.offsetWidth;
            if (ev.changedTouches.length == 1) {
                  let endX = ev.changedTouches[0].clientX;
                    
                      this.disX = this.startX - endX;
                      //如果距离小于删除按钮一半,强行回到起点
                      
                      if ((this.disX) < 45) {
                        
                          this.activityList[id].slider = "transform:translateX(0px)";
                      }else{
                          //大于一半 滑动到最大值
                           this.activityList[id].slider = "transform:translateX(-"+90+ "px)";
                      }
                  }
      },
      removeItem: function(id,index){
          this.activityList.splice(index,1);
          // send delete request to server
      },
      wrapperList: function(data){
        for(var item in data){
          data[item]["slider"] = '';
        }
        return data;
      }  
  },  
  created(){
    document.title = '系统消息';
    var _vue = this;
    _vue.$ajax.get(ApiControl.getApi(env, "sysMsgList"), {
        params:{
            act: 'sysMes'
        }
    }).
    then(res => {
        if(res.data.code == 0){
            console.log(res.data.data)
            _vue.activityList = this.wrapperList(res.data.data.data_list);
            console.log(_vue.activityList)

        }else{
            _vue.setErrorMessage(res.data.message);
        }
        
    })
  }
}
</script>
<style scoped lang="less" scoped>
    body{
      background: #eee;
    }
    .activity-container{
      padding-top: 30px;
      background: #eee;
      overflow: hidden;
      .activity-time{
        text-align: center;
        margin-bottom: 5px;
        color: #ddd;
      }
      .activity-swiper-item{
        // margin-top: 30px;
        margin: 0px 0px 30px 0px;
      }
    }
    .slider{
        width: 100%;
        height:100px;
        position: relative;
        user-select: none;
        .content{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            // background:green;
            z-index: 100;
            //    设置过渡动画
            transition: 0.3s;
            .activity-item{
                width: 100%;
                background: #fff;
                border-radius: 8px;
                height: 100px;
                padding-left: 30px;
                .item-title{
                    height: 30px;
                    line-height: 30px;
                    font-size: 18px;
                    color: #000;
                    /* margin-top: 30px; */
                    font-weight: bold;
                    background-size: 10px;
                    margin-right: 20px;
                    padding-top: 20px;
                }
                .item-amount{
                  font-size: 14px;
                  color: #ddd;
                  height: 40px;
                  line-height: 40px;
                  padding-top: 20px;
                }
            }
        }
        .remove{
            position: absolute;
            width:90px;
            height:100px;
            background:rgb(247,247,249);
            right: 0;
            top: 0;
            color:#fff;
            text-align: center;
            font-size: 40px;
            line-height: 100px;
            text-align:center;
            .garbage{
              width: 58px;
              vertical-align: middle
            }
        }
    }
 
</style>