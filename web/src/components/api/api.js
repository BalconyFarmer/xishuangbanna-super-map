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
