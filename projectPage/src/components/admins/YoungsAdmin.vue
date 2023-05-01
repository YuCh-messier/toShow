<script setup>
import { verifyAccount,getFrontInfo,goto2,goto,randomString } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import YoungShow from '../adminsSon/YoungShow.vue'
import { ref } from 'vue';
import axios from 'axios';

var editOrShow=ref(true)
var tap=ref('update')
var youngs=ref([])
axios.get(hostServer+'/youngs/youngs').then(e=>{
    youngs.value=e.data.youngs
})
function sendYoungs(toSend,myid,tap){
    young.value={}
    editOrShow.value=true
    axios.post(hostServer+'/adminYoungs/editYoung',{myid:myid,tap:tap,young:toSend}).then(()=>{
        window.location.reload()
    })
    alert('保存成功')
}
var young=ref({})

function editY(index){
    young.value=youngs.value[index]
    editOrShow.value=false
    tap.value='update'
}
function deleteY(myid){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        axios.post(hostServer+'/adminYoungs/deleteYoung',{myid:myid}).then(()=>{
            alert('删除成功')
            window.location.reload()
    })
    }
}
function addY(){
    let toIn={
        pic0:'nopic',
        pic1:'nopic',
        pic2:'nopic',
        title:'',
        content:'',
        starttime:'',
        time:'now',
        myid:randomString()
    }
    young.value=toIn
    tap.value='add'
    editOrShow.value=false
}
function back(){
    young.value={}
    editOrShow.value=true
}
</script>

<template>
<div class="w-inner mx-auto p-md">

    <div class="button2 bg-primary mx-auto" v-if="editOrShow" @click="addY">添加</div>
    <div v-if="editOrShow">
        <div class="containerA my-md" v-for="young,index in youngs" :key="young.id">
            <div class="w-1/2 font-bold">{{young.title}}</div>
            <div class="button2 bg-succeed" @click="editY(index)">编辑</div>
            <div class="button mx-md" @click="deleteY(young.myid)">删除</div>
        </div>
    </div>
    <YoungShow :young="young" :tap="tap" @sendyoungs="sendYoungs" v-if="!editOrShow"></YoungShow>
    <button class="button2 bg-succeed mx-auto block my-md" @click="back" v-if="!editOrShow">返回</button>
<div>

</div>
</div>
</template>

<style scoped>

</style>
