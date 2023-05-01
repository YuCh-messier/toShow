import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import {goto2,getQueryVariable,getToday,getCookie} from '/src/scripts/publicFunctions.js'
import { CalendarIcon } from 'tdesign-icons-react'
import {hostServer} from '/project.config.js'

var dateP=getQueryVariable('date')
var dateT
if(dateP){
  dateT=dateP
}
else{
  dateT=getToday()
}


var user=getCookie('user')

var timer=null;

var touchstartHander=function(id,event){
  timer=setTimeout(e=>{LongPress(id)},500);
}

var touchmoveHander=function(event){
  clearTimeout(timer);
      timer=null;
}

var touchendHander=function(event){
  clearTimeout(timer);
      return false;
}

function LongPress(id){
  var ifD=window.confirm('delete or not?')
  if(ifD){
    axios.post(hostServer+`/users/deleteAccount`,{id:id}).then(e=>{
      window.location.reload()
    })
  }
}

function Header(props){
    return(
        <CalendarIcon size='2em' onClick={(e)=>{goto2('/src/pages/calendar.html?type=account',e)}}/>
    )
}

function Header2(props){
  var toDay=new Date().getDate()
  var tM=props.tM
  var tD=props.tD
  var aM=(tM/toDay).toFixed(2)

  return (
    <div className='containerB text-font3 w-fit gap-y-sm'>
      <div>TD:{tD}</div>
      <div>TM:{tM}</div>
      <div>AM:{aM}</div>
    </div>
  )
}

function AddButton(props){
    return(
        <button className='button shadow' onClick={props.showCard}>add</button>
    )
}

function TextCard(props){
    return(
        <div className='z-10 bg-white absolute containerB' style={{width:'calc(100vw)',height:'calc(80vh)'}}>
            <input placeholder='价格' value={props.value} onChange={props.onType} className='py-md w-4/5 border-lightB border-b text-font3 text-black outline-none' type="number" />
            <input placeholder='备注' value={props.value2} onChange={props.onType2} className='py-md w-4/5 border-lightB border-b text-font3 text-black outline-none' type="text" />
            <button className='button3 bg-primaryL text-white mt-xxl' onClick={props.addWord}>确定</button>
            <button className='button3 bg-succeed text-white mt-xxl' onClick={props.backWord}>返回</button>
        </div>
    )
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money:props.money,
      text:props.text
    };
    
  }
  
  render(){
    return(
      <div className="py-sm ml-xl text-font3 containerA justify-around" onMouseDown={eve=>{touchstartHander(this.props.id,eve)}} onMouseMove={touchmoveHander} onMouseUp={touchendHander} onTouchStart={eve=>{touchstartHander(this.props.id,eve)}} onTouchMove={touchmoveHander} onTouchEnd={touchendHander}>
        <div>{this.state.money}</div>
        <div>{this.state.text}</div>
      </div>
    )
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList:[],
      addOrNot:false,
      value:'',
      value2:'备注',
      month:new Date().getMonth()+1,
      monthM:0,
      dayM:0
    };
    
    this.addWord=this.addWord.bind(this)
    this.showCard=this.showCard.bind(this)
    this.backWord=this.backWord.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleChange2=this.handleChange2.bind(this)
  }

  componentDidMount(){
    axios.get(hostServer+`/users/account?user=${user}&time=${dateT}`).then(e=>{
      let dM=0
      e.data.forEach(ele=>{
        dM+=Number(ele.money)
      })
      this.setState({
        itemList:e.data,
        dayM:dM
      })
    })

    axios.get(hostServer+`/users/accountM?user=${user}&month=${this.state.month}`).then(e=>{
      this.setState({
        monthM:e.data[0]['sum(money)']
      })
    })
  }

  showCard(){
    this.setState({
        addOrNot:true
    })
  }

  backWord(){
    this.setState({
        addOrNot:false
    })
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleChange2(event) {
    this.setState({value2: event.target.value});
  }

  addWord(){
    var words=this.state.itemList
    words.push({money:this.state.value,text:this.state.value2,id:99})
    axios.post(hostServer+`/users/addAccount`,{user:user,time:dateT,money:this.state.value,text:this.state.value2,month:this.state.month})
    this.setState({
        itemList:words,
        addOrNot:false,
        value:'',
        value2:'备注'
    })
  }

  render(){
    var items=this.state.itemList.map((e)=>
      <Item money={e.money} text={e.text} id={e.id} key={e.id.toString()+e.text}/>
    )
    if(this.state.addOrNot==true){
        var card=<TextCard addWord={this.addWord} backWord={this.backWord} value={this.state.value} value2={this.state.value2} onType={this.handleChange} onType2={this.handleChange2}/>
    }
    else{
        var card=null
    }

    return(
    <div>
        {card}
        <div className='containerA justify-around py-sm mb-sm bg-primaryH'>
            <Header />
            <Header2 tM={this.state.monthM} tD={this.state.dayM}/>
            <AddButton showCard={this.showCard}/>
        </div>
        <div>
            {items}
        </div>
    </div>
    )
  }
}

function App() {

  return (
    <ItemList />
  )
}

export default App
