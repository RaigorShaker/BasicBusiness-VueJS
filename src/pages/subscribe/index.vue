<template>
	<div class="subscribe">
		
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
	      	subList: []
	     }
	   },
	  methods:{
	       
	  },  
	  created(){
	    // var _vue = this;
	    // _vue.$ajax.get(ApiControl.getApi(env, "actList"), {
	    //     params:{
	    //         act: '03'
	    //     }
	    // }).
	    // then(res => {
	    //     if(res.data.code == 0){
	    //         console.log(res.data.data)
	    //         _vue.activityList = this.wrapperList(res.data.data);

	    //     }else{
	    //         _vue.setErrorMessage(res.data.message);
	    //     }
	        
	    // })
	  }
	}
</script>
<style lang="less" scoped>
 	
</style>