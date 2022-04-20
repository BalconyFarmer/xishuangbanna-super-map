const {initSequelize} = require("../../app.js")

const addJinggai = async ctx => {
    let postData = ctx.request.body
    const result = await initSequelize.addJinggai(postData)

    if (result === null) {
        ctx.body = result
    } else {
        ctx.body = result
    }
}


const getAllJinggai = async ctx => {
    const result = await initSequelize.getAllJinggai()

    if (result === null) {
        ctx.body = result
    } else {
        ctx.body = result
    }
}

const getAllJinggaiByType = async ctx => {
    let postData = ctx.request.body

    const result = await initSequelize.getAllJinggaiByType(postData.type)

    if (result === null) {
        ctx.body = result
    } else {
        ctx.body = result
    }
}

module.exports = {
    addJinggai,
    getAllJinggai,
    getAllJinggaiByType
};
