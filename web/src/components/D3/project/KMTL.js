/**
 * 西双版纳
 */
export default class KMTL {
    constructor(app) {
        this.app = app
        this._stationsArr = []
        // 1线上发布修改此处:
        // this.superMapUrl = "http://192.168.1.35:8090"
        // this.superMapUrl = "http://118.24.128.22:58090"
        this.superMapUrl = "http://localhost:8090"
        this.run()

    }

    run() {
        this.app.viewer.camera.flyTo({// 设置视角
            destination: new Cesium.Cartesian3(-1154679.1644604944, 6108418.07933421, 2213694.888257155,),
            orientation: {
                heading: 0.03052656365464479, // east, default value is 0.0 (north) 左右摆头
                pitch: -0.7766662883680353, // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: 6.28316849471279
            }
        })


        const self = this
        setTimeout(function () {
            self.app.providers.initImageryProvider()
            self.app.providers.tiandiBiaozhu()
            self.app.limitCamera()
            self.loadJson()
            self.addRegionNameManual()
        }, 500)

    }

    /**
     * 老挝 缅甸 普洱
     */
    addRegionNameManual() {
        let p1 = [100.966011, 22.825229]

        let puer = [
            {
                name: "普洱市",
                location: [100.966011, 22.825229]
            },
            {
                name: "思茅区",
                location: [100.97692, 22.78684]
            },
            {
                name: "宁洱哈尼族彝族自治县",
                location: [101.04539, 23.06167]
            },
            {
                name: "墨江哈尼族自治县",
                location: [101.69223, 23.43185]
            },
            {
                name: "景东彝族自治县",
                location: [100.8339, 24.44697]
            },
            {
                name: "景谷傣族彝族自治县",
                location: [100.7029, 23.49704]
            },
            {
                name: "镇沅彝族哈尼族拉祜族自治县",
                location: [101.10843, 24.00461]
            },
            {
                name: "江城哈尼族彝族自治县",
                location: [101.86237, 22.58518]
            },
            {
                name: "孟连傣族拉祜族佤族自治县",
                location: [99.58441, 22.32911]
            },
            {
                name: "孟连傣族拉祜族佤族自治县",
                location: [99.93208, 22.55577]
            },
            {
                name: "孟连傣族拉祜族佤族自治县",
                location: [99.59018, 22.64435]
            },
        ]

        puer.forEach(item => {
            this.app.entities.addBillboard(item.location, item.name)
        })


        let laowo = [
            {
                name: "老挝",
                location: [102.210086, 21.099609]
            },
            {
                name: "永珍",
                location: [102.6, 17.97]
            },
            {
                name: "巴色",
                location: [105.780000, 15.120000]
            },
            {
                name: "凯山丰威汉市",
                location: [104.75, 16.57]
            },
            {
                name: "琅勃拉邦",
                location: [102.14, 19.89]
            },
            {
                name: "山姆怒",
                location: [104.05, 20.42,]
            },
            {
                name: "沙耶武里",
                location: [101.75, 19.25,]
            },
            {
                name: "他曲",
                location: [104.83, 17.41]
            },
            {
                name: "北汕",
                location: [103.66, 18.38]
            },
            {
                name: "会晒",
                location: [100.43, 20.26]
            },
            {
                name: "丰沙里",
                location: [102.10, 21.68]
            },
            {
                name: "阿速坡",
                location: [106.83, 14.80]
            },
            {
                name: "琅南塔",
                location: [101.40, 20.95]
            },
            {
                name: "塞公",
                location: [106.72, 15.34]
            },
        ]
        laowo.forEach(item => {
            this.app.entities.addBillboard(item.location, item.name)
        })

        let miandian = [
            {
                name: "缅甸",
                location: [99.926314, 21.354381]
            },
            {
                name: "仰光",
                location: [96.9, 16.48]
            },
            {
                name: "曼德勒",
                location: [96.09676572626198, 21.938616404728112,]
            },
            {
                name: "奈比多",
                location: [96.07879664241246, 19.75952020245242]
            },
            {
                name: "東枝",
                location: [97.03886237688157, 20.798962345761073]
            },
            {
                name: "毛淡棉",
                location: [97.6607348637817, 16.467064263236395,]
            },
            {
                name: "勃固",
                location: [96.45673411231651, 17.3244070894151,]
            },
            {
                name: "蒙育瓦",
                location: [95.16156820647811, 22.118998931127706,]
            }, {
                name: "密支那",
                location: [97.36953145878888, 25.405649317200446,]
            }, {
                name: "勃生",
                location: [94.74862379461064, 16.781459955924717,]
            }, {
                name: "實兌",
                location: [92.86159671044213, 20.17197169431312,]
            }, {
                name: "卑谬",
                location: [95.25251797415798, 18.833664013215195,]
            }, {
                name: "木各具",
                location: [95.06508291848091, 21.339384340903017,]
            }, {
                name: "丹老",
                location: [98.6304266129126, 12.449620239423682,]
            }, {
                name: "密铁拉",
                location: [95.86899646429028, 20.88091189140574,]
            },
        ]

        miandian.forEach(item => {
            this.app.entities.addBillboard(item.location, item.name)
        })

    }

    change3DPhoto() {
        this.app.loaders.addPhotoCZ()
    }

    change2D3D(data) {
        if (data == "2D") {
            this.app.providers.initTerrainProvider(false)
            this.app.providers.initImageryProvider()
            this.app.providers.tiandiBiaozhu()
        } else {
            this.app.providers.initTerrainProvider(true)
            this.app.providers.initImageryProvider()
            this.app.providers.tiandiBiaozhu()
        }
    }

    loadJson() {
        // this.app.viewer.dataSources.add(
        //     Cesium.GeoJsonDataSource.load(
        //         require("../../api/xsbn.json"),
        //         {
        //             stroke: Cesium.Color.BLUE.withAlpha(0.5),
        //             strokeWidth: 2.3,
        //             fill: Cesium.Color.YELLOW.withAlpha(0.01),
        //             clampToGround: true // 防止图层重叠
        //         }
        //     )
        // );

    }


}
