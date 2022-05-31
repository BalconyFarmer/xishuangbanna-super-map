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

        let p2 = [102.210086, 21.099609]
        this.app.entities.addBillboard(p2, "老挝")

        let p3 = [99.926314, 21.354381]
        this.app.entities.addBillboard(p3, "缅甸")
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
