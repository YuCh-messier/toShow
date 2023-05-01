<script setup>
import { verifyAccount,getQueryVariable,getFrontInfo } from '../scripts/publicFunctions';
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
var ifProject=ref(false)
axios.post(hostServer+'/projects/ifProject',{projectId:projectId,telephone:telephone}).then(e=>{
    ifProject.value=(e.data.ifProject.statu=='on')?true:false
})
var files=ref({title:'',content:''})
axios.post(hostServer+'/projects/projectUpload',{projectId:projectId}).then(e=>{
    files.value=e.data.projectUpload
})

function sendAvatar(){
    var file=document.getElementById('file').files[0]
    var fileMaxSize = 1024*1024*10
    if (file.size > fileMaxSize) {
        alert('文件大小应小于10mb')
        return
    } 
}
function finish(){
    try{
        var file=document.getElementById('file').files[0]
        if(file.size>0){
            document.getElementById('file2').click()
        }
    } 
    catch{
        return
    }
}
</script>

<template>
<div class="w-inner p-xxl mx-auto" style="min-height:calc(100vh - 300px)">
    <div class="text-font2 font-bold">结项要求说明</div>
    <div class="whitespace-pre my-md">{{files.content}}</div>
    <div class="flex mt-xxl">
        <form :action="hostServer+`/files/uploadProject?telephone=${telephone}&myid=${projectId}`" method="post" enctype="multipart/form-data">
            <input type="file" name="project" id="file" @change="sendAvatar" accept=".pdf">
            <button type="submit" id="file2" hidden></button>
        </form>  
    </div>
    <div class="tips w-fit mx-auto my-md">仅能提交一次，请谨慎选择</div>
    <div class="button4 bg-primaryL text-white w-fit mx-auto hover:bg-primaryH" @click="finish" v-if="ifProject">提交</div>
    <div class="button4 bg-finish text-white w-fit mx-auto" v-else>已提交</div>
</div>
</template>

<style scoped>

</style>
    