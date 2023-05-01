<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import Switcher1 from '../widgets/Switcher1.vue';
import PStep1 from '../adminsSon/PStep1.vue'
import PStep2 from '../adminsSon/PStep2.vue'
import PStep3 from '../adminsSon/PStep3.vue'
import PStep4 from '../adminsSon/PStep4.vue'
import PStep5 from '../adminsSon/PStep5.vue'
import axios from 'axios';

var csssetting=['text-primary text-font3','text-light text-font3',['px-sm'],['bg-lightB','h-4','w-border'],false] 
var choices=['步骤1','步骤2','步骤3','步骤4','步骤5']
var curChoice=ref('步骤1')
function onChange(e){
    curChoice.value=e
}

var props=defineProps(['project','tap'])
var {project}=toRefs(props)
var {tap}=toRefs(props)

var projectSpe=ref([])
var projectList=ref([])
var projectDownload=ref({})
var projectUpload=ref({})
var myid=project.value.myid
if(tap.value=='update'){
    axios.post(hostServer+'/projects/projectInA',{projectId:myid}).then(e=>{
        console.log(e.data)
        projectSpe.value=e.data.project
        projectList.value=e.data.list
        projectDownload.value=e.data.projectDownload
        projectUpload.value=e.data.projectUpload
    })
}
else{
    projectSpe.value=[]
    projectList.value=[]
    projectDownload.value={
        title:'附件名称',
        content:'附件说明',
        father:myid,
        file:'nofile'
    }
    projectUpload.value={
        title:'结项说明标题',
        content:'结项附件说明',
        father:myid
    }
    sendProject(project.value,myid,tap.value,false)
    sendProjectDownload(projectDownload.value,myid,tap.value,false)
    sendProjectUpload(projectUpload.value,myid,tap.value,false)
    alert('新建成功')
    window.location.reload()
}

function sendProject(toSend,myid,tap,initial=true){
    axios.post(hostServer+'/adminProjects/editProject',{myid:myid,tap:tap,project:toSend})
    if(initial){alert('保存成功')}
}
function sendProjectSpe(toSend,myid,tap,initial=true){
    axios.post(hostServer+'/adminProjects/editProjectSpe',{myid:myid,tap:tap,projectSpe:toSend})
    if(initial){alert('保存成功')}
}
function sendProjectList(toSend,myid,tap,initial=true){
    axios.post(hostServer+'/adminProjects/editProjectList',{myid:myid,tap:tap,projectList:toSend})
    if(initial){alert('保存成功')}
}
function sendProjectDownload(toSend,myid,tap,initial=true){
    axios.post(hostServer+'/adminProjects/editProjectDownload',{myid:myid,tap:tap,projectDownload:toSend})
    if(initial){alert('保存成功')}
}
function sendProjectUpload(toSend,myid,tap,initial=true){
    axios.post(hostServer+'/adminProjects/editProjectUpload',{myid:myid,tap:tap,projectUpload:toSend})
    if(initial){alert('保存成功')}
}
</script>

<template>
<div class="">
    <Switcher1 class="border p-sm w-fit mb-md" :choices="choices" :csssetting="csssetting" @tapsfunction="onChange"></Switcher1>
    <div class="tips mb-md">完成每一步记得保存！</div>
    <PStep1 :project="project" :tap="tap" @sendproject="sendProject" v-if="curChoice=='步骤1'"></PStep1>
    <PStep2 :projectspe="projectSpe" :father="project.myid" :tap="tap" @sendprojectspe="sendProjectSpe" v-if="curChoice=='步骤2'"></PStep2>
    <PStep3 :projectlist="projectList" :father="project.myid" :tap="tap" @sendprojectlist="sendProjectList" v-if="curChoice=='步骤3'"></PStep3>
    <PStep4 :projectdownload="projectDownload" :father="project.myid" :tap="tap" @sendprojectdownload="sendProjectDownload" v-if="curChoice=='步骤4'"></PStep4>
    <PStep5 :projectupload="projectUpload" :father="project.myid" :tap="tap" @sendprojectupload="sendProjectUpload" v-if="curChoice=='步骤5'"></PStep5>
</div>
</template>

<style scoped>

</style>
    