/**
 * 玉溪新平项目
 */
export default class YXXP {
    constructor(app) {
        this.app = app
        this.init()
    }

    init() {
        this.app.entities.addGeoJingGai()
        this.app.entities.addStreetlight()
        this.app.entities.addFloor()
        this.app.entities.addCamera()

    }

}
