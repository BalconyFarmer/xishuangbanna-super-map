<template>
    <div class="hello">

        <div id="cesiumContainer" @mouseup="mouseUp()"></div>

        <div class="search">
            <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                placeholder="搜索管控内容"
                @select="handleSelect"
            ></el-autocomplete>
        </div>

        <div class="rightMenu finger" v-drag>
            <div id="animate1" class="rightMenuInner">
                <div class="top11">
                    <div :class="[menusList.indexOf('拦阻桩') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('拦阻桩')">
                        <div class="icon icon1"></div>
                        <span>拦阻桩</span>
                    </div>
                    <div :class="[menusList.indexOf('界碑界桩') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('界碑界桩')">
                        <div class="icon icon2"></div>
                        <span>界碑界桩</span>
                    </div>
                    <div :class="[menusList.indexOf('桥梁') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('桥梁')">
                        <div class="icon icon3"></div>
                        <span>桥梁</span>
                    </div>
                    <div :class="[menusList.indexOf('摄像头') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('摄像头')">
                        <div class="icon icon4"></div>
                        <span>摄像头</span>
                    </div>
                    <div :class="[menusList.indexOf('码头') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('码头')">
                        <div class="icon icon5"></div>
                        <span>码头</span>
                    </div>
                    <div :class="[menusList.indexOf('联防所') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('联防所')">
                        <div class="icon iconLFS"></div>
                        <span>联防所</span>
                    </div>
                    <div :class="[menusList.indexOf('平安版纳检查点') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('平安版纳检查点')">
                        <div class="icon icon6"></div>
                        <span>平安版纳检查点</span>
                    </div>
                    <div :class="[menusList.indexOf('网格') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('网格')">
                        <div class="icon icon7"></div>
                        <span>网格</span>
                    </div>
                    <!--                    <div :class="[menusList.indexOf('防控点') != -1 ?'active':'disAcitve']" class="menu11"-->
                    <!--                         @click="handleRightMenus('防控点')">-->
                    <!--                        <div class="icon icon8"></div>-->
                    <!--                        <span>防控点</span>-->
                    <!--                    </div>-->
                    <div :class="[menusList.indexOf('防控段') != -1 ?'active':'disAcitve']" class="menu11"
                         @click="handleRightMenus('防控段')">
                        <div class="icon icon9"></div>
                        <span>防控段</span>
                    </div>
                    <!--                    <div :class="[menusList.indexOf('防控段R') != -1 ?'active':'disAcitve']" class="menu11"-->
                    <!--                         @click="handleRightMenus('防控段R')">-->
                    <!--                        <div class="icon icon9"></div>-->
                    <!--                        <span>防控段R</span>-->
                    <!--                    </div>-->
                </div>

                <div class="subMenu" v-if="menusList.indexOf('平安版纳检查点') != -1">
                    <el-checkbox-group v-model="checkList">
                        <div class="subMenu1All">
                            <div class="subMenu1">
                                <el-checkbox @change="handleRightMenus('机场')" label="机场"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('酒店')" label="酒店"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('超市')" label="超市"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('餐饮')" label="餐饮"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('查缉点')" label="查缉点"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('防控点')" label="防控点"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('出租房')" label="出租房"></el-checkbox>
                            </div>
                            <div class="subMenu1">
                                <el-checkbox @change="handleRightMenus('医院')" label="医院"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('学校')" label="学校"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('银行')" label="银行"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('公司')" label="公司"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('候车站')" label="候车站"></el-checkbox>
                                <el-checkbox @change="handleRightMenus('旅游景点')" label="旅游景点"></el-checkbox>
                            </div>
                        </div>
                    </el-checkbox-group>

                </div>
            </div>


            <div class="close" @click="toggleMenu">
                <el-button type="success" icon="el-icon-help" circle></el-button>
            </div>
        </div>

        <div @mouseleave="hideBottom" @mouseenter="showBottom" class="mapChange finger">
            <div id="b1" class="map3 map" :class="[currentMap == '电子地图'?'active':'disAcitve']">
                <div class="checkbox">
                    <el-checkbox @change="changeTorrein()" label="地形"></el-checkbox>
                </div>
            </div>

            <div id="b2" class="map2 map" :class="[currentMap == '电子地图'?'active':'disAcitve']">
                <div class="checkbox">
                    <el-checkbox @change="change3DPhoto()" label="倾斜摄影"></el-checkbox>
                </div>
            </div>

            <div class="map1 map" :class="[currentMap == '影像地图'?'active':'disAcitve']">
                <div class="checkbox">
                    <span style="font-size: 7px">影像地图</span>
                    <!--                    <el-checkbox label="影像地图"></el-checkbox>-->
                </div>
            </div>
        </div>

        <div id="tooltip">
            <div v-for="item in hoverMsg">
                {{ item }}
            </div>
        </div>

        <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="diaAll">
                <div class="top">
                    <div class="item">
                        <div>标注类型</div>
                        <div>
                            <el-input v-model="clickMsg[0]" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div>点位名称</div>
                        <div>
                            <el-input v-model="clickMsg[1]" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div>经度</div>
                        <div>
                            <el-input v-model="clickMsg[2]" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <div>纬度</div>
                        <div>
                            <el-input v-model="clickMsg[3]" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </div>

                <div class="beizhu">
                    <div>备注</div>
                    <div>
                        <el-input v-model="clickMsg[4]" placeholder="请输入内容"></el-input>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import SuperApp from "./D3/SuperApp";
import KMTL from "./D3/project/KMTL";
import {getAllJinggaiByType} from "./api/api"
import 'animate.css';

export default {
    name: 'HelloWorld',
    components: {},
    props: {},
    data() {
        return {
            menusList: [],
            input: "",
            state1: '',
            checkList: ['选中且禁用', '复选框 A'],
            superApp: null,
            showTools: true,
            addDialogVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            VRSettingList: [
                "部署1",
                "部署2",
                "部署3",
            ],
            currentMode: "2D",
            currentMap: "影像地图",
            menuShow: true,
            bottomShow: false,
            dialogVisible: false,
            restaurants: [
                {"value": "暂无数据", "address": "暂无数据"},
            ],
            hoverMsg: [],
            clickMsg: []
        }
    },
    //自定义指令
    directives: {
        drag: {
            // 指令的定义
            bind: function (el) {
                let oDiv = el;  // 获取当前元素
                oDiv.onmousedown = (e) => {
                    // 算出鼠标相对元素的位置
                    let disX = e.clientX - oDiv.offsetLeft;
                    let disY = e.clientY - oDiv.offsetTop;

                    document.onmousemove = (e) => {
                        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX;
                        let top = e.clientY - disY;

                        oDiv.style.left = left + 'px';
                        oDiv.style.top = top + 'px';

                    };

                    document.onmouseup = (e) => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                }
            }
        }
    },

    methods: {
        toggleMenu() {
            if (this.menuShow) {
                this.$nextTick(() => {
                    const element = document.getElementById("animate1");
                    element.classList = []
                    element.classList.add('animate__animated', 'animate__fadeOutDown', 'animate__faster', 'rightMenuInner');
                })
            } else {
                this.$nextTick(() => {
                    const element = document.getElementById("animate1");
                    element.classList = []
                    element.classList.add('animate__animated', 'animate__fadeInUp', 'animate__fadeInRight', 'rightMenuInner');
                })
            }
            this.menuShow = !this.menuShow

        },

        showBottom() {
            const element = document.getElementById("b1");
            element.classList = []
            element.classList.add('animate__animated', 'animate__fadeInRight', 'animate__faster', "map3", "map");
            const element2 = document.getElementById("b2");
            element2.classList = []
            element2.classList.add('animate__animated', 'animate__fadeInRight', 'animate__faster', "map2", "map");
        },
        hideBottom() {
            const element = document.getElementById("b1");
            element.classList = []
            element.classList.add('animate__animated', 'animate__fadeOutRight', 'animate__faster');
            const element2 = document.getElementById("b2");
            element2.classList = []
            element2.classList.add('animate__animated', 'animate__fadeOutRight', 'animate__faster');
        },
        change3DPhoto() {
            this.superApp.kmtl.change3DPhoto()
        },
        changeTorrein() {
            if (this.currentMode == '2D') {
                this.currentMode = "3D"
                this.superApp.kmtl.change2D3D('3D')
            } else {
                this.currentMode = "2D"
                this.superApp.kmtl.change2D3D('2D')
            }
        },
        handleSelect(item) {
            let params = new Cesium.HeadingPitchRange(5.901089214916513, -0.40668579780875524, 1000)
            this.superApp.viewer.zoomTo(item.address, params)
        },
        querySearch(queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },

        handleRightMenus(type) {
            if (this.menusList.indexOf(type) != -1) {
                this.menusList.splice(this.menusList.indexOf(type), 1)

                // 非聚合点移除
                const dataSources = this.superApp.viewer.entities
                let _arr = []
                dataSources.values.forEach(item => {
                    if (item.name == type) {
                        _arr.push(item)
                    }
                })
                _arr.forEach(item => {
                    dataSources.remove(item)
                })

                // 聚合点移除
                const dataSources1 = this.superApp.viewer.dataSources._dataSources[0].entities
                let _arr1 = []
                dataSources1.values.forEach(item => {
                    if (item.name == type) {
                        _arr1.push(item)
                    }
                })
                _arr1.forEach(item => {
                    dataSources1.remove(item)
                })

                this.updateRes()
            } else {
                this.menusList.push(type)
                const self = this
                getAllJinggaiByType(type).then(res => {
                        console.log(type, res.data, "当前选取数据")
                        let menuList = ['机场', '酒店', '超市', '餐饮', '查缉点', '防控点', '出租房', '医院', '学校', '银行', '公司', '候车站', '旅游景点',]
                        let iconURL = 'd3/icons/' + type + ".png"
                        if (type == "防控段") {
                            res.data.forEach(item => {
                                let arr = []
                                item.lineGisJosn.forEach(item1 => {
                                    arr.push(item1.lng)
                                    arr.push(item1.lat)
                                })
                                if (arr.length) {
                                    self.superApp.entities.addLineReal(arr, item, "防控段")
                                }
                            })
                        } else if (type == "网格") {
                            res.data.forEach(item => {
                                let arr = []
                                item.gisJosn.forEach(item1 => {
                                    arr.push(item1[1])
                                    arr.push(item1[0])
                                })
                                if (arr.length) {
                                    self.superApp.entities.addLineRealGrid(arr, item, "网格")
                                }
                            })
                        } else if (menuList.indexOf(type) != -1 || type == "联防所") {
                            res.data.forEach((item, index) => {
                                let arr = []
                                arr[0] = item.gisJson[1]
                                arr[1] = item.gisJson[0]
                                arr[2] = 0
                                self.superApp.entities.addIcon1(arr, iconURL, type, "vr", item)
                            })
                        } else {
                            res.data.forEach((item, index) => {
                                let arr = []
                                if (type == "拦阻桩" || type == "界碑界桩" || type == "桥梁" || type == "摄像头" || type == "码头") {
                                    arr[0] = item.gisJosn[1]
                                    arr[1] = item.gisJosn[0]
                                    arr[2] = 0
                                }
                                if (type == "防控点") {
                                    arr[0] = item.pointJosn.lng
                                    arr[1] = item.pointJosn.lat
                                    arr[2] = 0
                                }
                                self.superApp.entities.addIcon1(arr, iconURL, type, "vr", item)
                            })
                        }
                        self.updateRes()
                    }
                )
            }


        },

        /*        handleRightMenus01(type) {
                    const self = this
                    getAllJinggaiByType(type).then(res => {
                            res.data.forEach(item => {
                                let arr = []
                                arr = item.position.split(",")
                                const iconURL = 'd3/icons/' + "坐标-fill.png"
                                self.superApp.entities.addIcon1(arr, iconURL, type, "vr")
                            })
                            self.updateRes()
                        }
                    )
                },*/

        saveJsonVR() {
            const index = this.VRSettingList.length + 1
            this.VRSettingList.push("vr配置" + index)
        },
        deleteJsonVR(index) {
            this.VRSettingList.splice(index, 1)
        },
        hideVR() {
            this.addDialogVisible = false
            this.superApp.img3D.destroy()
        },
        handleClose() {
            this.dialogVisible = false
        },
        mouseUp() {
            this.superApp.eventCenter.dispatchEvent({
                type: 'mouseUp',
                message: {flag: true}
            })
        },
        updateRes() {

            this.restaurants = []
            this.superApp.viewer.entities.values.forEach(item => {
                // debugger
                if (item.allData) {
                    this.restaurants.push({
                        value: item.allData.name,
                        address: item
                    })
                }
            })

            this.superApp.viewer.dataSources._dataSources[0].entities.values.forEach(item => {
                // debugger
                this.restaurants.push({
                    value: item.allData.name,
                    address: item
                })
            })

        }

    },
    mounted() {

        const self = this
        const dom = document.getElementById("tooltip")
        dom.style.display = "none"
        this.superApp = new SuperApp(Cesium)

        this.superApp.eventCenter.addEventListener('hoverE', function (data) {
            if (data.message.en.allData) {

                let menuList = ['机场', '酒店', '超市', '餐饮', '查缉点', '防控点', '出租房', '医院', '学校', '银行', '公司', '候车站', '旅游景点',]

                if (menuList.indexOf(data.message.en.allData.typeDesc) != -1) {
                    self.hoverMsg[0] = "名称:" + data.message.en.allData.name
                    self.hoverMsg[1] = "类型:" + data.message.en.allData.typeDesc
                    self.hoverMsg[2] = "坐标:" + data.message.en.allData.gisJson
                } else if (data.message.en.allData.propertiesDesc == "网格") {
                    self.hoverMsg[0] = "名称:" + data.message.en.allData.name
                    self.hoverMsg[1] = data.message.en.allData.typeDesc
                    self.hoverMsg[2] = data.message.en.allData.shortName
                    self.hoverMsg[3] = data.message.en.allData.gridRange
                } else if (data.message.en.allData.typeDesc == "防控段") {
                    self.hoverMsg[0] = "名称:" + data.message.en.allData.name
                    self.hoverMsg[1] = data.message.en.allData.shortName
                    self.hoverMsg[2] = data.message.en.allData.typeDesc
                } else if (data.message.en.allData.pointName == "摄像头") {
                    self.hoverMsg[0] = "名称:" + data.message.en.allData.name
                    self.hoverMsg[1] = "类型:" + data.message.en.allData.pointName
                    self.hoverMsg[2] = "坐标:\n" + data.message.en.allData.gisJosn
                } else if (data.message.en.allData.typeDesc == "联防所检查点") {
                    self.hoverMsg[0] = "名称:" + data.message.en.allData.name
                    self.hoverMsg[1] = "类型:" + data.message.en.allData.typeDesc
                    self.hoverMsg[2] = "坐标:\n" + data.message.en.allData.gisJson
                } else {
                    self.hoverMsg[0] = "名称:" + data.message.en.allData.name
                    self.hoverMsg[1] = data.message.en.allData.remarks
                    self.hoverMsg[2] = data.message.en.allData.dynamicData
                }


                self.$forceUpdate();
                dom.style.display = "block"
                dom.style.left = data.message.position.startPosition.x + 20 + "px"
                dom.style.top = data.message.position.startPosition.y + 20 + "px"
            } else {
                dom.style.display = "none"
            }
        })
        this.superApp.eventCenter.addEventListener('hideToolTip', function (data) {
            dom.style.display = "none"
            self.hoverMsg = []
        })

        self.superApp.eventCenter.addEventListener('pickEntity', function (data) {

            let menuList = ['机场', '酒店', '超市', '餐饮', '查缉点', '防控点', '出租房', '医院', '学校', '银行', '公司', '候车站', '旅游景点',]

            if (data.message.en.id.allData.typeDesc == "联防所检查点") {
                self.clickMsg[0] = "联防所"
                self.clickMsg[1] = data.message.en.id.allData.name
                self.clickMsg[2] = data.message.en.id.allData.gisJson[1]
                self.clickMsg[3] = data.message.en.id.allData.gisJson[0]
                self.clickMsg[4] = ""
                self.dialogVisible = true
            } else if (data.message.en.id.allData.propertiesDesc == "网格") {
                self.clickMsg[0] = data.message.en.id.allData.name
                self.clickMsg[1] = data.message.en.id.allData.shortName
                self.clickMsg[2] = data.message.en.id.allData.gisJosn[0][1]
                self.clickMsg[3] = data.message.en.id.allData.gisJosn[0][0]
                self.clickMsg[4] = data.message.en.id.allData.region
                self.dialogVisible = true
            } else if (data.message.en.id.allData.typeDesc == "防控段") {
                self.clickMsg[0] = data.message.en.id.allData.typeDesc
                self.clickMsg[1] = data.message.en.id.allData.shortName
                self.clickMsg[2] = data.message.en.id.allData.lineGisJosn[0].lng
                self.clickMsg[3] = data.message.en.id.allData.lineGisJosn[0].lat
                self.clickMsg[4] = data.message.en.id.allData.name
                self.dialogVisible = true
            } else if (data.message.en.id.allData.pointName == "摄像头") {
                self.clickMsg[0] = data.message.en.id.allData.pointName
                self.clickMsg[1] = data.message.en.id.allData.name
                self.clickMsg[2] = data.message.en.id.allData.gisJosn[1]
                self.clickMsg[3] = data.message.en.id.allData.gisJosn[0]
                self.clickMsg[4] = data.message.en.id.allData.name
                self.dialogVisible = true
            } else {
                self.clickMsg[0] = data.message.en.id.allData.remarks
                self.clickMsg[1] = data.message.en.id.allData.name
                self.clickMsg[2] = data.message.en.id.allData.gisJosn[1]
                self.clickMsg[3] = data.message.en.id.allData.gisJosn[0]
                self.clickMsg[4] = JSON.stringify(data.message.en.id.allData)
                self.dialogVisible = true

            }

        })

        this.kmtl = new KMTL(this.superApp)
        this.superApp.kmtl = this.kmtl

        this.hideBottom()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
//@import "../style/reset.scss"; //引入方式
@import "../style/dialog.scss"; //引入方式
.el-checkbox {
    color: white !important;
}

.cesium-viewer-navigationContainer {
    position: absolute;
    top: 10px !important;
    right: 0 !important;
}

.finger {
    cursor: pointer
}

.dialogAll {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    color: white;


    .leftviewer {
        width: 60%;
        height: 100%;

        .imgViewer {
            margin-top: 20px;
            width: 100%;
            height: 90%;
        }
    }

    .right11 {
        width: 30%;
        height: 100%;

    }

    .rightList {
        padding: 30px;
        width: 10%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

}

.hello {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: flex-start;

    .showTools {
        z-index: 9999;
        position: absolute;
        left: 10px;
        bottom: 10px;
    }

    .search {
        position: absolute;
        left: 30px;
        top: 30px;
        width: 20%;

        .inline-input {
            width: 100%;
        }
    }


    .active {
        color: #409EFF;
    }

    .disAcitve {
        color: white;
    }

    .rightMenu {
        position: absolute;
        right: 40px;
        top: 140px;
        z-index: 9999;
        color: white;
        width: 15%;
        height: 70%;
        border-radius: 12px;


        .rightMenuInner {
            width: 100%;
            height: 100%;
            background-color: rgba(130, 118, 244, 0.3);
            box-shadow: 5px 5px 5px rgba(140, 118, 244, 0.3);
        }


        .close {
            position: absolute;
            right: -25px;
            bottom: -35px;
        }

        .top11 {
            margin-top: 20px;
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            font-size: 15px;
            margin-left: 20px;

            .menu11 {

                margin: 6px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                .icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                }

                .icon1 {
                    background-image: url("./imgVue/拦阻桩.png");
                    background-size: 100% 100%;
                }

                .icon2 {
                    background-image: url("./imgVue/界碑界桩.png");
                    background-size: 100% 100%;
                }

                .icon3 {
                    background-image: url("./imgVue/桥梁.png");
                    background-size: 100% 100%;
                }

                .icon4 {
                    background-image: url("./imgVue/摄像头.png");
                    background-size: 100% 100%;
                }

                .icon5 {
                    background-image: url("./imgVue/码头.png");
                    background-size: 100% 100%;
                }

                .icon6 {
                    background-image: url("./imgVue/平安版纳检查点.png");
                    background-size: 100% 100%;
                }

                .iconLFS {
                    background-image: url("./imgVue/联防所.png");
                    background-size: 100% 100%;
                }

                .icon7 {
                    background-image: url("./imgVue/网格.png");
                    background-size: 100% 100%;
                }

                .icon8 {
                    background-image: url("./imgVue/防控点.png");
                    background-size: 100% 100%;
                }

                .icon9 {
                    background-image: url("./imgVue/防控段.png");
                    background-size: 100% 100%;
                }
            }
        }

        .subMenu {
            margin-left: 20px;

            .subMenu1All {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;

                .subMenu1 {
                    width: 48%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
            }

        }
    }


    .mapChange {
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 9999;
        color: white;
        font-size: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 360px;
        height: 100px;
        border-radius: 5px;


        .map {
            width: 100px;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 5px;
            position: relative;

            .checkbox {
                padding: 2px;
                background-color: gray;
                position: absolute;
                left: 5px;
                top: 5px;
            }
        }

        .map1 {
            background-image: url("./imgVue/影像地图.png");
            background-size: 100% 100%;
        }

        .map2 {
            background-image: url("./imgVue/倾斜.jpg");
            background-size: 100% 100%;

        }

        .map3 {
            background-image: url("./imgVue/dem.png");
            background-size: 100% 100%;

        }
    }

}


#cesiumContainer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    font-family: sans-serif;
}

#tooltip {
    width: 250px;
    height: 125px;
    padding: 10px;
    position: fixed;
    left: 0;
    top: 0;
    background-image: url("../assets/login.png");
    background-size: 100% 100%;
    font-size: 15px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;

    div {
        border-bottom: 1px solid grey;
    }
}

.vide {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.bottom {
    width: 100%;
    height: 20%;
    z-index: 100;
    position: absolute;
    left: 0;
    bottom: 0;
}


.right {
    width: 15%;
    height: 90%;
    z-index: 99;
    position: absolute;
    right: 0;
    top: calc(6%);
    background-color: rgba(43, 43, 43, 0.5);
}


</style>
