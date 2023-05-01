var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../project.config.cjs')

/* GET home page. */
router.get('/internships', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from internship order by id desc;`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true,internships:data})
    })
});

router.get('/internshipSpe', function(req, res, next) {
    var internshipId=req.query.internshipId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from internship where myid='${internshipId}';`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true,internship:data[0]})
    })
});

function checkUser(jwt){
    return axios.post('http://124.223.155.169:3000/jwt',jwt)
  }  
router.post('/addInternship',async function(req,res){
    var telephone=req.body.telephone
    var ifUser=await checkUser(req.body)
    if(!ifUser.data.statu){
        res.send({statu:false})
        return false
    }
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    sql=`insert into internshipUser(telephone,internship,title,taps,icon,time)values('${telephone}','${req.body.myid}','${req.body.title}','${req.body.taps}','${req.body.icon}',now()) on duplicate key update taps='${req.body.taps}'`
    connection.query(sql,(err,data)=>{
        if(err){console.log(err);res.send({statu:false});return false}
        connection.end()
        res.send({statu:true})
    })
})

module.exports = router;

