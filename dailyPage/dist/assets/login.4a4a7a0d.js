import{R as o,c as a,s as i,a as r,b as l,j as t,h as c,d as h}from"./index.7861a158.js";class u extends o.Component{constructor(e){super(e),this.state={value1:"",value2:""},this.onType1=this.onType1.bind(this),this.onType2=this.onType2.bind(this),this.login=this.login.bind(this)}onType1(e){this.setState({value1:e.target.value})}onType2(e){this.setState({value2:e.target.value})}login(){var e=this.state.value1,s=this.state.value2;if(e=="13272732651"){var n=c+"/users/checkUser";a.post(n,{user:s}).then(v=>{i("user",s,30),r("/src/pages/home.html")})}else window.location="https://tdesign.tencent.com/react/components/icon"}render(){return l("div",{className:"containerB gap-y-md",children:[t("input",{placeholder:"\u9080\u8BF7\u7801",value:this.state.value1,onChange:this.onType1,className:"block py-md w-4/5 border-lightB border-b text-font3 text-black outline-none",type:"text"}),t("input",{placeholder:"\u7528\u6237id",value:this.state.value2,onChange:this.onType2,className:"block py-md w-4/5 border-lightB border-b text-font3 text-black outline-none",type:"text"}),t("button",{onClick:this.login,className:"button",children:"\u786E\u5B9A"})]})}}function d(){return t(u,{})}h.createRoot(document.getElementById("root")).render(t(o.StrictMode,{children:t(d,{})}));
