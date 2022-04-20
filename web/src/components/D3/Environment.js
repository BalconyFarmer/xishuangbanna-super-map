export default class Environment {
    constructor(app) {
        this.app = app
    }

    /**
     * 地球显示隐藏
     */
    switchEarth() {
        if (this.app.viewer.scene.globe.show) {
            this.app.viewer.scene.globe.show = false;
        } else {
            this.app.viewer.scene.globe.show = true;
        }
    }

    /**
     * 太阳光显示隐藏
     */
    switchSun() {
        if (this.app.viewer.scene.sun.show) {
            this.app.viewer.scene.sun.show = false;
            this.app.viewer.scene.globe.enableLighting = false;
        } else {
            this.app.viewer.scene.sun.show = true;
            this.app.viewer.scene.globe.enableLighting = true;
        }
    }

    // 设置环境光的强度
    adjustLight() {
        this.app.viewer.shadows = true
        this.app.viewer.scene.lightSource.ambientLightColor = new Cesium.Color(1, 1, 1, 0);

        /*        let position1 = new Cesium.Cartesian3.fromDegrees(102.9936157250198, 25.07094882568467, 1469.0700774320724);
                let targetPosition1 = new Cesium.Cartesian3.fromDegrees(101.9936157250198, 24.07094882568467, 1469.0700774320724);

                let dirLightOptions = {
                    targetPosition: targetPosition1,
                    color: new Cesium.Color(1.0, 1.1, 1.3, 1),
                    //长条形景观的数据（数据的纹理没有使用烘焙纹理，可以通过光线来制造明暗，排除烘焙的干扰）
                    intensity: 100
                };

                // 获取平行光源。
                let directionalLight_1 = new Cesium.DirectionalLight(position1, dirLightOptions);
                this.viewer.scene.addLightSource(directionalLight_1);*/
    }
}
