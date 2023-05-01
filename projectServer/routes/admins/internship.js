var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../../project.config.cjs');

/* GET home page. */
router.post('/deleteInternship', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`delete from internship where myid='${req.body.myid}';`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true})
    })
});

router.post('/editInternship', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    if(req.body.tap=='update'){
        var id=req.body.internship.id
        var myid=req.body.internship.myid
        var sql=`delete from internship where myid='${req.body.myid}';`
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});return false}
            sql=`
                insert into internship(id,title,content,myid,salary,city,weekDay,period,taps,company,icon,companyIntri,companyTap)values(
                    '${id}','${req.body.internship.title}','${req.body.internship.content}','${myid}','${req.body.internship.salary}','${req.body.internship.city}','${req.body.internship.weekDay}','${req.body.internship.period}','${req.body.internship.taps}',
                    '${req.body.internship.company}','${req.body.internship.icon}','${req.body.internship.companyIntri}','${req.body.internship.companyTap}'
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
        insert into internship(myid,title,content,salary,city,weekDay,period,taps,company,icon,companyIntri,companyTap)values(
            '${req.body.internship.myid}','${req.body.internship.title}','${req.body.internship.content}','${req.body.internship.salary}','${req.body.internship.city}','${req.body.internship.weekDay}','${req.body.internship.period}','${req.body.internship.taps}',
            '${req.body.internship.company}','${req.body.internship.icon}','${req.body.internship.companyIntri}','${req.body.internship.companyTap}'
        )`
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});return false}
            connection.end()
            res.send({statu:true})
        })
    }
});


module.exports = router;




