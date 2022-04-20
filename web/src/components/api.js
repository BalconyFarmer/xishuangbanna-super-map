import axios from 'axios';


/**
 * 添加井盖
 */
export function addJinggai(params) {
    return axios({
        method: "post",
        url: " http://localhost:8083" + '/addJinggai',
        data: {
            name: params.name,
            point: params.point,
            des: params.des,
            type: params.type,
        },
    })
}

export function getAllJinggai() {
    return axios({
        method: "post",
        url: " http://localhost:8083" + '/getAllJinggai',
        data: {
        },
    })
}

export function getAllJinggaiByType(params) {
    return axios({
        method: "post",
        url: " http://localhost:8083" + '/getAllJinggaiByType',
        data: {
            type: params,
        },
    })
}