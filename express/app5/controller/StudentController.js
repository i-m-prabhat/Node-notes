//factory  function

const Student = {
    home: (req, res, next) =>
    {
        res.send("This is Student Home Page");
    },

    create: (req, res, next) =>
    {
        res.send("Student controller method create");
    },

    delete: (req, res, next) =>
    {
        res.send("Student controller method delete");
    },

    update: (req, res, next) =>
    {
        res.send("Student controller method update");
    },

}

module.exports = Student