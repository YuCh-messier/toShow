<script setup>
import { verifyAccount,getFrontInfo,goto2 } from '../scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';
import indexBG from '/src/assets/last.webp'

var projects=ref([])
axios.get(hostServer+'/projects/projects').then(e=>{
    projects.value=e.data.projects
})
</script>

<template>
<div class="w-fit">
    <div class="h-64 bg-primary containerB justify-center gap-y-sm bg-cover bg-center" :style="`background-image:url(${indexBG})`"  style="width:calc(100vw)">
        <div class="font-bold text-font1 text-white">点击参与实习实训</div>
        <div class="font-bold text-font3 text-white">选择心仪项目</div>
    </div>
    <div class="relative bottom-64"><div id="headerT" class="absolute h-64 bg-opacity-0" style="width:calc(100vw);opacity: 0.3;"></div></div>

    <div class="space-y-xxl mb-xxl w-inner mx-auto">
        <div class="border shadow-md rounded-xl inline-block hover:cursor-pointer hover:bg-lightH" :class="((index+1)%4!=0)?'mr-xl':''" style="width:227.5px;height: 280px;" v-for="project,index in projects" :key="project.tap0" @click="goto2('/src/pages/project.html?projectId='+project.myid)">
            <div class="relative top-xl">
                <div class="absolute text-font3 text-white bg-primaryL px-md rounded-r-xl">开始项目</div>
            </div>

            <div class="h-28 w-full rounded-t-xl" :style="'background-image: url('+project.background+');'" style="background-position:center;background-size:cover;"></div>

            <div class="relative" style="left:154px;bottom:32px;"><div class="h-16 w-16 rounded-md shadow border absolute" :style="'background-image: url('+project.graph+');'" style="background-position:center;background-size:cover;"></div></div>

            <div class="containerA p-2 gap-x-2">
                <div class="tap">{{project.tap0}}</div>
                <div class="tap">{{project.tap1}}</div>
            </div>

            <div class="font-bold m-sm text-font2">{{project.title}}</div>

            <div class="containerA">
                <div class="h-12 w-12 rounded m-sm" :style="'background-image: url('+project.icon+');'" style="background-position:center;background-size:cover;"></div>
                <div class="text-font3">{{project.company}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
@keyframes header {
    from{
        background-color: #34D399;
    }
    to{
        background-color: #F59E0B;
    }
}
#headerT{
    animation-name: header;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-duration: 5s;
}
</style>
