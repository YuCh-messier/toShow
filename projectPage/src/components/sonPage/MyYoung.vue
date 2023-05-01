<script setup>
import { ref,toRefs } from 'vue';
import { hostServer } from '../../../project.config';
import { goto2 } from '../../scripts/publicFunctions';
import Switcher2 from '../widgets/Switcher2.vue'
import axios from 'axios'

var props=defineProps(['youngs'])
var {youngs}=toRefs(props)

var csssetting=['text-primary text-font3','text-light text-font3',['py-2'],['h-4','bg-primary','w-line','mr-1'],true] 
var choices=['已报名','已参加']

var currentChoice=ref(choices[0])
var youngsShow=ref('on')
function onChange(e){
    currentChoice.value=e
    if(e=='已报名'){
        youngsShow.value='on'
    }
    else{
        youngsShow.value='off'
    }
}

</script>

<template>
 <div class="flex border">
    <div class="w-32 py-4 border-r">
        <Switcher2 :csssetting="csssetting" :choices="choices" @tapsfunction="onChange"></Switcher2>
    </div>

    <div class="text-font3 font-bold">
        <div class="p-xl hover:cursor-pointer hover:border-r" v-for="young in youngs" :key="young.title">
        <div class="containerA" v-if="young.statu==youngsShow">
            <img class="w-16 h-16 rounded-full" :src="young.avatar" alt="">
            <div class="ml-sm">
                <div class="flex"><div class="tips mr-sm">{{young.time}}</div> 报名了 <div class="text-primary ml-sm">{{young.title}}</div></div>
                <div>活动时间：{{young.starttime}}</div>
            </div>
        </div>
        </div>
    </div>
 </div>
</template>

<style scoped>

</style>
