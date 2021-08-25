const fs = require('fs');

// let fr = fs.openSync("hello.txt", "w");
// fs.writeSync(fr, "皇冠赛i和覅发哦i和", 20)

// fs.closeSync();

let promise = new Promise((resolve, reject) => {
    fs.readFile("hello11.xt", (err, data) => {
        if (err)   reject(err)
          
        
        resolve(data)
    })
})
promise.then(value => {
    console.log(value.toString());
},reason => {
    console.log(reason);
})