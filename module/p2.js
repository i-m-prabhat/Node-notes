//Wap in js to show modularity
// filename : p2.js

// const x = require("./p1.js")
// const App = require("./p1.js")
const p1 = require("./p1.js")
const p3 = require("./p3.js")

// console.log("x is "+x());
// App();
// console.log(App());

console.log(p1);

console.log('value of x='+p1.x);
console.log('value from App Fn='+p1.App());

//Difference
console.log(this);
console.log(this==module.exports);
console.log(this==exports);
console.log(module.exports==exports);
console.log(p3);

object = new p3.dog();
object.puppy();