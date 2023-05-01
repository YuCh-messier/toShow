var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../project.config.cjs')

/* GET home page. */
router.get('/projects', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from projects where deleteOrNot=1;`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true,projects:data})
    })
});

function formalizeProjectList(outer,inner){
    let list=[]
    for(let i=0;i<outer.length;i++){
        let curO=outer[i].myid
        let oInner=[]
        for(let ii=0;ii<inner.length;ii++){
            if(inner[ii].father==curO){
                oInner.push(inner[ii])
            }
        }
        list.push({title:outer[i],inner:oInner})
    }
    return list
}
router.get('/projectSpe', function(req, res, next) {
    var myid=req.query.projectId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from projects where myid='${myid}';`
    connection.query(sql,(err,project)=>{
        if(err){res.send({statu:false});return false}
        sql=`select * from project where father='${myid}'`
        connection.query(sql,(err,projectSpe)=>{
            if(err){res.send({statu:false});return false}
            sql=`select * from projectList where father='${myid}' and tap='outer'`
            connection.query(sql,(err,projectList)=>{
                if(err){res.send({statu:false});return false}
                var ids=[]
                for(let i=0;i<projectList.length;i++){
                    ids.push(`father='${projectList[i].myid.toString()}'`)
                }
                if(ids.length!=0){
                    var condition=ids.join(' or ')
                    sql=`select * from projectList where (${condition}) and tap='inner';`
                }
                else{
                    sql=`select * from projectList where tap='innee';`
                }
                connection.query(sql,(err,projectList2)=>{
                    if(err){res.send({statu:false});console.log(err);return false}
                    list=formalizeProjectList(projectList,projectList2)
                    connection.end()
                    res.send({statu:true,project:project[0],projectSpe:projectSpe,list:list})
                })
            })
        })
    })
});

router.post('/projectIn', function(req, res, next) {
    var myid=req.body.projectId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from projects where myid='${myid}';`
    connection.query(sql,(err,project)=>{
        if(err){res.send({statu:false});return false}
        sql=`select * from projectList where father='${myid}' and tap='outer'`
        connection.query(sql,(err,projectList)=>{
            if(err){res.send({statu:false});return false}
            var ids=[]
            for(let i=0;i<projectList.length;i++){
                ids.push(`father='${projectList[i].myid.toString()}'`)
            }
            if(ids.length!=0){
                var condition=ids.join(' or ')
                sql=`select * from projectList where (${condition}) and tap='inner';`
            }
            else{
                sql=`select * from projectList where tap='innee';`
            }
            connection.query(sql,(err,projectList2)=>{
                if(err){res.send({statu:false});return false}
                try{
                    var speId=projectList2[0].myid
                }
                catch{
                    res.send({statu:false})
                    return false
                }
                list=formalizeProjectList(projectList,projectList2)
                sql=`select * from projectSpe where father='${speId}';`
                connection.query(sql,(err,projectSpe)=>{
                    if(err){res.send({statu:false});return false}
                    sql=`select * from projectUser where project='${myid}' and telephone='${req.body.telephone}';`
                    connection.query(sql,(err,projectUser)=>{
                        if(err){res.send({statu:false});return false}
                        connection.end()
                        res.send({statu:true,project:project[0],list:list,projectSpe:projectSpe,pList:projectList2,projectUser:projectUser[0]})
                    })
                })
            })
        })
    })
});

router.post('/projectList', function(req, res, next) {
    var myid=req.body.myid
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    sql=`select * from projectList where father='${myid}' and tap='outer'`
    connection.query(sql,(err,projectList)=>{
        if(err){res.send({statu:false});return false}
        var ids=[]
        for(let i=0;i<projectList.length;i++){
            ids.push(`father='${projectList[i].myid.toString()}'`)
        }
        if(ids.length!=0){
            var condition=ids.join(' or ')
            sql=`select * from projectList where (${condition}) and tap='inner';`
        }
        else{
            sql=`select * from projectList where tap='innee';`
        }
        connection.query(sql,(err,projectList2)=>{
            if(err){res.send({statu:false});return false}
            list=formalizeProjectList(projectList,projectList2)
            connection.end()
            res.send({statu:true,list:list,pList:projectList2})
        })
    })
});

router.post('/projectInA', function(req, res, next) {
    var myid=req.body.projectId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from project where father='${myid}';`
    connection.query(sql,(err,project)=>{
        if(err){res.send({statu:false});return false}
        sql=`select * from projectList where father='${myid}' and tap='outer'`
        connection.query(sql,(err,projectList)=>{
            if(err){res.send({statu:false});return false}
            var ids=[]
            for(let i=0;i<projectList.length;i++){
                ids.push(`father='${projectList[i].myid.toString()}'`)
            }
            if(ids.length!=0){
                var condition=ids.join(' or ')
                sql=`select * from projectList where (${condition}) and tap='inner';`
            }
            else{
                sql=`select * from projectList where tap='innee';`
            }
            connection.query(sql,(err,projectList2)=>{
                if(err){res.send({statu:false});return false}
                list=formalizeProjectList(projectList,projectList2)
                sql=`select * from projectDownload where father='${myid}';`
                connection.query(sql,(err,projectDownload)=>{
                    if(err){res.send({statu:false});return false}
                    sql=`select * from projectUpload where father='${myid}';`
                    connection.query(sql,(err,projectUpload)=>{
                        if(err){res.send({statu:false});return false}
                        connection.end()
                        res.send({statu:true,project:project,list:list,pList:projectList2,projectUpload:projectUpload[0],projectDownload:projectDownload[0]})
                    })
                })
            })
        })
    })
});

router.post('/projectDownload', function(req, res, next) {
    var myid=req.body.projectId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from projectDownload where father='${myid}';`
    connection.query(sql,(err,data)=>{
        if(err){console.log(err);res.send({statu:false});return false}
        connection.end()
        res.send({statu:true,projectDownload:data[0]})
    })
});

router.post('/projectUpload', function(req, res, next) {
    var myid=req.body.projectId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from projectUpload where father='${myid}';`
    connection.query(sql,(err,data)=>{
        if(err){console.log(err);res.send({statu:false});return false}
        connection.end()
        res.send({statu:true,projectUpload:data[0]})
    })
});

router.post('/projectInChange', function(req, res, next) {
    var speId=req.body.speId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    sql=`select * from projectSpe where father='${speId}';`
    connection.query(sql,(err,projectSpe)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true,projectSpe:projectSpe})
    })
});

function checkUser(jwt){
    return axios.post('http://124.223.155.169:3000/jwt',jwt)
  }  
router.post('/addProject',async function(req,res){
    var telephone=req.body.telephone
    var ifUser=await checkUser(req.body)
    if(!ifUser.data.statu){
      res.send({statu:false})
      return false
    }
    var myid=req.body.myid
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    sql=`insert into projectUser(telephone,project,title,tap0,tap1,graph,icon,background,company,step)values('${telephone}','${myid}','${req.body.title}','${req.body.tap0}','${req.body.tap1}','${req.body.graph}','${req.body.icon}','${req.body.background}','${req.body.company}','0') on duplicate key update tap0='${req.body.tap0}'`
    connection.query(sql,(err,data)=>{
        if(err){console.log(err);res.send({statu:false});return false}
        connection.end()
        res.send({statu:true})
    })
  })

router.post('/ifProject', function(req, res, next) {
    var telephone=req.body.telephone
    var myid=req.body.projectId
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`select * from projectUser where telephone='${telephone}' and project='${myid}';`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});console.log(err);return false}
        connection.end()
        res.send({statu:true,ifProject:data[0]})
    })
});

router.post('/finishProject', function(req, res, next) {
    var telephone=req.body.telephone
    var myid=req.body.myid
    var url=req.body.url
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`update projectUser set statu='off' where telephone='${telephone}' and project='${myid}';`
    console.log(sql)
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        sql=`update projectUser set file='${url}' where telephone='${telephone}' and project='${myid}';`
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});console.log(err);return false}
            connection.end()
            res.send({statu:true})
        })
    })
});

router.post('/updateUser', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`update projectUser set step='${req.body.step}' where telephone='${req.body.telephone}' and project='${req.body.projectId}';`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});console.log(err);return false}
        connection.end()
    })
});

module.exports = router;

