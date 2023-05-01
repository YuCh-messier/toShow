var express = require('express');
var multer = require('multer');
var axios = require('axios');
var path=require('path')
var router = express.Router();
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(__dirname,req.query.destination))
    },
    filename:function(req,file,cb){ 
        cb(null,req.query.fileName)
}
})
const upload=multer({storage:storage})
/* GET home page. */
router.post('/uploadFile',upload.single('file'),function(req, res, next) {
  res.send({statu:true,text:'上传成功，请返回刷新页面'})
});



module.exports = router;
