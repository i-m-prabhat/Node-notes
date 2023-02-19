const fs = require("fs");

fs.readFile('input.txt',"utf8",afterReadingisCompleted);

function afterReadingisCompleted(error,data){
	
	if(error==null){
		console.log(data)
	}else{
		console.log('Cannot Read the File,Try Again');
	}
	
}