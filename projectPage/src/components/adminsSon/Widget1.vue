<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '/src/scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref, toRefs } from 'vue';
import axios from 'axios';
    
var props=defineProps(['ppts'])
var {ppts}=toRefs(props)
var emits=defineEmits(['sendppts'])
var tosend=ref([])
var ifShow=ref([])
for(let i=0;i<ppts.value.length;i++){
    ifShow.value.push(false)
}
function deleteOne(index){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        ppts.value.splice(index,1)
    }
}
function addOne(){
    ppts.value.push({
        url:'#',
        pic:'http://124.223.155.169/tryPic/header1.jpg'
    })
}

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
function save(){
    alert('保存成功')
    var destination='../../public/pics/others/'
    for(let i=0;i<ppts.value.length;i++){
        let formData = new FormData()
        let fileName=`ppts${i}`
        let file=document.getElementById('file'+i).files[0]
        if(file!=undefined){
            ppts.value[i].pic=`${hostServer}/pics/others/ppts${i}`
        }
        formData.append('file',file);
        axios({
            method: 'post',
            url: `${hostServer}/adminFile/uploadFile?destination=${destination}&fileName=${fileName}`,
            data: formData
        })
    }
    emits('sendppts',ppts.value)

}
</script>
        
<template>
<div class=""> 
    <div class="button2 bg-succeed mx-auto" @click="addOne()">添加</div>
    <div class="my-md" v-for="item,index in ppts" :key="item.id">
        <div class="button mx-auto mb-sm" @click="deleteOne(index)">删除</div>
        <img class="h-96 w-inner hover:cursor-pointer hover:ring ring-primary" :src="item.pic" alt="" @click="openAvatar(index)" v-if="!ifShow[index]">
        <img class="h-96 w-inner hover:cursor-pointer hover:ring ring-primary" :src="ifShow[index]" alt="" @click="openAvatar(index)" v-else>
        <input type="file" :id="'file'+index" @change="setAvatar(index)" accept="image/png, image/jpg" hidden>
        <div class="tips containerA">跳转链接：<input class="input2 my-md" v-model="item.url" ></div>
    </div>
    <div class="button2 bg-succeed mx-auto" @click="save">保存</div>
</div>
</template>

<style scoped>

</style>
        