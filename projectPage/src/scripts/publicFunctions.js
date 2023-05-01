import axios from 'axios';
import {hostServer,toGosO,toGos2O,goto2O,checkAdminO} from '/project.config.js'

function setCookie(cname,cvalue,exdays){
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return '';
}
function checkCookie(cname){
  var cn=getCookie(cname);
  return cn!=''
}

function goto(url){
  window.location=url
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function randomString(e) {    
  e = e || 16;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}

// --------------------------------------------------------------------------------

function verifyAccount(){
  var hasCookieOrNot=checkCookie('uniid') && checkCookie('telephone') && checkCookie('ddl') && checkCookie('avatar') && checkCookie('name')
  if(!hasCookieOrNot){
    return false
  }
  return true
}

function setFrontInfo(jwt){
  axios.post(hostServer+'/users/login',jwt).then(e=>{
    if(!e.data.statu){
      return false
    }
    console.log(e.data)
    setCookie('name',e.data.name,14)
    setCookie('avatar',e.data.avatar,14)
    setCookie('telephone',jwt.telephone,14)
    setCookie('ddl',jwt.ddl,14)
    setCookie('uniid',jwt.uniid,14)
    window.confirm('修改成功')
    window.location.reload()
  })
}

function getToken(token){
  return axios.post(hostServer+'/users/getJwt',{token:token})
}

function getFrontInfo(){
  if(verifyAccount()){
    return {
      statu:true,
      name:getCookie('name'),
      avatar:getCookie('avatar'),
      uniid:getCookie('uniid'),
      telephone:getCookie('telephone'),
      ddl:getCookie('ddl')
    }
  }
  return false
}


function formalizeInput(toCheck){
  toCheck=toCheck.toString()
  var check1=toCheck.indexOf('"')==-1
  var check2=true
  var check3=true
  var check4=toCheck.indexOf(';')==-1
  var check5=toCheck.indexOf(',')==-1
  var check6=toCheck.indexOf("'")==-1
  var check7=toCheck!=''
  var check8=toCheck.length<=1000
  if(!(check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8)){
    console.log(toCheck)
  }
  return (check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8)
}

var checkAdmin=checkAdminO
var goto2=goto2O
var toGos=toGosO
var toGos2=toGos2O

export {setCookie}
export {getCookie}
export {checkCookie}
export {goto}
export {goto2}
export {getQueryVariable}
export {randomString}

export {setFrontInfo}
export {verifyAccount}
export {getFrontInfo}
export {getToken}
export {formalizeInput}
export {toGos}
export {toGos2}
export {checkAdmin}
