<!-- 我的订单页面 -->
<template>
  <div class="order_main" @click="hideMsg">
    <div class="order_main"  v-if="orderList.length != 0" v-load-more="loaderMore">
      <!--<template  v-if="orderStatus != 0">-->
      <template>
                <!-- 教室订单 type= 0-->
        <div class="cid_order" v-for="item in orderList" :key="item.id" v-if="item.type == 0">
          
        </div>
                <!-- 老师订单 type= 1 -->
                <div class="tid_order" v-for="item in orderList" :key="item.id" v-if="item.type == 1">
                    
                </div>
                <!-- 课程订单 type=2 -->
                <div class="lid_order" v-for="item in orderList" :key="item.id" v-if="item.type == 2">
                    
                </div>
                <div class="order-item" v-for="item in orderList">
                    <div class="order-time">
                        <div class="lesson_icon"><img src="../../static/images/subscribe/subscribe-calendar.png"/></div>
                        <div class="lesson_date">预约日期:{{ item.date }}</div>
                    </div>
                    <div class="tid-order" v-if="item.type == 1">
                        <img class="tid-image" :src="item.teacher_info.head_img" />
                        <span class="tid-name">{{ item.teacher_info.name }}</span>
                    </div>
                    <div class="lid-order" v-if="item.type == 2">
                        <div class="lid-info">
                            <img src='../../static/images/subscribe/subscribe-calendar.png'/>
                            <span class="lid-detail">{{ item.class_info.name }}</span>
                        </div>
                        <div class="lid-image">
                            <img :src="item.teacher_info.head_img"/>
                        </div>
                    </div>
                    <div class="total">
                        <div class="total-room">
                            <img src="../../static/images/subscribe/subscribe-room.png"/>
                            <span class="room-info">教室: {{ item.room_info.name }}</span>
                        </div>
                        <div class="total-address">
                            <img src="../../static/images/subscribe/subscribe-address.png"/>
                            <span class="room-info">地址: {{ item.class_info.address }}</span>
                        </div>
                    </div>
                    <div class="status" v-if="item.status == 1">
                        <div class="order-status-end">已结束</div>
                    </div>
                    <div class="status" v-if="item.status == 2">
                        <div class="order-status-subscribe">已预约</div>
                        <img src="../../static/images/subscribe/subscribe-ma.png"/>
                    </div>
                </div>
      </template>
    </div>
<!-- <p v-if="loading" class="empty_data">加载中</p>  
    <p v-if="touchend" class="empty_data">没有更多了</p> -->
<error-message v-bind="{pastle, message}"></error-message>
</div>
</template>
<script>
    import ajax from '../../config/ajax'
    import ApiControl from '../../config/envConfig.home'
    import {
        loadMore,
        getImgPath
    } from '../../components/mixin'
    var env = 'product';
    export default {
        data() {
                return {
                    pastle: false,
                    nickname: "",
                    orderNumber: '',
                    orderStatus: 1,
                    orderList: [
                        {
                            type: 1,
                            date: '2017/09/26',
                            status: 1,
                            teacher_info: {
                                name: '孟老师',
                                head_img: 'http://www.studyyx.com/piano/piano/App/Uploads/User/1.jpg'
                            },
                            class_info:{
                                name: '小提琴班',
                                address: "徐汇区天钥桥路100号"
                            },
                            room_info:{
                                name: '徐汇区天钥桥路店'
                            }
                        },
                        {
                            type: 2,
                            date: '2017/09/26',
                            status: 2,
                            teacher_info: {
                                name: '孟老师',
                                head_img: 'http://www.studyyx.com/piano/piano/App/Uploads/User/1.jpg'
                            },
                            class_info:{
                                name: '小提琴班',
                                address: "徐汇区天钥桥路100号"
                            },
                            room_info:{
                                name: '徐汇区天钥桥路店'
                            }
                        },
                        {
                            type: 0,
                            date: '2017/09/26',
                            status: 1,
                            teacher_info: {
                                name: '孟老师',
                                head_img: 'http://www.studyyx.com/piano/piano/App/Uploads/User/1.jpg'
                            },
                            class_info:{
                                name: '小提琴班',
                                address: "徐汇区天钥桥路100号"
                            },
                            room_info:{
                                name: '徐汇区天钥桥路店'
                            }
                        }
                    ],
                    orderText: {
                        0: '全部',
                        1: '待付款',
                        2: '待服务',
                        3: '待评价',
                        4: '已完成'
                    },
                    orderStatusColors: {
                        0: '#28bc06',
                        1: '#28bc06',
                        2: '#28bc06',
                        3: '#28bc06',
                        4: '#f62f42'
                    },
                    tip: '',
                    message: [],
                    page: 1,
                    loading: false,
                    preventRepeatReuqest: false, //到达底部加载数据，防止重复加载,
                    touchend: false, //没有更多数据
                    offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
                }
            },
            mixins: [loadMore, getImgPath],
            methods: {
                queryOrder: function() {
                    var _vue = this;
                    //根据orderStatus获取订单信息
                    _vue.$ajax.get(ApiControl.getApi(env, "getMyOrder"), {
                        params: {
                            status: this.orderStatus,
                            pageNo: 1
                        }
                    }).
                    then(res => {
                        //提交成功刷新跟踪中列表
                        if (res.data.code == 0) {
                            _vue.orderList = res.data.result.list;
                        } else {
                            _vue.setErrorMessage(res.data.message);
                        }
                    })
                },
                queryMoreOrder: function() {
                    let _vue = this;
                    this.preventRepeatReuqest = true;
                    this.page++;

                    _vue.$ajax.get(ApiControl.getApi(env, "getMyOrder"), {
                        params: {
                            status: _vue.orderStatus,
                            pageNo: _vue.page,
                            size: 10
                        }
                    }).
                    then(res => {
                        if (res.data.code == 0) {
                            for (var i in res.data.result.list)
                                _vue.orderList.push(res.data.result.list[i]);
                            setTimeout(function() {
                                _vue.loading = false;
                                _vue.preventRepeatReuqest = false;
                                if (res.data.result.list.length == 0 || res.data.result.list.length < 10) {
                                    _vue.touchend = true;
                                    return
                                }
                            }, 500);
                        } else {
                            _vue.setErrorMessage(res.data.message);
                        }
                    })
                },
                //到达底部加载更多数据
                async loaderMore() {
                    //防止重复请求
                    if (this.touchend || this.preventRepeatReuqest) {
                        return
                    }
                    this.loading = true;
                    this.queryMoreOrder();
                },
                setErrorMessage: function(...message) {
                    var _vue = this;
                    this.pastle = true;
                    this.message = message;
                    setTimeout(function() {
                        _vue.pastle = false;
                        _vue.message = [];
                    }, 2000)
                },
                hideMsg: function() {
                    this.pastle = false;
                    this.message = [];
                }
            },
            created() {
                var status = this.$route.query.status
                //页面初始化，获取跟踪中订单信息
                var _vue = this;
                _vue.$ajax.get(ApiControl.getApi(env, "orderList"), {
                    params: {
                        status: status
                    }
                }).
                then(res => {
                    //提交成功刷新跟踪中列表
                    if (res.data.code == 0) {
                        _vue.orderList = res.data.data.order_list;
                    } else {
                        _vue.setErrorMessage(res.data.mes);
                    }
                })
            },
            mounted() {

            }
    }
</script>
<style lang="less">
    @import "../../static/style/layout-mixin";
    @bdColor: #ddd;
    @borderColor: #f1f1f6;
    body {
        margin: 0px;
        padding: 0px;
        font-family: 'PingFangSC-Regular';
        .order_main {
            background: #eee;
            width: 100%;
            height: 100%;
            margin: 0 auto;
            text-align: center;
            float: left;
            .index_ul {
                background-color: #f5f5f5;
                width: 100%;
                border-top: 1px solid @bdColor;
                .flex;
                .flex-center;
                .flex-align-center;
                ul {
                    background-color: #fff;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    padding-left: 0px;
                    margin-bottom: 20px;
                    margin-top: 0px;
                    li {
                        font-size: 14px;
                        text-align: center;
                        border-bottom: 2px solid #fff;
                        box-sizing: border-box;
                        .flex;
                        .flex-center;
                        .flex-align-center;
                        .flex-item-auto;
                        &.active {
                            color: #fd472b;
                            border-bottom: 2px solid #fd472b;
                        }
                    }
                }
            }
            #index_order {
                float: left;
                width: 100%;
                text-align: center;
                margin: 5px auto 0;
                img {
                    width: 107px;
                    height: 97px;
                    margin: 65px 0px 20px;
                }
                p {
                    font-size: 15px;
                    color: #35353f;
                }
            }
            .order_main {
                height: auto;
                border-top: 1px solid @bdColor;
                padding-bottom: 50px;
                padding-top: 20px;

                .index_thing {
                    float: left;
                    margin-bottom: 5px;
                    background-color: #fff;
                    width: 100%;
                    .top {
                        border-bottom: 1px solid @borderColor;
                        line-height: 24px;
                        padding: 0px 15px;
                        .flex;
                        .flex-justify;
                        .time {
                            color: #999;
                            font-size: 12px;
                        }
                        em {
                            font-size: 12px;
                            color: #35353f;
                            font-style: normal;
                        }
                    }
                    .content {
                        box-sizing: content-box;
                        padding: 13px 15px;
                        .flex;
                        .flex-vertical;
                        .flex-around;
                        .title,
                        .order,
                        .pay {
                            text-align: left;
                        }
                        & > * + * {
                            margin-top: 10px;
                        }
                        .title {
                            font-size: 14px;
                            color: #2d3c49;
                            width: 70%;
                            .text-line-feed(1);
                        }
                        .order {
                            color: #666;
                            font-size: 13px;
                            .flex;
                            .flex-justify;
                        }
                        .pay {
                            color: #666;
                            font-size: 13px;
                        }
                    }
                    .index_img {
                        float: left;
                        img {
                            width: 75px;
                            height: 75px;
                        }
                    }
                    .index_txt {
                        text-align: left;
                        margin-left: 85px;
                        .item_title {
                            color: #35353f;
                            overflow: hidden;
                            height: 36px;
                            line-height: 18px;
                            font-size: 14px;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            display: -moz-box;
                            -moz-line-clamp: 2;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            white-space: normal;
                            width: 100%;
                        }
                        span {
                            color: #fd472b;
                            display: block;
                            margin: 13px 0px 15px;
                            float: left;
                        }
                    }
                }
                .order-item{
                    text-align: left;
                    background: #fff;
                    margin-bottom: 20px;
                    margin-left: 20px;
                    margin-right: 20px;
                    .order-time{
                        height: 40px;
                        line-height: 40px;
                        border-bottom: 1px dashed #ddd;
                        margin-bottom: 30px;
                        background: #ddd;
                        text-align: left;
                        .lesson_icon{
                          display: inline-block;
                          text-align: center;
                          width: 30px;
                          border-right: 1px solid #ddd;
                          line-height: 25px;
                          margin-left: 20px;
                          img{
                            width: 12px;
                            height: 12px;
                            vertical-align: middle;
                          }
                        }
                        .lesson_date{
                          display: inline-block;
                        }
                    }
                    .tid-order{
                        height: 60px;
                        margin: 0 40px;
                        background: #fff;
                        border-bottom: 1px dashed #ddd;
                        img{
                            width: 40px;
                            height: 40px;
                            border-radius: 20px;
                            margin-right: 10px;
                            vertical-align: top;
                        }
                        .tid-name{
                            font-size: 20px;
                            font-weight: bolder;
                            line-height: 40px;
                        }
                    }
                    .lid-order{
                        height: 60px;
                        margin: 0 40px;
                        background: #fff;
                        border-bottom: 1px dashed #ddd;
                        .lid-info{
                            display: inline-block;
                            img{
                                width: 18px;
                                height: 18px;
                                margin-right: 5px;
                            }
                            .lid-detail{
                                font-size: 20px;
                                font-weight: bolder;
                                line-height: 40px;
                            }
                        }
                        .lid-image{
                            display: inline-block;
                            vertical-align: top;
                            float: right;
                            img{
                                width: 40px;
                                height: 40px;
                                border-radius: 20px;
                                margin-right: 10px;
                            }
                        }
                    }
                    .total{
                        height: 100px;
                        margin: 40px 40px 20px 40px;
                        border-bottom: 1px dashed #ddd;
                        .total-room{
                            margin-bottom: 10px;
                            img{
                                width: 18px;
                                height: 18px;
                                margin-right: 10px;
                                vertical-align: top;
                            }
                            .room-info{
                                font-size: 16px;
                                line-height: 22px;
                            }
                        }
                        .total-address{
                            margin-bottom: 10px;
                            img{
                                width: 18px;
                                height: 18px;
                                margin-right: 10px;
                                vertical-align: top;
                            }
                            .room-info{
                                font-size: 16px;
                                line-height: 22px;
                            }
                        }
                    }
                    .status{
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        padding-bottom: 15px;
                        .order-status-end{
                            display: inline-block;
                            margin: 0 auto;
                            border-left: 2px solid red;
                            line-height: 16px;
                            padding-left: 5px;
                        }
                        .order-status-subscribe{
                            display:inline-block;
                            margin:0 auto;
                        }
                        img{
                            width : 15px;
                            height: 15px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
        .empty_data {
            font-size: 10px;
            line-height: 10px;
            text-align: center;
            color: #666;
            font-family: PingFang-SC-Regular!important;
            padding-bottom: 3.5rem;
        }
    }
</style>