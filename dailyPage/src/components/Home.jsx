import React from 'react'
import axios from 'axios'
import { Player } from '@lottiefiles/react-lottie-player';
import { Carousel } from 'antd';
import {goto2,getCookie,setCookie} from '/src/scripts/publicFunctions.js'
import {hostServer} from '/project.config.js'

var typhoon=<Player
  autoplay
  loop
  src="/src/icons/typhoon.json"
  style={{ height: '45px', width: '45px' }}
  >
</Player>
var moon=<Player
  autoplay
  loop
  src="/src/icons/full-moon.json"
  style={{ height: '45px', width: '45px' }}
  >
  </Player>
var sun=<Player
  autoplay
  loop
  src="/src/icons/sunny-day.json"
  style={{ height: '45px', width: '45px' }}
  >
  </Player>
var book=<Player
  autoplay
  loop
  src="/src/icons/book.json"
  style={{ height: '45px', width: '45px' }}
  >
  </Player>

// var user=getCookie('user')
// if(user==''){
//   goto2('/src/pages/login.html')
// }

function PPT(props){
  var inner=props.ppts.map(e=>{
    return (
      <div key={e.url}>
        <div  className='w-full h-40 bg-center bg-cover' style={{backgroundImage:'url('+e.url+')'}} onClick={e=>{window.location='http://zueltx.cn'}}>
        </div>
      </div>
    )
  })
  return (
    <Carousel autoplay autoplaySpeed={5000}>
      {inner}
    </Carousel>
  );
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList:props.itemList,
      which:true
    };
    // console.log(this.state.itemList)
  }
  
  render(){
    var current=this.state.which?this.state.itemList.slice(0,3):this.state.itemList.slice(3,6)
    current.push({title:'trans',url:'trans'})

    var items=current.map((e)=>{
      var icon
      var color
      if(e.title=='words'){
        icon=sun
        color=' bg-red-500'
      }
      else if(e.title=='random'){
        icon=moon
        color=' bg-pink-400'
      }
      else if(e.title=='dairy'){
        icon=typhoon
        color=' bg-purple-400'
      }
      else if(e.title=='notebook'){
        icon=sun
        color=' bg-red-500'
      }
      else if(e.title=='todo'){
        icon=moon
        color=' bg-pink-400'
      }
      else if(e.title=='account'){
        icon=typhoon
        color=' bg-purple-400'
      }
      else{
        icon=book
        color=' text-orange-400'
      }
      var classT='h-16 containerB text-white text-font3 font-bold rounded justify-center'
      var classF='w-16 rounded py-px containerB mt-sm'+color
      return  (
          <div className={classT} key={e.title} onClick={(event)=>{
            if(e.url=='trans')
            {
              this.setState({
                which:!this.state.which
              })
              return
            };
            goto2(e.url)
            }}>
              {icon}
              <div className={classF}>{e.title}</div>
            </div>
      )
    }
    )

    return(
      <div className="containerA justify-around">
        {items}
      </div>
    )
  }
}

function Weather(props){
  return (
    <div className='text-font3 text-black font-bold w-fit mx-auto mb-sm -translate-y-4'>
      {props.weather.city}现在{props.weather.weather},{props.weather.temperature}度。记得保冷
    </div>
  )
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList:[
        {title:'words',url:'/src/pages/words.html'},
        {title:'random',url:'/src/pages/random.html'},
        {title:'dairy',url:'/src/pages/dairy.html'},
        {title:'notebook',url:'/src/pages/noteBook.html'},
        {title:'todo',url:'/src/pages/todo.html'},
        {title:'account',url:'/src/pages/account.html'},
      ],
      weather:{
        city:'武汉市',
        weather:'不知道',
        temperature:'100'
      },
      ppts:[
        {
          url:'http://zueltx.cn/wp-content/uploads/2023/04/u22892361421734854721fm253fmtautoapp120fJPEG.webp',
        }
      ]
    };
    
  }

  componentDidMount(){
    var app=document.getElementById('root')
    // var appHeight=window.getComputedStyle(app).getPropertyValue('height')
    // appHeight=Number(appHeight.slice(0,-2))
    // var srceenHeight=window.screen.height
    // var offSet=(srceenHeight-appHeight)/2
    // if(offSet>0){
    //   app.style.paddingTop=offSet.toString()+'px'
    // }
    // app.style.paddingTop='150px'
    var weather=getCookie('weather')
    axios.get(hostServer+'/users/ppts').then(e=>{
      this.setState({
        ppts:e.data
      })
    })
    if(weather==''){
      axios.post(hostServer+'/weather',{}).then(e=>{
        this.setState({
          weather:e.data.lives[0]
        })
        
      var d = new Date();
      d.setTime(d.getTime()+(60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = 'weather' + "=" + JSON.stringify(e.data.lives[0]) + "; " + expires;
      })
    }
    else{
      this.setState({
        weather:JSON.parse(weather)
      })
    }
  }
  
  render(){
    return(
      <div className=''>
        <div>
          <PPT ppts={this.state.ppts} />
        </div>
        <div className='m-md border py-xl rounded-md'>
          <Weather weather={this.state.weather} />
          <Item itemList={this.state.itemList}></Item>
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
