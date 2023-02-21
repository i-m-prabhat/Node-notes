const fs = require("fs");

let source = "A.txt";
let target = "B.txt";

fs.readFile(source,"utf8",(err1,data)=>{
   if(err1 == null){
      fs.writeFile(target,data,"utf8",(err2)=>{
        if(err2 == null){
            fs.unlink(source,(err3)=>{
               if(err3==null){
                  console.log('File Move Successfully.');
               }
            })
        }
      })
   }
});




