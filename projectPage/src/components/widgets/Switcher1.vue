<!-- var csssetting=['text-primary text-font3','text-light text-font3',['px-sm'],['bg-lightB','h-4','w-border'],false]  -->
<script setup>
import { onMounted,ref,toRefs } from 'vue';

var props=defineProps(['choices','csssetting'])
var {choices}=toRefs(props)
var {csssetting}=toRefs(props)
var emits=defineEmits(['tapsfunction'])
var blankBox=ref([])

for(var i=0;i<choices.value.length;i++){
    blankBox.value.push(false)
}
blankBox.value[0]=true

function handleChange(index){
    for(var i=0;i<blankBox.value.length;i++){
        blankBox.value[i]=false
    }
    blankBox.value[index]=true
    emits('tapsfunction',choices.value[index])
}

</script>

<template>
  <div class="flex">
    <div v-for="choice,index in choices" :key="choice" class="flex items-center">
        <div @click="handleChange(index)" class="hover:cursor-pointer hover:text-primary" :class="[...csssetting[2],blankBox[index]?csssetting[0]:csssetting[1]]">{{choice}}</div>
        <div v-if="index!=choices.length-1 && csssetting[4]" :class="csssetting[3]"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
