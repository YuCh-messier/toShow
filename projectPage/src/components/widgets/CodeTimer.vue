<script setup>
import { onMounted,ref,toRefs } from 'vue';

var props=defineProps(['time','csssetting'])
var time=ref(props.time)
var {csssetting}=toRefs(props)
var clickOrNot=ref(false)
var emits=defineEmits(['tapsfunction'])
function handleClick(){
    clickOrNot.value=!clickOrNot.value
    emits('tapsfunction')
    var i=setInterval(() => {
        time.value=time.value-1
        if(time.value==0){
            clearInterval(i)
            time.value=props.time
            clickOrNot.value=!clickOrNot.value
        }
    }, 1000);
}

</script>

<template>
  <div :class="csssetting[1]">
    <div v-if="!clickOrNot" class="w-fit hover:cursor-pointer" :class="csssetting[0]" @click="handleClick()">获取验证码</div>   
    <div v-else class="w-fit text-light">{{time}}s</div>   
  </div>
</template>

<style scoped>

</style>
