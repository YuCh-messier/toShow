<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import axios from 'axios';

var props=defineProps(['young','tap'])
var {young}=toRefs(props)
var {tap}=toRefs(props)
var emits=defineEmits(['sendyoungs'])

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
function addImg(picI){
    young.value['pic'+picI]='http://124.223.155.169/defaultBack.png'
}
function deleteImg(picI){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        young.value['pic'+picI]='nopic'
    }
}

function save(myid){
    var destination='../../public/pics/youngs/'
    for(let i=0;i<3;i++){
        if(young.value['pic'+i]=='nopic'){
            continue
        }
        let formData = new FormData()
        let fileName=`youngs${myid}${i}`
        let file=document.getElementById('file'+i).files[0]
        if(file!=undefined){
            young.value['pic'+i]=`${hostServer}/pics/youngs/${fileName}`
        }
        formData.append('file',file);
        axios({
            method: 'post',
            url: `${hostServer}/adminFile/uploadFile?destination=${destination}&fileName=${fileName}`,
            data: formData
        })
    }
    emits('sendyoungs',young.value,myid,tap.value)
}
</script>

<template>
<div class="">
    <div class="border p-xl w-inner">
        <div class="tips">{{young.time}}</div>
        <div class="containerA">
            <div class="mr-sm">标题: </div>
            <input class="input2" v-model="young.title"/>
        </div>
        <div class="containerA">
            <div class="mr-sm">活动时间: </div>
            <input class="input2" v-model="young.starttime"/>
        </div>
        <div class="mb-sm">
            <div class="mr-sm">内容: </div>
            <textarea class="w-4/5 h-48 p-sm" v-model="young.content"></textarea>
        </div>
        <div class="border-b w-full my-xl"></div>

    <div class="containerA justify-around">
        <div class="containerB w-fit" v-if="young.pic0!='nopic'">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="young.pic0" alt="" @click="openAvatar(0)" v-if="!ifShow[0]">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow[0]" alt="" @click="openAvatar(0)" v-else>
            <input type="file" :id="'file0'" @change="setAvatar(0)" accept="image/png, image/jpg" hidden>
            <div><button class="button2 bg-succeed my-md" @click="deleteImg(0)">删除图片</button></div>
        </div>
        <div v-else>
            <button class="button" @click="addImg(0)">添加图片</button>
        </div>

        <div class="containerB w-fit" v-if="young.pic1!='nopic'">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="young.pic1" alt="" @click="openAvatar(1)" v-if="!ifShow[1]">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow[1]" alt="" @click="openAvatar(1)" v-else>
            <input type="file" :id="'file1'" @change="setAvatar(1)" accept="image/png, image/jpg" hidden>
            <div><button class="button2 bg-succeed my-md" @click="deleteImg(1)">删除图片</button></div>
        </div>
        <div v-else>
            <button class="button" @click="addImg(1)">添加图片</button>
        </div>

        <div class="containerB w-fit" v-if="young.pic2!='nopic'">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="young.pic2" alt="" @click="openAvatar(2)" v-if="!ifShow[2]">
            <img class="w-16 h-16 inline-block hover:cursor-pointer hover:ring ring-primary" :src="ifShow[2]" alt="" @click="openAvatar(2)" v-else>
            <input type="file" :id="'file2'" @change="setAvatar(2)" accept="image/png, image/jpg" hidden>
            <div><button class="button2 bg-succeed my-md" @click="deleteImg(2)">删除图片</button></div>
        </div>
        <div v-else>
            <button class="button" @click="addImg(2)">添加图片</button>
        </div>
    </div>
    <div class="button mx-auto mt-xl" @click="save(young.myid)">保存</div>
    </div>
<div>
    
</div>
</div>
</template>

<style scoped>

</style>
    