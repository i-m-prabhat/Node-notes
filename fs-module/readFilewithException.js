const fs = require("fs");
fs.readFile('input.txt',"utf8",afterReadingisCompleted);



function afterReadingisCompleted(error,data){
	
	try{
		console.log(data);
	}catch(error){
		console.log('Cannot Read the File,Try Again');
	}
	
}

doSomething();

function doSomething(){
	
	let i=0;
	for(;i<1000000;i++){
		
	}
	  console.log('Some Event is Performed'+i);
	
	
}
