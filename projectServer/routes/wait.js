var express = require('express');
var router = express.Router();
var axios=require('axios')
var mysql=require('mysql')
var {DataBaseSetting}=require('../project.config.cjs')

/* GET home page. */
router.get('/projects', function(req, res, next) {
    var projects=[]
    var project={
        title:'亚太投资体验',
        taps:['投资并购','投资并购'],
        graph:'/src/assets/cIcon.jpg',
        icon:'/src/assets/cIcon.jpg',
        company:'Adobe亚太投资部',
        background:'/src/assets/background.jpg',
        content:`JobReady Digital Marketing Virtual Experience Program
    
        建立有效价值链接，挖掘用户潜在需求
        
        此项虚拟工作体验融合JobReady数字营销工作的精品内容，帮助你熟悉了解营销行业的工作流程和工作内容，全面提升个人商业专业知识与创新能力。通过该虚拟工作体验您将通过专业视角了解到品牌营销和整合营销的基本框架、营销经典方法论、创意营销以及Slogan设计等营销相关的知识，同时您也将参到浪潮营养品营销方案设计策划的虚拟工作中。`,
        gains:['工作证书','额外奖励补贴','14项工作内容']
    }
    for(let i=0;i<8;i++){
        projects.push(project)
    }
    res.send({statu:true,projects:projects})
});

function formalizeProjectList(){
    
}
router.get('/projectSpe', function(req, res, next) {
    var project=[
        {   
            tap:'header',
            content:`JobReady数字营销岗位虚拟工作体验
从零到一，打开你职业营销人生涯的第一步`
        },{
            tap:'graph',
            content:'/src/assets/cPic.png'
        },{
            tap:'content',
            content:`此项虚拟工作体验融合JobReady数字营销的精品内容，帮助你熟悉营销的经典方法论，全面提升个人商业能力以及市场营销专业知识。通过该虚拟工作体验您将接触到营销核心需求的归纳总结，目标客户以及产品分析、营销方案策划和制定等营销相关的专业内容，深入了解一个优秀的营销策划是如何向用户传递产品价值的逻辑和思路。`
        },{
            tap:'graph',
            content:'/src/assets/cPic.png'
        },{
            tap:'header',
            content:`JobReady Digital Marketing
数字营销岗位虚拟工作体验`
        },{
            tap:'content',
            content:'此项虚拟工作体验融合JobReady数字营销岗位的精品内容。通过该虚拟工作体验您将通过专业视角学习品牌营销的方法论、整合营销、内容营销、Slogan设计等数字营销的专业内容。'
        }
    ]
    var list=[
        {
            title:'一、行业培训：营销是门什么样的生意',
            inner:['营销的基本方法论',' 理解消费者需求和研究',' 创意营销与Slogan策略']
        },{
            title:'实例演练：理解客户的营销需求',
            inner:['互联网数字营销工作体验信息收集','快消品数字营销虚拟工作项目背景','洞悉本质，理解客户的营销需求','知己知彼，构建用户画像']
        },
    ]
    res.send({statu:true,project:project,list:list})
});

router.post('/projectIn', function(req, res, next) {
    var project=[
        {   
            tap:'header',
            content:`典型的消费者研究过程`
        },{
            tap:'graph',
            content:'/src/assets/pic1.png'
        },{
            tap:'content',
            content:`消费者研究其实没有那么神秘复杂，关键在于你要能够确定研究方向与收集信息的维度，不同的营销诉求，会产生不同的研究方向。消费者研究的方向多种多样，一个消费者研究能够明确方向和维度，便已经成功了一半，而剩下的那一半就看如何获得信息了。`
        },{
            tap:'header',
            content:`常见的消费者研究方向`
        },{
            tap:'graph',
            content:'/src/assets/pic1.jpg'
        },{
            tap:'content',
            content:`你和一个人恋爱了，是不是应该花时间去了解他的好恶，兴趣爱好，怎么打发时间？喜欢的明星和偶像，讨厌什么？是不是还要试着去理解他的行为？心理和思想观念。只有这样，你才能从投其所好开始，并从懂他到走进他的内心，以上的过程和行为。
用专业的话来说，在研究你的恋爱对象，只不过你的恋爱对象只是一个人，而我们所说的消费者研究所研究的对象通常是由许多人所组成的特定群体，从追求恋爱对象的例子里，我们就知道对于一个品牌或产品来说，研究他所追求的消费者是多么的重要与必要。`
        }
    ]
    var list=[
        {
            title:'一、行业培训：营销是门什么样的生意',
            inner:['营销的基本方法论',' 理解消费者需求和研究',' 创意营销与Slogan策略']
        },{
            title:'实例演练：理解客户的营销需求',
            inner:['互联网数字营销工作体验信息收集','快消品数字营销虚拟工作项目背景','洞悉本质，理解客户的营销需求','知己知彼，构建用户画像']
        },
    ]
    res.send({statu:true,project:project,list:list})
});
      // if(err){res.send({statu:false,projects:[]});return false}
      // var ons=[]
      // var offs=[]
      // for(let i=0;i<data.length;i++){
      //   if(data[i].statu=='on'){
      //       ons.push(data[i].project)
      //   }
      //   else{
      //       offs.push(data[i].project)
      //   }
      //   var c1=ons.join(' or id=')
      //   var c2=offs.join(' or id=')
      //   var sql1=`select * from projects where id=${c1}`
      //   var sql2=`select * from projects where id=${c2}`
      //   if(ons.length==0){
      //     sql1=`select * from projects where id=9999`
      //   }
      //   if(offs.length==0){
      //     sql2=`select * from projects where id=9999`
      //   }
      //   connection.query(sql1,(err,data1)=>{
      //     if(err){res.send({statu:false});return false}
      //     connection.query(sql2,(err,data2)=>{
      //       if(err){res.send({statu:false});return false}
      //       console.log(data1)
      //       console.log(data2)
      //       // connection.end()
      //       res.send({statu:true,projects:{ons:data1,offs:data2}})
      //     })
      //   })
    // }
module.exports = router;
