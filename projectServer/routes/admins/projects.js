var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../../project.config.cjs');

/* GET home page. */
router.post('/deleteProject', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var sql=`update projects set deleteOrNot=0 where myid='${req.body.myid}';`
    connection.query(sql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.end()
        res.send({statu:true})
    })
});

router.post('/editProject', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var project=req.body.project
    var beforeSql=`delete from projects where myid='${req.body.myid}'`
    var sql=`
    insert into projects(title,tap0,tap1,company,gains,content,icon,graph,background,myid)values(
        '${project.title}',
        '${project.tap0}',
        '${project.tap1}',
        '${project.company}',
        '${project.gains}',
        '${project.content}',
        '${project.icon}',
        '${project.graph}',
        '${project.background}',
        '${project.myid}'
    )`
    connection.query(beforeSql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});return false}
            connection.end()
            res.send({statu:true})
            if(req.body.tap=='update'){
                var connection2=mysql.createConnection(DataBaseSetting.server)
                connection2.connect()
                sql=`update projects set id=${project.id} where myid='${req.body.myid}';`
                connection2.query(sql,(err,data)=>{
                    if(err){console.log(err);return false}
                    connection2.end()
                })
            }
        })
    })
});

router.post('/editProjectSpe', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var projectSpe=req.body.projectSpe
    var beforeSql=`delete from project where father='${req.body.myid}'`
    res.send({statu:true});
    connection.query(beforeSql,(err,data)=>{
        if(err){return false}
        for(let i=0;i<projectSpe.length;i++){
            ele=projectSpe[i]
            let sql=`
            insert into project(father,tap,content)values(
                '${ele.father}',
                '${ele.tap}',
                '${ele.content}'
            )`
            connection.query(sql,(err,data)=>{
                if(err){return false}
                if(i==projectSpe.length-1){
                    connection.end()
                }
            })
        }
    })
});

router.post('/editProjectList', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var projectList=req.body.projectList
    var beforeSql=`delete from projectList where father='${req.body.myid}'`
    res.send({statu:true});
    connection.query(beforeSql,(err,data)=>{
        if(err){return false}
        for(let iO=0;iO<projectList.length;iO++){
            let outer=projectList[iO].title
            beforeSql=`delete from projectList where father='${outer.myid}'`
            connection.query(beforeSql,(err,data)=>{
                if(err){console.log(err);return false}
                if(iO==projectList.length-1){
                    
                    for(let i=0;i<projectList.length;i++){
                        let outer=projectList[i].title
                        let sql=`insert into projectList(father,tap,content,myid)values(
                            '${outer.father}',
                            '${outer.tap}',
                            '${outer.content}',
                            '${outer.myid}'
                        )`
                            connection.query(sql,(err,data)=>{
                                if(err){return false}
                                let inners=projectList[i].inner
                                for(let ii=0;ii<inners.length;ii++){
                                    let inner=inners[ii]
                                    let sql=`insert into projectList(father,tap,content,myid)values(
                                        '${inner.father}',
                                        '${inner.tap}',
                                        '${inner.content}',
                                        '${inner.myid}'
                                    )`
                                    connection.query(sql,(err,data)=>{
                                        if(err){return false}
                                        if(i==projectList.length-1 && ii==inners.length-1){
                                            connection.end()
                                        }
                                    })
                                }
                            })
                    }

                }
            })
        }
    })
});

router.post('/editProjectDownload', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var projectDownload=req.body.projectDownload
    var beforeSql=`delete from projectDownload where father='${req.body.myid}'`
    var sql=`
    insert into projectDownload(title,content,file,father)values(
        '${projectDownload.title}',
        '${projectDownload.content}',
        '${projectDownload.file}',
        '${projectDownload.father}'
    )`
    connection.query(beforeSql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});return false}
            connection.end()
            res.send({statu:true})
            if(req.body.tap=='update'){
                var connection2=mysql.createConnection(DataBaseSetting.server)
                connection2.connect()
                sql=`update projectDownload set id=${projectDownload.id} where father='${req.body.myid}';`
                connection2.query(sql,(err,data)=>{
                    if(err){console.log(err);return false}
                    connection2.end()
                })
            }
        })
    })
});

router.post('/editProjectUpload', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var projectUpload=req.body.projectUpload
    var beforeSql=`delete from projectUpload where father='${req.body.myid}'`
    var sql=`
    insert into projectUpload(title,content,father)values(
        '${projectUpload.title}',
        '${projectUpload.content}',
        '${projectUpload.father}'
    )`
    connection.query(beforeSql,(err,data)=>{
        if(err){res.send({statu:false});return false}
        connection.query(sql,(err,data)=>{
            if(err){res.send({statu:false});return false}
            connection.end()
            res.send({statu:true})
            if(req.body.tap=='update'){
                var connection2=mysql.createConnection(DataBaseSetting.server)
                connection2.connect()
                sql=`update projectUpload set id=${projectUpload.id} where father='${req.body.myid}';`
                connection2.query(sql,(err,data)=>{
                    if(err){console.log(err);return false}
                    connection2.end()
                })
            }
        })
    })
});

router.post('/editProjectIn', function(req, res, next) {
    var connection=mysql.createConnection(DataBaseSetting.server)
    connection.connect()
    var projectSpe=req.body.projectSpe
    var beforeSql=`delete from projectSpe where father='${req.body.myid}'`
    res.send({statu:true});
    connection.query(beforeSql,(err,data)=>{
        if(err){return false}
        for(let i=0;i<projectSpe.length;i++){
            ele=projectSpe[i]
            let sql=`
            insert into projectSpe(father,tap,content)values(
                '${ele.father}',
                '${ele.tap}',
                '${ele.content}'
            )`
            connection.query(sql,(err,data)=>{
                if(err){return false}
                if(i==projectSpe.length-1){
                    connection.end()
                }
            })
        }
    })
});

module.exports = router;





