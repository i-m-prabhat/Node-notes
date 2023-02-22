// {
//     let app =require('./app');

//     console.log(app);
//     console.log(app.x);
//     console.log(app.y);
//     console.log(app.z());

//     const arr=[2,8,5,3,7,1,10]

//     let res =arr.filter((i)=>{
//         return i>2
//     })

//     console.log(res);
// }

const fs = require('fs')
fs.writeFileSync("hello.txt","Hi This is Prabhat")

console.log(__dirname)
console.log(__filename)