const Koa = require('koa')
const app = new Koa()
module.exports = {app};

// 注册中间件 cors body通用解析 静态资源指定 jwt
const compose = require('koa-compose');
const MD = require('./middlewares/');
app.use(compose(MD));

app.listen(8084, () => {
    console.log('服务启动成功 port http://localhost:8084')
})






