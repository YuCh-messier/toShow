<script setup>
import { verifyAccount,getFrontInfo,goto2,goto,randomString } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import ProjectShow from '../adminsSon/ProjectShow.vue'
import { ref } from 'vue';
import axios from 'axios';

var editOrShow=ref(true)
var tap=ref('update')
var projects=ref([])
var project=ref({})
axios.get(hostServer+'/projects/projects').then(e=>{
    projects.value=e.data.projects
})

function editY(index){
    project.value=projects.value[index]
    editOrShow.value=false
    tap.value='update'
}
function deleteY(myid){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        axios.post(hostServer+'/adminProjects/deleteProject',{myid:myid}).then(()=>{
            alert('删除成功')
            window.location.reload()
    })
    }
}
function addY(){
    let toIn={
        title:'标题',
        tap0:'标签1',
        tap1:'标签2',
        company:'公司名称',
        gains:'该项目收获、特点标签。每两个间由 英文逗号 , 隔开。例：工作特色1,工作特色2',
        content:'项目简介',
        icon:'http://124.223.155.169/defaultAvatar.jpg',
        graph:'http://124.223.155.169/defaultAvatar.jpg',
        background:'http://124.223.155.169/defaultBack.png',
        myid:randomString()
    }
    project.value=toIn
    tap.value='add'
    editOrShow.value=false
}
function back(){
    project.value={}
    editOrShow.value=true
}
function editYY(index){
    goto2(`/src/pages/admins/projectIn.html?myid=${projects.value[index].myid}`)
}
</script>

<template>
<div class="w-inner mx-auto p-md">

    <div class="button2 bg-primaryL mx-auto" v-if="editOrShow" @click="addY">添加</div>
    <div v-if="editOrShow">
        <div class="containerA my-md" v-for="project,index in projects" :key="project.id">
            <div class="w-1/2 font-bold">{{project.title}}</div>
            <div class="button2 bg-succeed" @click="editY(index)">编辑</div>
            <div class="button bg-succeed mx-md" @click="editYY(index)">编辑具体项目页面</div>
            <div class="button2 bg-primary" @click="deleteY(project.myid)">删除</div>
        </div>
    </div>
    <ProjectShow :project="project" :tap="tap" v-if="!editOrShow"></ProjectShow>
    <button class="button2 bg-succeed mx-auto block my-md" @click="back" v-if="!editOrShow">返回最外层</button>
<div>

</div>
</div>
</template>

<style scoped>

</style>
