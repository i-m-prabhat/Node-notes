const  os = require('os');
// console.log(os);

console.log("End of line =",JSON.stringify(os.EOL)); //EOL
// console.log("constant object =",os.constants);
console.log("Free Momory =", os.freemem());


os["constants"]=null;
console.log(os);

console.log('Architecture of Os:',os.arch());
console.log('Number of Cpus:',os.cpus());
console.log('Hostname:',os.hostname());
console.log('Avg load of Machine:',os.loadavg());
console.log('Totel Memory:',os.totalmem());
console.log('OS Type:',os.type());
console.log('Release :',os.release());
console.log('OS plateform:',os.platform());
console.log('Temprory Path:',os.tmpdir());
console.log('Home Path:',os.homedir());
console.log('Priority :',os.getPriority());


console.log("Memory Management/Performance",(os.totalmem()-os.freemem())/os.totalmem());

let consumedMemory = os.totalmem()-os.freemem();
let result = consumedMemory/os.totalmem();

console.log("Effeciency/Performance/tolerance/latency =",result);
console.log("slow rate =",(1-result));