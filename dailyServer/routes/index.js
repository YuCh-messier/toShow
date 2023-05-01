var express = require('express');
var multer = require('multer');
var CryptoJS = require('crypto-js')
var axios = require('axios')
var path=require('path')
var fs = require('fs');
var router = express.Router();

var dirs=fs.readdirSync(path.resolve(__dirname,'../public/words/'))
wordList={}
dirs=dirs.forEach(e=>{
  wordList[e]=1
})

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

router.post('/translator',async function(req, res, next) {
  var word=req.body.word
  var resT
  if(wordList[`${word}.json`]!==1){
    var appKey = '2abf9bd7cbe89bc8';
    var key = '56dADD4vt1Ao8GtHqJcVqy7oh2S9u1TR';//注意：暴露appSecret，有被盗用造成损失的风险
    var salt = (new Date).getTime();
    var curtime = Math.round(new Date().getTime()/1000);
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'en';
    var to = 'zh-CHS';
    var str1 = appKey + truncate(word) + salt + curtime + key;
    var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

    var resT=await axios({
      url: 'https://openapi.youdao.com/api',
      method: 'get',
      params: {
          q: word,
          appKey: appKey,
          salt: salt,
          from: from,
          to: to,
          sign: sign,
          signType: "v3",
          curtime: curtime,
      },
    })

    resT=resT.data
    fs.writeFileSync(path.resolve(__dirname,`../public/words/${word}.json`),JSON.stringify(resT))
    wordList[`${word}.json`]=1
    
  }
  else {
    resT=fs.readFileSync(path.resolve(__dirname,`../public/words/${word}.json`))
    resT=JSON.parse(resT)
  }
  res.send(resT)
});

function truncate(q){
  var len = q.length;
  if(len<=20) return q;
  return q.substring(0, 10) + len + q.substring(len-10, len);
}

router.post('/weather',async function(req,res,next){
  var resT=await axios({
    url:'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
    params:{
      key:'c82a1d47b564221b514535fad523960a',
      city:'420100',
      extensions:'base'
    },
    method:'get'
  })

  res.send(resT.data)
})

module.exports = router;
