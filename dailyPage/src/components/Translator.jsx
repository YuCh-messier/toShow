import React from 'react'
import ReactDOM from 'react-dom/client'
import CryptoJS from 'crypto-js';
import axios from 'axios';
import {goto2,getQueryVariable} from '/src/scripts/publicFunctions.js'
import {hostServer} from '/project.config.js'

var word=getQueryVariable('word')
if(word===false){
  alert('error')
}

// var appKey = '2abf9bd7cbe89bc8';
// var key = '56dADD4vt1Ao8GtHqJcVqy7oh2S9u1TR';//注意：暴露appSecret，有被盗用造成损失的风险
// var salt = (new Date).getTime();
// var curtime = Math.round(new Date().getTime()/1000);
// // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
// var from = 'en';
// var to = 'zh-CHS';
// var str1 = appKey + truncate(word) + salt + curtime + key;
// var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

// function truncate(q){
//     var len = q.length;
//     if(len<=20) return q;
//     return q.substring(0, 10) + len + q.substring(len-10, len);
// }

class All extends React.Component{
    constructor(props){
        super(props)
        this.state={
            web:[],
            usS:'',
            ukS:'',
            wf:[]
        }
    }

    componentDidMount(){
        axios.post(hostServer+'/translator',{word:word}).then(e=>{
            console.log(e)
            this.setState({
                web:e.data.web,
                usS:e.data.basic['us-phonetic'],
                ukS:e.data.basic['uk-phonetic'],
            })
            if(e.data.basic.wfs){
                this.setState({
                    wf:e.data.basic.wfs
                })
            }
        })
    }

    render(){
        var means=this.state.web.map(e=>{
            var value1=e.value.join(',')
            var key1=e.key
            return (
                <div className='text-font3' key={value1}>
                    <div className='inline-block w-fit mr-md text-succeed'>{value1}</div>
                    <div className='inline-block w-fit tips'>{key1}</div>
                </div>
            )
        })
        var others=this.state.wf.map(e=>{
            var value1=e.wf.name
            var key1=e.wf.value
            return (
                <div className='text-font3' key={value1}>
                    <div className='inline-block w-fit mr-md text-primary'>{value1}</div>
                    <div className='inline-block w-fit tips'>{key1}</div>
                </div>
            )
        })
        return (
            <div className='m-md p-md rounded space-y-md bg-lightH'>
                <div className='containerA text-font3'>
                    <div className='w-2/5'>us-phonetic</div>
                    <div className='tips'>{this.state.usS}</div>
                </div>
                <div className='containerA text-font3'>
                    <div className='w-2/5'>uk-phonetic</div>
                    <div className='tips'>{this.state.ukS}</div>
                </div>
                <div className='space-y-sm'>
                    {means}
                </div>
                <div className='space-y-sm'>
                    {others}
                </div>
            </div>
        )
    }
}

function App() {

    return (
    <div>
        <All />
    </div>
    )
  }
  
  export default App
