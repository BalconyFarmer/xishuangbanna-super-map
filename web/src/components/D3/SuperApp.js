import * as THREE from 'three'
import Entities from "./Entitys";
import Providers from "@/components/D3/Providers";
import Loaders from "@/components/D3/Loaders";
import Environment from "./Environment"
import Camera from "./Camera";
import Event from "./Event";
import C3Transform from "./C3Transform";
import Img3D from "./Img3D";
import Analyse from "./Analyse";
import Measure from "@/components/D3/Measure";
import Draw from "@/components/D3/Draw";
import Plot from "@/components/D3/Plot";

export default class SuperApp {
    constructor(Cesium) {
        this.Cesium = Cesium
        this.viewer = null
        this.eventCenter = new THREE.EventDispatcher() // 3D事件中心
        this.init()
        this.entities = new Entities(this)
        this.currentEn = null
        this.camera = new Camera(this)
        this.event = new Event(this)
        this.c3Transform = new C3Transform(this)
        this.img3D = new Img3D(this)
        this.analyse = new Analyse(this)
        this.measure = new Measure(this)
        this.draw = new Draw(this)
        this.plot = new Plot(this)
    }

    init() {
        this.viewer = new this.Cesium.Viewer("cesiumContainer");
        this.providers = new Providers(this)
        this.loaders = new Loaders(this)
        this.environment = new Environment(this)
    }

    /**
     * 限制摄像机缩放极限
     */
    limitCamera() {
        // 限制最大最小缩放比例
        // this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 500
        // this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1
    }


    /**
     * 宇宙环境效果
     */
    switchUniverseEffect() {
        this.viewer.scene.skyAtmosphere.show = !this.viewer.scene.skyAtmosphere.show; //大气效果
        this.viewer.scene.sun.show = !this.viewer.scene.sun.show; // 太阳图标,对光效无影响
        this.viewer.scene.skyBox.show = !this.viewer.scene.skyBox.show; // 星星图片,对光效无影响
    }

    openScence() {
        let promise = this.viewer.scene.open('http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace');
    }

    //泛光效果开关
    switchBloom(flag, intensityBloom, thresholdBloom) {
        this.viewer.scene.bloomEffect.show = flag;
        this.viewer.scene.bloomEffect.threshold = thresholdBloom;
        this.viewer.scene.bloomEffect.bloomIntensity = intensityBloom;
    }

    addEffectLine() {
        this.viewer.scene.scanEffect.show = true;
        this.viewer.scene.scanEffect.mode = Cesium.ScanEffectMode.LINE; //改用线状扫描效果
        let pos = new Cesium.Cartesian3(-1272261.6573968176, 5637839.676200524, 2697559.0264047943);
        this.viewer.scene.scanEffect.centerPostion = pos;
        this.viewer.scene.scanEffect._lineWidth = 2;
        this.viewer.scene.scanEffect._speed = 1500;
        this.viewer.scene.scanEffect._period = 1500; // 扫描距离
        this.viewer.scene.scanEffect.color = Cesium.Color.YELLOW;
    }

    addEffectCircle(po) {

        if (!this.viewer.scene.scanEffect.show) {
            this.viewer.scene.scanEffect.show = true; //开启扫描效果
            this.viewer.scene.scanEffect.mode = Cesium.ScanEffectMode.CIRCLE; //利用圆环扫描效果
            this.viewer.scene.scanEffect.centerPostion = po;
            this.viewer.scene.scanEffect.color = Cesium.Color.YELLOW
            this.viewer.scene.scanEffect._period = 2000;
            this.viewer.scene.scanEffect._speed = 5;
            this.viewer.scene.colorCorrection.saturation = 1.0; //饱和度
            this.viewer.scene.colorCorrection.brightness = 20
            this.viewer.scene.colorCorrection.contrast = 1.0; // 对比度
            this.viewer.scene.colorCorrection.hue = 1.0; // 色彩
        } else {
            this.viewer.scene.scanEffect.add(po);// 设置扫描中心点

        }


    }

    addEffectFlowLine(data) {
        //添加动态路线
        this.viewer.entities.add({
            name: 'RED dynamic line',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(data),
                width: 10,
                hMax: 500000,
                material: new Cesium.PolylineDynamicMaterialProperty({
                    color: Cesium.Color.YELLOW,
                    outlineWidth: 0,
                    outlineColor: Cesium.Color.BLACK
                }),
                // clampToGround: true, // 贴地
            }
        });
    }




    /**
     * 改变物体颜色
     */
    changeColor(en) {
        if (en.box) {
            this.currentEn = en
            en.box.material = this.Cesium.Color.YELLOWGREEN.withAlpha(0.5)
        }
    }

    changeColorBack() {
        if (this.currentEn) {
            if (this.currentEn.box) {
                this.currentEn.box.material = this.Cesium.Color.YELLOWGREEN.withAlpha(0.01)
                this.currentEn = null
            }
        }
    }


    /**
     * 地形开挖
     */
    clippingPlane() {
        this.viewer.scene.undergroundMode = true; //设置开启地下场景
        this.viewer.scene.terrainProvider.isCreateSkirt = false; // 关闭裙边
        this.viewer.scene.moon.show = false;

        // 基于倾斜摄影
        const positions = [
            102.72015586507104, 25.019958503207683, 4.720303044336744,
            102.72016137215019, 25.020136482525754, 4.720303044336744,
            102.72021290023538, 25.020145757297662, 4.720303044336744,
            102.72022310795153, 25.019958851933485, 4.720303044336744,
        ]
        let overGroundLayer = this.viewer.scene.layers.find('qxsy');
        overGroundLayer.removeAllExcavationRegion();
        overGroundLayer.addExcavationRegion({ //设置倾斜开挖参数
            position: positions,
            name: 'excavation_' + Math.random(),
            height: 1,
            transparent: false
        });

        // 基于地面
        // 设置地形开挖
        // const positions = [
        //     102.00292473258422, 24.07015600859403,-0.02775759347619571,
        //     102.00356456926964, 24.070058122363992,-0.02775759347619571,
        //     102.00336220386701, 24.069510296952526,-0.02775759347619571,
        // ]
        // this.viewer.scene.globe.removeAllExcavationRegion();
        // this.viewer.scene.globe.addExcavationRegion({
        //     name: 'ggg111',
        //     position: positions,
        //     height: 20,
        //     transparent: false
        // });

    }

    /**
     * 线框白模
     */
    outlineMode() {
        this.viewer.scene.camera.setView({
            destination: new Cesium.Cartesian3(-1582723.045963302, 5317134.832891206, 3147506.8171177055),
            orientation: {
                heading: 3.376613944238855,
                pitch: -0.2719071645433542,
                roll: 6.283172414416338
            }
        });
        let promise = this.viewer.scene.open('http://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace'); //重庆白模，特效用
        const self = this
        Cesium.when.all(promise, function (layers) {
            let layer = self.viewer.scene.layers.find("CQmodel");
            layer.setPBRMaterialFromJSON("./data/WhiteModel.json");
            layer.style3D.fillStyle = Cesium.FillStyle.Fill_And_WireFrame;
            layer.wireFrameMode = Cesium.WireFrameType.EffectOutline;
            let initialColor = "rgba(27,255,0,0.21)";
            layer.style3D.lineColor = Cesium.Color.fromCssColorString(initialColor);
            layer.style3D.lineWidth = 10;
        })

    }

    startLightMode() {
        this.loaders.changeLayerLight(0.5)
        this.switchBloom(true, 1, 0.5)

        const see = this.viewer.imageryLayers._layers.forEach(item => {
            item.brightness = 0.5
        })

    }

    stopLightMode() {
        this.loaders.changeLayerLight(1)
        this.switchBloom(false, 0.9, 0.6)

        const see = this.viewer.imageryLayers._layers.forEach(item => {
            item.brightness = 1
        })
    }



}
