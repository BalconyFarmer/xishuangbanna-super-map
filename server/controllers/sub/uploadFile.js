const {initSequelize} = require("../../app.js")
const moveFile = require('../../common/utils/moveFile');
const {sessionApp} = require("../../app.js")
const fs = require('fs')

// 保存视频
const saveVideo = async ctx => {
    const userid = sessionApp.judgeSession(ctx)
    const files = ctx.request.files['files[]']

    if (files.length) {

    } else if (typeof files === 'object') {
        const afterPath = await moveFile(userid, ctx, "videos")
        const postData = {
            userid: userid,
            videoname: ctx.request.body.videoIntroduce,
            videopath: afterPath.split("./static").join(""),
            type: "video"
        }
        await initSequelize.saveVideo(postData)
    }

    ctx.body = [];
}

const saveBigImg = async ctx => {
    const userid = sessionApp.judgeSession(ctx)

    if (userid) {
        const files = ctx.request.files['files[]']
        if (files.length) {

        } else if (typeof files === 'object') {
            const afterPath = await moveFile(userid, ctx, "pictures")
            const postData = {
                userid: userid,
                videoname: ctx.request.body.videoIntroduce,
                videopath: afterPath.split("./static").join("")
            }
            const result = await initSequelize.saveBigImg(postData)
        }

        ctx.body = [];
    } else {
        ctx.body = "无权限";
    }
}

const getVideoList = async ctx => {
    const result = await initSequelize.getVideoList(ctx.request.body.pageIndex)
    const allCount = await initSequelize.getVideoListLength()
    const res = {
        list: result,
        allCnt: allCount.count
    }
    if (result) {
        ctx.body = res
    } else {
        ctx.body = ''
    }

    // ctx.success( {id: '123'}, '创建成功', 201 )

}

const getMyProfile = async ctx => {
    let postData = ctx.request.body
    const result = await initSequelize.getMyProfile(postData.id)
    if (result) {
        ctx.body = result
    } else {
        ctx.body = null
    }
}

const getMyProfileVideo = async ctx => {
    let postData = ctx.request.body
    const result = await initSequelize.getMyProfileVideo(postData.id)
    if (result) {
        ctx.body = result
    } else {
        ctx.body = null
    }
}

const delMyProfile = async ctx => {
    // 判断文件是否存在再删除
    const deleteRecursive = (url) => {
        // 判断给定的路径是否存在
        if (fs.existsSync(url)) {
            fs.unlinkSync(url);
        } else {
            console.log('给定的路径不存在，请给出正确的路径');
        }
    };

    let postData = ctx.request.body
    let path = postData.path
    deleteRecursive(path)

    const result = await initSequelize.delMyProfile(postData.id)

    if (result) {
        ctx.body = '删除成功!'
    } else {
        ctx.body = '删除失败!'
    }
}

const delMyProfileVideo = async ctx => {
    // 判断文件是否存在再删除
    const deleteRecursive = (url) => {
        // 判断给定的路径是否存在
        if (fs.existsSync(url)) {
            fs.unlinkSync(url);
        } else {
            console.log('给定的路径不存在，请给出正确的路径', url);
        }
    };

    let postData = ctx.request.body
    let path = postData.videopath
    deleteRecursive('./static' + path)

    const result = await initSequelize.delMyProfileVideo(postData.videoid)

    if (result) {
        ctx.body = '删除成功!'
    } else {
        ctx.body = '删除失败!'
    }
}

const updateMyProfile = async ctx => {
    let postData = ctx.request.body
    const params = {
        msgid: postData.msgid,
        msg: postData.msg
    }
    const result = await initSequelize.updateMyProfile(params)
    if (result) {
        ctx.body = result
    } else {
        ctx.body = '获取失败'
    }
}


module.exports = {
    saveVideo,
    saveBigImg,
    getVideoList,
    getMyProfile,
    getMyProfileVideo,
    delMyProfile,
    delMyProfileVideo,
    updateMyProfile
};
