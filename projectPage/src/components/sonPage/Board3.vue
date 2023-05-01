<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';
import { Location,Clock,Calendar } from '@element-plus/icons-vue'

var internships=ref([])
axios.get(hostServer+'/internship/internships').then(e=>{
    internships.value=e.data.internships
    internships.value.splice(3)
})
</script>

<template>
<div class="h-fit border p-md containerB text-font3" style="width:280px;margin-left: 20px;">
    <div class="font-bold text-font3 mb-md">实习讯息</div>
    <div class="p-sm" v-for="internship in internships" :key="internship.title">
    <div class="containerA justify-between">
        <div>
            <img class="w-12 h-12 mr-sm" :src="internship.icon" alt="">
        </div>
        <div>
            <div class="mb-1">{{internship.title}}</div>
            <div>{{internship.company}}</div>
        </div>
    </div>
    </div>
    <div class="text-primary mt-md hover:cursor-pointer hover:text-primaryH" @click="goto2('/src/pages/internships.html')">更多>></div>
</div>
</template>

<style scoped>

</style>

