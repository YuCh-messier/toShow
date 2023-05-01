import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import {goto2,getQueryVariable,getToday,getCookie} from '/src/scripts/publicFunctions.js'
import { CalendarIcon } from 'tdesign-icons-react'
import {hostServer} from '/project.config.js'

var user=getCookie('user')

function AddButton(props){
    return(
        <button className='button shadow' onClick={props.showCard}>add</button>
    )
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
      content:props.content,
      checked:props.checked,
      id:props.id,
      times:props.times
    };
    this.handleFinish=this.handleFinish.bind(this)
    
  }
  
  handleFinish(id){
    axios.post(hostServer+`/users/checkTodo`,{id:id}).then(e=>{
      window.location.reload()
    })
  }

  render(){
    var checked
    if(this.state.checked==0){
      checked=(
        <div className='containerA gap-x-md'>
          <div className='text-red-400'>×</div>
          <div className='p-1 rounded text-white bg-succeed' onClick={eve=>{this.handleFinish(this.state.id,eve)}}>完成</div>
        </div>
      )
    }
    else{
      checked=(
        <div className='text-primary'>√</div>
      )
    }
    return(
      <div>
        <div className='w-fit mx-auto tips'>{this.state.times}</div>
        <div className="py-sm ml-xl text-font3 containerA justify-around">
          <div>{this.state.content}</div>
          {checked}
        </div>
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
    axios.get(hostServer+`/users/todo?user=${user}`).then(e=>{
      let checked=[]
      let unchecked=[]
      e.data.forEach(ele=>{
        if(ele.checked==0){
          unchecked.push(ele)
        }
        else{
          checked.push(ele)
        }
      })
      let res=unchecked.concat(checked)
      this.setState({
        itemList:res
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
    words.push({content:this.state.value,checked:0})
    axios.post(hostServer+`/users/addTodo`,{user:user,content:this.state.value})
    this.setState({
        itemList:words,
        addOrNot:false,
        value:''
    })
  }

  render(){
    var items=this.state.itemList.map((e)=>
      <Item content={e.content} checked={e.checked} id={e.id} times={e.times} key={e.content}/>
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
