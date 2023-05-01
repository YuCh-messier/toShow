var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filesRouter = require('./routes/files');
var projectsRouter = require('./routes/projects');
var internshipRouter = require('./routes/internship');
var youngsRouter = require('./routes/youngs');
var widgetsRouter = require('./routes/widgets');

var adminFileRouter=require('./routes/admins/files')
var adminWidgetsRouter=require('./routes/admins/widgets')
var adminYoungsRouter=require('./routes/admins/youngs')
var adminInternshipRouter=require('./routes/admins/internship')
var adminProjectsRouter=require('./routes/admins/projects')

var app = express();

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
  return currentdate;
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*',(req,res,next)=>{
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Headers', '*')
  console.log('访问时间：',getNowFormatDate())
  if(req.body.telephone){
    console.log('用户：',req.body.telephone)
  }
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);
app.use('/projects', projectsRouter);
app.use('/internship', internshipRouter);
app.use('/youngs', youngsRouter);
app.use('/widgets', widgetsRouter);
app.use('/adminFile', adminFileRouter);
app.use('/adminWidgets', adminWidgetsRouter);
app.use('/adminYoungs', adminYoungsRouter);
app.use('/adminInternships', adminInternshipRouter);
app.use('/adminProjects', adminProjectsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// insert into internship(
//   title,salary,city,weekDay,period,taps,company,icon,companyIntri,companyTap,content
// )values(
//   '人力资源实习生',
//   '100-150/天',
//   '重庆',
//   '5天/周',
//   '3个月',
//   '暑期实习,留学生实习',
//   '蔚来|NIO',
//   'http://124.223.155.169/tryPic/pic3.jpg',
//   '“来自未来,电动、智能、联网是汽车的未来， 我们认可并且将引领这样的技术趋势。”',
//   '汽车|机械|制造/外资企业/50-150人/新能源',
//   '职位描述：
//   岗位职责：
  
//   1.独立完成简历筛选，电话面试与邀约，台帐录入等工作；
  
//   2.独立完成面试官邀约，面试资料准备，会议室布置等工作；
  
//   3.协助完成面试结果反馈分析等工作；
  
//   岗位要求：
  
//   1. 专业不限，本科以上学历，大三大四或者研二在读学生，有招聘实习经历优先；
  
//   2. 每周至少能够工作四天及以上；
  
//   3. 有热情，做事认真仔细、有始有终，学习能力强，沟通好；
  
//   4. 熟悉Office办公软件，会用Photoshop等其他制图软件或视频编辑者尤佳。
  
//   投递要求：
//   简历要求： 中文
//   截止日期：2022-08-30
//   工作地点：
//   重庆市渝北区加工区二路7好金山停车楼一楼蔚来汽车'
// )

// insert into projects(
//   title,tap0,tap1,graph,icon,background,company,content,gains
// )values(
//   '亚太投资体验',
//   '投资并购',
//   '投资并购',
//   'http://124.223.155.169/tryPic/cIcon.jpg',
//   'http://124.223.155.169/tryPic/cIcon.jpg',
//   'http://124.223.155.169/tryPic/background.jpg',
//   'Adobe亚太投资部',
//   'JobReady Digital Marketing Virtual Experience Program

//   建立有效价值链接，挖掘用户潜在需求
  
//   此项虚拟工作体验融合JobReady数字营销工作的精品内容，帮助你熟悉了解营销行业的工作流程和工作内容，全面提升个人商业专业知识与创新能力。通过该虚拟工作体验您将通过专业视角了解到品牌营销和整合营销的基本框架、营销经典方法论、创意营销以及Slogan设计等营销相关的知识，同时您也将参到浪潮营养品营销方案设计策划的虚拟工作中。',
//   '工作证书,额外奖励补贴,14项工作内容'
// )

// insert into project(
//   father,tap,content
// )values(
//   5,'content','此项虚拟工作体验融合JobReady数字营销的精品内容，帮助你熟悉营销的经典方法论，全面提升个人商业能力以及市场营销专业知识。通过该虚拟工作体验您将接触到营销核心需求的归纳总结，目标客户以及产品分析、营销方案策划和制定等营销相关的专业内容，深入了解一个优秀的营销策划是如何向用户传递产品价值的逻辑和思路。'
// )
// insert into projectList(
//   father,tap,content
// )values(
//   6,'inner','创意营销与Slogan策略'
// )
// insert into projectSpe(
//   father,tap,content
// )values(
//   7,'content','消费者研究其实没有那么神秘复杂，关键在于你要能够确定研究方向与收集信息的维度，不同的营销诉求，会产生不同的研究方向。消费者研究的方向多种多样，一个消费者研究能够明确方向和维度，便已经成功了一半，而剩下的那一半就看如何获得信息了。'
// )