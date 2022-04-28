import axios from 'axios';

import data1 from './gisApi/all-line.json'
import data2 from './gisApi/all-point.json'
import data3 from './gisApi/checkpoint_map-scope.json'
import data4 from './gisApi/common-point-record3.json'
import data5 from './gisApi/point-management-daily.json'
import data6 from './gisApi/point-management-daily.json'
import data7 from './gisApi/scan-code-record.json'
import data8 from './gisApi/search_map-scope.json'

console.log(data1, 1)
console.log(data2, 2)
console.log(data3, 3)
console.log(data4, 4)
console.log(data5, 5)
console.log(data6, 6)
console.log(data7, 7)
console.log(data8, 8)

let allData = []

data1.data.forEach(item => {
    allData.push(item)
})

data2.data.forEach(item => {
    allData.push(item)
})
data3.data.forEach(item => {
    allData.push(item)
})
data4.data.content.forEach(item => {
    allData.push(item)
})
data5.data.content.forEach(item => {
    allData.push(item)
})
data6.data.content.forEach(item => {
    allData.push(item)
})
data7.data.forEach(item => {
    allData.push(item)
})
data8.data.forEach(item => {
    allData.push(item)
})

console.log(allData, "++++++++")


export function getAllJinggaiByType(params) {
    return new Promise((resolve, reject) => {
        let list = {}
        list.data = []
        allData.forEach(item => {
            if (item.typeDesc == params) {
                list.data.push(item)
            }
            if (item.pointName == params) { // 拦阻桩
                list.data.push(item)
            }
        })
        resolve(list);
    });
}

// export function getAllJinggaiByType(params) {
//     return axios({
//         method: "post",
//         url: " http://localhost:8083" + '/getAllJinggaiByType',
//         data: {
//             type: params,
//         },
//     })
// }

/**
 * 登陆
 * @param params
 * @returns {*}
 */
export function login(params) {
    return axios({
        method: "post",
        url: "http://59.216.89.250/banna-gis-api/api/gis/v1/auth/account",
        data: params,
        headers: {
            'Authorization': 'Basic ' + "ZGVza3RvcDphZWU3OWQ5NS03ZDNlLTQ0ZDctYjA4MC0zOTQxYmYxMTIxMjA=",
        },
    })
}

let formData = new FormData();
//参数
formData.append("account", "15214087452");
formData.append("password", "Bjz123456");

let token = null
login(formData).then(res => {
    const see = res.data.access_token
    token = see
    console.log(see,"登陆成功")

})

/**
 * 获取所有段信息1
 */
export function getAllLines() {
    return axios({
        method: "get",
        url: "http://59.216.89.250/banna-gis-api/api/gis/v1/boundary-org/config/border-organization/all-line",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
}

getAllLines().then(res => {
    console.log(res.data, "获取所有段信息1++++++")
})

/**
 * 获取所有点2
 */
export function getAllPoint() {
    return axios({
        method: "get",
        url: "http://59.216.89.250/banna-gis-api/api/gis/v1/boundary-org/config/border-organization/all-point",
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
}

getAllPoint().then(res => {
    console.log(res.data, "获取所有点2++++++")
})

/**
 * 获取所有网格3
 */
export function getAllmapscope() {
    return axios({
        method: "post",
        url: "http://59.216.89.250/banna-gis-api/api/gis/v1/grid/gis/search/map-scope",
        body: {
            "mapType": 4,
            "scopeCoordinates": [
                {"lat": 22.542572021484364, "lng": 100.06210327148443},
                {"lat": 22.542572021484364, "lng": 101.93527221679695},
                {"lat": 21.255798339843736, "lng": 101.93527221679695},
                {"lat": 21.255798339843736, "lng": 100.06210327148443}]
        },
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
}

getAllmapscope().then(res => {
    console.log(res.data, "获取所有网格3++++++")
})

/**
 * 获取通用4
 */
export function getAllNormals() {
    return axios({
        method: "get",
        url: "http://59.216.89.250/banna-gis-api/api/gis/v1/point/common-point-record",
        params: {
            limit: 6000,
            page: 1
        },
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
}

getAllNormals().then(res => {
    console.log(res.data, "获取通用4++++++")
})
