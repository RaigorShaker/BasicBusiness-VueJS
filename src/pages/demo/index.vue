<!-- 合伙人规则页面 -->
<template>
	<div>
    <mt-swipe :show-indicators="false" class="banner" :auto="0">
        <mt-swipe-item v-for="item in swipItems"><img :src="item.img"/></mt-swipe-item>
    </mt-swipe>
    <mt-button @click.native="handleClick">按钮</mt-button>
    <mt-popup v-model="popupVisible" class="popup-control" position="bottom" pop-transition="popup-fade">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>

    <mt-cell-swipe
        title="标题文字"
        :right="rightContents"></mt-cell-swipe>
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
        popupVisible: false,
        slots: [
                {
                  flex: 1,
                  values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                  className: 'slot1',
                  textAlign: 'right'
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
        swipItems: [
          {
            img: 'https://qn-act.qbcdn.com/assistant/t-shirt.jpg',
          },
          {
            img: 'https://qn-act.qbcdn.com/assistant/t-shirt.jpg',
          },
          {
            img: 'https://qn-act.qbcdn.com/assistant/t-shirt.jpg',
          },
          {
            img: 'https://qn-act.qbcdn.com/assistant/t-shirt.jpg',
          }

        ],
        rightContents:[
          {
            content: '<img src="../../static/images/mainIndex/message-icon.png"',
              style: { background: '#eee', color: '#fff' },
              handler: () => this.$messagebox('delete')
          }
        ]
      }
    },
    created:function(){
     	document.title = "用户中心"

    },
    methods:{
      onValuesChange(picker, values) {
            if (values[0] > values[1]) {
              picker.setSlotValue(1, values[0]);
            }
      },
      handleClick: function() {
        this.popupVisible = true
      }
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
	
}
</style>