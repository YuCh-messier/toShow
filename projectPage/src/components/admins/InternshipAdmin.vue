<script setup>
import { verifyAccount,getFrontInfo,goto2,goto,randomString,checkAdmin } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import InternshipShow from '../adminsSon/InternshipShow.vue'
import { ref } from 'vue';
import axios from 'axios';

// checkAdmin()

var editOrShow=ref(true)
var tap=ref('update')
var internships=ref([])
var internship=ref({})
axios.get(hostServer+'/internship/internships').then(e=>{
    internships.value=e.data.internships
})
function sendInternships(toSend,myid,tap){
    internship.value={}
    editOrShow.value=true
    axios.post(hostServer+'/adminInternships/editInternship',{myid:myid,tap:tap,internship:toSend}).then(()=>{
        window.location.reload()
    })
    alert('保存成功')
}

function editY(index){
    internship.value=internships.value[index]
    editOrShow.value=false
    tap.value='update'
}
function deleteY(myid){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        axios.post(hostServer+'/adminInternships/deleteInternship',{myid:myid}).then(()=>{
            alert('删除成功')
            window.location.reload()
    })
    }
}
function addY(){
    let toIn={
        title:'标题',
        salary:'薪资',
        city:'城市',
        weekDay:'每周工作时长',
        period:'实习时长',
        company:'公司名称',
        companyIntri:'公司简介',
        content:'招聘信息',
        icon:'http://124.223.155.169/defaultAvatar.jpg',
        taps:'该招聘信息标签，每两个间由 英文逗号 , 隔开，最多3个。例：标签1,标签2,标签3',
        companyTap:'公司标签，每两个间由 / 隔开。例:行业/规模/位置/公司特点',
        myid:randomString()
    }
    internship.value=toIn
    tap.value='add'
    editOrShow.value=false
}
function back(){
    internship.value={}
    editOrShow.value=true
}
</script>

<template>
<div class="w-inner mx-auto p-md">

    <div class="button2 bg-primary mx-auto" v-if="editOrShow" @click="addY">添加</div>
    <div v-if="editOrShow">
        <div class="containerA my-md" v-for="internship,index in internships" :key="internship.id">
            <div class="w-1/2 font-bold">{{internship.title}}</div>
            <div class="button2 bg-succeed" @click="editY(index)">编辑</div>
            <div class="button mx-md" @click="deleteY(internship.myid)">删除</div>
        </div>
    </div>
    <InternshipShow :internship="internship" :tap="tap" @sendinternships="sendInternships" v-if="!editOrShow"></InternshipShow>
    <button class="button2 bg-succeed mx-auto block my-md" @click="back" v-if="!editOrShow">返回</button>
<div>

</div>
</div>
</template>

<style scoped>

</style>
