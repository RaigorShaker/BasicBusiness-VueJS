<template>
    <div class="order">
        <div class="container">
            <div class="course-name">
                {{ orderData.title }}
            </div>
            <div class="detail">
                <div class="teacher">
                    <div class="info">
                        <img :src="orderData.teacher_info.head_img"/>
                        <span class="teacher-name">{{ orderData.teacher_info.name }}</span>
                    </div>
                    <div class="normal-text">老师</div>
                </div>
                <div class="item">
                    <div class="info">
                        <span class="item-name">{{ orderData.room_info.name }}</span>
                    </div>
                    <div class="normal-text">教室</div>
                </div>
                <div class="item">
                    <div class="info">
                        <span class="item-name">{{ orderData.class_info.address }}</span>
                    </div>
                    <div class="normal-img">
                        <img src="../../static/images/mainIndex/position-icon.png"/>
                    </div>
                </div>

                <div class="item">
                    <div class="info">
                        <span class="item-name">{{ orderData.date }}  {{ orderData.time }}</span>
                    </div>
                    <div class="normal-text">时间</div>
                </div>

                <div class="item">
                    <div class="info">
                        <span class="item-name">{{ orderData.order_num }}</span>
                    </div>
                    <div class="normal-text">订单号</div>
                </div>
                <div class="item">
                    <div class="info">
                        <span class="item-name">{{ orderData.date }}  {{ orderData.time }}</span>
                    </div>
                    <div class="normal-text">开始时间</div>
                </div>
                <div class="item">
                    <div class="info">
                        <span class="item-name">{{ orderData.date }}  {{ orderData.time }}</span>
                    </div>
                    <div class="normal-text">结束时间</div>
                </div>
                <router-link :to="'/evaluate?oid=' + orderData.id">
                    <div class="item" v-if="orderData.status == '3'">
                        <div class="info" v-if="orderData.status == '3'">
                            <span class="item-name">待评价</span>
                        </div>
                        <div class="normal-img" v-if="orderData.status == '3'">
                            <img src="../../static/images/evaluate/toEvaluate.png"/>
                        </div>
                    </div>
                </router-link>
                <div class="item" v-if="orderData.status != '3'">
                    <div class="info" v-if="orderData.status == '1'">
                        <span class="item-name">已预约</span>
                    </div>
                    <div class="normal-img" v-if="orderData.status == '1'">
                        <img src="../../static/images/evaluate/code-detail.png"/>
                    </div>
                    <div class="info" v-if="orderData.status == '4'">
                        <span class="item-name">已评价</span>
                    </div>
                    <div class="normal-img" v-if="orderData.status == '4'">
                        <img class="normal-stars" src="../../static/images/evaluate/star_selected.png" v-for="n in orderData.stars"/>
                        <img class="normal-stars-unselect" src="../../static/images/evaluate/star_unselected.png" v-for="n in 5-orderData.stars"/>
                    </div>
                </div>
                <div class="item">
                    <div class="info">
                        <span class="item-name">实付款 ¥ {{ orderData.price }}</span>
                    </div>
                    <div class="normal-text"><span class="text-spec">总价</span>¥{{ orderData.price}}/<span class="text-spec">优惠</span>-¥{{ orderData.ticket }}</div>
                </div>
            </div>
            <div class="end-order">
                <img src="../../static/images/evaluate/sense-ok.png"/>
                <span class="sense-end">确认订单结束计时</span>
            </div>
        </div>
        <div class="circle-one">  
        </div>
        <div class="circle-two">  
        </div>
        <div class="circle-three">  
        </div>
        <div class="circle-four">  
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
                baseUrl: 'http://www.studyyx.com',
                orderData: {
                    id: 1,
                    title: '架子鼓课程',
                    order_num: '201709201441463215546',
                    date: '2017-09-08',
                    time: '10:00:00',
                    price: 860,
                    ticket: 10,
                    status: "3",
                    stars: 2,
                    teacher_info: {
                        head_img: 'http://www.studyyx.com/piano/piano/App/Uploads/User/1.jpg',
                        name: '张小爱老师'
                    },
                    room_info: {
                        name: '11号房间',
                    },
                    class_info:{
                        address: '徐汇区天钥桥路100号'
                    }
                },
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
            document.title = "订单详情-课程"
            var oid = this.$route.query.oid

            var _vue = this;
            _vue.$ajax.get(ApiControl.getApi(env, "order_Detail"), {
                params:{
                    act: 'order_Detail',
                    oid: oid
                }
            }).
            then(res => {
                if(res.data.data == 0){
                    _vue.orderData = res.data.data;
                }else{
                    _vue.setErrorMessage(res.data.message);
                }
                
            })
        },
        mounted() {}
    }
</script>

<style lang="less" scoped>
    html{
        height: 100%;
        body{
            height: 100%;
            margin: 0;
            #app{
                height: 100%;
                >div{
                    height: 100%
                }
                .order{
                    width: 100%;
                    height: 100%;
                    // height: 100%;
                    background: #f6ab2c;   
                    background:#f6ab2c;  
                    // background:-moz-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));  
                    // background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f6ab2c), to(rgba(173, 90, 34, 0.9)));  
                    // background:-o-linear-gradient(top, #f6ab2c, rgba(173, 90, 34, 0.5));
                    // filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22);
                    // -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#f6ab2c, endColorstr=#ad5a22)";
                    color: #fff;
                    overflow: hidden;
                    .circle-one{
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        border-radius: 10px;
                        background: #f6ab2c;
                        left: 15px;
                        top: 155px;
                    }
                    .circle-two{
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        border-radius: 10px;
                        background: #f6ab2c;
                        right: 15px;
                        top: 155px;
                    }
                    .circle-three{
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        border-radius: 10px;
                        background: #f6ab2c;
                        left: 15px;
                        top: 535px;
                    }
                    .circle-four{
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        border-radius: 10px;
                        background: #f6ab2c;
                        right: 15px;
                        top: 535px;
                    }
                    .container{
                        margin: 20px;
                        background: #fff;
                        position: relative;
                        .normal-text{
                            display: inline-block;
                            float: right;
                            font-size: 15px;
                            line-height: 50px;
                            color: #303134;
                            font-weight: bolder;
                            .text-spec{
                                color: #f6ab2c;
                            }
                        }
                        .normal-img{
                            display: inline-block;
                            float: right;
                            img{
                                width: 12px;
                                height: 12px;
                            }
                            .normal-stars{
                                width: 12px;
                                height: 12px;
                            }
                            // .normal-stars-unselect{
                            //     margin-left: -4px;
                            //     width: 12px;
                            //     height: 12px;
                            // }
                        }
                        .course-name{
                            margin: 0 20px;
                            padding: 15px 0;
                            font-size: 18px;
                            font-weight: bolder;
                            color: #303134;
                            height: 70px;
                            line-height: 40px;
                            text-align: center;
                            border-bottom: 1px dashed #ddd;
                        }
                        .detail{
                            margin: 0 20px;
                            border-bottom: 1px dashed #ddd;
                            .teacher{
                                height: 50px;
                                line-height: 50px;
                                .info{
                                    height: 50px;
                                    display: inline-block;
                                    color: #ddd;
                                    font-size: 15px;
                                    img{
                                        width: 20px;
                                        height: 20px;
                                        border-radius: 20px;
                                        margin-right: 5px;
                                        vertical-align: middle;
                                    }
                                }
                            }
                            .item{
                                height: 50px;
                                line-height: 50px;
                                .info{
                                    height: 50px;
                                    display: inline-block;
                                    color: #ddd;
                                    font-size: 15px;
                                }
                            }
                        }
                        .end-order{
                            height: 60px;
                            line-height: 60px;
                            margin: 0 20px;
                            text-align: center;
                            img{
                                width: 15px;
                                height: 15px;
                                margin-right:5px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
        }
    }
    
</style>