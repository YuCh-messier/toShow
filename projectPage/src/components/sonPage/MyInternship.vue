<script setup>
import { ref,toRefs } from 'vue';
import { hostServer } from '../../../project.config';
import { goto2 } from '../../scripts/publicFunctions';
import Switcher2 from '../widgets/Switcher2.vue'
import axios from 'axios'

var props=defineProps(['internships'])
var {internships}=toRefs(props)

var csssetting=['text-primary text-font3','text-light text-font3',['py-2'],['h-4','bg-primary','w-line','mr-1'],true] 
var choices=['进行中','已查看','已完成']

var currentChoice=ref(choices[0])
var internshipsShow=ref('on')
function onChange(e){
    currentChoice.value=e
    if(e=='进行中'){
        internshipsShow.value='on'
    }
    else if(e=='已经查看'){
        internshipsShow.value='doing'
    }
    else{
        internshipsShow.value='off'
    }
}

function formalizeTaps(taps){
    return taps.split(',')
}

</script>

<template>
 <div class="flex border">
    <div class="w-32 py-4 border-r">
        <Switcher2 :csssetting="csssetting" :choices="choices" @tapsfunction="onChange"></Switcher2>
    </div>

    <div class="text-font3 font-bold">
        <div class="p-md hover:cursor-pointer hover:border-r" v-for="internship in internships" :key="internship.title" @click="goto2('/src/pages/internship.html?internshipId='+internship.internship)">
        <div class="containerA" v-if="internship.statu==internshipsShow">
            <img class="w-16 h-16 rounded" :src="internship.icon" alt="">
            <div class="ml-sm">
                <div class="tips">{{internship.time}}</div>
                <div>{{internship.title}}</div>
                <div class="flex gap-x-sm">
                    <div class="tap2" v-for="tap in formalizeTaps(internship.taps)" :key="tap">{{tap}}</div>
                </div>
            </div>
        </div>
        </div>
    </div>
 </div>
</template>

<style scoped>

</style>
