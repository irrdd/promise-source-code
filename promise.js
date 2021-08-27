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
        self.callbacks.forEach(item => {
            item.onResolved(data)
        })
    }

    function reject(data) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = "rejected";
        self.PromiseResult = data
        self.callbacks.forEach(item => {
            item.onRejected(data)
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
    return new Promise((resolve, reject) => {
            if (this.PromiseState === 'fulfilled') {
                try {
                    let result = onResolved(this.PromiseResult)
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
            if (this.PromiseState === 'rejected') {

                try {
                    let result = onRejected(this.PromiseResult)
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
            if (this.PromiseState === 'pending') {
                this.callbacks.push({
                    onResolved: function () {
                        let result = onResolved(self.PromiseResult)
                        if (result instanceof Promise) {
                            result.then(r => {
                                resolve(v)
                            }, r => {
                                reject(r)
                            })

                        } else {
                            resolve(result)
                        }
                    },
                    onRejected: function () {
                        console.log('error');
                    }
                })
            }



        }

    )

}











let promise = new Promise((resolve, reject) => {
    // setTimeout(()=>{
    //     resolve("成功")
    // },1000)
    // resolve("成功")

    reject("失败")


    // throw "出错了！！！"
})


promise.then(value => {
    return value
}, reason => {
    console.warn(reason)

})
// let res = promise.then(value => {
//     // return new Promise((resolve, reject) => {
//     //     // reject("回调函数内部的Promise")
//     return value

//     //     throw "出错了！！！"
//     // })
// }, reason => {
//     console.error(reason, 1)

// })
// console.log(res);
// throw "出错了！！！"