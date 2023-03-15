class UserController
{
    constructor()
    {
        // super()
    }

    home(req, res, next)
    {
        res.send("User controller Home page");
    }

    create(req, res, next)
    {
        res.send("User controller method create:class based");
    }
    show(req, res, next)
    {
        res.send("User controller method show:class based");
    }
}

module.exports = UserController;