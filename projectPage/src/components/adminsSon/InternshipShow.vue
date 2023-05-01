<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import axios from 'axios';

var props=defineProps(['internship','tap'])
var {internship}=toRefs(props)
var {tap}=toRefs(props)
var emits=defineEmits(['sendinternships'])

var ifShow=ref(false)
function openAvatar(){
    var file=document.getElementById('file')
    file.click()
}
function setAvatar(){
    var file=document.getElementById('file').files[0]
    var fileMaxSize = 1024*1024*2
    if (file.size > fileMaxSize) {
        alert('图片大小应小于2mb')
        return
    } 
    var blob = window.URL.createObjectURL(file);
    ifShow.value=blob 
}

function save(myid){
    var destination='../../public/pics/internships/'

    let formData = new FormData()
    let fileName=`internships${myid}`
    let file=document.getElementById('file').files[0]
    if(file!=undefined){
        internship.value['icon']=`${hostServer}/pics/internships/${fileName}`
    }
    formData.append('file',file);
    axios({
        method: 'post',
        url: `${hostServer}/adminFile/uploadFile?destination=${destination}&fileName=${fileName}`,
        data: formData
    })
    emits('sendinternships',internship.value,myid,tap.value)
}
</script>

<template>
<div class="">
    <div class="border p-xl w-inner">
        <div class="tips">{{internship.time}}</div>
        <div class="containerA">
            <div class="mr-sm">标题: </div>
            <input class="input2" v-model="internship.title"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">薪资: </div>
            <input class="input2" v-model="internship.salary"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">城市：</div>
            <input class="input2" v-model="internship.city"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">每周工作时长: </div>
            <input class="input2" v-model="internship.weekDay"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">实习时长: </div>
            <input class="input2" v-model="internship.period"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">公司名称: </div>
            <input class="input2" v-model="internship.company"/>
        </div>
        <div class="mb-sm">
            <div class="mr-sm">公司简介: </div>
            <textarea class="w-4/5 h-24 p-sm" v-model="internship.companyIntri"></textarea>
        </div>
        <div class="mb-sm">
            <div class="mr-sm">实习标签: </div>
            <textarea class="w-4/5 h-10 p-sm" v-model="internship.taps"></textarea>
        </div>
        <div class="mb-sm">
            <div class="mr-sm">公司标签: </div>
            <textarea class="w-4/5 h-10 p-sm" v-model="internship.companyTap"></textarea>
        </div>
        <div class="mb-sm">
            <div class="mr-sm">内容: </div>
            <textarea class="w-4/5 h-72 p-sm" v-model="internship.content"></textarea>
        </div>
        <div class="border-b w-full my-xl"></div>

        
        <div class="containerB w-fit">
            <div class="mb-md">公司图标</div>
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="internship.icon" alt="" @click="openAvatar()" v-if="!ifShow">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow" alt="" @click="openAvatar()" v-else>
            <input type="file" :id="'file'" @change="setAvatar()" accept="image/png, image/jpg" hidden>
        </div>

    <div class="button mx-auto mt-xl" @click="save(internship.myid)">保存</div>
    </div>
<div>
    
</div>
</div>
</template>

<style scoped>

</style>
    