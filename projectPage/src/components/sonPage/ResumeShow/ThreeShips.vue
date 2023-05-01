<script setup>
import { ref,toRefs} from 'vue';


var props=defineProps(['content'])
var {content}=toRefs(props)
var editOrShow=ref(false)
var editIndex=ref(0)

function editShip(eIndex){
    if(editOrShow.value&&eIndex!=editIndex.value){
        editIndex.value=eIndex
        return
    }
    editIndex.value=eIndex
    editOrShow.value=!editOrShow.value
}
function deleteShip(eIndex){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        content.value.splice(eIndex,1)
    }
}
</script>

<template>
 <div class="space-y-md">
    <div class="space-y-sm pb-md border-b" v-for="item,index in content" :key="item.id">
        <div class="flex float-right gap-x-sm">
            <div class="tips2" @click="editShip(index)">{{editOrShow&&editIndex==index?'确定':'编辑'}}</div>
            <div class="tips hover:cursor-pointer" @click="deleteShip(index)">删除</div>
        </div>

        <div class="space-y-sm" v-if="!(editOrShow&&editIndex==index)">
            <div class="containerA gap-x-sm">
                <div class="tips">{{item.time}}</div>
            </div>
            <div class="containerA gap-x-sm">
                <div class="font-bold">{{item.name}}</div>
                <div>{{item.position}}</div>
            </div>
            <div class="containerA gap-x-md">
                <div class="whitespace-pre-line">{{item.intri}}</div>
            </div>
        </div>

        <div class="space-y-sm" v-else>
            <div class="containerA gap-x-sm">
                <input class="input2" v-model="item.time" />
            </div>
            <div class="containerA gap-x-sm">
                <input class="input2" v-model="item.name" />
                <input class="input2" v-model="item.position" />
            </div>
            <div class="containerA gap-x-md">
                <textarea class="whitespace-pre-line h-24 p-4" style="width:48em" v-model="item.intri" ></textarea>
            </div>
        </div>
    </div>
 </div>
</template>

<style scoped>

</style>
