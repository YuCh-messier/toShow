<script setup>
import { verifyAccount,getFrontInfo,goto2,goto,randomString,getQueryVariable } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import ProjectInShow from '../adminsSon/ProjectInShow.vue'
import { ref } from 'vue';
import axios from 'axios';

var myid
if(getQueryVariable('myid')){
    myid=getQueryVariable('myid')
}
else{
    alert('参数错误')
    window.location.back(1)
}
var editOrShow=ref(true)
var projectList=ref([])
var projectList2=ref([])
var projectId=ref('')

axios.post(hostServer+'/projects/projectList',{myid:myid}).then(e=>{
    projectList.value=e.data.list
    projectList2.value=e.data.pList
})

function editY(projectid){
    projectId.value=projectid
    editOrShow.value=false
}

function back(){
    projectId.value=''
    editOrShow.value=true
}
</script>

<template>
<div class="w-inner mx-auto p-md">

    <div v-if="editOrShow">
        <div class="my-sm" v-for="item in projectList" :key="item.title">
            <div class="text-font1 font-bold">{{item.title.content}}</div>
            <div class="mt-1 ml-sm containerA" v-for="inner in item.inner" :key="inner">
                <div>{{inner.content}}</div>
                <div class="button mx-md" @click="editY(inner.myid)">编辑</div>
            </div>
        </div>
    </div>
    <ProjectInShow :projectid="projectId" v-if="!editOrShow"></ProjectInShow>
    <button class="button2 bg-succeed mx-auto block my-md" @click="back" v-if="!editOrShow">返回最外层</button>
<div>

</div>
</div>
</template>

<style scoped>

</style>
