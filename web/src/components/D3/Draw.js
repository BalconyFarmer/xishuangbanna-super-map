export default class Draw {
    constructor(app) {
        this.app = app

    }

    drawPoint(value) {
        let viewer = this.app.viewer
        let handler;
        let handlerPoint = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Point);
        handlerPoint.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
            } else {
                viewer.enableCursorStyle = true;
            }
        });
        handlerPoint.movingEvt.addEventListener(function (windowPosition) {
            // tooltip.showAt(windowPosition, '<p>点击绘制点</p>');
        });
        handlerPoint.drawEvt.addEventListener(function (result) {
            // tooltip.setVisible(false);
        });
        handlerPoint.activate();

        var chooseMode = {
            "1": Cesium.DrawMode.Point,
            "2": Cesium.DrawMode.Line,
            "3": Cesium.DrawMode.Polygon,
            "4": "Cesium.RasterGeometryType.POLYLINE",
            "5": "Cesium.RasterGeometryType.POLYGON",
            "6": Cesium.DrawMode.Marker
        };
        var DrawMode= ["点","线","面","地标"];

        // 画线
        handlerPoint.deactivate();
        handlerPoint.clear();
        if(handler !== undefined){
            handler.deactivate();
            handler.clear();
        }
        viewer.scene.rasterVectorCollection.removeAll();
        var chooseDrawMode = chooseMode[value];
        if(value !== "5" && value !== "4"){
            entityHandler(chooseDrawMode,viewer);
        }else{
            rasterVectorEntityHandler(chooseDrawMode);
        }
        function entityHandler(chooseDrawMode,viewer){
            var clampMode = 0;
            if(chooseDrawMode ===  1){
                handler = new Cesium.DrawHandler(viewer,chooseDrawMode,clampMode);
            }else{
                handler = new Cesium.DrawHandler(viewer,chooseDrawMode);
            }
            handler.activeEvt.addEventListener(function(isActive){
                if(isActive == true){
                    viewer.enableCursorStyle = false;
                    viewer._element.style.cursor = '';
                    $('body').removeClass('drawCur').addClass('drawCur');
                }else{
                    viewer.enableCursorStyle = true;
                    $('body').removeClass('drawCur');
                }
            });
            handler.movingEvt.addEventListener(function(windowPosition){
                // tooltip.showAt(windowPosition,'<p>点击绘制'+DrawMode[chooseDrawMode]+',右击绘制结束</p>');
            });
            handler.drawEvt.addEventListener(function(result){
                // tooltip.setVisible(false);
            });
            handler.activate();
        }
        var ps = [];
        function rasterVectorEntityHandler(chooseDrawMode){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
            var rasterVectorMode ={
                "Cesium.RasterGeometryType.POLYLINE" : Cesium.RasterGeometryType.POLYLINE,
                "Cesium.RasterGeometryType.POLYGON" : Cesium.RasterGeometryType.POLYGON
            }
            viewer.scene.rasterVectorCollection.removeAll();
            var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function (e) {
                //获取鼠标屏幕坐标,并将其转化成笛卡尔坐标
                var position = e.position;
                var last = viewer.scene.pickPosition(position);
                // 将鼠标当前点坐标转化成经纬度
                var cartographic = Cesium.Cartographic.fromCartesian(last);
                var longitude = Cesium.Math.toDegrees(cartographic.longitude);
                var latitude = Cesium.Math.toDegrees(cartographic.latitude);
                var height = cartographic.height;
                ps.push(Cesium.Cartographic.fromDegrees(longitude,latitude,height));
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.setInputAction(function(e){
                // tooltip.showAt(e.endPosition, '<p>单击选择下一处,右击结束绘制</p>');
            },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.setInputAction(function (e) {
                scene.rasterVectorCollection.add({
                    name:"myname",
                    positions:ps,
                    lineColor:new Cesium.Color(1.0,0,1,1),
                    lineWidth:40,
                    geometryType:rasterVectorMode[chooseDrawMode]
                });
                //鼠标右键结束事件
                handler.destroy();
                handler = null;
                ps=[];
                viewer.enableCursorStyle = true;
                // tooltip.setVisible(false);
                $('body').removeClass('drawCur');
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }

    }




}
