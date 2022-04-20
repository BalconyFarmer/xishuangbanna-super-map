export default class Loaders {
    constructor(app) {
        this.app = app
        this.Cesium = this.app.Cesium
        this.layer = null // 倾斜摄影模型
    }

    addPhoto() {
        //添加倾斜摄影模型
        function addS3MImg(scene, modelUrl) { //倾斜摄影\
            let promise = scene.addS3MTilesLayerByScp(modelUrl, {
                name: 'qxsy',
            });
            promise.then(layer => {
                const see = layer
                layer.type = 'qxsy'
                layer.name = "Config"
            });
            return promise;
        }

        addS3MImg(this.app.viewer.scene, "http://localhost:8090/iserver/services/3D-YM/rest/realspace/datas/YM/config")

        this.app.viewer.camera.flyTo({// 设置视角
            // 新平
            destination: new this.Cesium.Cartesian3(-1210343.5404420826, 5697775.231491833, 2602070.4192457856),
            orientation: {
                heading: 1.5951202482731537, // east, default value is 0.0 (north) 左右摆头
                pitch: -0.7393918398428792, // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: 6.2831853071795845
            }
        })

    }

    addPhotoCZ() {
        const self = this

        if (self.layer) {
            if (self.layer.visible) {
                self.layer.visible = false
            } else {
                this.app.viewer.camera.flyTo({// 设置视角
                    destination: new Cesium.Cartesian3(-1109419.031647381, 5810716.043483989, 2389591.6044312157,),
                    orientation: {
                        heading: 0.05140801366573289, // east, default value is 0.0 (north) 左右摆头
                        pitch: -0.6223203429673179, // default value (looking down) 上下摆头 -90俯视 0 平视
                        roll: 6.283170042486411
                    }
                })
                self.layer.visible = true
            }
        } else {
            this.app.viewer.camera.flyTo({// 设置视角
                destination: new Cesium.Cartesian3(-1109419.031647381, 5810716.043483989, 2389591.6044312157,),
                orientation: {
                    heading: 0.05140801366573289, // east, default value is 0.0 (north) 左右摆头
                    pitch: -0.6223203429673179, // default value (looking down) 上下摆头 -90俯视 0 平视
                    roll: 6.283170042486411
                }
            })

            //添加倾斜摄影模型
            function addS3MImg(scene, modelUrl) { //倾斜摄影\
                let promise = scene.addS3MTilesLayerByScp(modelUrl, {
                    name: 'qxsy',
                    cullEnabled	: true, // 剔除背面,
                });
                promise.then(layer => {
                    const see = layer.style3D
                    see.bottomAltitude = 40;
                    self.layer = layer
                    layer.type = 'qxsy'
                    layer.name = "Config"
                });

                return promise;
            }

            addS3MImg(this.app.viewer.scene, "http://192.168.1.35:8090/iserver/services/3D-local3DCache-QingXieSheYing/rest/realspace/datas/QX_BN/config")

        }


    }

    /**
     * 摄像头监控范围分析
     */
    addGlb(po) {
        const result = {
            name: '摄像头监控范围分析',
            position: po,
            orientation: this.app.Cesium.Transforms.headingPitchRollQuaternion(po, new this.app.Cesium.HeadingPitchRoll(this.app.Cesium.Math.toRadians(0), 0, 0)),
            model: {
                uri: "http://localhost:8083/3Dstatic/摄像头/路灯.glb",
            }
        }
        this.app.viewer.entities.add(result)
        this.app.addEffectCircle(po)
    }


    /**
     * 改变倾斜摄影亮度
     * @param value 0~1
     */
    changeLayerLight(value) {
        if (this.layer) {
            this.layer.brightness = value
        }
    }

    loadGuan() {
        /*        const scene = this.app.viewer.scene
                let promise = scene.open('http://www.supermapol.com/realspace/services/3D-ChunShuiLvSeGuanDaounknowns3munknown/rest/realspace');
                Cesium.when(promise, function (layer) {
                        //设置相机位置，定位至模型
                        // scene.camera.setView({
                        //     destination: new Cesium.Cartesian3(-2343784.953917227, 4546449.518116666, 3810304.124116188),
                        //     orientation: {
                        //         heading: 4.750885487110618,
                        //         pitch: -0.38228770591445227,
                        //         roll: 1.0480505352461478e-13
                        //     }
                        // });

                        let line = scene.layers.find("纯水绿色管道优化@管线");
                        line.textureUVSpeed = new Cesium.Cartesian2(0, -2);//模型纹理在UV坐标上的运动速度

                        // line.lon = 102.72023936399223
                        // line.lat = 25.0193607017566
                        // line.height = 5
                        let a = new Cesium.Cartesian3(-1272623.7304424632, 5637800.262077626, 2697469.3311685696)
                        line._position = a
                        debugger
                    }
                )*/
        let po = new Cesium.Cartesian3(-1272611.9716454286, 5637762.133672402, 2697550.4195230096)
        const result = {
            name: '地下管网',
            position: po,
            orientation: this.app.Cesium.Transforms.headingPitchRollQuaternion(po, new this.app.Cesium.HeadingPitchRoll(this.app.Cesium.Math.toRadians(-2.8), 0, 0)),
            model: {
                uri: "http://localhost:8083/3Dstatic/地下管网/Electrical+Conduit+Collection.glb",
            }
        }
        this.app.viewer.entities.add(result)
        this.app.clippingPlane()
    }

}
