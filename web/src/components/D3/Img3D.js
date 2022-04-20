import {Viewer} from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import {MarkersPlugin} from 'photo-sphere-viewer/dist/plugins/markers';
import 'photo-sphere-viewer/dist/plugins/markers.css';

export default class Img3D {
    constructor(app) {
        this.app = app
        this.viewer = app.viewer
        this.imgViewer = null
        this.addUrl = null
    }

    init(namePath) {
        const self = this
        this.imgViewer = new Viewer({
            // 全景图根节点
            container: document.querySelector('#viewer'),
            // 全景图图片路径
            panorama: require("./img/d3/" + namePath),
            plugins: [
                [MarkersPlugin, {
                    markers: [
                        {
                            id: 'new-marker1',
                            longitude: '45deg',
                            latitude: '0deg',
                            image: require('./img/警察vr.png'),
                            width: "30",
                            height: "30"
                        },
                        {
                            id: 'new-marker12',
                            longitude: '60deg',
                            latitude: '0deg',
                            image: require('./img/切换.png'),
                            width: "40",
                            height: "40"
                        },
                    ],
                }],
            ],
            navbar: [
                'autorotate',
                'zoom',
                'caption',
                'fullscreen',
                {
                    id: 'my-button',
                    content: '警察',
                    title: 'Hello world',
                    className: 'custom-button',
                    onClick: () => {
                        self.addUrl = require("./img/警察vr.png")
                    },
                },
                {
                    id: 'my-button',
                    content: '便衣',
                    title: 'Hello world',
                    className: 'custom-button',
                    onClick: () => {
                        self.addUrl = require("./img/便衣警察.png")
                    },
                },
                {
                    id: 'my-button',
                    content: '职工',
                    title: 'Hello world',
                    className: 'custom-button',
                    onClick: () => {
                        self.addUrl = require("./img/教职工入职.png")
                    },
                },
                {
                    id: 'my-button',
                    content: '取消',
                    title: 'Hello world',
                    className: 'custom-button',
                    onClick: () => {
                        self.addUrl = null

                    },
                },
            ],
        })
        const markersPlugin = this.imgViewer.getPlugin(MarkersPlugin);

        /**
         * Create a new marker when the user clicks somewhere
         * 添加新标点
         */
        this.imgViewer.on('click', function (e, data) {
            if (!data.rightclick) {
                if (self.addUrl) {
                    markersPlugin.addMarker({
                        id: '#' + Math.random(),
                        longitude: data.longitude,
                        latitude: data.latitude,
                        image: self.addUrl,
                        width: 32,
                        height: 32,
                        anchor: 'bottom center',
                        tooltip: '', // 提示信息
                        data: {
                            generated: true
                        }
                    });
                }

            }
        });


        /**
         * 切换房间
         */
        markersPlugin.on('select-marker', (e, marker) => {
            if (marker.id == "new-marker12") {
                self.switchPic("一站台中部（靠东）.jpg")
            }
        });
    }

    /**
     * 进入某个房间
     */
    switchPic(path) {
        this.destroy()
        this.init(path)
    }

    addVRIcon() {
        let point = new this.app.Cesium.Cartesian3(-1272551.3938098915, 5637856.529503276, 2697404.9522131705)
        this.app.entities.addIcon1(point, 'd3/icons/VR.png', "一站台东端.jpg", "vr")

        let point1 = new this.app.Cesium.Cartesian3(-1272541.2460242133, 5637908.634401528, 2697300.883675701)
        this.app.entities.addIcon1(point1, 'd3/icons/VR.png', "一站台东进站楼梯口.jpg", "vr")
    }

    openVideo(namePath) {
        if (this.imgViewer) {
            this.destroy()
        } else {
            this.init(namePath)
        }

    }


    destroy() {
        if (this.imgViewer) {
            this.imgViewer.destroy()
            this.imgViewer = null
        }
    }

}
