<script setup>
import { verifyAccount,getFrontInfo,goto,goto2,getQueryVariable } from '../scripts/publicFunctions';
import {hostServer,loginUrl} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';

var projectId=1
if(getQueryVariable('projectId')){
    projectId=getQueryVariable('projectId')
}
var ifUser=ref(verifyAccount())
var project=ref({title:'',taps:'',content:''})
var projectSpe=ref([])
var list=ref([])
axios.get(hostServer+'/projects/projectSpe?projectId='+projectId).then(e=>{
    project.value=e.data.project
    var gains=project.value.gains
    project.value.gains=gains.split(',')
    projectSpe.value=e.data.projectSpe
    list.value=e.data.list
})

function addProject(){
    goto2('/src/pages/projectIn.html?projectId='+projectId)
    axios.post(hostServer+'/projects/addProject',{...getFrontInfo(),...project.value})
}
</script>

<template>
<div class="w-inner mx-auto p-xl flex">
    <div class="" style="width:640px;margin-right:36.25px;">
        <div class="text-primary font-bold">工作简介</div>
        <div class="text-font1 font-bold mt-sm">{{project.title}}</div>
        <div class="containerA p-2 gap-x-2">
            <div class="tap">{{project.tap0}}</div>
            <div class="tap">{{project.tap1}}</div>
        </div>
        <div class="whitespace-pre-line">
            {{project.content}}
        </div>

        <div class="text-primary font-bold mt-xl">内容一览</div>
        <div class="my-xl" v-for="item in projectSpe" :key="item">
            <div class="text-font1 font-bold whitespace-pre-line" v-if="item.tap=='header'">{{item.content}}</div>        
            <div class="whitespace-pre-line" v-else-if="item.tap=='content'">{{item.content}}</div>        
            <img class="h-fit block rounded" style="width:450px;" :src="item.content" v-else>
        </div>

        <div class="text-primary font-bold mt-xl">项目列表</div>
        <div class="my-sm" v-for="item in list" :key="item.title">
            <div class="text-font1 font-bold">{{item.title.content}}</div>
            <div class="mt-1 ml-sm" v-for="inner in item.inner" :key="inner">{{inner.content}}</div>
        </div>

    </div>



    <div class="border shadow-md rounded-xl inline-block sticky h-fit pb-md mt-40" style="width:227.5px;top:160px;">

        <div class="h-28 w-full rounded-t-xl" :style="'background-image: url('+project.background+');'" style="background-position:center;background-size:cover;"></div>

        <div class="relative" style="left:154px;bottom:32px;"><div class="h-16 w-16 rounded-md shadow border absolute" :style="'background-image: url('+project.graph+');'" style="background-position:center;background-size:cover;"></div></div>

        <div class="containerA p-2 gap-x-2">
            <div class="tap">{{project.tap0}}</div>
            <div class="tap">{{project.tap1}}</div>
        </div>

        <div class="mx-auto w-fit m-2"><button class="button2 bg-succeed hover:bg-succeedH" @click="addProject" v-if="ifUser">开始</button></div>
        <div class="mx-auto w-fit m-2"><button class="button2 bg-primary hover:bg-primaryH" @click="goto(loginUrl)" v-if="!ifUser">登录</button></div>

        <div class="text-font3 m-sm">工作包含</div>
        <div class="tips pl-xl space-y-px">
            <div v-for="gain in project.gains" :key="gain">
                {{gain}}
            </div>
        </div>
    </div>

</div>
</template>

<style scoped>

</style>
