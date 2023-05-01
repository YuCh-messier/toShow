<script setup>
import { verifyAccount,getFrontInfo,goto2,goto } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import axios from 'axios';

var props=defineProps(['projectupload','tap','father'])
var {projectupload}=toRefs(props)
var {tap}=toRefs(props)
var emits=defineEmits(['sendprojectupload'])


function save(myid){
    emits('sendprojectupload',projectupload.value,myid,tap.value)
}
</script>

<template>
<div class="">
    <div class="border p-xl w-inner">
        <div><input class="input2" v-model="projectupload.title" /></div>
        <div><textarea class="w-4/5 h-32 p-sm" v-model="projectupload.content"></textarea></div>
    </div>
    <div class="button mx-auto mt-xl" @click="save(father)">保存</div>
<div>
    
</div>
</div>
</template>

<style scoped>

</style>
