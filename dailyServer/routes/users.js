var express = require('express');
var router = express.Router();
var mysql=require('mysql')
var {DataBaseSetting}=require('../project.config.cjs');

router.post('/checkUser', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from users where uniid='${req.body.user}';`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      if(data.length==0){
        var sql=`insert into users (uniid)values('${req.body.user}');`
        connection.query(sql,(err,data)=>{
          if(err){res.send({statu:false});return false}
          connection.end()
        })
      }
      else{
        connection.end()
      }
      res.send({statu:true})
  })
});

router.get('/words', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from words where father='${req.query.user}' and time='${req.query.time}';`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
    
        res.send(data)
    })
});

router.post('/addWord', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`insert into words (father,time,word)values('${req.body.user}','${req.body.time}','${req.body.word}');`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send({statu:true})
  })
});

router.post('/deleteWord', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`delete from words where id=${req.body.id};`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send({statu:true})
  })
});

router.get('/account', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from account where father='${req.query.user}' and time='${req.query.time}';`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send(data)
  })
});

router.get('/accountM', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select sum(money) from account where father='${req.query.user}' and month='${req.query.month}';`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send(data)
  })
});

router.post('/addAccount', function(req, res, next) {
var connection=mysql.createConnection(DataBaseSetting.server)
connection.connect()
var month=req.body.time.split('-')[1]
var sql=`insert into account (father,time,money,text,month)values('${req.body.user}','${req.body.time}',${req.body.money},'${req.body.text}','${month}');`
connection.query(sql,(err,data)=>{
    if(err){res.send({statu:false});return false}
    connection.end()
    res.send({statu:true})
})
});

router.post('/deleteAccount', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`delete from account where id=${req.body.id};`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send({statu:true})
  })
});

router.get('/todo', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from todo where father='${req.query.user}';`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send(data)
  })
});

router.post('/addTodo', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`insert into todo (father,content)values('${req.body.user}','${req.body.content}');`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send({statu:true})
  })
});

router.post('/checkTodo', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`update todo set checked=1 where id='${req.body.id}';`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send({statu:true})
  })
});

router.get('/noteBook', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from notebook where father='${req.query.user}' and time='${req.query.time}';`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send(data)
  })
});

router.post('/addNoteBook', function(req, res, next) {
var connection=mysql.createConnection(DataBaseSetting.server)
connection.connect()
var sql=`insert into notebook (father,time,content,tap)values('${req.body.user}','${req.body.time}','${req.body.content}','${req.body.tap}');`
connection.query(sql,(err,data)=>{
    if(err){res.send({statu:false});return false}
    connection.end()
    res.send({statu:true})
})
});

router.get('/dairy', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from dairy where father='${req.query.user}' and time='${req.query.time}';`
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
      res.send(data)
  })
});

router.post('/addDairy', function(req, res, next) {
var connection=mysql.createConnection(DataBaseSetting.server)
connection.connect()
var sql=`insert into dairy (father,time,content,tap)values('${req.body.user}','${req.body.time}','${req.body.content}','${req.body.tap}');`
connection.query(sql,(err,data)=>{
    if(err){res.send({statu:false});return false}
    connection.end()
    res.send({statu:true})
})
});

router.get('/calendar', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from calendar where father='${req.query.user}' and type='${req.query.type}';`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
  
      res.send(data)
  })
});

router.post('/addCalendar', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`insert into calendar (father,type,time)values('${req.body.user}','${req.body.type}','${req.body.time}');`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
  
      res.send({statu:'succeed'})
  })
});

router.post('/deleteCalendar', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`delete from calendar where time='${req.body.time}' and father='${req.body.user}' and type='${req.body.type}';`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
  
      res.send({statu:'succeed'})
  })
});

router.get('/allWords', function(req, res, next) {
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from words where father='${req.query.user}' order by memory,id limit 30;`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
  
      res.send(data)
  })
});
router.post('/addMemory', function(req, res, next) {
  var ifM=(req.body.ifM==1)?1:-1
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`update words set memory=memory+${ifM} where id='${req.body.id}';`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
  
      res.send({statu:'succeed'})
  })
});
router.post('/addTrans', function(req, res, next) {
  var translation=req.body.translation
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`update words set translation='${translation}' where id='${req.body.id}';`
  console.log(sql)
  connection.query(sql,(err,data)=>{
      if(err){res.send({statu:false});return false}
      connection.end()
  
      res.send({statu:'succeed'})
  })
});

router.get('/ppts', function(req, res, next) {
  res.send([
    {
      url:'http://zueltx.cn/wp-content/uploads/2023/04/u22892361421734854721fm253fmtautoapp120fJPEG.webp',
    },{
      url:'http://zueltx.cn/wp-content/uploads/2023/04/168170053720915a5663074f4e9187bf2f1af07e2eb7afc346d60b0ae990065388213d1211f83.0-scaled.jpg'
    }
  ])
});

module.exports = router;




