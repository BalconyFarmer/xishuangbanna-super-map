import axios from 'axios';

export function getAllJinggaiByType(params) {
    return axios({
        method: "post",
        url: " http://localhost:8083" + '/getAllJinggaiByType',
        data: {
            type: params,
        },
    })
}