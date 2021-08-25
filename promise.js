function Promise(executor) {
    this.PromiseState = 'pending';
    this.PromiseResult = null
    this.callbacks = []
    const self = this;

    function resolve(data) {
        if (self.PromiseState !== 'pending') return
        self.PromiseState = "fulfilled";
        self.PromiseResult = data
        // if (self.callback.inResolved) {
        //     self.callback.inResolved(data)
        // }
        self.callbacks.forEach(item => {
            item.inResolved(data)
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
Promise.prototype.then = function (inResolved, onRejected) {
    return new Promise((resolve, reject) => {
            if (this.PromiseState === 'fulfilled') {
                try {
                    let result = inResolved(this.PromiseResult)
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
                onRejected(this.PromiseResult)
            }
            if (this.PromiseState === 'pending') {
                this.callbacks.push({
                    inResolved,
                    onRejected
                })
            }



        }

    )

}











let promise = new Promise((resolve, reject) => {

    resolve("成功")
    // reject("失败")


    // throw "出错了！！！"
})


// promise.then(value => {
//     return value
// }, reason => {
//     console.warn(reason)

// })
let res = promise.then(value => {
    // return new Promise((resolve, reject) => {
    //     // reject("回调函数内部的Promise")
    return value

    //     throw "出错了！！！"
    // })
}, reason => {
    console.error(reason, 1)

})
console.log(res);
// throw "出错了！！！"