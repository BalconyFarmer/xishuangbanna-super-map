export default class C3Transform {
    constructor(app) {
        this.app = app
    }


    /**
     * 经纬度转世界坐标
     */
    longToC3(longitude, latitude, height) {
        let ellipsoid = this.app.viewer.scene.globe.ellipsoid
        let cartographic = this.app.Cesium.Cartographic.fromDegrees(longitude, latitude, height)
        let cartesian3 = ellipsoid.cartographicToCartesian(cartographic)
        return cartesian3
    }

    // 世界坐标转换为经纬度
    c3ToLong(cartesian3) {
        let ellipsoid = this.app.viewer.scene.globe.ellipsoid;
        let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
        let lat = this.app.Cesium.Math.toDegrees(cartographic.latitude);
        let lng = this.app.Cesium.Math.toDegrees(cartographic.longitude);
        return [lng, lat, cartographic.height]
    }

    degreesToGraphc(longitude, latitude, height) {
        let cartographic = this.app.Cesium.Cartographic.fromDegrees(longitude, latitude, height)
        return cartographic
    }

    graphcToDree(latitude, longitude, height) {
        let lat = this.app.Cesium.Math.toDegrees(latitude);
        let lng = this.app.Cesium.Math.toDegrees(longitude);
        return [lat, lng, height]
    }

    addHeight(c3,value) {
        const newV = this.c3ToLong(c3)
        let newC3 = this.longToC3(newV[0],newV[1],(newV[2] + value))
        return newC3
    }



}
