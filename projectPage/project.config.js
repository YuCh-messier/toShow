const hostServer='http://127.0.0.1:3000'
const loginUrl='http://124.223.155.169/loginPage/dist/src/pages/signUp.html'
var toGosO={
    '主页':'/src/pages/index.html',
    '实习实训':'/src/pages/projects.html',
    '招聘广场':'/src/pages/internships.html',
    '青年沙龙':'/src/pages/youngs.html'
  }
var toGos2O={
  '项目管理':'/src/pages/admins/projects.html',
  '招聘管理':'/src/pages/admins/internship.html',
  '沙龙管理':'/src/pages/admins/youngs.html',
  '其他管理':'/src/pages/admins/widgets.html'
}
function goto2O(url){
  window.location=url
  // window.location='/projectPage/dist'+url
}
function checkAdminO(){
  var pwd=window.prompt('请输入密码：')
  var ifPwd=ref(false)
  if(pwd==''){
      ifPwd.value=true
  }
  else{
      alert('密码有误')
  }
}
export {hostServer}
export {loginUrl}
export {toGosO}
export {toGos2O}
export {goto2O}
export {checkAdminO}