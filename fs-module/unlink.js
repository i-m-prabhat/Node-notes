const fs = require("fs");

fs.unlink("B.txt",(error)=>{
   console.log("File Deleted");
});

