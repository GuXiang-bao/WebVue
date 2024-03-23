const controller = require('../controller/dbServe')


module.exports = function (app) {
    //test
    app.get('/test',(req,res) => {
        res.type('html');
        res.render('test');
    })

    //新建wall数据
    app.post('/insertwall',(req,res) => {
        controller.insertWall(req,res)
    })
}