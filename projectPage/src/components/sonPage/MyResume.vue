<script setup>
import { ref,toRefs} from 'vue';
import { hostServer } from '/project.config';
import Switcher2 from '../widgets/Switcher2.vue'
import Education from './ResumeShow/Education.vue'
import Preference from './ResumeShow/Preference.vue';
import ThreeShips from './ResumeShow/ThreeShips.vue';
import ThreeSkills from './ResumeShow/ThreeSkills.vue';

var csssetting=['text-primary text-font3','text-light text-font3',['py-2'],['h-4','bg-primary','w-line','mr-1'],true] 
var choices=['基本信息','教育经历','求职偏好','社团和组织经历','实习经历','学术经历','获奖经历','个人特长','作品展示','总结补充']
var currentChoice=ref(choices[0])

var props=defineProps(['userinfo','resume'])
var emits=defineEmits(['handleresume'])
var {userinfo}=toRefs(props)
var {resume}=toRefs(props)
function doClick(){
    emits('handleresume',resume.value)
}

function onChange(e){
    currentChoice.value=e
    var nowIndex=choices.indexOf(e)+1
    var whereTo=document.getElementById('p'+nowIndex).offsetTop
    window.scroll({top:whereTo,behavior:'smooth'})
}

function addEdu(){
    if(resume.value.education.length>2){
        alert('最多添加三组内容')
        return false
    }
    resume.value.education.push(
    {
        school:'学校',
        scholar:'学位',
        department:'专业',
        time:'在校时间（2019/09-2022/12）',
        gpa:'GPA（4.0）',
        score:'专业排名（30%）',
      }
    )
}
function addClubship(){
    if(resume.value.clubship.length>4){
        alert('最多添加五组内容')
        return false
    } 
    resume.value.clubship.push({
        name:'组织名称',
        position:'职位',
        time:'在岗时间',
        intri:'工作简介'
    })
}
function addInternship(){
    if(resume.value.internship.length>4){
        alert('最多添加五组内容')
        return false
    } 
    resume.value.internship.push({
        name:'单位名称',
        position:'职位',
        time:'在岗时间',
        intri:'工作简介'
    })
}
function addScholarship(){
    if(resume.value.scholarship.length>4){
        alert('最多添加五组内容')
        return false
    } 
    resume.value.scholarship.push({
        name:'项目名称',
        position:'职位',
        time:'在岗时间',
        intri:'工作简介'
    })
}
function addAward(){
    if(resume.value.awards.length>4){
        alert('最多添加五组内容')
        return false
    } 
    resume.value.awards.push({
        name:'奖项',
        intri:'级别'
    })
}
function addSkill(){
    if(resume.value.skills.length>4){
        alert('最多添加五组内容')
        return false
    } 
    resume.value.skills.push({
        name:'技能/语言',
        intri:'等级/分数'
    })
}
function addWork(){
    if(resume.value.works.length>4){
        alert('最多添加五组内容')
        return false
    } 
    resume.value.works.push({
        name:'名称',
        intri:'简介'
    })
}

function setAvatar(){
  var file=document.getElementById('file3')
  file.click()
}
function sendAvatar(){
  var file=document.getElementById('file3').files[0]
  var fileMaxSize = 1024*1024*2
  if (file.size > fileMaxSize) {
      alert('图片大小应小于2mb')
      return
  } 
  var blob = window.URL.createObjectURL(file);
  resume.value.basic.avatar=blob
  document.getElementById('file4').click()
  // axios.post(hostServer+'/files/uploadFile',file)
}
</script>

<template>
 <div class="flex border">
    <div class="w-32 py-8 border-r">
        <Switcher2 class="sticky top-4" :csssetting="csssetting" :choices="choices" @tapsfunction="onChange"></Switcher2>
    </div>
    <div class="text-font3 py-8 pl-xxl space-y-xl">
        <!-- -----------------standardInfo--------------- -->
        <form :action="hostServer+'/files/uploadFile?tap=avatarTrue&id='+userinfo.telephone" method="post" enctype="multipart/form-data" id="avatar2">
            <input type="file" name="avatar" id="file3" @change="sendAvatar" accept="image/png, image/jpg" hidden>
            <button type="submit" id="file4" hidden></button>
        </form>
        <div class="header1" id="p1">基本信息</div>
        <div class="containerA">
            <div><img class="w-40 h-40 hover:cursor-pointer hover:ring ring-primary" :src="resume.basic.avatar" alt="" @click="setAvatar"></div>
            <div class="space-y-4 ml-md">
                <input class="input2" type="text" name="" id="" v-model="resume.basic.name">
                <div class="flex gap-x-4">
                    <div>{{userinfo.birthday}}</div>
                    <div>{{userinfo.telephone}}</div>
                </div>
            </div>
        </div>
        <!-- -------------------education--------------------- -->
        <div class="containerA justify-between">
            <div class="header1" id="p2">教育经历</div>
            <div class="tips2" @click="addEdu">添加</div>
        </div>
        <Education :education="resume.education"></Education>
        <!-- ----------------------preference------------------------- -->
        <div class="header1" id="p3">求职偏好</div>
        <Preference :preference="resume.preference"></Preference>
        <!-- ----------------------three ship------------------------- -->
        <div class="containerA justify-between">
            <div class="header1" id="p4">社团和组织经历</div>
            <div class="tips2" @click="addClubship">添加</div>
        </div>
        <ThreeShips :content="resume.clubship"></ThreeShips>

        <div class="containerA justify-between">
            <div class="header1" id="p5">实习经历</div>
            <div class="tips2" @click="addInternship">添加</div>
        </div>
        <ThreeShips :content="resume.internship"></ThreeShips>

        <div class="containerA justify-between">
            <div class="header1" id="p6">学术经历</div>
            <div class="tips2" @click="addScholarship">添加</div>
        </div>
        <ThreeShips :content="resume.scholarship"></ThreeShips>
        <!-- ----------------------three skills------------------------- -->
        <div class="containerA justify-between">
            <div class="header1" id="p7">获奖经历</div>
            <div class="tips2" @click="addAward">添加</div>
        </div>
        <ThreeSkills :content="resume.awards" tap="awards"></ThreeSkills>

        <div class="containerA justify-between">
            <div class="header1" id="p8">个人特长</div>
            <div class="tips2" @click="addSkill">添加</div>
        </div>
        <ThreeSkills :content="resume.skills" tap="skills"></ThreeSkills>

        <div class="containerA justify-between">
            <div class="header1" id="p9">作品展示</div>
            <div class="tips2" @click="addWork">添加</div>
        </div>
        <ThreeSkills :content="resume.works" tap="works"></ThreeSkills>
        <!-- ----------------------summary------------------------- -->
        <div class="header1" id="p10">个人总结</div>
        <textarea class="whitespace-pre-line h-96 p-4" style="width:48em" v-model="resume.basic.summary"></textarea>

        <div class="mx-auto w-fit pt-xl"><button class="button" @click="doClick">保存</button></div>
    </div>
 </div>
</template>

<style scoped>

</style>
