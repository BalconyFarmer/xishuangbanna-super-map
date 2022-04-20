export default class Camera {
    constructor(app) {
        this.app = app
    }

    cameraFlyToCartesian3(aim) {
        let cartesian3 = new this.app.Cesium.Cartesian3(aim.x, aim.y, aim.z)
        this.app.viewer.camera.flyTo({
            destination: cartesian3,
            orientation: {
                heading: aim.heading, // east, default value is 0.0 (north) 左右摆头
                pitch: aim.pitch, // default value (looking down) 上下摆头 -90俯视 0 平视
                roll: aim.roll // default value
            },
            duration: aim.duration, // 飞行时长
        })
    }

    /**
     let destination = new Cesium.Cartesian3(-1278012.7779655328, 5638069.272718931, 2716991.871898888)
     let orientation = {
                      heading: 3.5091319753181747,
                      pitch: -0.5313066040203878,
                      roll: 6.283170929636963
                  }
     let center = new Cesium.Cartesian3(-1272621.4650701054, 5637791.870587439, 2697489.3912775414)
     */
    cameraFlyCircle(destination, orientation, center) {
        this.app.viewer.camera.flyTo({
            destination: destination,
            orientation: orientation
        });

        this.app.viewer.camera.flyCircle(center);
        this.app.viewer.camera.flyCircleLoop = false
    }

    /**
     * 打印相机位置
     */
    logCamera() {
/*        console.log("+++++++++++++++++++++++++++++++++++")
        console.log("positionL:", this.app.viewer.camera.position)
        console.log("heading:", this.app.viewer.camera.heading)
        console.log("pitch:", this.app.viewer.camera.pitch)
        console.log("roll:", this.app.viewer.camera.roll)
        console.log("+++++++++++++++++++++++++++++++++++")*/
    }


}
