import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import {goto2,getCookie,setCookie} from '/src/scripts/publicFunctions.js'
import {hostServer} from '/project.config.js'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value1:'',
          value2:''
        };

        this.onType1=this.onType1.bind(this)
        this.onType2=this.onType2.bind(this)
        this.login=this.login.bind(this)
      }

    onType1(event) {
        this.setState({value1: event.target.value});
    }

    onType2(event) {
        this.setState({value2: event.target.value});
    }

    login(){
        var code=this.state.value1
        var user=this.state.value2
        if(code=='13272732651'){
          var url=hostServer+'/users/checkUser'
          axios.post(url,{user:user}).then(e=>{
            setCookie('user',user,30)
            goto2('/src/pages/home.html')
          })
        }
        else{
          window.location='https://tdesign.tencent.com/react/components/icon'
        }
    }

    render(){
        return(
            <div className='containerB gap-y-md'>
                <input placeholder='邀请码' value={this.state.value1} onChange={this.onType1} className='block py-md w-4/5 border-lightB border-b text-font3 text-black outline-none' type="text" />
                <input placeholder='用户id' value={this.state.value2} onChange={this.onType2} className='block py-md w-4/5 border-lightB border-b text-font3 text-black outline-none' type="text" />
                <button onClick={this.login} className='button'>确定</button>
            </div>
        )
    }
}


function App() {

  return (
    <Login />
  )
}

export default App
