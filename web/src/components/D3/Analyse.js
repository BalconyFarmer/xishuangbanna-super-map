/**
 * 空间计算类
 */
export default class Analyse {
    constructor(app) {
        this.app = app
        this.init()
        this.pointToFace()
    }

    /**
     * 点对点分析
     */
    init() {
        const self = this
        let viewer = this.app.viewer
        let scene = viewer.scene

        let sightline = new Cesium.Sightline(this.app.viewer.scene);
        sightline.build();

        let addViewFlag = false;//当前点击状态是否是 添加观察点
        let addTargetFlag = false;//当前点击状态是否是 添加目标点

        let num = 0;//添加的目标点的点号
        let couldRemove = false;//是否能移除目标点

        let handlerPoint = new Cesium.DrawHandler(this.app.viewer, Cesium.DrawMode.Point);

        handlerPoint.drawEvt.addEventListener(function (result) {
            //添加观察点
            if (addViewFlag) {
                let point = result.object;
                // point.show = false;
                let position = result.object.position;

                //将获取的点的位置转化成经纬度
                let cartographic = Cartesian2toDegrees(position);

                //设置观察点
                sightline.viewPosition = cartographic;
                addViewFlag = false;
            }
            handlerPoint.deactivate();
        });

        let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        //添加通视点
        function addTarget(CartesianPosition) {
            if (addViewFlag === false && addTargetFlag) {
                num += 1;
                //将获取的点的位置转化成经纬度
                let cartographic = Cartesian2toDegrees(CartesianPosition);
                //添加目标点
                let name = "point" + num;
                let flag = sightline.addTargetPoint({
                    position: cartographic,
                    name: name
                });
                couldRemove = true;
            }
        }

        //笛卡尔转换为经纬度
        function Cartesian2toDegrees(position) {
            let cartographic = Cesium.Cartographic.fromCartesian(position);
            let longitude = Cesium.Math.toDegrees(cartographic.longitude);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude);
            let height = cartographic.height;

            return [longitude, latitude, height];
        }
    }

    /**
     * 可视域分析
     */
    pointToFace() {
        var viewPosition;
        var viewModel = {
            direction: 1.0,
            pitch: 1.0,
            distance: 1.0,
            verticalFov: 1.0,
            horizontalFov: 1.0,
            visibleAreaColor: '#ffffffff',
            invisibleAreaColor: '#ffffffff'
        };

        let viewer = this.app.viewer
        let scene = viewer.scene
        scene.viewFlag = true;

        var pointHandler = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Point);
        // 创建可视域分析对象
        var viewshed3D = new Cesium.ViewShed3D(scene);
        var colorStr1 = viewshed3D.visibleAreaColor.toCssColorString();
        var colorStr2 = viewshed3D.hiddenAreaColor.toCssColorString();


        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        // 鼠标移动时间回调
        handler.setInputAction(function (e) {
            // 若此标记为false，则激活对可视域分析对象的操作
            if (!scene.viewFlag) {
                //获取鼠标屏幕坐标,并将其转化成笛卡尔坐标
                var position = e.endPosition;
                var last = scene.pickPosition(position);

                //计算该点与视口位置点坐标的距离
                var distance = Cesium.Cartesian3.distance(viewPosition, last);

                if (distance > 0) {
                    // 将鼠标当前点坐标转化成经纬度
                    var cartographic = Cesium.Cartographic.fromCartesian(last);
                    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
                    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
                    var height = cartographic.height;
                    // 通过该点设置可视域分析对象的距离及方向
                    viewshed3D.setDistDirByPoint([longitude, latitude, height]);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function (e) {
            //鼠标右键事件回调，不再执行鼠标移动事件中对可视域的操作
            scene.viewFlag = true;
            // $("#wrapper").show();
            viewModel.direction = viewshed3D.direction;
            viewModel.pitch = viewshed3D.pitch;
            viewModel.distance = viewshed3D.distance;
            viewModel.horizontalFov = viewshed3D.horizontalFov;
            viewModel.verticalFov = viewshed3D.verticalFov;

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


        pointHandler.drawEvt.addEventListener(function (result) {
            var point = result.object;
            var position = point.position;
            viewPosition = position;

            // 将获取的点的位置转化成经纬度
            var cartographic = Cesium.Cartographic.fromCartesian(position);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height + 1.8;
            point.position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);

            if (scene.viewFlag) {
                // 设置视口位置
                viewshed3D.viewPosition = [longitude, latitude, height];
                viewshed3D.build();
                // 将标记置为false以激活鼠标移动回调里面的设置可视域操作
                scene.viewFlag = false;
            }
        });


    }


}
