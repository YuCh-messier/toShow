import React from 'react'
import axios from 'axios'
import {goto2,getCookie} from '/src/scripts/publicFunctions.js'
import { CalendarIcon } from 'tdesign-icons-react'
import {hostServer} from '/project.config.js'

var user=getCookie('user')

function Header(props){
    return(
        <CalendarIcon size='2em' onClick={(e)=>{goto2('/src/pages/calendar.html?type=words',e)}}/>
    )
}

function TransButton(props){
    return(
        <button className='button shadow' onClick={props.trans}>trans</button>
    )
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word:props.word,
      id:props.id,
      translation:props.translation,
      translationA:props.translation,
    };
    this.handleClick=this.handleClick.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleBlur=this.handleBlur.bind(this)
  }
  handleClick(i){
    this.props.afterClick(this.props.index)
    axios.post(hostServer+'/users/addMemory',{id:this.state.id,ifM:i})
  }
  handleChange(event) {
    this.setState({translationA:event.target.value});
  }
  handleBlur() {
    if(this.state.translation!=this.state.translationA){
        axios.post(hostServer+'/users/addTrans',{id:this.state.id,translation:this.state.translationA})
    }
  }
  
  render(){
    if(this.props.eOrC){
        return(
        <div className='containerB border p-md m-sm rounded'>
            <div className="text-font2 mb-sm">
                {this.state.word}
            </div>
            <div className='containerA justify-around'>
                <button className='button3 bg-primaryL text-white shadow mr-md' onClick={e=>{this.handleClick(1)}}>认识</button>
                <button className='button3 bg-red-400 text-white shadow' onClick={e=>{this.handleClick(0)}}>不认识</button>
            </div>
        </div>
        )}
    else{
        return(
            <div className='containerB border p-md m-sm rounded'>
                <input value={this.state.translationA} onChange={this.handleChange} onBlur={this.handleBlur} className="text-font2 mb-sm" />
                <div className='containerA justify-around'>
                    <button className='button3 bg-primaryL text-white shadow mr-md' onClick={e=>{this.handleClick(1)}}>认识</button>
                    <button className='button3 bg-red-400 text-white shadow' onClick={e=>{this.handleClick(0)}}>不认识</button>
                </div>
            </div>
            )
    }
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList:[
        {
            id:0,
            word:'abandon',
            translation:'放弃'
        },
        {
            id:1,
            word:'de',
            translation:null
        },
        {
            id:2,
            word:'cf',
            translation:'刺激战场'
        }
      ],
      eOrC:true
    };
    
    this.trans=this.trans.bind(this)
    this.afterClick=this.afterClick.bind(this)
  }
  trans(){
    this.setState({
        eOrC:!this.state.eOrC
    })
  }
  afterClick(index){
    this.state.itemList.splice(index,1)
    this.setState({
        itemList:this.state.itemList
    })
  }

  componentDidMount(){
    axios.get(hostServer+`/users/allWords?user=${user}`).then(e=>{
      this.setState({
        itemList:e.data
      })
    })
    
  }

  render(){
    var items=this.state.itemList.map((e,i)=>
      <Item afterClick={this.afterClick} word={e.word} id={e.id} translation={e.translation} eOrC={this.state.eOrC} index={i} key={e.word+e.id.toString()}/>
    )

    return(
    <div>
        <div className='containerA justify-around py-sm mb-sm bg-primaryH'>
            <Header />
            <TransButton trans={this.trans}/>
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
