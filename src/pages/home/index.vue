<template>
    <div class="main-index">
        <div class="topBar">
            <router-link :to="'/order'">
                <div class="message">
                    <img src="../../static/images/mainIndex/message-icon.png"/><span>消息</span>
                </div>
            </router-link>
        </div>
        
        <div class="banner">
                <mt-swipe :show-indicators="false" class="banner" :auto="0">
                    <mt-swipe-item v-for="item in mainIndexData.banner_list"><img :src="item.url + item.pic"/></mt-swipe-item>
                </mt-swipe>
        </div>
        <div class="product">
            <div class="product-first">
                <div class="product-classroom">
                    <div class="classroom-container">
                        <img src="../../static/images/mainIndex/classes.png"/>
                    </div>
                    <div class="product-name">教室</div>
                    <div class="classroom-number">{{ mainIndexData.all_class }}间教室</div>
                </div>
                <div class="product-teacher">
                    <div class="teacher-container">
                        <img src="../../static/images/mainIndex/teachers.png"/>
                    </div>
                    <div class="product-name">教师</div>
                    <div class="classroom-number">{{ mainIndexData.all_teacher }}位老师</div>
                </div>
            </div>
            <div class="product-second">
                <div class="product-lesson">
                    <div class="lesson-container">
                        <img src="../../static/images/mainIndex/lessons.png"/>
                    </div>
                    <div class="product-name">课程</div>
                    <div class="classroom-number">{{ mainIndexData.all_class }}个课程</div>
                </div>
                <div class="product-joinus">
                    <div class="joinus-container">
                        <img src="../../static/images/mainIndex/joinUs.png"/>
                    </div>
                    <div class="product-name">加入我们</div>
                    <div class="classroom-number">{{ mainIndexData.all_member }}位家长选择我们</div>
                </div>
            </div>
        </div>
        <div class="activity">
            <div class="activity-item" v-for="item in mainIndexData.acti_list">
                <img :src="item.acti_pic"/>
                <div class="item-title">{{ item.acti }}</div>
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
    import { mapState,mapMutations } from 'vuex';
    export default {
        name: 'home',
        data() {
            return {
                mainIndexData: {},
                pastle: false,
                message: ''
            }
        },
        components: {

        },
        methods: {
            ...mapMutations([
                'buryPoint','resetGoodsList'
            ]),
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
            // console.log('test')
            console.log(this.$route)

            document.title = "我有好物"
            var pageId = this.$route.query.pageId
            this.title = this.$route.query.title == undefined ? '我有好物' : this.$route.query.title

            var _vue = this;
            _vue.$ajax.get(ApiControl.getApi(env, "mainIndex"), {
                params:{
                    act: '01'
                }
            }).
            then(res => {
                if(res.data.code == 0){
                    console.log(res.data.data)
                    _vue.mainIndexData = res.data.data;
                }else{
                    _vue.setErrorMessage(res.data.message);
                }
                
            })
        },
        mounted() {}
    }
</script>

<style lang="less">
    .main-index{
        width: 100%;
        // height: 100%;
        background: #f6ab2c;   
        background:#f6ab2c;  
        background:-moz-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));  
        background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f6ab2c), to(rgba(173, 90, 34, 0.9)));  
        background:-o-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));
        filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22);
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22)";
        color: #fff;
        .topBar{
            .message{
                margin-left: 11px;
                margin-top: 20px;
                margin-bottom: 22px;
                display: inline-block;
                img{
                    width: 20px;
                    height: 14px;
                    vertical-align: middle;
                    padding-right: 5px;
                }
                span{
                    line-height: 14px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #fff;
                }
            }
        }
        
        .banner{
            height: 186px;
            margin: 0 8px 17px 8px;
            .banner-container{
                display: block;
            }
        }
        .product{
            .product-first{
                width: 100%;
                margin-bottom: 9px;
                .product-classroom{
                    display: inline-block;
                    width: calc(~"(100% - 25px)/2");
                    height: 160.5px;
                    background: #fff;
                    margin-left: 8px;
                    margin-right: 5px;
                    text-align: center;
                    .classroom-container{
                        text-align: center;
                        margin-top: 30px;
                        margin-bottom: 22px;
                        img{
                            width: 71px;
                            height: 55px;
                        }
                    }
                }
                .product-teacher{
                    display: inline-block;
                    width: calc(~"(100% - 25px)/2");
                    height: 160.5px;
                    background: #fff;
                    text-align: center;
                    vertical-align: bottom;
                    .teacher-container{
                        text-align: center;
                        margin-top: 34px;
                        margin-bottom: 24px;
                        img{
                            width: 70px;
                            height: 51px;
                        }
                    }
                }
            }
            .product-second{
                width: 100%;
                .product-lesson{
                    display: inline-block;
                    width: calc(~"(100% - 25px)/2");
                    height: 160.5px;
                    background: #fff;
                    margin-left: 8px;
                    margin-right: 5px;
                    .lesson-container{
                        margin-top: 30px;
                        text-align: center;
                        margin-bottom: 18px;
                        img{
                            width: 72px;
                            height: 55px;
                        }
                    }
                }
                .product-joinus{
                    display: inline-block;
                    width: calc(~"(100% - 25px)/2");
                    height: 160.5px;
                    background: #fff;
                    vertical-align: bottom;
                    .joinus-container{
                        text-align: center;
                        margin-top: 34px;
                        margin-bottom: 25px;
                        img{
                            width: 88px;
                            height: 48px;
                        }
                    }
                }
            }
            .product-name{
                fong-size: 15px;
                color: #303134;
                text-align: center;
                font-weight: bold;
                margin-bottom: 7px;
            }
            .classroom-number{
                font-size: 11px;
                color: #cbcbcb;
                text-align: center;
            }
        }
        .activity{
            margin: 17px 10px 50px 10px;
            overflow: hidden;
            .activity-item{
                width: 100%;
                background: #fff;
                margin-bottom: 20px;
                img{
                    width: 100%;
                    height: 165px;
                }
                .item-title{
                    margin-left: 20px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 20px;
                    color: #000;
                    font-weight: bold;
                    background: url('../../static/images/mainIndex/arrow.png') center right no-repeat;
                    background-size: 10px;
                    margin-right: 20px;
                }
            }
        }
    }
</style>