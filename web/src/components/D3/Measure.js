export default class Measure {
    constructor(app) {
        this.app = app
        this.handlerDis = null
        this.handlerArea = null
        this.setHypFlag = null
    }

    measureDistance() {
        let viewer = this.app.viewer
        let clampMode = 0; // 空间模式
        let lineHeight = null
        let pickPointEnabled = false

        //初始化测量距离
        let handlerDis = new this.app.Cesium.MeasureHandler(viewer, this.app.Cesium.MeasureMode.Distance, clampMode);
        this.handlerDis = handlerDis
        //注册测距功能事件
        handlerDis.measureEvt.addEventListener(function (result) {
            let dis = Number(result.distance);
            // let selOptV = $("#selOpt").val();
            let selOptV = 1;
            let positions = result.positions;
            if (selOptV == 3 || selOptV == 4) {
                dis = Number(calcClampDistance(positions));
            }
            let distance = dis > 1000 ? (dis / 1000).toFixed(2) + 'km' : dis.toFixed(2) + 'm';
            handlerDis.disLabel.text = '距离:' + distance;

        });
        handlerDis.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
                viewer.scene.pickPointEnabled = pickPointEnabled;
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
                viewer.scene.pickPointEnabled = false;
            }
        });

        //椭球贴地距离
        function calcClampDistance(positions) {
            let lonlat = [];
            let value = 0;
            for (let i = 0; i < positions.length; i++) {
                let cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
                let lon = Cesium.Math.toDegrees(cartographic.longitude);

                let lat = Cesium.Math.toDegrees(cartographic.latitude);
                lonlat.push(lon, lat);
            }

            let gemetry = new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray(lonlat)
            });


            let selOptV = $("#selOpt").val();
            if (selOptV == 3) {
                value = scene.globe.computeSurfaceDistance(gemetry, Cesium.Ellipsoid.CGCS2000);

            } else if (selOptV == 4) {
                value = scene.globe.computeSurfaceDistance(gemetry, Cesium.Ellipsoid.XIAN80);
            }
            return value;
        }

        function deactiveAll() {
            handlerDis && handlerDis.deactivate();
            // handlerArea && handlerArea.deactivate();
            // handlerHeight && handlerHeight.deactivate();
            lineHeight = -10000;
        }

        deactiveAll();

        handlerDis && handlerDis.activate();

    }

    measureArea() {
        let viewer = this.app.viewer
        let clampMode = 0; // 空间模式
        let lineHeight = null

        //初始化测量面积
        let handlerArea = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Area, clampMode);
        this.handlerArea = handlerArea
        handlerArea.measureEvt.addEventListener(function (result) {
            var mj = Number(result.area);
            var selOptV = $("#selOpt").val();
            var positions = result.positions;
            if (selOptV == 3 || selOptV == 4) {
                mj = Number(calcClampValue(positions));
            } else if (selOptV == 5) {
                mj = Number(calcAreaWithoutHeight(positions));
            }

            var area = mj > 1000000 ? (mj / 1000000).toFixed(2) + 'km²' : mj.toFixed(2) + '㎡'
            handlerArea.areaLabel.text = '面积:' + area;
        });
        handlerArea.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
                viewer.scene.pickPointEnabled = pickPointEnabled;
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
                viewer.scene.pickPointEnabled = false;
            }
        });

        function deactiveAll() {
            // handlerDis && handlerDis.deactivate();
            handlerArea && handlerArea.deactivate();
            // handlerHeight && handlerHeight.deactivate();
            lineHeight = -10000;
        }

        deactiveAll();

        handlerArea && handlerArea.activate();
    }

    measureHeight() {
        let viewer = this.app.viewer
        let scene = viewer.scene
        let clampMode = 0; // 空间模式
        let handlerArea = null
        let handlerHeight = null
        let height_0 = 0
        let lineHeight = null

        //初始化测量高度
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handlerHeight = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.DVH);
        this.handlerHeight = handlerHeight
        handlerHeight.measureEvt.addEventListener(function (result) {
            var distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + 'km' : result.distance + 'm';
            var vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + 'km' : result.verticalHeight + 'm';
            var hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + 'km' : result.horizontalDistance + 'm';
            handlerHeight.disLabel.text = '空间距离:' + distance;
            handlerHeight.vLabel.text = '垂直高度:' + vHeight;
            handlerHeight.hLabel.text = '水平距离:' + hDistance;
            //实时等高线显示
            point1 = Cesium.Cartographic.fromCartesian(result.verticalPositions[0]);
            point2 = Cesium.Cartographic.fromCartesian(result.verticalPositions[1]);
            if (point1.height > point2.height) lineHeight = Number(result.verticalHeight) + height_0;
            else lineHeight = -Number(result.verticalHeight) + height_0;
            if (isShowLine) updateContourLine(lineHeight)
        });

        handlerHeight.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
                viewer.scene.pickPointEnabled = pickPointEnabled;
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
                viewer.scene.pickPointEnabled = false;
            }
        });

        //   设置等值线
        function updateContourLine(height) {
            viewer.scene.globe.HypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
            viewer.scene.globe.HypsometricSetting.hypsometricSetting.MinVisibleValue = height;
            if (!setHypFlag) return;
            for (let i = 0; i < layers.length; i++) {
                if (layers[i].hypsometricSetting.hypsometricSetting) {
                    layers[i].hypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
                    layers[i].hypsometricSetting.hypsometricSetting.MinVisibleValue = height;
                } else {
                    setHypsometricSetting();
                }
            }
        }

        handler.setInputAction(measureHeightClk, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        function measureHeightClk(e) {  //记录点击点高度
            let position = scene.pickPosition(e.position);
            let p = Cesium.Cartographic.fromCartesian(position) // 将获取的点的位置转化成经纬度
            height_0 = p.height;
        }

        //   清除等值线
        function clearLine() {
            updateContourLine(-10000);
        }

        function deactiveAll() {
            // handlerDis && handlerDis.deactivate();
            // handlerArea && handlerArea.deactivate();
            handlerHeight && handlerHeight.deactivate();
            lineHeight = -10000;
        }

        deactiveAll();

        handlerHeight && handlerHeight.activate();
    }

    clearAll() {
        this.deactiveAll();
        this.handlerDis && this.handlerDis.clear();
        this.handlerArea && this.handlerArea.clear();
        this.handlerHeight && this.handlerHeight.clear();
        this.clearLine();
    }

    deactiveAll() {
        this.handlerDis && this.handlerDis.deactivate();
        this.handlerArea && this.handlerArea.deactivate();
        this.handlerHeight && this.handlerHeight.deactivate();
        // lineHeight = -10000;
    }

    //   清除等值线
    clearLine() {
        updateContourLine(-10000);
    };

    //   设置等值线
    updateContourLine(height) {
        this.app.viewer.scene.globe.HypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
        this.app.viewer.scene.globe.HypsometricSetting.hypsometricSetting.MinVisibleValue = height;
        if (!setHypFlag) return;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].hypsometricSetting.hypsometricSetting) {
                layers[i].hypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
                layers[i].hypsometricSetting.hypsometricSetting.MinVisibleValue = height;
            } else {
                setHypsometricSetting();
            }
        }
    };


}
