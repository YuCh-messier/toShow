<script setup>
import { ref,toRefs} from 'vue';


var props=defineProps(['content','tap'])
var {content}=toRefs(props)
var {tap}=toRefs(props)
var title={
    'awards':'奖项',
    'skills':'技能/语言',
    'works':'名称'
}
var dis={
    'awards':'级别',
    'skills':'等级/分数',
    'works':'简介'
}
var editOrShow=ref(false)
var editIndex=ref(0)

function editSkill(eIndex){
    if(editOrShow.value&&eIndex!=editIndex.value){
        editIndex.value=eIndex
        return
    }
    editIndex.value=eIndex
    editOrShow.value=!editOrShow.value
}
function deleteSkill(eIndex){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        content.value.splice(eIndex,1)
    }
}


</script>

<template>
 <div class="space-y-md">
    <div class="space-y-sm pb-md" v-for="item,index in content" :key="item.id">
        <div class="flex float-right gap-x-sm">
            <div class="tips2" @click="editSkill(index)">{{editOrShow&&editIndex==index?'确定':'编辑'}}</div>
            <div class="tips hover:cursor-pointer" @click="deleteSkill(index)">删除</div>
        </div>

        <div class="space-y-sm" v-if="!(editOrShow&&editIndex==index)">
            <div class="font-bold">{{title[tap]}} ： {{item.name}}</div>
            <div>{{dis[tap]}} ： {{item.intri}}</div>
        </div>

        <div class="space-x-md" v-else>
            <input class="input2" v-model="item.name" />
            <input class="input2" v-model="item.intri" />
        </div>
    </div>
 </div>
</template>

<style scoped>

</style>
