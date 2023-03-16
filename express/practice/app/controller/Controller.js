const user = (req, res, next) =>
{
    req.send("<h1>Hello from user</h1>")
}

module.exports = {
    user: user
}