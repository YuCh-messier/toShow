import React from 'react'
import ReactDOM from 'react-dom/client'
import {goto2,getQueryVariable,getCookie} from '/src/scripts/publicFunctions.js'
import { CaretLeftFilled,CaretRightFilled } from '@ant-design/icons';
import {hostServer} from '/project.config.js'
import axios from 'axios'

var type=getQueryVariable('type')
if(type===false){
  alert('error')
}

var user=getCookie('user')

var timer=null;

var touchstartHander=function(id,ifMark,event){
  timer=setTimeout(e=>{LongPress(id,ifMark)},500);
}

var touchmoveHander=function(event){
  clearTimeout(timer);
      timer=null;
}

var touchendHander=function(event){
  clearTimeout(timer);
      return false;
}

function LongPress(time,ifMark){
  var ifD=window.confirm('change or not?')
  if(ifD){
    if(ifMark){
        axios.post(hostServer+`/users/deleteCalendar`,{time:time,user:user,type:type}).then(e=>{
            window.location.reload()
          })
    }
    else{
        axios.post(hostServer+`/users/addCalendar`,{time:time,user:user,type:type}).then(e=>{
            window.location.reload()
          })
    }
  }
console.log(ifMark)
}

function Header(props){
    return(
        <div className='containerA text-primaryL px-md pt-md'>
            <div className='containerB my-sm text-font3 font-bold' style={{width:'14%'}}>一</div>
            <div className='containerB my-sm text-font3 font-bold' style={{width:'14%'}}>二</div>
            <div className='containerB my-sm text-font3 font-bold' style={{width:'14%'}}>三</div>
            <div className='containerB my-sm text-font3 font-bold' style={{width:'14%'}}>四</div>
            <div className='containerB my-sm text-font3 font-bold' style={{width:'14%'}}>五</div>
            <div className='containerB my-sm text-font3 font-bold' style={{width:'14%'}}>六</div>
            <div className='containerB my-sm text-font3 font-bold' style={{width:'14%'}}>日</div>
        </div>
    )
}

class Calendar extends React.Component {
    constructor(props) {
        var date=new Date()
        super(props);
        this.state = {
            year:date.getFullYear(),
            month:date.getMonth()+1,
            markDays:[]
        };
        
        this.updateMonth=this.updateMonth.bind(this)
    }
    
    componentDidMount(){
        axios.get(hostServer+`/users/calendar?user=${user}&type=${type}`).then(e=>{
            this.setState({
                markDays:e.data
            })
        })
    }

    updateMonth(offset){
        let month=this.state.month
        let year=this.state.year
        if(month+offset>12){
            year+=1
            month=1
        }
        else if(month+offset<1){
            year-=1
            month=12
        }
        else{
            month+=offset
        }
        this.setState({
            month:month,
            year:year
        })
    }

    render(){
      return(
        <div className="">
            <div className='containerA bg-primaryH'>
                <div className='mx-md text-lightH' onClick={(e)=>{this.updateMonth(-1,e)}}><CaretLeftFilled /></div>
                <div className='w-fit mx-auto my-md font-bold text-white'>{this.state.year}-{this.state.month}</div>
                <div className='mx-md text-lightH' onClick={(e)=>{this.updateMonth(1,e)}}><CaretRightFilled /></div>
            </div>
            <Header />
            <Days markDays={this.state.markDays} year={this.state.year} month={this.state.month} />
            <div className='button my-xl w-fit mx-auto' onClick={eve=>{goto2('/src/pages/home.html',eve)}}>home</div>
        </div>
      )
    }
  }

function Day(props){
    var myDay=props.toYear+'/'+props.e
    var ifMark=false
    props.markDays.forEach(e=>{
        if(e.time==myDay){
            ifMark=true
        }
    })
    return(
        <div onMouseDown={eve=>{touchstartHander(myDay,ifMark,eve)}} onMouseMove={touchmoveHander} onMouseUp={touchendHander} onTouchStart={eve=>{touchstartHander(myDay,ifMark,eve)}}
         onTouchMove={touchmoveHander} onTouchEnd={touchendHander} onClick={(eve)=>{goto2(`/src/pages/${props.type}.html?date=${props.year}-${props.month}-${props.e}`,eve)}}
          className={'inline-block my-sm text-font3 text-center'+(myDay==(props.toDay)?' bg-primaryL rounded-md text-white':'')+(ifMark?' bg-red-400 rounded-md text-white':'')} style={{width:'14%'}}>{props.e}</div>
    )
}

class Days extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    render(){
        var toYear=`${this.props.year.toString()}/${this.props.month.toString()}`
        var firstDay=toYear+'/1'
        var date=new Date()
        var toDay=date.getFullYear().toString()+'/'+(date.getMonth()+1).toString()+'/'+date.getDate().toString()
        firstDay=new Date(firstDay).getDay()
        var allDays=new Date(this.props.year,this.props.month,0).getDate()
        var days=[]
        for (let i=0;i<allDays;i++){
            days.push(i+1)
        }
        for(let i=1;i<firstDay;i++){
            days.unshift(1-i)
        }

        var dayItems=days.map((e)=>
        (
            <Day markDays={this.props.markDays} year={this.props.year} month={this.props.month} e={e} type={type} toDay={toDay} toYear={toYear} key={e}/>
        ))

        return (
            <div className='px-md'>
                {dayItems}
            </div>
        )
    }
}

function App() {

    return (
    <div>
        <Calendar />
    </div>
    )
  }
  
  export default App
