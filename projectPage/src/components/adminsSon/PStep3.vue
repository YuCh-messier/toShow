<script setup>
import { verifyAccount,getFrontInfo,goto2,goto,randomString } from '../../scripts/publicFunctions';
import { hostServer } from '/project.config.js'
import { ref,toRefs } from 'vue';
import axios from 'axios';

var props=defineProps(['projectlist','tap','father'])
var emits=defineEmits(['sendprojectlist'])
var {projectlist}=toRefs(props)
var {tap}=toRefs(props)
var {father}=toRefs(props)

function addContent(){
    projectlist.value.push({
        title:{
            father:father.value,
            tap:'outer',
            content:'大标题',
            myid:randomString()
        },
        inner:[]
    })
}
function addTitle(index,myid){
    projectlist.value[index].inner.push({
        father:myid,
        myid:randomString(),
        tap:'inner',
        content:'小标题'
    })
}
function deleteContent(index){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        projectlist.value.splice(index,1)
    }
}
function deleteTitle(index,index2){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        projectlist.value[index].inner.splice(index2,1)
    }
}
function save(myid){
    emits('sendprojectlist',projectlist.value,myid,tap.value)
}
</script>

<template>
<div class="border p-xl w-inner">
    <div class="containerA gap-x-md">
        <div class="button" @click="addContent()">添加大标题</div>
    </div>
    <div class="my-sm" v-for="item,index in projectlist" :key="item.title">
        <div class="button2 bg-succeed" @click="addTitle(index,item.title.myid)">添加小标题</div>
        <div class="my-sm containerA">
            <input class="input3" v-model="item.title.content" />
            <div class="button ml-xl" @click="deleteContent(index)">删除大标题</div>
        </div>
        <div class="containerA" v-for="inner,index2 in item.inner" :key="inner.myid">
            <input class="input2" v-model="inner.content"/>
            <div class="button2 ml-xl bg-succeed" @click="deleteTitle(index,index2)">删除小标题</div>
        </div>
    </div>
    <div class="button mx-auto mt-xl" @click="save(father)">保存</div>
<div>
    
</div>
</div>
</template>

<style scoped>

</style>
    