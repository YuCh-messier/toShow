var express = require('express');
var multer = require('multer');
var axios = require('axios');
var path=require('path')
var router = express.Router();
var {host}=require('../project.config.cjs')

var storage=multer.diskStorage({destination:path.resolve(__dirname,'../public/pics/avatar/'),filename:function(req,file,cb){
    cb(null,req.query.id+req.query.tap)
}})
const upload=multer({storage:storage})
/* GET home page. */
router.post('/uploadFile',upload.single('avatar'),function(req, res, next) {
  var telephone=req.query.id
  var tap=req.query.tap
  axios.post(host+'/users/setAvatar',{tap:tap,telephone:telephone,avatar:host+'/pics/avatar/'+telephone+tap}).catch(e=>[
    console.log(e)
  ])
  res.send({statu:true,text:'上传成功，请返回刷新页面'})
});


var storage2=multer.diskStorage({destination:path.resolve(__dirname,'../public/files/filesIn/'),filename:function(req,file,cb){
  cb(null,req.query.telephone+req.query.myid+'.pdf')
}})
const upload2=multer({storage:storage2})
/* GET home page. */
router.post('/uploadProject',upload2.single('project'),function(req, res, next) {
  var telephone=req.query.telephone
  var myid=req.query.myid
  var url=`${host}/pics/files/filesIn/${telephone+myid}.pdf`
  axios.post(host+'/projects/finishProject',{myid:myid,telephone:telephone,url:url}).catch(e=>[
    console.log(e)
  ])
  res.send({statu:true,text:'上传成功'})
});

module.exports = router;
