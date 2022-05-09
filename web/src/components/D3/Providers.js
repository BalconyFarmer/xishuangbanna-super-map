export default class Providers {
    constructor(app) {
        this.app = app
    }

    initTerrainProvider(data) {
        if (data) {
            // 公共网络服务
            // let terrainProvider = new Cesium.CesiumTerrainProvider({
            //     url: 'https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path',
            //     requestWaterMask: true,
            //     requestVertexNormals: true,
            //     isSct: false
            // })

            // 2线上发布修改此处:
            // let url = "http://192.168.1.35:8090/iserver/services/3D-local3DCache-DEMBN/rest/realspace/datas/DEM_BN"
            // let url = "http://118.24.128.22:58090/iserver/services/3D-local3DCache-DEMBN/rest/realspace/datas/DEM_BN"
            let url = "http://localhost:8090/iserver/services/3D-local3DCache-DEMBN/rest/realspace/datas/DEM_BN"

            // 版纳地形服务
            let terrainProvider = new Cesium.CesiumTerrainProvider({
                url: url,
                isSct: true//地形服务源自SuperMap iServer发布时需设置isSct为true
            })
            this.app.viewer.terrainProvider = terrainProvider;
        } else {
            let terrainProviderNull = new Cesium.EllipsoidTerrainProvider();
            this.app.viewer.terrainProvider = terrainProviderNull;
        }
    }

    /**
     * Bing 影像
     */
    initImageryProvider() {
        this.clear()
        // const a = new Cesium.BingMapsImageryProvider({
        //     url: 'https://dev.virtualearth.net',
        //     mapStyle: Cesium.BingMapsStyle.AERIAL,
        //     key: "AksNtgh8bFWZX_9HvRfHw1J_CfUkEvtXKTnvr5gAZu9SdO0HZoFukp9kJIDPz5pd" //由BingMap官网申请的密钥
        // })

        // let url = "http://192.168.1.35:8090/iserver/services/map-agscachev2-IMG/rest/maps/IMG"
        // let url = "http://118.24.128.22:58090/iserver/services/map-agscachev2-IMG/rest/maps/IMG"
        // let url = "http://localhost:8090/iserver/services/map-agscachev2-IMG/rest/maps/IMG"

        let url = this.app.kmtl.superMapUrl + "/iserver/services/map-agscachev2-IMG/rest/maps/IMG"

        var a = new Cesium.SuperMapImageryProvider({
            url: url,
            minimumLevel: 1, maximumLevel: 17
        });

        this.app.viewer.imageryLayers.addImageryProvider(a);
        this.setName("Bing")
        this.getImageryLayers()

        // const see = this.app.viewer.imageryLayers
        // debugger
    }


    /**
     * 天地图 矢量
     */
    tiandiShiliang() {
        this.clear()
        let imageryLayers = this.app.viewer.imageryLayers;
        //添加新的天地图服务
        imageryLayers.addImageryProvider(new Cesium.TiandituImageryProvider({
            mapStyle: Cesium.TiandituMapsStyle["VEC_C"],
            token: '4a00a1dc5387b8ed8adba3374bd87e5e'
        }), 1);
        this.setName("天地图 矢量")
        this.getImageryLayers()
    }

    /**
     * 天地图 影像
     */
    tiandiYingxiang() {
        this.clear()
        let imageryLayers = this.app.viewer.imageryLayers;
        //添加新的天地图服务
        imageryLayers.addImageryProvider(new Cesium.TiandituImageryProvider({
            mapStyle: Cesium.TiandituMapsStyle["IMG_C"],
            token: '4a00a1dc5387b8ed8adba3374bd87e5e'
        }), 1);
        this.setName("天地图 影像")
        this.getImageryLayers()
    }

    clear() {
        let imageryLayers = this.app.viewer.imageryLayers._layers;
        let lay = this.app.viewer.imageryLayers
        if (imageryLayers.length) {
            imageryLayers.forEach(item => {
                if (item.name != "未定义") {
                    lay.remove(item);
                }
            })
        }
    }

    setName(name) {
        const list = this.app.viewer.imageryLayers._layers
        const length = list.length
        list[length - 1].name = name
    }


    getImageryLayers() {
        const data = this.app.viewer.imageryLayers._layers
        data.forEach(item => {
            if (item.hasOwnProperty('name')) {

            } else {
                item.name = "未定义"
            }
        })
        this.app.eventCenter.dispatchEvent(
            {
                type: 'updataLayersList',
                message: data
            }
        )
    }


    /**
     * 天地图 中文标注
     */
    tiandiBiaozhu() {
        let imageryLayers = this.app.viewer.imageryLayers;

        //初始化天地图全球中文注记服务，并添加至影像图层
        // let labelImagery = new Cesium.TiandituImageryProvider({
        //     mapStyle: Cesium.TiandituMapsStyle.CIA_C, //天地图全球中文注记服务（经纬度投影）
        //     token: '4a00a1dc5387b8ed8adba3374bd87e5e'
        // });

        // let url= "http://192.168.1.35:8090/iserver/services/map-agscache-IMGLABBN/rest/maps/IMG_LAB_BN"
        // let url= "http://118.24.128.22:58090/iserver/services/map-agscache-IMGLABBN/rest/maps/IMG_LAB_BN"
        // let url= "http://localhost:8090/iserver/services/map-agscache-IMGLABBN/rest/maps/IMG_LAB_BN"

        let url = this.app.kmtl.superMapUrl + "/iserver/services/map-agscache-IMGLABBN/rest/maps/IMG_LAB_BN"

        var labelImagery = new Cesium.SuperMapImageryProvider({
            url: url
        });

        imageryLayers.addImageryProvider(labelImagery);
        this.setName("天地图 中文标注")
        this.getImageryLayers()
    }

}
