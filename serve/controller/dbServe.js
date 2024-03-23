const dbModel = require('../lib/db')

//新建walls
exports.insertWall = async (req, res) => {
    let data = req.body;
    // console.log(data);
    
    await dbModel.insertWall([data.type,data.message,data.name,data.userId,data.moment,data.label,data.color,data.imgurl])
    .then(result => {
        res.send({
            code: 200,
            message: result,
        })
    })
}