var bcrypt = require('bcrypt');

const hashpassword = bcrypt.hashSync('mypassword', 10)
console.log(hashpassword);
bcrypt.compare('mypassword', hashpassword, function (err, result)
{
    if (err) { throw (err); }
    console.log(result);
});