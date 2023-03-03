
const app = (req,res)=>{

    res.writeHead(200,{
        "Content-Type":"text/html"
    });
    res.write("Welcome to The World of Node JS");
    res.end();
}
const router = {
    get:function(url,controllerName){
        console.log('get method'+url);
        console.log(controllerName());
    },
    post:function(url,controllerName){
        console.log('post method'+url);
        console.log(controllerName());
    }
}

router.get('/get-student',function(){
    return 'student will be get';
})

router.post('/create-student',function(){
    return 'student will be created';
})

module.exports = app;