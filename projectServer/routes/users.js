var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../project.config.cjs')

/* GET users listing. */
function checkUser(jwt){
  return axios.post('http://124.223.155.169:3000/jwt',jwt)
}

var tokens={}
router.post('/setToken',async function(req,res){
  var token=req.body.token
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }

  tokens[token]=req.body
  res.send({statu:true})
  console.log(tokens)
})

router.post('/getJwt',async function(req,res){
  var token=req.body.token
  if(tokens.hasOwnProperty(token)){
      res.send({statu:true,...tokens[token]})
      delete tokens[token]
      console.log(tokens)
      return
  }
  res.send({statu:false})

})

router.post('/login',async function(req,res){
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }

  var telephone=req.body.telephone
  var uniid=req.body.uniid

  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from users where telephone='${telephone}'`
  connection.query(sql,function (err, data) {
    if(err){
      res.send({statu:false})
      connection.end()
    }
    if(data.length==0){
      sql=`insert into users (
        telephone,uniid,signeddate
      )
      values(
        '${telephone}','${uniid}',now()
      );`

      var sql2=`insert into resumebasic (
        telephone,summary
      )
      values(
        '${telephone}','个人总结'
      );`
      connection.query(sql,()=>{
        
        var sql=`select * from users where telephone='${telephone}'`
        connection.query(sql,function (err, data) {
          if(err){
            res.send({statu:false})
            connection.end()
          }
          res.send({statu:true,...data[0]})
          connection.query(sql2,()=>{
            sql2=`insert into resumepreference (
              telephone
            )
            values(
              '${telephone}'
            );`
            connection.query(sql2,()=>{connection.end()})
          })
        })

      })
    }
    else{
      res.send({statu:true,...data[0]})
      connection.end()
    }})
})

router.post('/getUserInfo',async function(req,res){
  var telephone=req.body.telephone
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }

  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from users where telephone='${telephone}'`
  connection.query(sql,function (err, data) {
    if(err){
      res.send({statu:false})
      connection.end()
    }
    res.send({statu:true,...data[0]})
    connection.end()
  })
})

router.post('/setUserInfo',async function(req,res){
  var telephone=req.body.telephone
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }

  var toChange=req.body.toChange
  var indexs=Object.keys(toChange)
  indexs.forEach(e => {
      var connection=mysql.createConnection(DataBaseSetting.server)
      connection.connect()
      var sql=`update users set ${e}='${toChange[e]}' where telephone='${telephone}'`
      connection.query(sql,function (err, data) {if(err){connection.end();console.log(err);return false}})
  });
  res.send({statu:true})
})
// ----------------------------resume----------------------

router.post('/resume',async function(req,res){
  var telephone=req.body.telephone
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`select * from resumeeducation where telephone='${telephone}'`
  connection.query(sql,(err,education)=>{
  sql=`select * from resumepreference where telephone='${telephone}'`
  connection.query(sql,(err,preference)=>{
  sql=`select * from resumebasic where telephone='${telephone}'`
  connection.query(sql,(err,basic)=>{
  sql=`select * from resumeships where telephone='${telephone}' and tap='clubship'`
  connection.query(sql,(err,clubship)=>{
  sql=`select * from resumeships where telephone='${telephone}' and tap='internship'`
  connection.query(sql,(err,internship)=>{
  sql=`select * from resumeships where telephone='${telephone}' and tap='scholarship'`
  connection.query(sql,(err,scholarship)=>{
  sql=`select * from resumeskills where telephone='${telephone}' and tap='skills'`
  connection.query(sql,(err,skills)=>{ 
  sql=`select * from resumeskills where telephone='${telephone}' and tap='awards'`
  connection.query(sql,(err,awards)=>{ 
  sql=`select * from resumeskills where telephone='${telephone}' and tap='works'`
  connection.query(sql,(err,works)=>{ 
    var resume={
      basic:basic[0],
      education:education,
      preference:preference[0],
      clubship:clubship,
      internship:internship,
      scholarship:scholarship,
      skills:skills,
      awards:awards,
      works:works
    }
    res.send({statu:true,...resume})
  })
  })
  })
  })
  })
  })
  })
  })
  })
})

function setBasic(basic,telephone){
  var toChange=basic
  var indexs=Object.keys(toChange)
  indexs.forEach(e => {
      var connection=mysql.createConnection(DataBaseSetting.server)
      connection.connect()
      var sql=`update resumebasic set ${e}='${toChange[e]}' where telephone='${telephone}'`
      connection.query(sql,function (err, data) {if(err){connection.end();console.log(err);return false}})
  });
}
function setEducation(education,telephone){
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`delete from resumeeducation where telephone='${telephone}';`
  connection.query(sql,(err,data)=>{

    education.forEach(e=>{
      var connection=mysql.createConnection(DataBaseSetting.server)
      connection.connect()
      var sql=`
      insert into resumeeducation(school,scholar,department,time,gpa,score,telephone)
      values
      ('${e.school}','${e.scholar}','${e.department}','${e.time}','${e.gpa}','${e.score}','${telephone}')
      `
      connection.query(sql,()=>{connection.end()})
    })
  })
}
function setPreference(preference,telephone){
  var toChange=preference
  var indexs=Object.keys(toChange)
  indexs.forEach(e => {
      var connection=mysql.createConnection(DataBaseSetting.server)
      connection.connect()
      var sql=`update resumepreference set ${e}='${toChange[e]}' where telephone='${telephone}'`
      connection.query(sql,function (err, data) {if(err){connection.end();console.log(err);return false}})
  });
}
function setShips(ships,telephone,ship){
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`delete from resumeships where telephone='${telephone}';`
  connection.query(sql,(err,data)=>{

    ships.forEach(e=>{
      var connection=mysql.createConnection(DataBaseSetting.server)
      connection.connect()
      var sql=`
      insert into resumeships(name,position,time,intri,tap,telephone)
      values
      ('${e.name}','${e.position}','${e.time}','${e.intri}','${ship}','${telephone}')
      `
      connection.query(sql,()=>{connection.end()})
    })
  })
}
function setSkills(skills,telephone,skill){
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  var sql=`delete from resumeskills where telephone='${telephone}';`
  connection.query(sql,(err,data)=>{

    skills.forEach(e=>{
      var connection=mysql.createConnection(DataBaseSetting.server)
      connection.connect()
      var sql=`
      insert into resumeskills(name,intri,tap,telephone)
      values
      ('${e.name}','${e.intri}','${skill}','${telephone}')
      `
      connection.query(sql,()=>{connection.end()})
    })
  })
}
router.post('/setResume',async function(req,res){
  var telephone=req.body.telephone
  var resume=req.body.resume
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }
  setBasic(resume.basic,telephone)
  setEducation(resume.education,telephone)
  setPreference(resume.preference,telephone)
  setShips(resume.clubship,telephone,'clubship')
  setShips(resume.internship,telephone,'internship')
  setShips(resume.scholarship,telephone,'scholarship')
  setSkills(resume.awards,telephone,'awards')
  setSkills(resume.skills,telephone,'skills')
  setSkills(resume.works,telephone,'works')
  res.send({statu:true})
})

router.post('/setAvatar',function(req,res){
  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  where={
    avatar:'users',
    avatarTrue:'resumebasic'
  }
  var sql=`update ${where[req.body.tap]} set avatar='${req.body.avatar}' where telephone='${req.body.telephone}';`
  console.log(sql)
  connection.query(sql,(err,data)=>{
    connection.end()
    res.send('succeed')
  })
})

router.post('/project',async function(req,res){
  var telephone=req.body.telephone
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }

  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  sql=`select * from projectUser where telephone='${telephone}' order by id desc;`
  connection.query(sql,(err,data)=>{
    res.send({statu:true,projects:data})
  })
})

router.post('/internship',async function(req,res){
  var telephone=req.body.telephone
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }

  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  sql=`select * from internshipUser where telephone='${telephone}' order by id desc;`
  connection.query(sql,(err,data)=>{
    res.send({statu:true,internships:data})
  })
})

router.post('/youngs',async function(req,res){
  var telephone=req.body.telephone
  var ifUser=await checkUser(req.body)
  if(!ifUser.data.statu){
    res.send({statu:false})
    return false
  }

  var connection=mysql.createConnection(DataBaseSetting.server)
  connection.connect()
  sql=`select * from youngsUser where telephone='${telephone}' order by id desc;`
  connection.query(sql,(err,data)=>{
    res.send({statu:true,youngs:data})
  })
})
module.exports = router;

