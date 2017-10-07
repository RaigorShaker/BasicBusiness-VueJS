<template>
    <div class="activity-detail">
        <div class="topBar">
            <!-- <router-link :to="'/order'">
                <div class="message">
                    <img src="../../static/images/mainIndex/message-icon.png"/><span>消息</span>
                </div>
            </router-link> -->
            <img :src="baseUrl + detailObj.acti_pic"/>
        </div>
        <div class="detail-info">
			<div class="detail-main">
				<div class="detail-title">
					{{ detailObj.acti}}
				</div>
				<div class="detail-date">
					{{ detailObj.date }}
				</div>
			</div>
			<div class="detail-address">
				<div class="address-container">
					<div class="detail-chn">{{ detailObj.acti_add }}</div>
					<div class="detail-en">{{ detailObj.acti_en }}</div>
				</div>
				<div class="img-container">
					<img src="../../static/images/mainIndex/detail-position.png"/>
				</div>		
			</div>
			<div class="detail-desc">
				<div class="detail-line"></div>
				<div class="desc-container">活动内容:{{ detailObj.acti_comment }}</div>
			</div>
			<div class="detail-rules">
				<div class="detail-line"></div>
				<div class="rules-container">活动规则:<span v-html="detailObj.acti_rule"></span></div>
			</div>
        </div>
    </div>                         
</template>

<script>
    // import dialogList from '../../components/dialogContainer'
    var env = 'product'; // set env type for debug or product
    import ajax from '../../config/ajax'
    import utils from '../../config/utils'
    import ApiControl from '../../config/envConfig.home'
    import getLoginUri from '../../config/loginConfig'
    // import searchModule from '../../components/search'
    // import goodList from '../../components/goodlist/goodlist'
    export default {
        name: 'home',
        data() {
            return {
                baseUrl: 'http://www.studyyx.com/',
                detailObj: {},
                pastle: false,
                message: '',
                title:''
            }
        },
        components: {

        },
        methods: {
            setErrorMessage: function(message){
                var _vue = this;
                this.pastle = true;
                this.message = message;
                setTimeout(function(){
                        _vue.pastle = false;
                        _vue.message = '';
                },2000)
            }
        },
        created() {
            document.title = "活动详情"
            var detailId = this.$route.query.detailId
            this.title = this.$route.query.title == undefined ? '活动详情' : this.$route.query.title

            var _vue = this;
            _vue.$ajax.get(ApiControl.getApi(env, "activityDetail"), {
                params:{
                    act: 'actDetail',
                    aid: detailId
                }
            }).
            then(res => {
                if(res.data.code == 0){
                    _vue.detailObj = res.data.data;
                }else{
                    _vue.setErrorMessage(res.data.mes);
                }
                
            })
        },
        mounted() {}
    }
</script>

<style lang="less" scoped>
    .activity-detail{
        width: 100%;
        background: #fff;
        .topBar{
			img{
				width: 100%;
				height: 120px;
			}
        }
        .detail-info{
        	margin: 20px 16px;
        	.detail-main{
        		margin-bottom: 20px;
        		border-bottom: 1px solid #ddd;
        		height: 70px;
        		.detail-title{
        			font-size: 18px;
        			line-height: 25px;
        			font-weight: bolder;
        			color: #000;
        			margin-bottom:10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
        		}
        		.detail-date{
        			font-size: 14px;
        			line-height: 15px;
        			color: #ddd;
        			margin-bottom:5px;
        		}
        	}
        }
        .detail-address{
        	overflow: hidden;
        	height: 50px;
        	.address-container{
        		width: calc(~"(100% - 30px)");
        		float: left;
        		display: inline-block;
        		.detail-chn{
        			font-size: 16px;
        			font-weight: bolder;
        			color: #000;
        		}
        		.detail-en{
        			font-size: 12px;
        			color: #eee;
        		}
        	}
        	.img-container{
        		display: inline-block;
        		width: 22px;
        		height: 25px;
        		float: right;
        		vertical-align: middle;
        		img{
        			width: 100%;
        			height: 100%;
        		}
        	}
        }
        .detail-desc{
        	margin-bottom: 50px;
        	.detail-line{
        		height: 0px;
        		width: 55px;
        		margin-bottom: 10px;
        		border-bottom: 2px solid orange;
        	}
        	.desc-container{
        		max-height: 100px;
        		overflow: hidden;
    		    text-overflow: ellipsis;
    		    line-height: 25px;
        	}
        }
        .detail-rules{
            padding-bottom: 30px;
        	.detail-line{
        		height: 0px;
        		width: 55px;
        		margin-bottom: 10px;
        		border-bottom: 2px solid orange;
        	}
        	.rules-container{
	    		max-height: 100px;
	    		overflow: hidden;
			    text-overflow: ellipsis;
			    line-height: 25px;
        	}
        }
    }
</style>