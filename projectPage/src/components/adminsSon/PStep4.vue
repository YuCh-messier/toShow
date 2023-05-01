<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import axios from 'axios';

var props=defineProps(['projectdownload','tap','father'])
var {projectdownload}=toRefs(props)
var {tap}=toRefs(props)
var emits=defineEmits(['sendprojectdownload'])

function setAvatar(){
    var file=document.getElementById('file').files[0]
    var fileMaxSize = 1024*1024*10
    if (file.size > fileMaxSize) {
        alert('文件大小应小于10mb')
        return
    } 
}

function save(myid){
    var destination='../../public/pics/projects/'
    let formData = new FormData()
    let fileName=`projectstep4${myid}.pdf`
    let file=document.getElementById('file').files[0]
    projectdownload.value.file=`${hostServer}/pics/projects/${fileName}`
    formData.append('file',file);
    axios({
        method: 'post',
        url: `${hostServer}/adminFile/uploadFile?destination=${destination}&fileName=${fileName}`,
        data: formData
    })
    emits('sendprojectdownload',projectdownload.value,myid,tap.value)
}
</script>

<template>
<div class="">
    <div class="border p-xl w-inner">
        <div><input class="input2" v-model="projectdownload.title" /></div>
        <div><textarea class="w-4/5 h-32 p-sm" v-model="projectdownload.content"></textarea></div>
        <div><input type="file" @change="setAvatar" id="file" accept=".pdf" /></div>
    </div>
    <div class="button mx-auto mt-xl" @click="save(father)">保存</div>
<div>
    
</div>
</div>
</template>

<style scoped>

</style>
