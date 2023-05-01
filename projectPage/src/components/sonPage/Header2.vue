<script setup>
import {goto,goto2,getFrontInfo,getQueryVariable,setFrontInfo,getToken,verifyAccount,setCookie,toGos2,checkAdmin} from '../../scripts/publicFunctions.js'
import {ref} from 'vue'
import {hostServer,loginUrl} from '/project.config.js'
import axios from 'axios'
import Switcher1 from '../widgets/Switcher1.vue'

// checkAdmin()

var csssetting=['text-primary text-font3','tips',['px-sm'],['bg-lightB','h-4','w-border'],false] 
var choices=['项目管理','招聘管理','沙龙管理','其他管理']
var blankBox=ref([])

for(var i=0;i<choices.length;i++){
    blankBox.value.push(false)
}
blankBox.value[0]=true

function handleChange(index){
    // for(var i=0;i<blankBox.value.length;i++){
    //     blankBox.value[i]=false
    // }
    // blankBox.value[index]=true
    onChange(choices[index])
}

function onChange(e){
    var pages=toGos2
    window.location=pages[e]
}
</script>

<template>
<div class="border-b bg-white z-10">
    <div class="containerA justify-between p-2 w-standard mx-auto">
    <img class="block h-12 w-auto" src="../../assets/top.jpg" alt="">

    <div class="flex w-fit">
        <div v-for="choice,index in choices" :key="choice" class="flex items-center">
            <div @click="handleChange(index)" class="hover:cursor-pointer hover:text-primary" :class="[...csssetting[2],csssetting[1]]">{{choice}}</div>
            <div v-if="index!=choices.length-1 && csssetting[4]" :class="csssetting[3]"></div>
        </div>
    </div>

    </div>
    </div>
</template>

<style scoped>

</style>
