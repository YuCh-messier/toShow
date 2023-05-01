<script setup>
import { verifyAccount,getFrontInfo,goto,goto2,getQueryVariable } from '../scripts/publicFunctions';
import {hostServer,loginUrl} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';

var internshipId=1
if(getQueryVariable('internshipId')){
    internshipId=getQueryVariable('internshipId')
}
var ifUser=ref(verifyAccount())
var internship=ref({title:'',taps:'',content:'',salary:'',city:'',weekDay:'',period:'',company:'',icon:'',companyIntri:'',companyTap:''})
axios.get(hostServer+'/internship/internshipSpe?internshipId='+internshipId).then(e=>{
    internship.value=e.data.internship
    var taps=internship.value.taps
    var taps2=internship.value.companyTap
    internship.value.taps=taps.split(',')
    internship.value.companyTap=taps2.split('/')
})

function addInternship(){
    alert('投递成功')
    axios.post(hostServer+'/internship/addInternship',{...getFrontInfo(),...internship.value})
}
</script>

<template>
<div class="w-inner mx-auto">
    <div class="p-xxl space-y-sm">
        <div class="text-font1 font-bold">{{internship.title}}</div>
        <div class="flex gap-x-md">
            <div>{{internship.salary}}</div>
            <div>{{internship.city}}</div>
            <div>{{internship.weekDay}}</div>
            <div>{{internship.period}}</div>
        </div>
        <div class="flex gap-x-md">
            <div class="tap2" v-for="tap in internship.taps" :key="tap">{{tap}}</div>
        </div>
        <div></div>
        <button class="button4 text-white bg-succeed hover:bg-succeedH" @click="addInternship" v-if="ifUser">投个简历</button>
        <button class="button4 text-white bg-primaryL hover:bg-primaryH" @click="goto(loginUrl)" v-if="!ifUser">登录</button>
        <div></div>
        <div class="w-inner border-b h-6"></div>
    </div>
    <div class="flex">
        <div class="px-20 mb-xxl" style="width:750px;margin-right:50px;">
            <div class="flex gap-x-1"><div class="font-bold text-primary">|</div><div class="mb-xxl font-bold">职位要求</div></div>
            <div class="whitespace-pre-line">{{internship.content}}</div>
        </div>
        <div class="p-xl border rounded shadow-md h-fit" style="width:200px;">
            <div class="containerA">
                <img class="w-12 h-12 mr-md" :src="internship.icon" alt="">
                <div>{{internship.company}}</div>
            </div>
            <div class="whitespace-pre-line text-font3 my-md">{{internship.companyIntri}}</div>
            <div class="tap2 mt-sm w-fit" v-for="tap in internship.companyTap" :key="tap">{{tap}}</div>
        </div>
    </div>
    <div class="w-fit mx-auto">
    <button class="button4 text-white bg-succeed hover:bg-succeedH w-fit mx-auto mb-xxl" @click="addInternship" v-if="ifUser">投个简历</button>
    <button class="button4 text-white bg-primaryL hover:bg-primaryH w-fit mx-auto mb-xxl" @click="goto(loginUrl)" v-if="!ifUser">登录</button>
    </div>
</div>
</template>

<style scoped>

</style>
