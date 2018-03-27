<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)" :key="index">
                    <span class="text border-1px">
                        <span class="icon"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="food-list food-list-hook" ref="foodHook" :key="index">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food, reference) in item.foods" class="food-item border-1px" :key="reference">
                            <div class="icon">
                                <img width="80" height="80" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <div class="size-wrapper">
                                        <div class="controll">
                                            <span class="text" @click="showsize(food, $event)" :id="`cool${index}${reference}`">选规格</span>
                                            <div class="dot">
                                                <cartcontrol :food="food" class="choosecart"></cartcontrol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <transition name="fade">
            <div class="detail-wrapper" v-show="detailwrapper">
                <div class="choosesize">
                    <div class="choosedetail">
                        <div class="choosetitle">
                            <div class="title">{{food.name}}</div>
                        </div>
                        <div class="choosetype">
                            <div class="type">
                                <div v-for="(item, index) in food.specdetail" :key="index" class="temp">
                                    <h4 class="subtitle">{{item.name}}</h4>
                                    <ul class="box">
                                        <li v-for="(selected, index) in item.content" :class="{'active':selected.size == 1}" :key="index">{{selected.name}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="choosecart">
                            <div class="chooseprice">￥<span class="chigh">{{food.price}}</span></div>
                            <cartcontrol :food="food" class="choosead" ref="cart"></cartcontrol>
                        </div>
                        <div class="chooseok" @click="okclose">选好了</div>
                    </div>
                </div>
                <div class="close" @click="close()">X</div>
            </div>
        </transition>

        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from 'com/shopcart/shopcart'
import cartcontrol from 'com/cartcontrol/cartcontrol'
import {jsonToString} from 'js/util.js'

let ARRSTAT = []

export default {
    data() {
      return {
        goods: [
            {
            "name": "热销榜",
            "type": -1,
            "foods": [
                {
                    "id": "estore01",
                    "name": "皮蛋瘦肉粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 229,
                    "rating": 100,
                    "info": "一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足",
                    "ratings": [
                        {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "很喜欢的粥",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 1,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore02",
                    "name": "扁豆焖面",
                    "price": 14,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 188,
                    "rating": 96,
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "info": "",
                    "icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore03",
                    "name": "葱花饼",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 124,
                    "rating": 85,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 1,
                        "text": "没啥味道",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 1,
                        "text": "很一般啊",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore04",
                    "name": "牛肉馅饼",
                    "price": 14,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 114,
                    "rating": 91,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 1,
                        "text": "难吃不推荐",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore05",
                    "name": "招牌猪肉白菜锅贴/10个",
                    "price": 17,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 101,
                    "rating": 78,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 1,
                        "text": "不脆,不好吃",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore06",
                    "name": "南瓜粥",
                    "price": 9,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 91,
                    "rating": 100,
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore07",
                    "name": "红豆薏米美肤粥",
                    "price": 12,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 86,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore08",
                    "name": "八宝酱菜",
                    "price": 4,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 84,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore09",
                    "name": "红枣山药糙米粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 81,
                    "rating": 91,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore10",
                    "name": "糊塌子",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 80,
                    "rating": 93,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "单人精彩套餐",
                "type": 2,
                "foods": [
                    {
                        "id": "estore11",
                        "name": "红枣山药粥套餐",
                        "price": 29,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": 36,
                        "description": "红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注",
                        "sellCount": 17,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "冰爽饮品限时特惠",
                "type": 1,
                "foods": [
                    {
                        "id": "estore12",
                        "name": "VC无限橙果汁",
                        "price": 8,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": 10,
                        "description": "",
                        "sellCount": 15,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "还可以",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "精选热菜",
                "type": -1,
                "foods": [
                    {
                        "id": "estore13",
                        "name": "娃娃菜炖豆腐",
                        "price": 17,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 43,
                        "rating": 92,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "菜量还可以,味道还可以",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore14",
                        "name": "手撕包菜",
                        "price": 16,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 29,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore15",
                        "name": "香酥黄金鱼/3条",
                        "price": 11,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 15,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "爽口凉菜",
                "type": -1,
                "foods": [
                    {
                        "id": "estore16",
                        "name": "八宝酱菜",
                        "price": 4,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 84,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore17",
                        "name": "拍黄瓜",
                        "price": 9,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 28,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "精选套餐",
                "type": -1,
                "foods": [
                    {
                        "id": "estore18",
                        "name": "红豆薏米粥套餐",
                        "price": 37,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
                        "sellCount": 3,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore19",
                        "name": "皮蛋瘦肉粥套餐",
                        "price": 31,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 12,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "果拼果汁",
                "type": -1,
                "foods": [
                    {
                        "id": "estore20",
                        "name": "蜜瓜圣女萝莉杯",
                        "price": 6,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 1,
                        "rating": "",
                        "info": "",
                        "ratings": [],
                        "icon": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore21",
                        "name": "加多宝",
                        "price": 6,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 7,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore22",
                        "name": "VC无限橙果汁",
                        "price": 8,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": 10,
                        "description": "",
                        "sellCount": 15,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "还可以",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "小吃主食",
                "type": -1,
                "foods": [
                    {
                        "id": "estore23",
                        "name": "扁豆焖面",
                        "price": 14,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 188,
                        "rating": 96,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 1,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore24",
                        "name": "葱花饼",
                        "price": 10,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 124,
                        "rating": 85,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "没啥味道",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 1,
                            "text": "很一般啊",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore25",
                        "name": "牛肉馅饼",
                        "price": 14,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 114,
                        "rating": 91,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "难吃不推荐",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore26",
                        "name": "招牌猪肉白菜锅贴/10个",
                        "price": 17,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 101,
                        "rating": 78,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 1,
                            "text": "不脆,不好吃",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore27",
                        "name": "糊塌子",
                        "price": 10,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "",
                        "sellCount": 80,
                        "rating": 93,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
                    }
                ]
            },
            {
                "name": "特色粥品",
                "type": -1,
                "foods": [
                    {
                        "id": "estore28",
                        "name": "皮蛋瘦肉粥",
                        "price": 10,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "咸粥",
                        "sellCount": 229,
                        "rating": 100,
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "很喜欢的粥",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 1,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                    {
                        "id": "estore29",
                        "name": "南瓜粥",
                        "price": 9,
                        "count": 0, // 新增
                        "format": "中杯，正常，常温", // 新增
                        "specdetail": [ // 新增
                            {
                                "name": "规格",
                                "content": [
                                    {"size": 0, "name": "小杯"},
                                    {"size": 0, "name": "中杯"},
                                    {"size": 0, "name": "大杯"}
                                ]
                            },
                            {
                                "name": "甜度",
                                "content": [
                                    {"size": 0, "name": "无糖"},
                                    {"size": 0, "name": "少糖"},
                                    {"size": 0, "name": "正常"},
                                    {"size": 0, "name": "多糖"}
                                ]
                            },
                            {
                                "name": "温度",
                                "content": [
                                    {"size": 0, "name": "常温"},
                                    {"size": 0, "name": "去冰"},
                                    {"size": 0, "name": "热"}
                                ]
                            }
                        ],
                        "oldPrice": "",
                        "description": "甜粥",
                        "sellCount": 91,
                        "rating": 100,
                        "info": "",
                        "ratings": [
                            {
                            "username": "3******c",
                            "rateTime": 1469281964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "2******3",
                            "rateTime": 1469271264000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            },
                            {
                            "username": "3******b",
                            "rateTime": 1469261964000,
                            "rateType": 0,
                            "text": "",
                            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                            }
                        ],
                        "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
                        "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
                    },
                {
                    "id": "estore30",
                    "name": "红豆薏米美肤粥",
                    "price": 12,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 86,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore31",
                    "name": "红枣山药糙米粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 81,
                    "rating": 91,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore32",
                    "name": "鲜蔬菌菇粥",
                    "price": 11,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 56,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": ""
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore33",
                    "name": "田园蔬菜粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 33,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
                }
            ]
            },
            {
            "name": "特色粥品1",
            "type": -1,
            "foods": [
                {
                    "id": "estore34",
                    "name": "皮蛋瘦肉粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 229,
                    "rating": 100,
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "很喜欢的粥",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore35",
                    "name": "南瓜粥",
                    "price": 9,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 91,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore36",
                    "name": "红豆薏米美肤粥",
                    "price": 12,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 86,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore37",
                    "name": "红枣山药糙米粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 81,
                    "rating": 91,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore38",
                    "name": "鲜蔬菌菇粥",
                    "price": 11,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 56,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": ""
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore39",
                    "name": "田园蔬菜粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 33,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
                }
            ]
            },
            {
            "name": "特色粥品2",
            "type": -1,
            "foods": [
                {
                    "id": "estore40",
                    "name": "皮蛋瘦肉粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 229,
                    "rating": 100,
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "很喜欢的粥",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore41",
                    "name": "南瓜粥",
                    "price": 9,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 91,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore42",
                    "name": "红豆薏米美肤粥",
                    "price": 12,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 86,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore43",
                    "name": "红枣山药糙米粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 81,
                    "rating": 91,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore44",
                    "name": "鲜蔬菌菇粥",
                    "price": 11,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 56,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": ""
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore45",
                    "name": "田园蔬菜粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 33,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
                }
            ]
            },
            {
            "name": "特色粥品3",
            "type": -1,
            "foods": [
                {
                    "id": "estore46",
                    "name": "皮蛋瘦肉粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 229,
                    "rating": 100,
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "很喜欢的粥",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 1,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore47",
                    "name": "南瓜粥",
                    "price": 9,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 91,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore48",
                    "name": "红豆薏米美肤粥",
                    "price": 12,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "甜粥",
                    "sellCount": 86,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore49",
                    "name": "红枣山药糙米粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "",
                    "sellCount": 81,
                    "rating": 91,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore50",
                    "name": "鲜蔬菌菇粥",
                    "price": 11,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 56,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": ""
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
                },
                {
                    "id": "estore51",
                    "name": "田园蔬菜粥",
                    "price": 10,
                    "count": 0, // 新增
                    "format": "中杯，正常，常温", // 新增
                    "specdetail": [ // 新增
                        {
                            "name": "规格",
                            "content": [
                                {"size": 0, "name": "小杯"},
                                {"size": 0, "name": "中杯"},
                                {"size": 0, "name": "大杯"}
                            ]
                        },
                        {
                            "name": "甜度",
                            "content": [
                                {"size": 0, "name": "无糖"},
                                {"size": 0, "name": "少糖"},
                                {"size": 0, "name": "正常"},
                                {"size": 0, "name": "多糖"}
                            ]
                        },
                        {
                            "name": "温度",
                            "content": [
                                {"size": 0, "name": "常温"},
                                {"size": 0, "name": "去冰"},
                                {"size": 0, "name": "热"}
                            ]
                        }
                    ],
                    "oldPrice": "",
                    "description": "咸粥",
                    "sellCount": 33,
                    "rating": 100,
                    "info": "",
                    "ratings": [
                        {
                        "username": "3******c",
                        "rateTime": 1469281964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "2******3",
                        "rateTime": 1469271264000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        },
                        {
                        "username": "3******b",
                        "rateTime": 1469261964000,
                        "rateType": 0,
                        "text": "",
                        "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                        }
                    ],
                    "icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
                    "image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
                }
            ]
            }
        ],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
        seller: {
            "name": "粥品香坊（回龙观）",
            "description": "蜂鸟专送",
            "deliveryTime": 38,
            "score": 4.2,
            "serviceScore": 4.1,
            "foodScore": 4.3,
            "rankRate": 69.2,
            "minPrice": 20,
            "deliveryPrice": 4,
            "ratingCount": 24,
            "sellCount": 90,
            "bulletin": "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
            "supports": [
            {
                "type": 0,
                "description": "在线支付满28减5"
            },
            {
                "type": 1,
                "description": "VC无限橙果汁全场8折"
            },
            {
                "type": 2,
                "description": "单人精彩套餐"
            },
            {
                "type": 3,
                "description": "该商家支持发票,请下单写好发票抬头"
            },
            {
                "type": 4,
                "description": "已加入“外卖保”计划,食品安全保障"
            }
            ],
            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
            "pics": [
            "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
            "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
            "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
            "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180"
            ],
            "infos": [
            "该商家支持发票,请下单写好发票抬头",
            "品类:其他菜系,包子粥店",
            "北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
            "营业时间:10:00-20:30"
            ]
        },
        detailwrapper: false,
        food: {},
        lastchoice: [],
        goods_id: '',
      };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = []
            this.goods.forEach( (good) => {
                good.foods.forEach( (food) => {
                    if( food.count ){
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    created() {
        this.$nextTick( () => { // this.$nextTick 的回调函数中初始化 better-scroll 。因为这个时候，wrapper 的 DOM 已经渲染了
            this._initScroll();
            this._calculateHeight();
        });

        let resultJSON = JSON.parse(window.localStorage.getItem("estore"))
        if( resultJSON ) {
            this.goods.forEach( (good) => {
                good.foods.forEach( (food) => {
                    if(resultJSON[food.id]) {
                        food["format"] = resultJSON[food.id].format
                        food["count"] = resultJSON[food.id].count
                        food["specdetail"] = resultJSON[food.id].specdetail
                    }
                })
            })
        } else {
        }
    },
    mounted() { 
    },
    methods: {
        selectMenu(index, event) {
            if (!event._constructed) {
                return
            }
            let foodList = this.$refs.foodHook
            let el = foodList[index]
            this.foodsScroll.scrollToElement(el, 300)
        },
        _initScroll() { // 滚动初始化
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true // 默认派发点击事件 移动端点击只会出发一次，pc端点击的时候会触发两次
            }); 
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3 // 希望在实时滚动的时候监听滚动的位置，相当于探针，这时候就可以监听事件
            });
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            }); // 监听滚动（scroll)事件,pos是实时位置--回调的时候用;接下来就需要将scrollY和左侧的索引通过vue的计算属性computed进行映射
        },
        _calculateHeight() { // 最后将高度跟左侧进行映射
            let foodList = this.$refs.foodHook;
            let height = 0;
            this.listHeight.push(height); // 将第一个高度放进去
            for (let i = 0; i < foodList.length; i++) { // 将每个区间的item的高度进行累加，将累加的结果放入数组中
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectFood(food, event) {
            if (!event._constructed) {
                return;
            }
            this.selectedFood = food;
            this.$refs.food.show();
        },
        showsize(target, event) {
            this.food = target
            this.$nextTick( function() { // 防止点击没有效果
                this.acticve(target)
            })
            this.detailwrapper = true
        },
        close() {
            this.detailwrapper = false
            ARRSTAT = []
        },
        okclose(event) {
            
            // 获取选择属性字符串
            let str = ''
            $('.active').each(function(index, item){
                let $item = $(item)
                ARRSTAT.push($item.html())
                str+=$item.html()+','
            })
            str=(str.substring(str.length-1)==',')?str.substring(0,str.length-1):str
            if(str === '') {
                this.food.format = '中杯，正常，常温'
            } else {
                this.food.format = str // 关键点
            }

            // 设置临时存储变量
            let contentarr = [
                {
                    "name": "规格",
                    "content": [
                        {"size": 0, "name": "小杯"},
                        {"size": 0, "name": "中杯"},
                        {"size": 0, "name": "大杯"}
                    ]
                },
                {
                    "name": "甜度",
                    "content": [
                        {"size": 0, "name": "无糖"},
                        {"size": 0, "name": "少糖"},
                        {"size": 0, "name": "正常"},
                        {"size": 0, "name": "多糖"}
                    ]
                },
                {
                    "name": "温度",
                    "content": [
                        {"size": 0, "name": "常温"},
                        {"size": 0, "name": "去冰"},
                        {"size": 0, "name": "热"}
                    ]
                }
            ]
            
            // 更改选择属性
            for(let i=0; i<contentarr.length; i++) {
                let filtercontent = contentarr[i].content
                for(let j=0; j<filtercontent.length; j++) {
                    if(filtercontent[j].name == ARRSTAT[i]) {
                        filtercontent[j].size = 1
                    }
                }
            }
            this.food.specdetail = contentarr
            
            // 设置缓存
            let sessionJSON = {
                id: this.food.id,
                name: this.food.name,
                count: this.food.count,
                price: this.food.price,
                format: this.food.format,
                specdetail: this.food.specdetail
            }
            let resultJSON = JSON.parse(window.localStorage.getItem("estore")) || {}
            resultJSON[this.food.id] = sessionJSON
            window.localStorage.setItem("estore", JSON.stringify(resultJSON))

            // 清空选择属性字符串
            ARRSTAT = []
            this.close()
        },
        acticve(target) {
            // this.food = target
            var THIS = this
            $('.box li').each(function(index, item){
                let $item = $(item)
                $item.click(function() {
                    $item.siblings('li').removeClass('active')
                    $(this).addClass('active')
                    // if($item.html() == '大杯') {
                    //     THIS.food.price = 12
                    //     console.log(THIS.food.price)
                    // }
                })
            })
        },
    },
    components: {
        BScroll,
        shopcart,
        cartcontrol
    }
  }
</script>

<style lang="stylus">
    @import "../../assets/css/mixin"
    .goods
        display: flex
        position: absolute
        top: 64px
        bottom: 70px
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px /* flex有三个属性：是否等分（0否1是）， 是否缩放（0否1是）， 占位多少像素  */
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table /* display:table是垂直居中最好的布局 */
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    color: #C35F37
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 56px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle  /* 垂直居中 */
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods-wrapper
            flex 1
            .title
                padding-left 14px
                height 26px
                line-height 26px
                border-left 2px solid #C35F37
                font-size 12px
                color rgb(147, 153, 159)
                background #f3f5f7
            .food-item
                display flex
                margin 18px
                padding-bottom 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &last-child
                    border-none()
                    margin-bottom 0
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1
                    .name
                        margin 2px 0 8px 0
                        height 14px
                        line-height 14px
                        font-size 14px
                        color rgb(7, 17, 27)
                    .desc, .extra
                        line-height 20px
                        font-size 10px
                        color rgb(147, 153, 159)
                    .desc
                        line-height 12px
                        margin-bottom 8px
                    .extra
                        .count
                            margin-right 12px
                    .price
                        font-weight 700
                        line-height 35px
                        .now
                            margin-right 8px
                            font-size 20px
                            color rgb(240, 20, 20)
                        .size-wrapper
                            display inline-block
                            width 50px
                            height 100%
                            float right
                            margin-top 10px
                            .controll
                                width 50px;
                                height 23px;
                                border 1px solid #c35f37;
                                border-radius 4px;
                                position relative
                                text-align center
                                color #C35F37
                                line-height 23px
                                .text
                                    font-size 14px
                                .dot
                                    .choosecart
                                        .cart-decrease
                                            display none
                                        .cart-count
                                            position absolute
                                            top -11px
                                            left 42px
                                            width 15px
                                            height 15px
                                            line-height 5px
                                            border-radius 15px
                                            background  #C35F37
                                            color #fff
                                        .cart-add 
                                            display none
                        .old
                            text-decoration line-through
                            font-size 10px
                            color rgb(147, 153, 159)
        .detail-wrapper
            width 100%
            height 100%
            position fixed
            left 0
            top 0
            background rgba(7,17,27,0.8)
            z-index 100
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.5s ease     
            &.fade-enter, &.fade-leave-active
                opacity: 0
                background: rgba(7, 17, 27, 0) 
            .choosesize
                width 100vw
                height 100vh
                .choosedetail
                    width 315px
                    height 434px
                    margin 115px auto
                    background #fff
                    border-radius 5px
                    overflow hidden
                    .choosetitle
                        display inline-block
                        width 100%
                        height 72px
                        border-radius 5px 5px 0 0
                        .title
                            width 144px 
                            height 22px
                            font-size 16px
                            text-align center
                            line-height 22px
                            margin 20px auto
                    .choosetype
                        width 100%
                        height 255px
                        overflow hidden
                        .type
                            width 255px
                            height 255px
                            margin 0 30px
                            background #fff
                            overflow hidden
                            .subtitle
                                width 24px
                                height 17px
                                line-height 17px
                                text-align center
                                margin 5px 0 10px
                            .box
                                width 255px
                                overflow hidden
                                li
                                    width 68px
                                    height 30px
                                    text-align center
                                    line-height 30px
                                    font-size 14px
                                    float left
                                    border 1px solid #BBB
                                    border-radius 4px
                                    margin-bottom 10px
                                    &:nth-child(2)
                                        margin 0 25px
                                    &.active
                                        background #FFEFE1
                                        border 1px solid #C35F37
                                        color #C35F37
                    .choosecart
                        position relative
                        width 100%
                        height 30px
                        margin-bottom 20px
                        display flex
                        .chooseprice
                            width 50px
                            height 36px
                            text-align center
                            line-height 36px
                            font-size 14px
                            margin-left 30px
                            margin-right 125px
                            .chigh
                                font-size 24px
                        .choosead
                                position absolute
                                right 25px
                    .chooseok
                        width 287px
                        height 38px
                        background #C35F37
                        border-radius 5px
                        margin 0 auto
                        text-align center
                        line-height 38px
                        color #fff
                        font-size 14px
            .close
                width 20px
                height 20px
                text-align center
                line-height 20px
                color #000
                font-size 18px
                position absolute
                right calc(50vw - 10px)
                top 45px
                z-index 100
                background #fff
                border-radius 50%


</style>