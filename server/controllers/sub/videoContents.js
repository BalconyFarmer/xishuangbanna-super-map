const {initSequelize} = require("../../app.js")

const videoContentAdd = async ctx => {
    const result = await initSequelize.videoContentAdd(ctx.request.body)
    if (result) {
        ctx.body = result
    } else {
        ctx.body = ''
    }
}

const videoContentQuery = async ctx => {
    const result = await initSequelize.videoContentQuery(ctx.request.body)
    if (result) {
        ctx.body = result
    } else {
        ctx.body = ''
    }
}

const test = async ctx => {
    ctx.success( 1111 )
    // ctx.body( {id: '123'}, '创建成功', 201 )
    // ctx.fail( '创建失败，权限不足', 405 )
}

module.exports = {
    videoContentAdd,
    videoContentQuery,
    test
};
