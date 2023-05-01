<script setup>
import { verifyAccount,getFrontInfo,setFrontInfo,formalizeInput } from '../scripts/publicFunctions';
import {hostServer,loginUrl} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';
import Switcher1 from './widgets/Switcher1.vue'
import MyProject from './sonPage/MyProject.vue'
import MyInfo from './sonPage/MyInfo.vue';
import MyResume from './sonPage/MyResume.vue';
import MyInternship from './sonPage/MyInternship.vue';
import MyYoung from './sonPage/MyYoung.vue';

var csssetting=['text-primary text-font3','text-light text-font3',['px-sm'],['bg-lightB','h-4','w-border'],false] 
var choices=['我的项目','我的投递','沙龙足迹','个人简历','个人信息']

var currentChoice=ref(choices[0])
function onChange(e){
    currentChoice.value=e
}

if(!verifyAccount()){
   window.location=loginUrl
}
var userInfo=ref({avatar:'',name:'',school:'',telephone:''})
var frontInfo=getFrontInfo()
axios.post(hostServer+'/users/getUserInfo',frontInfo).then(e=>{
  userInfo.value=e.data
})


function handleinfo(e){
  var toChange={
    name:e.name,
    email:e.email,
    school:e.school,
    gender:e.gender,
    birthday:e.birthday
  }
  var indexs=Object.keys(toChange)
  for(var i=0;i<indexs.length;i++){
      if(!formalizeInput(toChange[indexs[i]])){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  }
  axios.post(hostServer+'/users/setUserInfo',{...getFrontInfo(),toChange:toChange}).then(e=>{setFrontInfo(getFrontInfo())})
}

var resume=ref({basic:{
  name:'',
  avatar:'',
  summary:''
},
  preference:{
    industry:'',
    position:'',
    city:'',
    deadline:'',
    period:'',
    weekDay:''
  }
})
axios.post(hostServer+'/users/resume',frontInfo).then(e=>{
  resume.value=e.data
})
function checkArrayInput(array){
  for(var i=0;i<array.length;i++){
    if(!formalizeInput(array[i])){
      return false
    }
  }
  return true
}
function handleresume(e){
  if(!checkArrayInput(Object.values(e.basic))){
    alert(`输入不应包括 ; ' : " ,及为空`)
    return false
  }
  if(!checkArrayInput(Object.values(e.preference))){
    alert(`输入不应包括 ; ' : " ,及为空`)
    return false
  }
  e.education.forEach(ele=>{
    if(!checkArrayInput(Object.values(ele))){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  })
  e.clubship.forEach(ele=>{
    if(!checkArrayInput(Object.values(ele))){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  })
  e.internship.forEach(ele=>{
    if(!checkArrayInput(Object.values(ele))){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  })
  e.scholarship.forEach(ele=>{
    if(!checkArrayInput(Object.values(ele))){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  })
  e.awards.forEach(ele=>{
    if(!checkArrayInput(Object.values(ele))){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  })
  e.skills.forEach(ele=>{
    if(!checkArrayInput(Object.values(ele))){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  })
  e.works.forEach(ele=>{
    if(!checkArrayInput(Object.values(ele))){
      alert(`输入不应包括 ; ' : " ,及为空`)
      return false
    }
  })
  axios.post(hostServer+'/users/setResume',{...getFrontInfo(),resume:resume.value}).then(e=>{
    if(e.data.statu){
      window.confirm('修改成功')
    }
  })
}

function setAvatar(){
  var file=document.getElementById('file')
  file.click()
}
function sendAvatar(){
  var file=document.getElementById('file').files[0]
  var fileMaxSize = 1024*1024*2
  if (file.size > fileMaxSize) {
      alert('图片大小应小于2mb')
      return
  } 
  var blob = window.URL.createObjectURL(file);
  userInfo.value.avatar=blob
  document.getElementById('file2').click()
}

var projects=ref([])
axios.post(hostServer+'/users/project',frontInfo).then(e=>{
  projects.value=e.data.projects
})

var internships=ref([])
axios.post(hostServer+'/users/internship',frontInfo).then(e=>{
  internships.value=e.data.internships
})

var youngs=ref([])
axios.post(hostServer+'/users/youngs',frontInfo).then(e=>{
  youngs.value=e.data.youngs
})
</script>

<template>
<div class="w-fit mx-auto p-xxl">
  <form :action="hostServer+'/files/uploadFile?tap=avatar&id='+userInfo.telephone" method="post" enctype="multipart/form-data" id="avatar">
      <input type="file" name="avatar" id="file" @change="sendAvatar" accept="image/png, image/jpg" hidden>
      <button type="submit" id="file2" hidden></button>
  </form>
  <div class="p-xl containerA bg-light w-inner">
    <img class="w-40 h-40 rounded shadow-xl hover:cursor-pointer hover:ring ring-primary" :src="userInfo.avatar" alt="" @click="setAvatar">
    <div class="text-font3 text-white space-y-sm ml-md">
      <div>{{userInfo.name}}</div>
      <div>{{userInfo.telephone}}</div>
      <div>{{userInfo.school}}</div>
    </div>
  </div>

  <Switcher1 class="border p-sm w-inner" :choices="choices" :csssetting="csssetting" @tapsfunction="onChange"></Switcher1>
  <div class="flex w-inner border">
    <div class="tips w-32 text-center py-4 border-r">个人中心</div>
    <div class="text-font3 text-primary font-bold py-4 pl-xxl">| {{currentChoice}}</div>
  </div>

  <MyProject v-if="currentChoice=='我的项目'" class="w-inner h-fit" :projects="projects"></MyProject>
  <MyInternship v-else-if="currentChoice=='我的投递'" class="w-inner h-fit" :internships="internships"></MyInternship>
  <MyYoung v-else-if="currentChoice=='沙龙足迹'" class="w-inner h-fit" :youngs="youngs"></MyYoung>
  <MyInfo v-else-if="currentChoice=='个人信息'" class="w-inner h-fit" :userinfo="userInfo" @handleinfo="handleinfo"></MyInfo>
  <MyResume v-else-if="currentChoice=='个人简历'" class="w-inner h-fit" :userinfo="userInfo" :resume="resume" @handleresume="handleresume"></MyResume>
</div>
</template>

<style scoped>

</style>
