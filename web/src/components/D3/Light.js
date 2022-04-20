export default class Light {
    constructor(app) {
        this.app = app
    }

    /**
     * 开启全局灯光
     */
    startGlobeLight () {
        this.app.viewer.scene.globe.enableLighting = true;//开启场景光照
    }
}
