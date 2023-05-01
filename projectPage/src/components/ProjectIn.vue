<script setup>
import { verifyAccount,goto2,getQueryVariable,getFrontInfo } from '../scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';

if(!verifyAccount()){
   window.location=loginUrl
}
var telephone=getFrontInfo().telephone
var projectId=1
if(getQueryVariable('projectId')){
    projectId=getQueryVariable('projectId')
}
var project=ref({title:'',taps:'',content:''})
var projectSpe=ref([])
var list=ref([])
var pList=ref([])
var plist=ref([])
var projectUser=ref({step:0})
var step=ref(0)
axios.post(hostServer+'/projects/projectIn',{projectId:projectId,telephone:telephone}).then(e=>{
    project.value=e.data.project
    projectSpe.value=e.data.projectSpe
    list.value=e.data.list
    pList.value=e.data.pList
    projectUser.value=e.data.projectUser
    step.value=Number(projectUser.value.step)
    for(let i=0;i<pList.value.length;i++){
        plist.value.push(pList.value[i].myid)
    }
})

function changeSpe(speId){
    var pId=plist.value.indexOf(speId)
    if(pId>step.value){
        alert('请先完成上一步')
        return
    }
    if(sessionStorage.getItem(speId)){
        projectSpe.value=JSON.parse(sessionStorage.getItem(speId))
        return
    }
    axios.post(hostServer+'/projects/projectInChange',{speId:speId}).then(e=>{
    projectSpe.value=e.data.projectSpe
    sessionStorage.setItem(speId,JSON.stringify(e.data.projectSpe))
})
}

function finishOne(){
    var curId=projectSpe.value[0].father
    if(curId==undefined){
        return
    }
    curId=plist.value.indexOf(curId.toString())
    if(step.value==plist.value.length-1){
        return
    }
    if(curId==step.value){
        step.value+=1
    }
    changeSpe(plist.value[step.value])
}
function goFinish(){
    if(step.value==plist.value.length-1){
        goto2('/src/pages/projectUpload.html?projectId='+projectId)
    }
    else{
        alert('请先完成所有任务')
    }
}
window.onbeforeunload=()=>{
    axios.post(hostServer+'/projects/updateUser',{telephone:telephone,step:step.value,projectId:projectId})
}
</script>

<template>
<div class="w-full flex">
    <div class="w-96 bg-lightL overflow-auto py-xxl mt-xl" style="height:calc(100vh - 94px);">
        <div class="font-bold text-font1 w-fit mx-auto">{{project.title}}</div>
        <div class="containerA w-fit mx-auto gap-x-sm m-md">
            <button class="button3 bg-primaryL text-white hover:bg-primaryH" @click="goto2('/src/pages/projectDownload.html?projectId='+projectId)">下载要求</button>
            <button class="button3 bg-white hover:bg-lightH" @click="goFinish">上传附件</button>
        </div>
        <div class="w-80 border-b m-md"></div>
        <div class="mt-sm" v-for="item in list" :key="item.title">
            <div class="font-bold ml-xl my-sm">{{item.title.content}}</div>
            <div class="py-sm px-xxl m-px hover:bg-primaryL hover:cursor-pointer hover:text-white" v-for="inner in item.inner" :key="inner" @click="changeSpe(inner.myid)">{{inner.content}}</div>
        </div>
    </div>

    <div class="overflow-auto containerB px-32 py-16" style="height:calc(100vh - 64px);width:calc(100vw - 384px) ">
        <div class="my-xl" v-for="item in projectSpe" :key="item">
            <div class="text-font1 font-bold whitespace-pre-line" v-if="item.tap=='header'">{{item.content}}</div>        
            <div class="whitespace-pre-line px-xxl" v-else-if="item.tap=='content'">{{item.content}}</div>        
            <img class="h-fit block rounded" style="max-width:900px;" :src="item.content" v-else>
        </div>
        <div class="button" @click="finishOne">完成</div>
    </div>
</div>
</template>

<style scoped>

</style>
