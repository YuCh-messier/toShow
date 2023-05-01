<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';
import { Location,Clock,Calendar } from '@element-plus/icons-vue'

var youngs=ref([])
axios.get(hostServer+'/youngs/youngs').then(e=>{
    youngs.value=e.data.youngs
    youngs.value.splice(3)
})
</script>

<template>
<div class="h-fit border p-md containerB text-font3" style="width:280px;margin-left: 20px;">
    <div class="font-bold text-font3 mb-md">社区动态</div>
    <div class="p-sm" v-for="young in youngs" :key="young.title">
    <div class="containerA justify-between">
        <div>
            <img class="w-12 h-12 mr-sm" :src="young.icon" alt="">
        </div>
        <div>
            <div class="mb-1">{{young.title}}开始了！</div>
            <div>开始时间:{{young.starttime}}</div>
        </div>
    </div>
    <div class="tips">{{young.time}}发布</div>
    </div>
    <div class="text-primary mt-md hover:cursor-pointer hover:text-primaryH" @click="goto2('/src/pages/youngs.html')">更多>></div>
</div>
</template>

<style scoped>

</style>

