<script setup>
import { ref,toRefs} from 'vue';
import Switcher2 from '../widgets/Switcher2.vue'

var csssetting=['text-primary text-font3','text-light text-font3',['py-2'],['h-4','bg-primary','w-line','mr-1'],true] 
var choices=['基本信息']
var currentChoice=ref(choices[0])

var props=defineProps(['userinfo'])
var emits=defineEmits(['handleinfo'])
var {userinfo}=toRefs(props)
function doClick(){
    emits('handleinfo',userinfo.value)
}

function onChange(){
    
}
</script>

<template>
 <div class="flex border">
    <div class="w-32 py-8 border-r">
        <Switcher2 :csssetting="csssetting" :choices="choices" @tapsfunction="onChange"></Switcher2>
    </div>
    <div class="tips py-8 pl-xxl space-y-xl">
        <div class="containerA">
            <div class="w-64">用户名</div>
            <input class="input" type="text" name="" id="" v-model="userinfo.name">
        </div>

        <div class="containerA">
            <div class="w-64">电子邮箱</div>
            <input class="input" type="text" name="" id="" v-model="userinfo.email">
        </div>

        <div class="containerA">
            <div class="w-64">学校</div>
            <input class="input" type="text" name="" id="" v-model="userinfo.school">
        </div>

        <div class="containerA">
            <div class="w-64">性别</div>
            <div class="space-x-sm">
                <input type="radio" name="gender" id="male" value="男" v-model="userinfo.gender">
                <label for="male">男</label>

                <input type="radio" name="gender" id="female" value="女" v-model="userinfo.gender">
                <label for="female">女</label>
            </div>
        </div>

        <div class="containerA">
            <div class="w-64">生日</div>
            <input class="input" type="text" name="" id="" v-model="userinfo.birthday">
        </div>

        <div class="mx-auto w-fit pt-xl"><button class="button" @click="doClick">保存</button></div>
    </div>
 </div>
</template>

<style scoped>

</style>
