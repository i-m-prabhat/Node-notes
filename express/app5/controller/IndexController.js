const home = (req, res, next) =>
{
    res.send("This is Home Method of indexController")
}

const contact = (req, res, next) =>
{
    res.send("This is contact method of indexController")
}
const gallery = (req, res, next) =>
{
    res.send("Hello from Gallery")
}

module.exports = {
    home: home,
    contact: contact,
    gallery: gallery
}