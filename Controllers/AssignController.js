exports.get = (req, res) => {
    res.render('Assign');
}

exports.post = (req, res) => {
    console.log(req.body.reviewer.length);

}