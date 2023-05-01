<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '/src/scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref, toRefs } from 'vue';
import axios from 'axios';
    
var props=defineProps(['companys'])
var {companys}=toRefs(props)
var emits=defineEmits(['sendcompanys'])
var tosend=ref([])
var ifShow=ref([])
for(let i=0;i<companys.value.length;i++){
    ifShow.value.push(false)
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
    for(let i=0;i<companys.value.length;i++){
        let formData = new FormData()
        let fileName=`companys${i}`
        let file=document.getElementById('file'+i).files[0]
        if(file!=undefined){
            companys.value[i].pic=`${hostServer}/pics/others/companys${i}`
        }
        formData.append('file',file);
        axios({
            method: 'post',
            url: `${hostServer}/adminFile/uploadFile?destination=${destination}&fileName=${fileName}`,
            data: formData
        })
    }
    emits('sendcompanys',companys.value)

}
</script>
    
<template>
<div class=""> 
    <div class="w-inner">
        <div class="containerA justify-center py-md hover:cursor-pointer" v-for="item,index in companys" :key="item.id">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="item.pic" alt="" @click="openAvatar(index)" v-if="!ifShow[index]">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow[index]" alt="" @click="openAvatar(index)" v-else>
            <input type="file" :id="'file'+index" @change="setAvatar(index)" accept="image/png, image/jpg" hidden>
            <div class="ml-md">
                <div class="tips containerA">公司名称：<input class="input2" v-model="item.company"></div>
                <div class="tips containerA">简单标签：<input class="input2" v-model="item.tap"></div>
                <div class="tips containerA">跳转链接：<input class="input2" v-model="item.url"></div>
            </div>
        </div>
    </div>
    <div class="button2 bg-succeed mx-auto" @click="save()">保存</div>
</div>
</template>

<style scoped>

</style>
    