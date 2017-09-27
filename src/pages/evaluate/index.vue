<!-- 合伙人规则页面 -->
<template>
  <div class="evaluate">
    <div class="star">
      <img @click="selectEvent(index)" class="star-icon" v-bind:src="item.selected | getImgIcon" v-for="(item,index) in starList"/>
    </div>
    <div class="tips">
      {{ tip }}
    </div>
    <div class="box">
      <div class="box-container" v-for="(item,k1) in boxItem">
        <div class="box-item" v-for="(cont,k2) in item.boxShow" :class="{'box-item-1': k2 == 0,'box-item-2': k2 == 1}">
          <div class="box-content" :class="{'box-item-choose': cont.show}" @click="checkBox(k1,k2)">{{ cont.content }}</div>
        </div>
      </div>
    </div>
    <div class="word">
      <textarea class="input-area">
        
      </textarea>
      <div class="word-recommend">100字</div>
    </div>
    <div class="submit-evaluate">
      <div class="submit-text" @click="submitEvaluate">
        提交评价
      </div>
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
              selected: 0,
            },
            {
              selected: 0,
            },
            {
              selected: 0,
            }
          ],
          tip: "",
          boxItem: [
            {
              boxShow: [
                {
                  content: '认真负责',
                  show:false
                },
                {
                  content: '热心亲切',
                  show:false
                },
                {
                  content: '博学多识',
                  show:false
                }
              ]
            },
            {
              boxShow: [
                {
                  content: '内容丰富',
                  show:false
                },
                {
                  content: '受益匪浅',
                  show:false
                },
                {
                  content: '真诚教导',
                  show:false
                }
              ]
            }
          ],
          result: [

          ]
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
      },
      checkBox: function(k1,k2){
        this.boxItem[k1].boxShow[k2].show = !this.boxItem[k1].boxShow[k2].show;
        // if(this.boxItem[k1].boxShow[k2].show){
        //   this.result.push(this.boxItem[k1].boxShow[k2].content);
        // }
        // console.log(this.result)
      },
      submitEvaluate: function(){

      }
    },  
    filters: {
      // filter for get image url from key
      getImgIcon: function(value){
        return iconList[value];
      }
    },
    created(){
      var _vue = this;
      var oid = this.$route.query.oid
      _vue.$ajax.get(ApiControl.getApi(env, "evaluate"), {
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
      padding-bottom: 20px;
      border-bottom: 1px dashed #eee;
      line-height: 20px;
      height: 20px;
    }
    .box{
      background: #fff;
      .box-container{
        margin: 20px;
        .box-item{
          display: inline-block;
          width: calc(~"(100% - 10px)/3");
          text-align: right;
          .box-content{
            display: inline-block;
            width: 70px;
            height: 30px;
            font-size: 13px;
            line-height: 30px;
            border-radius: 20px;
            text-align: center;
            background: #eee;
            color: #ddd;
          }
          .box-content.box-item-choose{
            background: rgb(245,149,49);
            color: #fff;
          }
        }
        .box-item.box-item-1{
          text-align: left;
        }
        .box-item.box-item-2{
          text-align: center;
        }
      }
    }
    .word{
      background: #fff;
      .input-area{
        margin: 20px 20px 0 20px;
        height: 120px;
        width: calc(~"(100% - 40px)");
        border-bottom: 1px solid #ddd;
        font-size: 15px;
      }
      .word-recommend{
        font-size: 12px;
        color: #ddd;
        text-align: right;
        margin-right: 20px;
      }
    }
    .submit-evaluate{
      height: 50px;
      position: fixed;
      z-index: 100;
      left: 0;
      right: 0;
      bottom: 20px;
      width: 100%;
      .submit-text{
        margin: 0 20px;
        background: rgb(245,149,49);
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        color: #fff;
      }
    }
  }
</style>