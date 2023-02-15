//Wap in js to show modularity
// filename : p1.js

var x=10;
function App(){
    return "App function";
}

class Test{
    display(){
        console.log('display function from class');
    }
}


// module.exports = x; //Over-Write
// module.exports = App; //Over-Write
//Note : : module exports can export a

exports.x=x;
exports.App=App;

//Note : : module exports can export a variable once.