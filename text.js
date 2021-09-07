

let promise = new Promise((resolve, reject) => {
    // setTimeout(()=>{
    //     resolve("成功")
    // },1000)
    resolve("成功")

    // reject("失败")


    // throw "出错了！！！"
})


//  promise.then(value => {
//     return value
// }, reason => {
//     console.warn(reason)

// })
// promise.then(value => {
//     return value
// }, reason => {
//     console.warn(reason)

// })
console.log(promise)
let res = promise.then(value => {
    // return new Promise((resolve, reject) => {
    //     // reject("回调函数内部的Promise")
    //     // return value

    //         throw "出错了！！！"
    // })
    return value
}, reason => {
    console.error(reason, 1)

})
console.log(res);
// throw "出错了！！！"