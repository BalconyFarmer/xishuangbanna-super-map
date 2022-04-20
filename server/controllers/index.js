const {
    saveVideo,
    saveBigImg,
    getVideoList,
    getMyProfile,
    getMyProfileVideo,
    delMyProfile,
    delMyProfileVideo,
    updateMyProfile,
} = require("./sub/uploadFile")

const {
    regist,
    login,
    getUserById,
    uploadHead,
} = require("./sub/normalusers")

const {
    addAttention,
    delAttention,
    findAttention,
    findMyAttention,
    findMyFlowerAttention,
} = require("./sub/attentions")

const {
    videoContentAdd,
    videoContentQuery,
    test
} = require("./sub/videoContents")

const {
    gettoken,
    showInfo,
} = require("./sub/jwt")

const {
    addJinggai,
    getAllJinggai,
    getAllJinggaiByType
} = require("./sub/jinggai")

module.exports = {
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
};

