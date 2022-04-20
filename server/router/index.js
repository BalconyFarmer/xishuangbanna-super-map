const Router = require('koa-router')
const router = new Router()
const {
    regist,
    login,
    getUserById,
    uploadHead,
    saveVideo,
    saveBigImg,
    getVideoList,
    getMyProfile,
    getMyProfileVideo,
    delMyProfile,
    delMyProfileVideo,
    updateMyProfile,
    addAttention,
    delAttention,
    findAttention,
    findMyAttention,
    findMyFlowerAttention,
    videoContentAdd,
    videoContentQuery,
    test,
    gettoken,
    showInfo,
    addJinggai,
    getAllJinggai,
    getAllJinggaiByType
} = require('../controllers');

const routeList = [
    {
        method: 'post',
        path: '/gettoken',
        controller: gettoken
    },
    {
        method: 'post',
        path: '/showInfo',
        controller: showInfo
    },
    {
        method: 'post',
        path: '/test11',
        controller: test
    },
    /**
     * 用户管理
     */
    {
        method: 'post',
        path: '/regist',
        controller: regist
    },
    {
        method: 'post',
        path: '/login',
        controller: login
    },
    {
        method: 'post',
        path: '/getUserById',
        controller: getUserById
    },
    {
        method: 'post',
        path: '/uploadHead',
        controller: uploadHead
    },
    /**
     * 文件上传
     */
    {
        method: 'post',
        path: '/saveVideo',
        controller: saveVideo
    },
    {
        method: 'post',
        path: '/saveBigImg',
        controller: saveBigImg
    },
    {
        method: 'post',
        path: '/getVideoList',
        controller: getVideoList
    },
    {
        method: 'post',
        path: '/getMyProfile',
        controller: getMyProfile
    },
    {
        method: 'post',
        path: '/getMyProfileVideo',
        controller: getMyProfileVideo
    },
    {
        method: 'post',
        path: '/delMyProfile',
        controller: delMyProfile
    },
    {
        method: 'post',
        path: '/delMyProfileVideo',
        controller: delMyProfileVideo
    },
    {
        method: 'post',
        path: '/updateMyProfile',
        controller: updateMyProfile
    },
    {
        method: 'post',
        path: '/addAttention',
        controller: addAttention
    },
    {
        method: 'post',
        path: '/delAttention',
        controller: delAttention
    },
    {
        method: 'post',
        path: '/findAttention',
        controller: findAttention
    },
    {
        method: 'post',
        path: '/findMyAttention',
        controller: findMyAttention
    },
    {
        method: 'post',
        path: '/findMyFlowerAttention',
        controller: findMyFlowerAttention
    },
    {
        method: 'post',
        path: '/videoContentAdd',
        controller: videoContentAdd
    },
    {
        method: 'post',
        path: '/videoContentQuery',
        controller: videoContentQuery
    },
    {
        method: 'post',
        path: '/addJinggai',
        controller: addJinggai
    },
    {
        method: 'post',
        path: '/getAllJinggai',
        controller: getAllJinggai
    },
    {
        method: 'post',
        path: '/getAllJinggaiByType',
        controller: getAllJinggaiByType
    },
];

routeList.forEach(item => {
    const {method, path, controller} = item;
    router[method](path, controller);
});

module.exports = {router};
