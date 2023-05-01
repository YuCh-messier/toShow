var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../../project.config.cjs');

/* GET home page. */
router.post('/deleteYoung', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`delete from youngs where myid='${req.body.myid}';`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true})
    })
});

router.post('/editYoung', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    if(req.body.tap=='update'){
        var id=req.body.young.id
        var myid=req.body.young.myid
        var time=req.body.young.time
        var sql=`delete from youngs where myid='${req.body.myid}';`
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});return false}
            sql=`
                insert into youngs(id,title,content,starttime,myid,pic0,pic1,pic2,time)values(
                    '${id}','${req.body.young.title}','${req.body.young.content}','${req.body.young.starttime}','${myid}','${req.body.young.pic0}','${req.body.young.pic1}','${req.body.young.pic2}','${time}'
                )`
            connection.query(sql,(err,data)=>{
                if(err){res.send({statu:false});return false}
                connection.end()
                res.send({statu:true})
            })
        })
    }
    else{
        sql=`
        insert into youngs(title,content,starttime,myid,pic0,pic1,pic2)values(
            '${req.body.young.title}','${req.body.young.content}','${req.body.young.starttime}','${req.body.young.myid}','${req.body.young.pic0}','${req.body.young.pic1}','${req.body.young.pic2}'
        )`
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});return false}
            connection.end()
            res.send({statu:true})
        })
    }
});


module.exports = router;




