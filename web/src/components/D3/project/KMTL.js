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
        }, 500)
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
        this.app.viewer.dataSources.add(
            Cesium.GeoJsonDataSource.load(
                require("../../api/xsbn.json"),
                {
                    stroke: Cesium.Color.BLUE.withAlpha(0.5),
                    strokeWidth: 2.3,
                    fill: Cesium.Color.YELLOW.withAlpha(0.01),
                    clampToGround: true // 防止图层重叠
                }
            )
        );

    }


}
