<script setup>
import { ref,toRefs } from 'vue';
import { hostServer } from '../../../project.config';
import { goto2 } from '../../scripts/publicFunctions';
import Switcher2 from '../widgets/Switcher2.vue'
import axios from 'axios'

var props=defineProps(['projects'])
var {projects}=toRefs(props)

var csssetting=['text-primary text-font3','text-light text-font3',['py-2'],['h-4','bg-primary','w-line','mr-1'],true] 
var choices=['进行中','已完成']

var currentChoice=ref(choices[0])
var projectsShow=ref('on')
function onChange(e){
    currentChoice.value=e
    if(e=='进行中'){
        projectsShow.value='on'
    }
    else{
        projectsShow.value='off'
    }
}



</script>

<template>
 <div class="flex border">
    <div class="w-32 py-4 border-r">
        <Switcher2 :csssetting="csssetting" :choices="choices" @tapsfunction="onChange"></Switcher2>
    </div>

    <div class="p-md">
        <div class="inline-block" v-for="project in projects" :key="project.tap0" @click="goto2('/src/pages/project.html?projectId='+project.project)">
        <div v-if="project.statu==projectsShow" class="border shadow-md rounded-xl hover:cursor-pointer hover:bg-lightH ml-md mb-md" style="width:227.5px;height: 280px;">
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
 </div>
</template>

<style scoped>

</style>
