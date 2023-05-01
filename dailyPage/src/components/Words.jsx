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
    axios.post(hostServer+`/users/deleteWord`,{id:id}).then(e=>{
      window.location.reload()
    })
  }
}

function Header(props){
    return(
        <CalendarIcon size='2em' onClick={(e)=>{goto2('/src/pages/calendar.html?type=words',e)}}/>
    )
}

function AddButton(props){
    return(
        <button className='button shadow' onClick={props.showCard}>add</button>
    )
}

function translate(word){
  goto2('/src/pages/translator.html?word='+word)
}

function TextCard(props){
    return(
        <div className='z-10 bg-white absolute containerB' style={{width:'calc(100vw)',height:'calc(80vh)'}}>
            <input value={props.value} onChange={props.onType} className='py-md w-4/5 border-lightB border-b text-font3 text-black outline-none' type="text" />
            <button className='button3 bg-primaryL text-white mt-xxl' onClick={props.addWord}>确定</button>
            <button className='button3 bg-succeed text-white mt-xxl' onClick={props.backWord}>返回</button>
        </div>
    )
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content:props.content
    };
    
  }
  
  render(){
    return(
      <div className='containerA'>
        <div className="py-sm ml-xl text-font3 w-2/3" onMouseDown={eve=>{touchstartHander(this.props.id,eve)}} onMouseMove={touchmoveHander} onMouseUp={touchendHander} onTouchStart={eve=>{touchstartHander(this.props.id,eve)}} onTouchMove={touchmoveHander} onTouchEnd={touchendHander}>
          {this.state.content}
        </div>
        <button className='text-red-300 text-font3' onClick={eve=>{translate(this.state.content,eve)}}>我是菜鸡</button>
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
      value:''
    };
    
    this.addWord=this.addWord.bind(this)
    this.showCard=this.showCard.bind(this)
    this.backWord=this.backWord.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  componentDidMount(){
    axios.get(hostServer+`/users/words?user=${user}&time=${dateT}`).then(e=>{
      this.setState({
        itemList:e.data
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

  addWord(){
    var words=this.state.itemList
    words.push({word:this.state.value,id:9999})
    axios.post(hostServer+`/users/addWord`,{user:user,time:dateT,word:this.state.value})
    this.setState({
        itemList:words,
        addOrNot:false,
        value:''
    })
  }

  render(){
    var items=this.state.itemList.map((e)=>
      <Item content={e.word} id={e.id} key={e.word+e.id.toString()}/>
    )
    if(this.state.addOrNot==true){
        var card=<TextCard addWord={this.addWord} backWord={this.backWord} value={this.state.value} onType={this.handleChange}/>
    }
    else{
        var card=null
    }

    return(
    <div>
        {card}
        <div className='containerA justify-around py-sm mb-sm bg-primaryH'>
            <Header />
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
