const Koa = require('koa')
const app = new Koa()
app.context.config  = {name: "ojbk"}

// 注册中间件
const compose = require('koa-compose');
const MD = require('./middlewares/');
app.use(compose(MD));

// 初始化 静态文件夹 和 文件读写
const {initStaticFile} = require('./middlewares/initStaticFile')
initStaticFile(app)

// 初始化 session
const {SessionApp} = require('./common/session')
const sessionApp = new SessionApp(app)

// 初始化 数据库
const {initSquelize} = require('./model/initSquelize')
let initSequelize = new initSquelize()

module.exports = {sessionApp, initSequelize};

// 注入router
const {router} = require('./router');
app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => {
    if (ctx) {
        ctx.body = {
            code: 9999,
            message: `程序运行时报错：${err.message}`
        };
    }
});

app.listen(8083, () => {
    console.log('服务启动成功 port http://localhost:8083')
})






