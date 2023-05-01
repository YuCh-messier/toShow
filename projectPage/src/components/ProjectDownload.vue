<script setup>
import { verifyAccount,getQueryVariable } from '../scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';

if(!verifyAccount()){
   window.location=loginUrl
}
var projectId=1
if(getQueryVariable('projectId')){
    projectId=getQueryVariable('projectId')
}
var files=ref({title:'',content:'',file:''})
axios.post(hostServer+'/projects/projectDownload',{projectId:projectId}).then(e=>{
    files.value=e.data.projectDownload
})
</script>

<template>
<div class="w-inner p-xxl mx-auto" style="min-height:calc(100vh - 300px)">
    <div class="text-font2 font-bold">附件说明</div>
    <div class="whitespace-pre my-md">{{files.content}}</div>
    <div class="flex mt-xxl">
        <div class="w-3/5">{{files.title}}</div>
        <a :href="files.file" :download="files.title" class="text-primary hover:text-primaryH">浏览</a>
    </div>
</div>
</template>

<style scoped>

</style>
