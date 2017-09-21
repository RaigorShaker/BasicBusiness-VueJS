<!-- 合伙人规则页面 -->
<template>
	<div class="teacher">
    <!-- 课程介绍 -->
    <div class="info">

    </div>
    <!-- 课程详情 -->
    <div class="detail">

    </div>
    <div class="show">
      <div class="lesson">

      </div>
      <div class="awards">

      </div>
    </div>
    <div class="picture">
      <div class="title">老师照片<span>/{{ pic_num }}</span></div>
      <div class="images">

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

      },
      created:function(){
       	document.title = ""

      },
      methods:{

      },
      computed:{
      },
      mounted(){
      }
    }
  }
</script>
<style lang="less" scoped>
  .teacher{

    .info{

    }
    .detail{

    }
    .show{
      .lesson{

      }
      .awards{

      }
    }
    .picture{
      .title{

      }
      .images{
        
      }
    }
  }
</style>