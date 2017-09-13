<template>
    <div class="main-index">
        <div class="message">
            <img src="../../static/images/mainIndex/message-icon.png"/><span>消息</span>
        </div>
        <div class="banner">
            This is Banner area
        </div>
        <div class="product">
            <div class="product-first">
                <div class="product-classroom">

                </div>
                <div class="product-teacher">

                </div>
            </div>
            <div class="product-second">
                <div class="product-lesson">

                </div>
                <div class="product-joinus">

                </div>
            </div>
        </div>
    </div>                         
</template>

<script>
    // import dialogList from '../../components/dialogContainer'
    var env = 'debug'; // set env type for debug or product
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
                itemList: {},
                keyword: '',
                page: 1,
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
            searchKey: function(keywords) {
                // console.log(TDAPP);
                // var eventId = '首页',
                //   label = '搜索';
                // TDAPP.onEvent(eventId,label);
                // this.setErrorMessage('This is only for test');
                this.page = 1;
                this.key = keywords;
                var _vue = this;
                _vue.$ajax.post(ApiControl.getApi(env, "couponList"), {
                        keyword: _vue.key,
                        page: 1,
                        size: 10
                }).
                then(res => {
                    if(res.data.code == 0){
                        _vue.$refs.goodsList.keyword = keywords;
                        _vue.$refs.goodsList.itemList = res.data;
                        _vue.$refs.goodsList.page = 1;
                        _vue.$refs.goodsList.loading = false;
                        _vue.$refs.goodsList.touchend = false;
                        _vue.$refs.goodsList.preventRepeatReuqest = false;
                    }else{
                        _vue.setErrorMessage(res.data.message);
                    }
                    
                })
            },
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
            document.title = "我有好物"
            var pageId = this.$route.query.pageId
            this.title = this.$route.query.title == undefined ? '我有好物' : this.$route.query.title
        },
        mounted() {}
    }
</script>

<style lang="less">
    .main-index{
        width: 100%;
        height: 100%;
        background: #f6ab2c;   
        background:#f6ab2c;  
        background:-moz-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));  
        background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f6ab2c), to(rgba(173, 90, 34, 0.9)));  
        background:-o-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));
        filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22);
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22)";
        color: #fff;
        .message{
            margin-left: 11px;
            padding-top: 20px;
            margin-bottom: 22px;
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
        .banner{
            height: 186px;
            margin: 0 8px 17px 8px;
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
                }
                .product-teacher{
                    display: inline-block;
                    width: calc(~"(100% - 25px)/2");
                    height: 160.5px;
                    background: #fff;
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
                }
                .product-joinus{
                    display: inline-block;
                    width: calc(~"(100% - 25px)/2");
                    height: 160.5px;
                    background: #fff;
                }
            }
        }
    }
</style>