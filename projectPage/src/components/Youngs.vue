<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../scripts/publicFunctions';
import {hostServer,loginUrl} from '/project.config.js'
import Board1 from './sonPage/Board1.vue'
import Board3 from './sonPage/Board3.vue'
import { ref } from 'vue';
import axios from 'axios';

var ifUser=ref(verifyAccount())
var youngs=ref([])
axios.get(hostServer+'/youngs/youngs').then(e=>{
    youngs.value=e.data.youngs
})

function addYoung(index){
    alert('报名成功')
    axios.post(hostServer+'/youngs/addYoungs',{...getFrontInfo(),...youngs.value[index]})
}
</script>

<template>
<div class="w-inner mx-auto p-md flex">
    <div class="border">
    <div class="border-b rounded w-4/5 mx-auto py-xxl bg-white" v-for="young,index in youngs" :key="young.id">
        <div class="containerA">
            <img class="h-16 w-16 rounded-full inline-block" :src="young.icon" alt="">
            <div class="ml-sm">
                <div>金领梦工场</div>
                <div class="tips">{{young.time}}</div>
            </div>
        </div>
        <div class="font-bold my-sm">{{young.title}}</div>
        <div class="font-bold flex">活动时间：<div class="text-primary">{{young.starttime}}</div></div>
        <div class="whitespace-pre-wrap mt-xl pl-md">{{young.content}}</div>
        <div class="flex space-x-sm mt-md">
            <el-image class="w-1/4 h-fit hover:cursor-pointer"
                :src="young.pic0"
                :preview-src-list="[young.pic0,young.pic1,young.pic2]"
                :initial-index="0"
                fit="cover"
            />
            <el-image class="w-1/4 h-fit hover:cursor-pointer"
                :src="young.pic1"
                :preview-src-list="[young.pic0,young.pic1,young.pic2]"
                :initial-index="1"
                fit="cover"
            />
            <el-image class="w-1/4 h-fit hover:cursor-pointer"
                :src="young.pic2"
                :preview-src-list="[young.pic0,young.pic1,young.pic2]"
                :initial-index="2"
                fit="cover"
            />
        </div>
        <div class="mx-auto w-fit mt-xl"><button class="button2 bg-succeed hover:bg-succeedH" @click="addYoung(index)" v-if="ifUser">我要报名</button></div>
        <div class="mx-auto w-fit mt-xl"><button class="button2 text-white bg-primaryL hover:bg-primaryH" @click="goto(loginUrl)" v-if="!ifUser">登录</button></div>
    </div>
    </div>
    <div class="sticky w-fit h-fit space-y-md top-xl">
        <Board1 class=""></Board1>
        <Board3 class=""></Board3>
    </div>
</div>
</template>

<style scoped>

</style>
