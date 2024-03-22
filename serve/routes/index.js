const controller = require('../controller/dbServe')


module.exports = function (app) {
    //test
    app.get('/test',(req,res) => {
        res.type('html');
        res.render('test');
    })
}