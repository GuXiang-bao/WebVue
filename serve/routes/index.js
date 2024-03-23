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

    //新建反馈
    app.post('/insertfeedback',(req,res) => {
        controller.insertFeeedback(req,res)
    })

    //新建评论
    app.post('/insertfeedback',(req,res) => {
        controller.insertComment(req,res)
    })

    //删除墙
    app.post('/insertfeedback',(req,res) => {
        controller.deleteWall(req,res)
    })

    //删除反馈
    app.post('/insertfeedback',(req,res) => {
        controller.daleteFeedback(req,res)
    })

    //删除评论
    app.post('/insertfeedback',(req,res) => {
        controller.deleteComment(req,res)
    })

    //分页查询wall并获取赞、举报、撤销数据
    app.post('/insertfeedback',(req,res) => {
        controller.findWallPage(req,res)
    })

    //倒叙分页查墙的评论
    app.post('/insertfeedback',(req,res) => {
        controller.findCommentPage(req,res)
    })

    //用户进入进行IP登记
    app.post('/signip', (req,res) => {
        var ip = req.ip;
        // console.log(ip);
        res.send({
            code:200,
            ip:ip,
        })
    })
}