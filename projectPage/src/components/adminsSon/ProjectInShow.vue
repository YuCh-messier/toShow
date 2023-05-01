<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import axios from 'axios';

var props=defineProps(['projectid'])
var {projectid}=toRefs(props)
var projectspe=ref([])
var ifShow=ref([])

axios.post(hostServer+'/projects/projectInChange',{speId:projectid.value}).then(e=>{
    projectspe.value=e.data.projectSpe
    for(let i=0;i<projectspe.value.length;i++){
        ifShow.value.push(false)
    }
})

function openAvatar(index){
    var file=document.getElementById('file'+index)
    file.click()
}
function setAvatar(index){
    var file=document.getElementById('file'+index).files[0]
    var fileMaxSize = 1024*1024*2
    if (file.size > fileMaxSize) {
        alert('图片大小应小于2mb')
        return
    } 
    var blob = window.URL.createObjectURL(file);
    ifShow.value[index]=blob 
}
function addContent(tap,content){
    projectspe.value.push({
        tap:tap,
        father:projectid.value,
        content:content
    })
    ifShow.value.push(false)
}
function deleteContent(index){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        projectspe.value.splice(index,1)
        ifShow.value.splice(index,1)
    }
}
function save(myid){
    var destination='../../public/pics/projects/'
    for(let i=0;i<ifShow.value.length;i++){
        if(ifShow.value[i]==false){
            continue
        }
        let formData = new FormData()
        let fileName=`projectin${i}${myid}`
        let file=document.getElementById('file'+i).files[0]
        projectspe.value[i].content=`${hostServer}/pics/projects/${fileName}`
        formData.append('file',file);
        axios({
            method: 'post',
            url: `${hostServer}/adminFile/uploadFile?destination=${destination}&fileName=${fileName}`,
            data: formData
        })
    }
    axios.post(hostServer+'/adminProjects/editProjectIn',{myid:projectid.value,projectSpe:projectspe.value})
    alert('保存成功')
}

</script>

<template>
<div class="border p-xl w-inner">
    <div class="containerA gap-x-md">
        <div class="button" @click="addContent('header','标题')">添加标题</div>
        <div class="button" @click="addContent('content','内容')">添加内容</div>
        <div class="button" @click="addContent('graph','http://124.223.155.169/defaultBack.png')">添加图片</div>
    </div>
    <div class="my-xl" v-for="item,index in projectspe" :key="item">
        <div class="button2 bg-succeed" @click="deleteContent(index)">删除</div>
        <input class="input3" v-if="item.tap=='header'" v-model="item.content" />
        <textarea class="w-4/5 h-32 p-sm" v-else-if="item.tap=='content'" v-model="item.content"></textarea>
        <div class="containerB w-fit" v-else>
            <img class="h-fit rounded inline-block hover:cursor-pointer hover:ring ring-primary" style="width:300px;" :src="item.content" alt="" @click="openAvatar(index)" v-if="!ifShow[index]">
            <img class="h-fit rounded inline-block hover:cursor-pointer hover:ring ring-primary" style="width:300px;" :src="ifShow[index]" alt="" @click="openAvatar(index)" v-else>
            <input type="file" :id="'file'+index" @change="setAvatar(index)" accept="image/png, image/jpg" hidden>
        </div>
    </div>
    <div class="button mx-auto mt-xl" @click="save(projectid)">保存</div>
<div>
    
</div>
</div>
</template>

<style scoped>

</style>
    