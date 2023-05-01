<script setup>
import { goto2 } from '../scripts/publicFunctions';
import {hostServer} from '/project.config.js'
import { ref } from 'vue';
import axios from 'axios';
import { Avatar } from '@element-plus/icons-vue'
import indexBG from '/src/assets/last.webp'
var projects=ref([])
axios.get(hostServer+'/projects/projects').then(e=>{
    projects.value=e.data.projects
    projects.value.splice(8)
})
</script>

<template>
<div class="w-inner mx-auto pb-xl containerB">
  <div class="h-64 bg-primary containerB justify-center gap-y-sm bg-cover bg-center" :style="`background-image:url(${indexBG})`"  style="width:calc(100vw)">
        <div class="font-bold text-font1 text-white">金领梦工场</div>
        <div class="font-bold text-font3 text-white">成就心仪大学生活</div>
  </div>

  <div class="flex w-fit mt-xl">
    <div class="font-bold">梦想工作，</div>
    <div class="font-bold text-primary">触手可及</div>
  </div>
  
  <div class="containerA mt-md">
    <div class="containerB w-1/3">
      <img class="w-3/5" src="/src/assets/index1.png" alt="">
      <div class="text-font3 font-bold">选中心怡实习实训</div>
    </div>
    <div class="containerB w-1/3">
      <img class="w-3/5" src="/src/assets/index2.png" alt="">
      <div class="text-font3 font-bold">参与项目，完成任务</div>
    </div>
    <div class="containerB w-1/3">
      <img class="w-3/5" src="/src/assets/index3.png" alt="">
      <div class="text-font3 font-bold">收获实习证明</div>
    </div>
  </div>

  <div class="space-y-xxl my-xl w-inner mx-auto">
      <div class="border shadow-md rounded-xl inline-block hover:cursor-pointer hover:bg-lightH" :class="((index+1)%4!=0)?'mr-xl':''" style="width:227.5px;height: 280px;" v-for="project,index in projects" :key="project.tap0" @click="goto2('/src/pages/projects.html')">
          <div class="relative top-xl">
              <div class="absolute text-font3 text-white bg-primaryL px-md rounded-r-xl">开始项目</div>
          </div>

          <div class="h-28 w-full rounded-t-xl" :style="'background-image: url('+project.background+');'" style="background-position:center;background-size:cover;"></div>

          <div class="relative" style="left:154px;bottom:32px;"><div class="h-16 w-16 rounded-md shadow border absolute" :style="'background-image: url('+project.graph+');'" style="background-position:center;background-size:cover;"></div></div>

          <div class="containerA p-2 gap-x-2">
              <div class="tap">{{project.tap0}}</div>
              <div class="tap">{{project.tap1}}</div>
          </div>

          <div class="font-bold m-sm text-font2">{{project.title}}</div>

          <div class="containerA">
              <div class="h-12 w-12 rounded m-sm" :style="'background-image: url('+project.icon+');'" style="background-position:center;background-size:cover;"></div>
              <div class="text-font3">{{project.company}}</div>
          </div>
      </div>
  </div>
  <button class="button" @click="goto2('/src/pages/projects.html')">浏览所有项目</button>

  <div class="containerA px-xl my-24">
    <div class="" style="width:470px;">
      <div class="font-bold">企业官方在线培训</div>
      <div class="font-bold">一线岗位业务呈现</div>
      <div class="text-font3 w-96 my-sm">
你无需具备专业技能，任何专业和背景均可参与，并且你可以自行掌握参与节奏和进度。通过标准化、流程化的内容设计，以邮件+视频的仿真沟通方式，按企业布置的需求完成指定的虚拟工作内容，了解企业的工作要求，同时熟悉业务，获得收获。</div>
      <div class="button" @click="goto2('/src/pages/projects.html')">马上参与</div>
    </div>
    
    <div class="" style="width:470px;">
        <img class="w-3/5 rounded mx-auto" src="/src/assets/index4.jpg" alt="">
        <div class="relative bottom-32"><div class="absolute containerA rounded-md bg-primary px-md py-md">
            <Avatar class="w-6 h-6 mr-sm text-white"></Avatar>
            <div class="text-white">
              <div>你的专属培训方案</div>
              <div>Designed specifically for you</div>
            </div>
        </div></div>
    </div>
  </div>

  <div class="containerA px-xl">
    <div class="" style="width:470px;">
      <img class="w-3/5 rounded" src="/src/assets/index5.png" alt="">
    </div>

    <div class="" style="width:470px;">
    <div class="w-fit mx-auto">
      <div class="font-bold">和盲盒式职场说再见</div>
      <div class="text-font3 w-96 my-sm">
在这里，你可以选择对应的实习实训项目，完成相应的任务要求，收获专属的结项证明，以此请求心仪大厂的offer。</div>
      <div class="button" @click="goto2('/src/pages/projects.html')">即刻开始</div>
    </div>
    </div>
  </div>

  <div class="font-bold mt-24 my-xxl">关于我们</div>
  <div class="containerA px-xxl">
    <div class="w-1/2">
      <div class="w-3/5 mx-auto text-font3"> 通过元宇宙虚拟实习，企业可以批量实现参与者的信息和工作质量数字化

可提前摸清部分在校大学生的工作态度和能力，打造作为公司人才储备的蓄水池

为企业大量节省职业培养和筛选成本，对学生来说，能够将自己在校所学知识尽

早融会贯通，以达到高校"产学研融合"的人才培养理念。</div></div>
    <img class="w-1/2 rounded" src="/src/assets/index6.jpg" alt="">
  </div>
  <div class="containerA px-xxl">
    <img class="w-1/2 rounded" src="/src/assets/index7.jpg" alt="">
    <div class="w-1/2">
      <div class="w-3/5 mx-auto text-font3"> 通过元宇宙虚拟实习，企业可以批量实现参与者的信息和工作质量数字化

可提前摸清部分在校大学生的工作态度和能力，打造作为公司人才储备的蓄水池

为企业大量节省职业培养和筛选成本，对学生来说，能够将自己在校所学知识尽

早融会贯通，以达到高校"产学研融合"的人才培养理念。</div></div>
  </div>
  <div class="font-bold mt-24 my-xxl">华中地区首家WETEAM创业团队</div>
  <div class="containerA">
    <img class="w-1/5 mx-auto" src="/src/assets/index8.png" alt="">
    <img class="w-1/5 mx-auto" src="/src/assets/index9.png" alt="">
    <img class="w-1/5 mx-auto" src="/src/assets/index10.jpg" alt="">
    <img class="w-1/5 mx-auto" src="/src/assets/index11.jpg" alt="">
  </div>
</div>
</template>

<style scoped>

</style>
