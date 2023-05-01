<script setup>
import { ref,toRefs} from 'vue';

var props=defineProps(['education'])
var {education}=toRefs(props)
var editOrShow=ref(false)
var editIndex=ref(0)

function editEdu(eIndex){
    if(editOrShow.value&&eIndex!=editIndex.value){
        editIndex.value=eIndex
        return
    }
    editIndex.value=eIndex
    editOrShow.value=!editOrShow.value
}
function deleteEdu(eIndex){
    var deleteOrNot=window.confirm('是否删除？')
    if(deleteOrNot){
        education.value.splice(eIndex,1)
    }
}
</script>

<template>
 <div class="space-y-md">
    <div class="space-y-sm border-b pb-md" v-for="item,index in education" :key="item.id">
        <div class="flex float-right gap-x-sm">
            <div class="tips2" @click="editEdu(index)">{{editOrShow&&editIndex==index?'确定':'编辑'}}</div>
            <div class="tips hover:cursor-pointer" @click="deleteEdu(index)">删除</div>
        </div>
        
        <div class="space-y-sm" v-if="!(editOrShow&&editIndex==index)">
            <div class="containerA gap-x-sm">
                <div class="font-bold">{{item.school}}</div>
                <div class="tips">{{item.time}}</div>
            </div>
            <div class="containerA gap-x-sm">
                <div>{{item.department}}</div>
                <div>{{item.scholar}}</div>
            </div>
            <div class="containerA gap-x-sm">
                <div>GPA: {{item.gpa}}</div>
                <div>专业排名: {{item.score}}</div>
            </div>
        </div>

        <div class="space-y-sm" v-else>
            <div class="containerA gap-x-xxl">
                <input class="font-bold input2" v-model="item.school" />
                <input class="tips input2" v-model="item.time" />
            </div>
            <div class="containerA gap-x-xxl">
                <input class="input2" v-model="item.department" />
                <input class="input2" v-model="item.scholar" />
            </div>
            <div class="containerA gap-x-xxl">
                <input class="input2" v-model="item.gpa" />
                <input class="input2" v-model="item.score" />
            </div>
        </div>

    </div>
 </div>
</template>

<style scoped>

</style>
