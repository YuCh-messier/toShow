<script setup>
import { ref,toRefs} from 'vue';


var props=defineProps(['preference'])
var {preference}=toRefs(props)
var editOrShow=ref(false)
function editPre(){
    editOrShow.value=!editOrShow.value
}
</script>

<template>
 <div class="space-y-md">
    <div class="flex float-right gap-x-sm">
        <div class="tips2" @click="editPre()">{{editOrShow?'确定':'编辑'}}</div>
    </div>

    <div class="space-y-sm pb-md" v-if="!editOrShow">
        <div class="containerA gap-x-sm">
            <div class="font-bold">{{preference.industry}}</div>
            <div>{{preference.position}}</div>
            <div>{{preference.city}}</div>
        </div>
        <div class="containerA gap-x-md">
            <div>到岗时间: {{preference.deadline}}</div>
            <div>实习时长: {{preference.period}}</div>
            <div>每周出勤: {{preference.weekDay}}</div>
        </div>
    </div>

    <div class="space-y-sm pb-md" v-else>
        <div class="containerA gap-x-md">
            <input class="font-bold input2" v-model="preference.industry" />
            <input class="input2" v-model="preference.position" />
            <input class="input2" v-model="preference.city" />
        </div>
        <div class="containerA gap-x-md">
            <input class="input2" v-model="preference.deadline" />
            <input class="input2" v-model="preference.period" />
            <input class="input2" v-model="preference.weekDay" />
        </div>
    </div>
 </div>
</template>

<style scoped>

</style>
