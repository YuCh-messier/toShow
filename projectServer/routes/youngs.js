var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../project.config.cjs');

/* GET home page. */
router.get('/youngs', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from youngs order by id desc;`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true,youngs:data})
    })
});


function checkUser(jwt){
    return axios.post('http://124.223.155.169:3000/jwt',jwt)
  }  
router.post('/addYoungs',async function(req,res){
    var telephone=req.body.telephone
    var ifUser=await checkUser(req.body)
    console.log(ifUser.data)
    if(!ifUser.data.statu){
        res.send({statu:false})
        return false
    }
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    sql=`insert into youngsUser(telephone,youngs,title,avatar,time,starttime)values('${telephone}','${req.body.myid}','${req.body.title}','${req.body.avatar}',now(),'${req.body.starttime}') on duplicate key update title='${req.body.title}'`
    connection.query(sql,(err,data)=>{
        if(err){console.log(err);res.send({statu:false});return false}
        connection.end()
        res.send({statu:true})
    })  
})

module.exports = router;




