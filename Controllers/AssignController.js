exports.get = (req, res) => {
    res.render('Assign');
}

exports.post = (req, res) => {
    //(req.body.reviewer) returns a single item when its one item insted of array
    console.log(req.body.reviewer.length);
}