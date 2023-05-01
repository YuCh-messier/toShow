var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../../project.config.cjs');

/* GET home page. */
router.post('/ppts', function(req, res, next) {
    console.log(req.body)
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`truncate table ppts`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        res.send({statu:true})
        for(let i=0;i<req.body.length;i++){
            let cur=req.body[i]
            let sql=`insert into ppts (url,pic)values('${cur.url}','${cur.pic}')`
            connection.query(sql,(err,data)=>{
                if(err){console.log(err);return false}
                if(i==req.body.length-1){
                    connection.end()
                }
            })
        }
    })
    
});

router.post('/companys', function(req, res, next) {
    console.log(req.body)
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`truncate table companyPpts`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        res.send({statu:true})
        for(let i=0;i<req.body.length;i++){
            let cur=req.body[i]
            let sql=`insert into companyPpts (url,pic,tap,company)values('${cur.url}','${cur.pic}','${cur.tap}','${cur.company}')`
            console.log(sql)
            connection.query(sql,(err,data)=>{
                if(err){console.log(err);return false}
                if(i==req.body.length-1){
                    connection.end()
                }
            })
        }
    })
    
});

module.exports = router;




