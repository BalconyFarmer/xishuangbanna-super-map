/**
 * 超图标绘类
 */
let cesium = Cesium;

export default class Plot {
    constructor(app) {
        this.app = app
        this.plottingLayer = null
        this.plotting = null
        this.animationManager = null
    }

    init() {
        let viewer = this.app.viewer
        let serverUrl = "https://iserver.supermap.io/iserver/services/plot-jingyong/rest/plot";
        let cesium = Cesium;

        let plottingLayer = new cesium.PlottingLayer(viewer.scene, "plottingLayer");
        this.plottingLayer = plottingLayer
        viewer.scene.layers.add(plottingLayer);

        let plotEditControl = new cesium.PlotEditControl(viewer.scene, plottingLayer);//编辑控件
        let plotDrawControl = new cesium.PlotDrawControl(viewer.scene, plottingLayer);//绘制控件
        plotDrawControl.drawFinishEvent.addEventListener(function () {//标绘结束，激活编辑控件
            plotEditControl.activate();
        });

        let plotting = cesium.Plotting.getInstance(serverUrl, viewer.scene);
        this.plotting = plotting
        //标绘面板
        initPlotPanel("plotPanel", serverUrl, plotDrawControl, plotEditControl, plotting);
        new StylePanel('stylePanel', plotEditControl, plotting);
        this.initAnimation()
    }

    initAnimation() {


        let animationManager = this.plotting.getGOAnimationManager();

        let geoJGSZ = null;
        let geoTFXS = null;
        let geoLJXS = null;
        let geoTFXS2 = null;
        let geoZYSS = null;
        let geoLJZY = null;
        let geoZYSS2 = null;
        let geoJC = null;
        let geoSJ = null;
        let geoLJJL = null;
        let geoJGJL = null;
        let pointsJGSZ = [];
        pointsJGSZ[0] = new cesium.PlotPoint3D(13.0486416724835, 47.827217402435, 0);
        pointsJGSZ[1] = new cesium.PlotPoint3D(13.0484530291208, 47.8273069046719, 0);
        pointsJGSZ[2] = new cesium.PlotPoint3D(13.0498576145008, 47.8282734633643, 0);
        pointsJGSZ[3] = new cesium.PlotPoint3D(13.0513393769035, 47.8287206684327, 0);
        pointsJGSZ = MoveSymbol(pointsJGSZ);

        this.plottingLayer.createSymbol(22, 1004, pointsJGSZ, function (even) {
            geoJGSZ = even.feature;
            let goAnimationJGSZ = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_GROW, "JGSZ", geoJGSZ);//进攻警力生长动画
            goAnimationJGSZ.startTime = 0;//动画开始时间
            goAnimationJGSZ.duration = 5;//动画播放时长
        });

        let pointsTFXS = [];
        pointsTFXS[0] = new cesium.PlotPoint3D(13.0523705219875, 47.828610443775, 0);
        pointsTFXS[1] = new cesium.PlotPoint3D(13.0528881926318, 47.8282317961645, 0);
        pointsTFXS = MoveSymbol(pointsTFXS);
        this.plottingLayer.createSymbol(22, 1003, pointsTFXS, function (even) {
            geoTFXS = even.feature;
            geoTFXS.symbolStyle.lineColor = new cesium.Color(1, 1, 0, 1);//"#ffff00"
            let goAnimationTFXS = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_SHOW, "TFXS1", geoTFXS);//逃犯显隐动画
            goAnimationTFXS.showEffect = false;//是否有显隐特效
            goAnimationTFXS.finalDisplay = true; //最终显示状态，默认不显示
            goAnimationTFXS.startTime = 0;
            goAnimationTFXS.duration = 6;

            let goAnimationTFXS1 = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_GROW, "TFSZ1", geoTFXS);//逃犯生长动画
            goAnimationTFXS1.startTime = 5;
            goAnimationTFXS1.duration = 6;
            goAnimationTFXS1.startScale = 1;//生长动画开始比例
            goAnimationTFXS1.endScale = 0;//生长动画结束比例
        });

        let pointsLJXS = [];
        pointsLJXS[0] = new cesium.PlotPoint3D(13.0534667673921, 47.8270362098687, 0);
        pointsLJXS[1] = new cesium.PlotPoint3D(13.0538011154244, 47.827160636473, 0);
        pointsLJXS[2] = new cesium.PlotPoint3D(13.0536234845445, 47.8277084980454, 0);
        pointsLJXS[3] = new cesium.PlotPoint3D(13.0527838234958, 47.8283098940719, 0);
        pointsLJXS = MoveSymbol(pointsLJXS);
        this.plottingLayer.createSymbol(421, 311, pointsLJXS, function (even) {
            geoLJXS = even.feature;
            let goAnimationLJXZ = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_SHOW, "LJXZ", geoLJXS);//拦截警力显隐动画
            goAnimationLJXZ.showEffect = false;
            goAnimationLJXZ.finalDisplay = true;
            goAnimationLJXZ.startTime = 0;
            goAnimationLJXZ.duration = 6;

            let goAnimationLJXZ1 = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_GROW, "LJXZ1", geoLJXS);//拦截警力生长动画
            goAnimationLJXZ1.startTime = 5;
            goAnimationLJXZ1.duration = 6;
        });

        let pointsTFXS2 = [];
        pointsTFXS2[0] = new cesium.PlotPoint3D(13.0523210258708, 47.8288491462176, 0);
        pointsTFXS2[1] = new cesium.PlotPoint3D(13.0529279851615, 47.8293174019239, 0);
        pointsTFXS2 = MoveSymbol(pointsTFXS2);
        this.plottingLayer.createSymbol(22, 1003, pointsTFXS2, function (even) {
            geoTFXS2 = even.feature;
            geoTFXS2.symbolStyle.lineColor = new cesium.Color(1, 1, 0, 1);//"#ffff00"
            let goAnimationTFXS2 = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_SHOW, "TFXS2", geoTFXS2);//逃犯显隐动画
            goAnimationTFXS2.showEffect = false;
            goAnimationTFXS2.finalDisplay = true;
            goAnimationTFXS2.startTime = 0;
            goAnimationTFXS2.duration = 12;

            let goAnimationTFSZ2 = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_GROW, "TFSZ2", geoTFXS2);//逃犯生长动画
            goAnimationTFSZ2.startTime = 11;
            goAnimationTFSZ2.duration = 3;
            goAnimationTFSZ2.startScale = 0;
            goAnimationTFSZ2.endScale = 1;

        });

        let pointsZYSS = [];
        pointsZYSS[0] = new cesium.PlotPoint3D(13.0542650683879, 47.8287131454005, 0);
        pointsZYSS = MoveSymbol(pointsZYSS);
        this.plottingLayer.createSymbol(421, 80101, pointsZYSS, function (even) {
            geoZYSS = even.feature;
            geoZYSS.textContent = "支援警力";
            let goAnimationZYSS = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_BLINK, "ZYSS", geoZYSS);//支援警力闪烁动画
            goAnimationZYSS.blinkStyle = cesium.BlinkAnimationBlinkStyle.Blink_Frequency;//闪烁类型，频率闪烁
            goAnimationZYSS.replaceStyle = cesium.BlinkAnimationReplaceStyle.Replace_Color;//颜色交替类型
            goAnimationZYSS.startColor = new cesium.Color(0, 0, 1, 1); //开始颜色，默认为蓝色
            goAnimationZYSS.endColor = new cesium.Color(1, 0, 0, 1); //结束颜色，默认为红色
            goAnimationZYSS.startTime = 14;
            goAnimationZYSS.duration = 3;
        });

        let pointsLJZY = [];
        pointsLJZY[0] = new cesium.PlotPoint3D(13.0532740180585, 47.829706145191, 0);
        pointsLJZY = MoveSymbol(pointsLJZY);
        this.plottingLayer.createSymbol(421, 80202, pointsLJZY, function (even) {
            geoLJZY = even.feature;
            geoLJZY.textContent = "拦截车";

            let goAnimationJGZY = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_BLINK, "JGZY", geoLJZY);//拦截车闪烁动画
            goAnimationJGZY.blinkStyle = cesium.BlinkAnimationBlinkStyle.Blink_Frequency;
            goAnimationJGZY.replaceStyle = cesium.BlinkAnimationReplaceStyle.Replace_Color;
            goAnimationJGZY.startTime = 14;
            goAnimationJGZY.duration = 3;
        });

        let pointsZYSS2 = [];
        pointsZYSS2[0] = new cesium.PlotPoint3D(13.0520708307129, 47.8299387619131, 0);
        pointsZYSS2 = MoveSymbol(pointsZYSS2);
        this.plottingLayer.createSymbol(421, 80101, pointsZYSS2, function (even) {
            geoZYSS2 = even.feature;
            geoZYSS2.textContent = "支援警力";

            let goAnimationZYSS2 = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_BLINK, "ZYSS2", geoZYSS2);//支援警力闪烁动画
            goAnimationZYSS2.blinkStyle = cesium.BlinkAnimationBlinkStyle.Blink_Frequency;
            goAnimationZYSS2.replaceStyle = cesium.BlinkAnimationReplaceStyle.Replace_Color;
            goAnimationZYSS2.startTime = 14;
            goAnimationZYSS2.duration = 3;
        });

        let pointsJC = [];
        pointsJC[0] = new cesium.PlotPoint3D(13.0523196095789, 47.8276819225323, 0);
        pointsJC = MoveSymbol(pointsJC);
        this.plottingLayer.createSymbol(421, 50, pointsJC, function (even) {
            geoJC = even.feature;
            geoJC.symbolStyle.surroundLineType = 1;//衬线
            geoJC.textContent = "路卡";

            let goAnimationJC = animationManager.createGOAnimation(cesium.GOAnimationType.ANIMATION_SCALE, "JC", geoJC);
            goAnimationJC.startTime = 0;
            goAnimationJC.duration = 3;
        });


        let pointsSJ = [];
        pointsSJ[0] = new cesium.PlotPoint3D(13.0522206845731, 47.8287075057692, 0);
        pointsSJ = MoveSymbol(pointsSJ);
        this.plottingLayer.createSymbol(421, 20100, pointsSJ, function (even) {
            geoSJ = even.feature;
            geoSJ.symbolStyle.lineColor = new cesium.Color(1, 1, 0, 1);
            geoSJ.textContent = "事件";
        });


        let pointsLJJL = [];
        pointsLJJL[0] = new cesium.PlotPoint3D(13.053414647609, 47.8268751538344, 0);
        pointsLJJL = MoveSymbol(pointsLJJL);
        this.plottingLayer.createSymbol(421, 9, pointsLJJL, function (even) {
            geoLJJL = even.feature;
            geoLJJL.textContent = "拦截警力";
        });


        let pointsJGJL = [];
        pointsJGJL[0] = new cesium.PlotPoint3D(13.0485470948225, 47.8271255667932, 0);
        pointsJGJL = MoveSymbol(pointsJGJL);
        this.plottingLayer.createSymbol(421, 9, pointsJGJL, function (even) {
            geoJGJL = even.feature;
            geoJGJL.textContent = "进攻警力";
        });

        function MoveSymbol(pts) {
            let oldCentre = new cesium.PlotPoint3D(13.0516048702177, 47.8283304498449, 0);
            let newCentre = new cesium.PlotPoint3D(121.57979595322007, 38.8818637949741, 0);
            for (let i = 0; i < pts.length; i++) {
                pts[i].x = newCentre.x + (pts[i].x - oldCentre.x);
                pts[i].y = newCentre.y + (pts[i].y - oldCentre.y);
                pts[i].z = 10;
            }
            return pts;
        }

        window.setInterval(function execute() {
            animationManager.execute();
        }, 100);

        this.animationManager = animationManager

    }

    play() {
        const aim1 = {
            x: -2600590.981194314,
            y: 4229372.952926996,
            z: 4004552.6877465304,
            heading: 3.8222821993586757,
            pitch: -0.4934555713981452,
            roll: 6.283171220631754,
            duration: 1,
        }
        this.app.camera.cameraFlyToCartesian3(aim1)
        this.animationManager.play();
    }

    pause() {
        this.animationManager.pause();
    }

    stop() {
        this.animationManager.stop();
    }

    reset() {
        this.animationManager.reset();
    }

}
