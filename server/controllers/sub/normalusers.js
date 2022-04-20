const fs = require('fs')
const {initSequelize} = require("../../app.js")
const {sessionApp} = require("../../app.js")
const moveFile = require('../../common/utils/moveFile');


const regist = async ctx => {
    let postData = ctx.request.body
    const result = await initSequelize.handleRegist(postData)
    if (result === null) {
        ctx.body = '该账户已注册'
    } else {
        const folderAddress = `./static/2userStatic/${result.id}`
        const folderAddressObj = `./static/2userStatic/${result.id}/objs`
        const folderAddressPic = `./static/2userStatic/${result.id}/pictures`
        const folderAddressvideo = `./static/2userStatic/${result.id}/videos`
        const folderAddressScene = `./static/2userStatic/${result.id}/scenes`
        const headIcon = `./static/2userStatic/${result.id}/headIcon`
        fs.mkdirSync(folderAddress); // 创建用户文件夹
        fs.mkdirSync(folderAddressObj);
        fs.mkdirSync(folderAddressPic);
        fs.mkdirSync(folderAddressvideo);
        fs.mkdirSync(folderAddressScene);
        fs.mkdirSync(headIcon);
        ctx.body = '注册成功'
    }
}

const login = async ctx => {
    let postData = ctx.request.body
    const result = await initSequelize.handleLogin(postData)
    if (result) {
        if (result.password === postData.password) {
            sessionApp.setSession(ctx, result)
            ctx.body = result
        } else {
            ctx.body = '密码错误'
        }
    } else {
        ctx.body = '请先注册'
    }
}

const getUserById = async ctx => {
    let postData = ctx.request.body
    const params = postData.id
    const result = await initSequelize.getUserById(params)
    if (result) {
        ctx.body = result
    } else {
        ctx.body = '获取失败'
    }
}

const uploadHead = async ctx => {
    const userid = sessionApp.judgeSession(ctx)
    const files = ctx.request.files['files[]']

    if (files.length) {
        console.log(files, "只允许上传一个文件+++++++++++++++++++++++++++++")
    } else if (typeof files === 'object') {
        const afterPath = await moveFile(userid, ctx, "headIcon")

        const postData = {
            userid: userid,
            videoname: ctx.request.body.videoIntroduce,
            videopath: afterPath.split("./static").join("")
        }
        await initSequelize.uploadHead(postData)
        ctx.body = [postData.videopath];
    }
}

module.exports = {
    regist,
    login,
    getUserById,
    uploadHead,
};
