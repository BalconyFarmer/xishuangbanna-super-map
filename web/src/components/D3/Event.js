let FileSaver = require('file-saver');

export default class Event {
    constructor(app) {
        this.app = app
        this.handler = null
        this.clearOriginal()
        this.addEventMouseOver()
        this.addEventClick()
        this.posintsList = []

    }

    /**
     * 手动拖拽 添加模型 获取坐标事件
     * 可拾取后加模型上的点
     */
    startMoveEvent() {
        let self = this;
        const scene = this.app.viewer.scene;
        let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function (movement) {
            let cartesian = self.app.viewer.scene.pickPosition(movement.endPosition);
            if (cartesian) { //能获取，显示坐标
                self.app.eventCenter.dispatchEvent({
                    type: 'geoPosition',
                    message: {position: cartesian}
                })
            } else { //不能获取不显示

            }
        }, this.app.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    //鼠标右键结束事件
    stopMouseMoveEvent() {
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
    }

    // 取消单机双击原始弹窗事件
    clearOriginal() {
        this.app.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
        this.app.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    /**
     * 鼠标悬浮事件
     * TODO耗费性能,待改善
     */
    addEventMouseOver() {
        const self = this
        let currentEntity = null;
        let lastEntity = null;
        this.app.viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
            let pickedFeature = self.app.viewer.scene.pick(movement.endPosition);
            if (self.app.Cesium.defined(pickedFeature)) {
                if (pickedFeature.id != undefined) {
                    const entities = self.app.viewer.dataSources._dataSources[0].entities
                    // const entities = self.app.viewer.entities

                    currentEntity = entities.getById(pickedFeature.id._id);
                    lastEntity = currentEntity;
                    self.app.eventCenter.dispatchEvent({
                        type: 'hoverE',
                        message: {position: movement, en: pickedFeature.id}
                    })
                } else {
                    self.app.eventCenter.dispatchEvent({
                        type: 'hideToolTip',
                        message: {position: null}
                    })
                }
            } else {
                self.app.eventCenter.dispatchEvent({
                    type: 'hideToolTip',
                    message: {position: null}
                })
            }
        }, this.app.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }


    /**
     * entity选取事件
     * 鼠标左键
     */
    addEventClick() {
        const self = this
        let handler = new this.app.Cesium.ScreenSpaceEventHandler(this.app.viewer.scene.canvas);
        handler.setInputAction(function (e) {
            let picker = self.app.viewer.scene.pick(e.position);
            if (picker && picker.id && picker.id._id) {
                self.app.eventCenter.dispatchEvent({
                    type: 'pickEntity',
                    message: {en: picker}
                })
            }
            let cartesian = self.app.viewer.scene.pickPosition(e.position);
            let ellipsoid = self.app.viewer.scene.globe.ellipsoid;
            let cartographic = ellipsoid.cartesianToCartographic(cartesian)
            let lng = self.app.Cesium.Math.toDegrees(cartographic.longitude);//经度值
            let lat = self.app.Cesium.Math.toDegrees(cartographic.latitude);//纬度值
            console.log([lng, lat, cartographic.height],"拾取位置:")
            self.app.eventCenter.dispatchEvent({
                type: 'pickPosition',
                message: {p1: cartesian, p2: cartographic, p3: [lng, lat, cartographic.height]}
            })
            self.app.camera.logCamera()
        }, this.app.Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    startReceivePoints() {
        const self = this
        this.app.eventCenter.addEventListener('pickPosition', function (data) {
            self.posintsList.push(data.message)
        })
    }

    exportReceivePoints() {
        let blob = new Blob([JSON.stringify(this.posintsList)], {type: ""});
        FileSaver.saveAs(blob, "hello world.json");
        this.posintsList = []
    }


}
