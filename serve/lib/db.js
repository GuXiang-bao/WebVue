const mysql = require('mysql')
var config = require('../config/default')


const db = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
})


//连接指定数据库
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.WALL,
})

//直接使用pool.query
let bdbs = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

//通过pool.getConnection 获取链接
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release(); //释放该链接,把链接放回池里供其他人使用
                })
            }
        })
    })
}

//创建数据库
let WALLTS = `create database if not exists WALLTS default charset utf8 collate utf8_general_ci;`

let createDatabase = (db) => {
    return bdbs(db, []);
}


//创建数据表
//留言/照片
let walls = 
    `create table if not exists walls(
     id INT NOT NULL AUTO_INCREMENT,
     type INT NOT NULL COMMENT '类型0信息1图片', 
     message VARCHAR(1000) COMMENT '留言',
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     userId VARCHAR(100) NOT NULL COMMENT '创建者ID', 
     moment VARCHAR(100) NOT NULL COMMENT '时间' ,
     label INT NOT NULL COMMENT '标签',
     color INT COMMENT '颜色',
     imgurl VARCHAR(100) COMMENT '图片路径',
     PRIMARY KEY (id )
    );`

//留言反馈
let feedbacks =
    `create table if not exists feedbacks( 
     id INT NOT NULL AUTO_INCREMENT,
     wallId INT NOT NULL COMMENT '墙留言ID',
     userId VARCHAR(100) NOT NULL COMMENT '反馈者ID',
     type INT NOT NULL COMMENT '反馈类型0喜欢1举报2撤销',
     moment VARCHAR(100) NOT NULL COMMENT '时间',
     PRIMARY KEY (  id )
    );`

//留言评论
let comments =
    `create table if not exists comments( 
     id INT NOT NULL AUTO_INCREMENT,
     wallId INT NOT NULL COMMENT '墙留言ID',
     userId VARCHAR(100) NOT NULL COMMENT '评论者ID',
     imgurl VARCHAR(100) COMMENT '头像路径',
     comment VARCHAR(1000) COMMENT '评论内容',
     name VARCHAR(100) NOT NULL COMMENT '用户名', 
     moment VARCHAR(100) NOT NULL COMMENT '时间',
     PRIMARY KEY ( id )
    );`

let createTable = (sql) => {
    return query(sql,[])
}

//先创建数据库再创建数据表
async function create(){
    await createDatabase(WALLTS);
    createTable(walls);
    createTable(feedbacks);
    createTable(comments);
}

create();