import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import {goto2,getQueryVariable,getToday,getCookie,randomString} from '/src/scripts/publicFunctions.js'
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

function Header(props){
    return(
        <CalendarIcon size='2em' onClick={(e)=>{goto2('/src/pages/calendar.html?type=dairy',e)}}/>
    )
}

function AddButton(props){
    return(
        <button className='button shadow' onClick={props.showCard}>add</button>
    )
}

function AddButton2(props){
    function setPic(){
        var destination='../public/pics/dairy/'
        let formData = new FormData()
        let fileName=randomString(16)+'.png'
        let file=document.getElementById('file').files[0]
        formData.append('file',file);
        axios({
            method: 'post',
            url: `${hostServer}/uploadFile?destination=${destination}&fileName=${fileName}`,
            data: formData
        }).then(e=>{
            window.location.reload()
        })
        axios.post(hostServer+'/users/addDairy',{user:user,time:dateT,content:hostServer+'/pics/dairy/'+fileName,tap:1})
    }

    return(
        <div>
            <button className='button shadow' onClick={props.addPic}>addP</button>
            <div>
                <input type="file" id='file' onChange={setPic} accept="image/*" hidden />
            </div>
        </div>
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
      tap:props.tap
    };
    this.viewPic=this.viewPic.bind(this)
  }
  
  viewPic(url){
    window.location=url
  }

  render(){
    if(this.state.tap==0){
        return(
          <div>
            <div className='w-fit ml-xl tips'>{this.props.times}</div>
            <div className="py-sm ml-xl text-font3">
              {this.state.content}
            </div>
          </div>
          )
    }
    else{
        return(
          <div>
            <div className='w-fit ml-xl tips'>{this.props.times}</div>
            <img className="py-sm w-3/5 ml-xl rounded" src={this.state.content} onClick={eve=>{this.viewPic(this.state.content,eve)}}/>
          </div>
          )
    }
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
    this.addPic=this.addPic.bind(this)
  }

  componentDidMount(){
    axios.get(hostServer+`/users/dairy?user=${user}&time=${dateT}`).then(e=>{
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
    words.push({content:this.state.value,tap:0})
    axios.post(hostServer+'/users/addDairy',{user:user,time:dateT,content:this.state.value,tap:0})
    this.setState({
        itemList:words,
        addOrNot:false,
        value:''
    })
  }

  addPic(){
    document.getElementById('file').click()
  }

  render(){
    var items=this.state.itemList.map((e)=>
      <Item content={e.content} tap={e.tap} times={e.times} key={e.content}/>
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
            <AddButton showCard={this.showCard} />
            <AddButton2 addPic={this.addPic} />
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
