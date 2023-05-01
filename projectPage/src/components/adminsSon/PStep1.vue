<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import axios from 'axios';

var props=defineProps(['project','tap'])
var {project}=toRefs(props)
var {tap}=toRefs(props)
var emits=defineEmits(['sendproject'])

var ifShow=ref([false,false,false])
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

function save(myid){
    var destination='../../public/pics/projects/'
    var picDis=['graph','icon','background']
    for(let i=0;i<3;i++){
        let formData = new FormData()
        let fileName=`projectstep1${picDis[i]}${myid}`
        let file=document.getElementById('file'+i).files[0]
        if(file!=undefined){
            project.value[picDis[i]]=`${hostServer}/pics/projects/${fileName}`
        }
        formData.append('file',file);
        axios({
            method: 'post',
            url: `${hostServer}/adminFile/uploadFile?destination=${destination}&fileName=${fileName}`,
            data: formData
        })
    }
    emits('sendproject',project.value,myid,tap.value)
}
</script>

<template>
<div class="">
    <div class="border p-xl w-inner">
        <div class="containerA">
            <div class="mr-sm">标题: </div>
            <input class="input2" v-model="project.title"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">标签1: </div>
            <input class="input2" v-model="project.tap0"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">标签2：</div>
            <input class="input2" v-model="project.tap1"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">公司名称: </div>
            <input class="input2" v-model="project.company"/>
        </div>
        <div class="mb-sm">
            <div class="mr-sm">项目收获/特色: </div>
            <textarea class="w-4/5 h-10 p-sm" v-model="project.gains"></textarea>
        </div>
        <div class="mb-sm">
            <div class="mr-sm">项目简介: </div>
            <textarea class="w-4/5 h-72 p-sm" v-model="project.content"></textarea>
        </div>
        <div class="border-b w-full my-xl"></div>

        <div class="containerA justify-around">
        <div class="containerB w-fit">
            <div class="mb-md">项目图标</div>
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="project.graph" alt="" @click="openAvatar(0)" v-if="!ifShow[0]">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow[0]" alt="" @click="openAvatar(0)" v-else>
            <input type="file" :id="'file0'" @change="setAvatar(0)" accept="image/png, image/jpg" hidden>
        </div>

        <div class="containerB w-fit">
            <div class="mb-md">公司图标</div>
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="project.icon" alt="" @click="openAvatar(1)" v-if="!ifShow[1]">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow[1]" alt="" @click="openAvatar(1)" v-else>
            <input type="file" :id="'file1'" @change="setAvatar(1)" accept="image/png, image/jpg" hidden>
        </div>

        <div class="containerB w-fit">
            <div class="mb-md">项目背景</div>
            <img class="w-32 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="project.background" alt="" @click="openAvatar(2)" v-if="!ifShow[2]">
            <img class="w-32 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow[2]" alt="" @click="openAvatar(2)" v-else>
            <input type="file" :id="'file2'" @change="setAvatar(2)" accept="image/png, image/jpg" hidden>
        </div>
        </div>
        <div class="button mx-auto mt-xl" @click="save(project.myid)">保存</div>
    </div>
<div>
    
</div>
</div>
</template>

<style scoped>

</style>
