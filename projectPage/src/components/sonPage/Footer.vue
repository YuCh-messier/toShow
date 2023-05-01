<script setup>
import {toGos} from '/src/scripts/publicFunctions.js'
import { Avatar,PhoneFilled,Message } from '@element-plus/icons-vue'
var links=toGos

</script>

<template>
<div style="background-color:rgb(36, 36, 36)" class="w-full border-t">
<div class="text-lightB text-font3 mx-auto w-standard py-xl">
  <div class="containerA justify-around p-2">
    <div class="space-y-1">
        <div class="flex">
            <PhoneFilled class="w-4 h-4 mr-sm"></PhoneFilled>
            186 2711 8740
        </div>
        <div class="containerA">
            <Avatar class="w-4 h-4 mr-sm"></Avatar>
            <div>
                <div>洪山区南湖大道182</div>
                <div>号中南财经政法大学</div>
            </div>
        </div>
        <div class="flex">
            <Message class="w-4 h-4 mr-sm"></Message>
            yhr1951174331@163.com
        </div>
    </div>
    <div class="containerB gap-1">
        <a class="underline hover:text-white" :href="link" v-for="link,target in links" :key="target">{{target}}</a>
    </div>
    <div class="containerB gap-1">
        <div>关注我们</div>
        <img class="w-20 h-fit" src="../../assets/pic.jpg" alt="">
    </div>
  </div>
  <div class="mx-auto w-fit mt-xl">©2017-2022 金领梦工场®️ 鄂ICP备17050525号-3</div>
</div>
</div>
</template>

<style scoped>

</style>
