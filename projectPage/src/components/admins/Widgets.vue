<script setup>
import {hostServer} from '/project.config.js'
import Widget1 from '../adminsSon/Widget1.vue'
import Widget2 from '../adminsSon/Widget2.vue'
import Switcher1 from '../widgets/Switcher1.vue';
import { ref } from 'vue';
import axios from 'axios';

var csssetting=['text-primary text-font3','text-light text-font3',['px-sm'],['bg-lightB','h-4','w-border'],false] 
var choices=['幻灯片管理','公司栏管理']
var curChoice=ref('幻灯片管理')
function onChange(e){
    curChoice.value=e
}

var ppts=ref([])
axios.get(hostServer+'/widgets/ppts').then(e=>{
    ppts.value=e.data
})
var companys=ref([])
axios.get(hostServer+'/widgets/company').then(e=>{
    companys.value=e.data
})

function sendPpts(toSend){
    axios.post(hostServer+'/adminWidgets/ppts',toSend)
}
function sendCompanys(toSend){
    axios.post(hostServer+'/adminWidgets/companys',toSend)
}
</script>
    
<template>
<div class="w-inner mx-auto py-md"> 
    <Switcher1 class="border p-sm w-fit mb-md" :choices="choices" :csssetting="csssetting" @tapsfunction="onChange"></Switcher1>
    <Widget1 :ppts="ppts" @sendppts="sendPpts" v-if="curChoice=='幻灯片管理'"></Widget1>
    <Widget2 :companys="companys" @sendcompanys="sendCompanys" v-else></Widget2>
</div>
</template>

<style scoped>

</style>
    