function Promise(executor) {
    
    this.PromiseState = 'pending';
    this.PromiseResult = null
    this.callbacks = []
    const self = this;

    function resolve(data) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = "fulfilled";
        self.PromiseResult = data
        // if (self.callback.onResolved) {
        //     self.callback.onResolved(data)
        // }
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onResolved(data)
            })
        })
    }

    function reject(data) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = "rejected";
        self.PromiseResult = data
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onRejected(data)
            })
        })

    }
    try {
        executor(resolve, reject)

    } catch (error) {
        reject(error)
    }

}
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    // 判断回调函数参数
    if (typeof onRejected !== 'function') {

        onRejected = reason => {
            throw reason
        }
    }
    if (typeof onResolved !== 'function') {
        onResolved = reason => {
            return reason
        }
    }
    return new Promise((resolve, reject) => {
            function callback(type) {
                try {
                    let result = type(self.PromiseResult)
                    if (result instanceof Promise) {
                        result.then(r => {
                            resolve(r)
                        }, v => {
                            reject(v)
                        })
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }
            if (this.PromiseState === 'fulfilled') {
                setTimeout(() => {
                    callback(onResolved)
                })

            }
            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    callback(onRejected)
                })

            }
            if (this.PromiseState === 'pending') {
                this.callbacks.push({
                    onResolved: function () {
                        callback(onResolved)
                    },
                    onRejected: function () {
                        callback(onRejected)
                    }
                    // onResolved,
                    // onRejected
                })
            }



        }

    )

}
// 添加catch方法
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}
// 添加resolve
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(v => {
                resolve(v)
            }, r => {
                reject(r)
            })
        } else {
            resolve(value)
        }
    })
}
// 添加reject方法
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        let arr = []
        for (let index = 0; index < promises.length; index++) {
            promises[index].then(v => {
                count++
                arr[index] = v
                if (count === promises.length) {
                    resolve(arr)
                }
            }, r => {
                reject(r)
            })


        }
    })
}
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {

        for (let index = 0; index < promises.length; index++) {
            promises[index].then(v => {
                resolve(v)

            }, r => {
                reject(r)
            })


        }
    })
}



let promise = new Promise((resolve, reject) => {
    // setTimeout(()=>{
    //     // resolve("成功")
    // reject("失败")

    // },1000)
    resolve("成功")
    console.log("3333");

    // reject("失败")


    // throw "出错了！！！"
})


//  promise.then(value => {
//     return value
// }, reason => {
//     console.warn(reason)

// })
let res = promise.then(value => {
    console.log("1111");

    return value
}, reason => {
    console.warn(reason)

})
console.log("22222");

// console.log(promise)
// let res = promise.then(value => {
//     return new Promise((resolve, reject) => {
//         resolve("回调函数内部的Promise")
//         // return value

//         // throw "出错了！！！"
//     })
//     console.log(value)
//     return value
// }, reason => {
//     console.error(reason, 1)
//     return reason
// })
// let res = promise.then().then(value => {
//     console.log("111");
// }).then(value => {
//     console.log("111");
// }).catch(reason=>{
//     console.error(reason);
// })
// setTimeout(()=>{
//     console.log(res);

// let p1 = Promise.resolve(new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         // resolve("成功")
//     reject("失败")

//     },1000)

// }))
// let p2 = Promise.resolve("rsf")
// let p3 = Promise.resolve("ert")
// let res = Promise.race([p1, p2, p3])
// },1050)
// throw "出错了！！！"
console.log(res);