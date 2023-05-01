import{r as p,j as a,e as F,g as k,R as f,c as h,h as m,b as i,a as x,d as S}from"./index.7861a158.js";import{A as w,_ as l}from"./AntdIcon.be161400.js";var L={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z"}}]},name:"caret-left",theme:"filled"};const $=L;var D=function(t,e){return a(w,{...l(l({},t),{},{ref:e,icon:$})})};D.displayName="CaretLeftFilled";const B=p.exports.forwardRef(D);var R={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"}}]},name:"caret-right",theme:"filled"};const E=R;var C=function(t,e){return a(w,{...l(l({},t),{},{ref:e,icon:E})})};C.displayName="CaretRightFilled";const H=p.exports.forwardRef(C);var s=F("type");s===!1&&alert("error");var u=k("user"),d=null,y=function(r,t,e){d=setTimeout(n=>{T(r,t)},500)},v=function(r){clearTimeout(d),d=null},g=function(r){return clearTimeout(d),!1};function T(r,t){var e=window.confirm("change or not?");e&&(t?h.post(m+"/users/deleteCalendar",{time:r,user:u,type:s}).then(n=>{window.location.reload()}):h.post(m+"/users/addCalendar",{time:r,user:u,type:s}).then(n=>{window.location.reload()})),console.log(t)}function A(r){return i("div",{className:"containerA text-primaryL px-md pt-md",children:[a("div",{className:"containerB my-sm text-font3 font-bold",style:{width:"14%"},children:"\u4E00"}),a("div",{className:"containerB my-sm text-font3 font-bold",style:{width:"14%"},children:"\u4E8C"}),a("div",{className:"containerB my-sm text-font3 font-bold",style:{width:"14%"},children:"\u4E09"}),a("div",{className:"containerB my-sm text-font3 font-bold",style:{width:"14%"},children:"\u56DB"}),a("div",{className:"containerB my-sm text-font3 font-bold",style:{width:"14%"},children:"\u4E94"}),a("div",{className:"containerB my-sm text-font3 font-bold",style:{width:"14%"},children:"\u516D"}),a("div",{className:"containerB my-sm text-font3 font-bold",style:{width:"14%"},children:"\u65E5"})]})}class j extends f.Component{constructor(t){var e=new Date;super(t),this.state={year:e.getFullYear(),month:e.getMonth()+1,markDays:[]},this.updateMonth=this.updateMonth.bind(this)}componentDidMount(){h.get(m+`/users/calendar?user=${u}&type=${s}`).then(t=>{this.setState({markDays:t.data})})}updateMonth(t){let e=this.state.month,n=this.state.year;e+t>12?(n+=1,e=1):e+t<1?(n-=1,e=12):e+=t,this.setState({month:e,year:n})}render(){return i("div",{className:"",children:[i("div",{className:"containerA bg-primaryH",children:[a("div",{className:"mx-md text-lightH",onClick:t=>{this.updateMonth(-1,t)},children:a(B,{})}),i("div",{className:"w-fit mx-auto my-md font-bold text-white",children:[this.state.year,"-",this.state.month]}),a("div",{className:"mx-md text-lightH",onClick:t=>{this.updateMonth(1,t)},children:a(H,{})})]}),a(A,{}),a(I,{markDays:this.state.markDays,year:this.state.year,month:this.state.month}),a("div",{className:"button my-xl w-fit mx-auto",onClick:t=>{x("/src/pages/home.html")},children:"home"})]})}}function Y(r){var t=r.toYear+"/"+r.e,e=!1;return r.markDays.forEach(n=>{n.time==t&&(e=!0)}),a("div",{onMouseDown:n=>{y(t,e)},onMouseMove:v,onMouseUp:g,onTouchStart:n=>{y(t,e)},onTouchMove:v,onTouchEnd:g,onClick:n=>{x(`/src/pages/${r.type}.html?date=${r.year}-${r.month}-${r.e}`)},className:"inline-block my-sm text-font3 text-center"+(t==r.toDay?" bg-primaryL rounded-md text-white":"")+(e?" bg-red-400 rounded-md text-white":""),style:{width:"14%"},children:r.e})}class I extends f.Component{constructor(t){super(t),this.state={}}render(){var t=`${this.props.year.toString()}/${this.props.month.toString()}`,e=t+"/1",n=new Date,b=n.getFullYear().toString()+"/"+(n.getMonth()+1).toString()+"/"+n.getDate().toString();e=new Date(e).getDay();var N=new Date(this.props.year,this.props.month,0).getDate(),c=[];for(let o=0;o<N;o++)c.push(o+1);for(let o=1;o<e;o++)c.unshift(1-o);var M=c.map(o=>a(Y,{markDays:this.props.markDays,year:this.props.year,month:this.props.month,e:o,type:s,toDay:b,toYear:t},o));return a("div",{className:"px-md",children:M})}}function z(){return a("div",{children:a(j,{})})}S.createRoot(document.getElementById("root")).render(a(f.StrictMode,{children:a(z,{})}));
