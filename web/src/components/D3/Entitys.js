export default class Entities {
    constructor(app) {
        this.app = app
        this.Cesium = this.app.Cesium
        this.jingGai = null
        this.luDeng = null
        this.camera = null
        this.floor = null
        this.dataSource = new Cesium.CustomDataSource('myData');
        this.initCluster()
    }

    initCluster() {
        this.dataSource.clustering.enabled = true

        this.dataSource.clustering.clusterBillboards = true
        this.dataSource.clustering.clusterLabels = true
        this.dataSource.clustering.clusterPoints = true

        this.dataSource.clustering.shows = false
        this.dataSource.clustering.pixelRange = 15;
        this.dataSource.clustering.minimumClusterSize = 2
        this.app.viewer.dataSources.add(this.dataSource);
    }

    /**
     * 添加井盖
     */
    addGeoJingGai(position) {
        if (position) {
            let _po = null
            if (position) {
                _po = this.app.c3Transform.longToC3(parseFloat(position[0]), parseFloat(position[1]), parseFloat(position[2]))
            } else {
                _po = new this.app.Cesium.Cartesian3(-1272613.7331338495, 5637769.579702072, 2697535.446983366)
            }
            const metarial = new this.app.Cesium.GridMaterialProperty({
                color: this.app.Cesium.Color.YELLOW,
                cellAlpha: 0.2,
                lineCount: new this.app.Cesium.Cartesian2(4, 4),
                lineThickness: new this.app.Cesium.Cartesian2(2.0, 2.0)
            })
            this.jingGai = this.app.viewer.entities.add({
                name: '井盖1号',
                messageObj: {
                    type: "井盖",
                    data: [
                        "井盖位置信息: xxxxxxxxx",
                        "所属单位: xxxxxxxxx",
                        "保管人: xxxxxxxxx",
                    ]
                },
                position: _po,
                scale: 100.0,
                cylinder: {
                    length: 0.2,//圆柱体高度
                    topRadius: 0.5,//圆柱体的顶部半径。
                    bottomRadius: 0.5,//    圆柱体底部的半径。
                    material: metarial,
                    outline: false,//轮廓
                    outlineColor: this.app.Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
                }
            })
        }
    }

    clearAllJingGai() {
        this.app.viewer.entities.values.forEach(item => {
            if (item._messageObj) {
                if (item._messageObj.type == "井盖") {
                    this.app.viewer.entities.remove(item)
                    console.log("删除成功!!!")
                }
            }
        })
    }

    seeJingGai() {
        this.app.viewer.zoomTo(this.jingGai)
    }

    /**
     * 添加路灯
     */
    addStreetlight() {
        this.luDeng = this.app.viewer.entities.add({
            name: '路灯1号',
            messageObj: {
                type: "路灯",
                data: [
                    "路灯位置信息: xxxxxxxxx",
                    "所属单位: xxxxxxxxx",
                    "保管人: xxxxxxxxx",
                ]
            },
            position: new this.app.Cesium.Cartesian3(-1272632.8788131457, 5637767.141621569, 2697532.848545079),

            cylinder: {
                length: 20,//圆柱体高度
                topRadius: 0.5,//圆柱体的顶部半径。
                bottomRadius: 0.5,//    圆柱体底部的半径。
                material: this.app.Cesium.Color.BLUE.withAlpha(0.5),
                outline: false,//轮廓
                outlineColor: this.app.Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
            }
        })
    }

    seeLudeng() {
        this.app.viewer.zoomTo(this.luDeng)
    }

    /**
     * 添加摄像头
     */
    addCamera() {
        this.camera = this.app.viewer.entities.add({
            name: '摄像头0号',
            messageObj: {
                type: "摄像头",
                data: [
                    "摄像头位置信息: xxxxxxxxx",
                    "所属单位: xxxxxxxxx",
                    "保管人: xxxxxxxxx",
                ]
            },
            position: new this.app.Cesium.Cartesian3(-1272623.8131130778, 5637768.488109038, 2697533.1346111763),
            cylinder: {
                length: 10,//圆柱体高度
                topRadius: 0.5,//圆柱体的顶部半径。
                bottomRadius: 0.5,//    圆柱体底部的半径。
                material: this.app.Cesium.Color.BLUE.withAlpha(0.5),
                outline: false,//轮廓
                outlineColor: this.app.Cesium.Color.DARK_GREEN,//轮廓颜色深绿色
            }
        })
    }

    seeCamera() {
        this.app.viewer.zoomTo(this.camera)

    }

    /**
     * 添加楼层
     */
    addFloor() {
        let lon = 102.72141
        let lat = 25.01967
        let height = 20
        let material = this.app.Cesium.Color.YELLOWGREEN.withAlpha(0.01)
        let rollData = 84.9
        let dimensions = new this.app.Cesium.Cartesian3(40, 10, 3) // 长宽高
        this.floor = this.app.viewer.entities.add({
            name: 'floor1',
            messageObj: {
                type: "一标三实floor1",
                data: [
                    "标准地址: 宜兴市区 (**路、巷) (**号) → 单元室 **号(**室) ↘ * *",
                    "实有人口: 100",
                    "实有房屋: 实有房屋是指已建成并达到入住或使用条件的、含自有（私有）房屋在内的各类房屋。",
                    "实有单位: xxxxxxxxx",
                ]
            },
            position: this.app.Cesium.Cartesian3.fromDegrees(lon, lat, height),
            orientation: this.Cesium.Transforms.headingPitchRollQuaternion(
                this.app.Cesium.Cartesian3.fromDegrees(lon, lat, height),
                new this.Cesium.HeadingPitchRoll(this.Cesium.Math.toRadians(rollData), 0, 0)
            ),
            box: {
                dimensions: dimensions,
                material: material,
                outline: false, //显示轮廓
                outlineColor: this.app.Cesium.Color.BLACK
            }
        })

        this.app.viewer.entities.add({
            name: 'floor2',
            messageObj: {
                type: "一标三实floor2",
                data: [
                    "标准地址: 宜兴市区 (**路、巷) (**号) → 单元室 **号(**室) ↘ * *",
                    "实有人口: 100",
                    "实有房屋: 实有房屋是指已建成并达到入住或使用条件的、含自有（私有）房屋在内的各类房屋。",
                    "实有单位: xxxxxxxxx",
                ]
            },
            position: this.app.Cesium.Cartesian3.fromDegrees(lon, lat, (height + 3)),
            orientation: this.Cesium.Transforms.headingPitchRollQuaternion(
                this.app.Cesium.Cartesian3.fromDegrees(lon, lat, height),
                new this.Cesium.HeadingPitchRoll(this.Cesium.Math.toRadians(rollData), 0, 0)
            ),
            box: {
                dimensions: dimensions,
                material: material,
                outline: false, //显示轮廓
                outlineColor: this.app.Cesium.Color.BLACK
            }
        })

        this.app.viewer.entities.add({
            name: 'floor3',
            messageObj: {
                type: "一标三实floor3",
                data: [
                    "标准地址: 宜兴市区 (**路、巷) (**号) → 单元室 **号(**室) ↘ * *",
                    "实有人口: 100",
                    "实有房屋: 实有房屋是指已建成并达到入住或使用条件的、含自有（私有）房屋在内的各类房屋。",
                    "实有单位: xxxxxxxxx",
                ]
            },
            position: this.app.Cesium.Cartesian3.fromDegrees(lon, lat, (height + 6)),
            orientation: this.Cesium.Transforms.headingPitchRollQuaternion(
                this.app.Cesium.Cartesian3.fromDegrees(lon, lat, height),
                new this.Cesium.HeadingPitchRoll(this.Cesium.Math.toRadians(rollData), 0, 0)
            ),
            box: {
                dimensions: dimensions,
                material: material,
                outline: false, //显示轮廓
                outlineColor: this.app.Cesium.Color.BLACK
            }
        })

        this.app.viewer.entities.add({
            name: 'floor4',
            messageObj: {
                type: "一标三实floor4",
                data: [
                    "标准地址: 宜兴市区 (**路、巷) (**号) → 单元室 **号(**室) ↘ * *",
                    "实有人口: 100",
                    "实有房屋: 实有房屋是指已建成并达到入住或使用条件的、含自有（私有）房屋在内的各类房屋。",
                    "实有单位: xxxxxxxxx",
                ]
            },
            position: this.app.Cesium.Cartesian3.fromDegrees(lon, lat, (height + 9)),
            orientation: this.Cesium.Transforms.headingPitchRollQuaternion(
                this.app.Cesium.Cartesian3.fromDegrees(lon, lat, height),
                new this.Cesium.HeadingPitchRoll(this.Cesium.Math.toRadians(rollData), 0, 0)
            ),
            box: {
                dimensions: dimensions,
                material: material,
                outline: false, //显示轮廓
                outlineColor: this.app.Cesium.Color.BLACK
            }
        })
    }

    seeFloor() {
        this.app.viewer.zoomTo(this.floor)
    }

    /**
     * 广场
     */
    addFlowWall1() {

        let potArray = [
            102.72123296454465, 25.019233537444002, 15.0,
            102.71936001745664, 25.018871319775762, 15.0,
            102.71924188067183, 25.019940691126926, 15.0,
            102.72108926111854, 25.02020094833207, 15.0,
            102.72123075416829, 25.019247708779304, 15.0,
        ];

        this._addFlowWall(potArray)

        const aim1 = {
            x: -1272812.2637932538,
            y: 5637764.93686053,
            z: 2697744.4886171524,
            heading: 3.787830892927075,
            pitch: -0.42833078619910037,
            roll: 6.283171667993038,
            duration: 2,
        }
        this.app.camera.cameraFlyToCartesian3(aim1)
    }

    /**
     * 站台
     */
    addFlowWall2() {
        const potArray = [
            102.72106850173836, 25.017353932114546, 30.0,
            102.71978307289815, 25.01725574985572, 30.0,
            102.71972587668236, 25.018389043080685, 30.0,
            102.72096054951663, 25.018511269014432, 30.0,
            102.72106850173836, 25.017363932114546, 30.0,
        ]
        this._addColorChangeWall(potArray)
        const aim1 = {
            x: -1273001.8898821915,
            y: 5638089.851679553,
            z: 2697223.3966906723,
            heading: 5.391604336086971,
            pitch: -0.5376487810994091,
            roll: 6.283170862419514,
            duration: 2,
        }
        this.app.camera.cameraFlyToCartesian3(aim1)
    }


    /**
     * 加载流动墙效果
     * 参考: https://blog.csdn.net/supermapsupport/article/details/109594395
     */
    _addFlowWall(potArray) {
        this.clearWall()

        let minHeights = [];
        let maxHeights = [];
        let minH2 = [];

        for (let i = 0; i < potArray.length / 3; i++) {
            minHeights.push(Math.floor(potArray[i * 3 + 2]));
            if (minH2[i - 1] && Math.floor(potArray[i * 3 + 2]) !== minH2[i - 1]) {
                minH2[i] = minH2[i - 1];
            } else {
                minH2[i] = Math.floor(potArray[i * 3 + 2])
            }
        }
        for (let i = 0; i < potArray.length / 3; i++) {
            maxHeights.push(potArray[i * 3 + 2] + 20)
        }

        let viewer = this.app.viewer

        let wall_2 = viewer.entities.add({
            wall: {
                positions: new Cesium.Cartesian3.fromDegreesArrayHeights(potArray),
                minimumHeights: minHeights,
                maximumHeights: maxHeights,
                material: Cesium.Color.YELLOW.withAlpha(0.3)
            }
        });

        let wall_3 = viewer.entities.add({
            wall: {
                positions: new Cesium.Cartesian3.fromDegreesArrayHeights(potArray),
                minimumHeights: minHeights,
                maximumHeights:
                    new Cesium.CallbackProperty(function () {
                        for (let i = 0; i < minH2.length; i++) {
                            minH2[i] += 0.8;
                            if (minH2[i] >= 30) {
                                minH2[i] = 16.0;
                            }
                        }
                        return minH2;
                    }, false),
                material: Cesium.Color.YELLOW.withAlpha(0.5)
            }
        });

    }

    /**
     * 颜色渐变墙
     */
    _addColorChangeWall(potArray) {
        let viewer = this.app.viewer

        let alp = 1;
        let num = 0;

        let minHeights = [];
        let maxHeights = [];
        for (let i = 0; i < potArray.length / 3; i++) {
            minHeights.push(potArray[i * 3 + 2])
        }
        for (let i = 0; i < potArray.length / 3; i++) {
            maxHeights.push(potArray[i * 3 + 2] + 30)
        }
        let fenceEntity = viewer.entities.add({
            wall: {
                positions: new Cesium.Cartesian3.fromDegreesArrayHeights(potArray),
                // minimumHeights: minHeights,
                // maximumHeights: maxHeights,
                material: new Cesium.ImageMaterialProperty({
                    image: "./img/jianbian.png",
                    transparent: true,
                    color: new Cesium.CallbackProperty(function () {
                        if ((num % 2) === 0) {
                            alp -= 0.05;
                        } else {
                            alp += 0.05;
                        }

                        if (alp <= 0.5) {
                            num++;
                        } else if (alp >= 1) {
                            num++;
                        }
                        return Cesium.Color.RED.withAlpha(alp)
                        //entity的颜色透明 并不影响材质，并且 entity也会透明
                    }, false)
                })
            }
        });
    }

    clearWall() {
        let entitys = this.app.viewer.entities._entities._array;
        for (let i = 0; i < entitys.length; i++) {
            if (entitys[i]._name === "WallTrail") {
                this.app.viewer.entities.remove(entitys[i]);
                i--;
            }
        }
    }

    /**
     * 添加警员图标
     */
    addIcon1(pointS, type, name, showFlag, allData) {

        // let entitys = this.app.viewer.entities
        let entitys = this.dataSource.entities

        const _po = this.app.c3Transform.longToC3(parseFloat(pointS[0]), parseFloat(pointS[1]), parseFloat(pointS[2]) + 100)

        const result = entitys.add({
            type: showFlag,
            name: name,
            allData: allData,
            position: _po,
            billboard: {
                image: require("./img/" + type),
                width: 60,
                height: 60,
                scale: 1,
                pixelOffset: new Cesium.Cartesian2(0, 40),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //CLAMP_TO_GROUND   RELATIVE_TO_GROUND
                clampToGround: true,

            },
            // 文字
            label: {
                classificationType: Cesium.ClassificationType.BOTH,
                // 文本。支持显式换行符“ \ n”
                text: (name),
                // 字体样式,以CSS语法指定字体
                font: '14pt Source Han Sans CN',
                // 字体颜色
                fillColor: this.app.Cesium.Color.WHITE,
                // 背景颜色
                // backgroundColor: this.app.Cesium.Color.BLACK.withAlpha(0.5),
                // 是否显示背景颜色
                // showBackground: true,
                // 字体边框
                outline: false,
                // 字体边框颜色
                outlineColor: this.app.Cesium.Color.BLACK,
                // 字体边框尺寸
                outlineWidth: 10,
                // 应用于图像的统一比例。比例大于会1.0放大标签,而比例小于会1.0缩小标签。
                scale: 1.0,
                // 设置样式：FILL：填写标签的文本,但不要勾勒轮廓；OUTLINE：概述标签的文本,但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
                style: this.app.Cesium.LabelStyle.FILL_AND_OUTLINE,
                // 相对于坐标的水平位置
                verticalOrigin: this.app.Cesium.VerticalOrigin.CENTER,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                // 相对于坐标的水平位置
                horizontalOrigin: this.app.Cesium.HorizontalOrigin.CENTER,
                // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
                pixelOffset: new this.app.Cesium.Cartesian2(0, -40),
                // 是否显示
                show: true,
                clampToGround: true,

            }
        })

        // entitys.add({
        //     type: showFlag,
        //     name: name,
        //     allData: allData,
        //     position: _po,
        //     billboard: {
        //         image: require("./img/" + type),
        //         width: 60,
        //         height: 60,
        //         scale: 1,
        //         pixelOffset: new Cesium.Cartesian2(0, 40),
        //         verticalOrigin: Cesium.VerticalOrigin.BOTTOM,//贴地属性
        //     },
        //     // 文字
        //     label: {
        //         // 文本。支持显式换行符“ \ n”
        //         text: (name),
        //         // 字体样式,以CSS语法指定字体
        //         font: '14pt Source Han Sans CN',
        //         // 字体颜色
        //         fillColor: this.app.Cesium.Color.WHITE,
        //         // 背景颜色
        //         backgroundColor: this.app.Cesium.Color.BLACK.withAlpha(0.5),
        //         // 是否显示背景颜色
        //         showBackground: true,
        //         // 字体边框
        //         outline: false,
        //         // 字体边框颜色
        //         outlineColor: this.app.Cesium.Color.BLACK,
        //         // 字体边框尺寸
        //         outlineWidth: 10,
        //         // 应用于图像的统一比例。比例大于会1.0放大标签,而比例小于会1.0缩小标签。
        //         scale: 1.0,
        //         // 设置样式：FILL：填写标签的文本,但不要勾勒轮廓；OUTLINE：概述标签的文本,但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
        //         style: this.app.Cesium.LabelStyle.FILL_AND_OUTLINE,
        //         // 相对于坐标的水平位置
        //         verticalOrigin: this.app.Cesium.VerticalOrigin.CENTER,
        //         // 相对于坐标的水平位置
        //         horizontalOrigin: this.app.Cesium.HorizontalOrigin.CENTER,
        //         // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
        //         pixelOffset: new this.app.Cesium.Cartesian2(0, -40),
        //         // 是否显示
        //         show: true
        //     }
        // });


        // return result
    }

    /**
     * 发光线
     */
    addLine(p1, p2) {
        let viewer = this.app.viewer
        const _a = viewer.entities.add({ // 用于打底的线
            polyline: {
                positions: [p1, p2],
                width: 0.5, // 线的宽度，像素为单位
                material: Cesium.Color.fromCssColorString("rgba(118, 233, 241, 0.1)")
            }
        });

        const _b = viewer.entities.add({ // 尾迹线
            polyline: {
                positions: [p1, p2],
                width: 4, // 线的宽度，像素为单位
                material: new Cesium.PolylineTrailMaterialProperty({ // 尾迹线材质
                    color: Cesium.Color.YELLOW.withAlpha(0.9),
                    trailLength: 0.5,
                    period: 1.0
                })
            }
        });

        return [_a, _b]
    }

    addLineReal(arr, allData, type) {

        let entitys = this.app.viewer.entities
        // let entitys = this.dataSource.entities

        let color = Cesium.Color.fromRandom()
        const _a = entitys.add({ // 用于打底的线
            name: type,
            allData: allData,
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(arr),
                width: 5, // 线的宽度，像素为单位
                material: color,
                clampToGround: true,
                allData: allData,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
        });

        const result = entitys.add({
            allData: allData,
            position: Cesium.Cartesian3.fromDegreesArray([allData.lineGisJosn[0].lng, allData.lineGisJosn[0].lat])[0],
            name: type,
            // 文字
            label: {
                text: (allData.typeDesc),
                fillColor: color,
                backgroundColor: this.app.Cesium.Color.WHITE.withAlpha(0.9),
                showBackground: true,
                outline: false,
                outlineColor: this.app.Cesium.Color.BLACK,
                outlineWidth: 5,
                scale: 0.5,
                style: this.app.Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: this.app.Cesium.VerticalOrigin.CENTER,
                horizontalOrigin: this.app.Cesium.HorizontalOrigin.CENTER,
                pixelOffset: new this.app.Cesium.Cartesian2(0, -20),
                show: true,
                clampToGround: true,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,


            }
        })
    }

    /**
     * 网格
     * @param arr
     * @param allData
     */
    addLineRealGrid(arr, allData, type) {
        let entitys = this.app.viewer.entities
        // let entitys = this.dataSource.entities

        let color = Cesium.Color.fromRandom()
        const _a = entitys.add({ // 用于打底的线
            name: type,
            allData: allData,
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(arr),
                width: 5, // 线的宽度，像素为单位
                material: color,
                clampToGround: true,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

            },
        });

        const result = entitys.add({
            allData: allData,
            position: Cesium.Cartesian3.fromDegreesArray([allData.gisJosn[0][1], allData.gisJosn[0][0]])[0],
            name: type,

            // 文字
            label: {
                text: (allData.propertiesDesc),
                fillColor: color,
                backgroundColor: this.app.Cesium.Color.WHITE.withAlpha(0.9),
                showBackground: true,
                outline: false,
                outlineColor: this.app.Cesium.Color.BLACK,
                outlineWidth: 5,
                scale: 0.5,
                style: this.app.Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: this.app.Cesium.VerticalOrigin.CENTER,
                horizontalOrigin: this.app.Cesium.HorizontalOrigin.CENTER,
                pixelOffset: new this.app.Cesium.Cartesian2(0, -20),
                show: true,
                clampToGround: true,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

            }
        })
    }
}
