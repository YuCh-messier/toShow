<script setup>
import { verifyAccount,getFrontInfo,goto2,goto, randomString } from '../scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import Board1 from './sonPage/Board1.vue'
import Board2 from './sonPage/Board2.vue'
import { ref } from 'vue';
import axios from 'axios';
import { Location,Clock,Calendar } from '@element-plus/icons-vue'

var internships=ref([])
axios.get(hostServer+'/internship/internships').then(e=>{
    internships.value=e.data.internships
})
function formalizeTaps(taps){
    return taps.split(',')
}
var ppts=ref([])
axios.get(hostServer+'/widgets/ppts').then(e=>{
    ppts.value=e.data
})
var company=ref([])
axios.get(hostServer+'/widgets/company').then(e=>{
    company.value=e.data
})

</script>

<template>
<div class="w-standard mx-auto py-xl">

    <div class="w-standard flex relative" style="left:150px;">
    <div>
        <el-carousel height="300px">
            <el-carousel-item v-for="item in ppts" :key="item.url">
            <img class="w-inner hover:cursor-pointer" :src="item.pic" alt="" @click="goto(item.url)">
            </el-carousel-item>
        </el-carousel>

        <div class="containerA w-inner">
            <div class="containerA justify-center py-md w-1/4 hover:cursor-pointer" @click="goto(item.url)" v-for="item in company" :key="item.company">
                <img  class="w-16 h-16 inline-block" style="" :src="item.pic" alt="">
                <div class="ml-md">
                    <div class="mb-2 text-primary">{{item.company}}</div>
                    <div>{{item.tap}}</div>
                </div>
            </div>
        </div>
        
        <div class="space-y-md mb-xxl w-inner relative bottom-sm">
            <div class="bg-white space-y-3 p-md border rounded inline-block hover:cursor-pointer hover:bg-lightH" :class="((index+1)%3!=0)?'mr-md':''" style="width:320px;height: 220px;" v-for="internship,index in internships" :key="internship.title" @click="goto2('/src/pages/internship.html?internshipId='+internship.myid)">

                <div class="flex">
                    <div class="font-bold w-40 overflow-hidden h-7">{{internship.title}}</div>
                    <div class="text-primary">{{internship.salary}}</div>
                </div>
                
                <div class="flex gap-x-sm">
                    <div class="tap2" v-for="tap in formalizeTaps(internship.taps)" :key="tap">{{tap}}</div>
                </div>
                
                <div class="flex pl-sm gap-x-sm">
                    <div class="tips containerA"><Location style="width: 1em; height: 1em;margin-right: 2px;"/><div>{{internship.city}}</div></div>
                    <div class="tips containerA"><Clock style="width: 1em; height: 1em;margin-right: 2px;"/><div>{{internship.weekDay}}</div></div>
                    <div class="tips containerA"><Calendar style="width: 1em; height: 1em;margin-right: 2px;"/><div>{{internship.period}}</div></div>
                </div>

                <div class="w-64 h-2 mx-auto border-t m-xl"></div>

                <div class="containerA mt">
                    <img class="w-12 h-12 rounded" :src="internship.icon" alt="">
                    <div class="ml-xl">{{internship.company}}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="sticky w-fit h-fit space-y-md" style="top:200px;">
        <Board1 class=""></Board1>
        <Board2 class=""></Board2>
    </div>
    </div>
</div>
</template>

<style scoped>

</style>
