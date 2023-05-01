import{r as w,R as W,j as $}from"./index.7861a158.js";var xe=w.exports.createContext({});const oe=xe;function D(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function V(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,t)}return n}function b(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?V(Object(n),!0).forEach(function(t){D(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ke(e){if(Array.isArray(e))return e}function Se(e,r){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var t=[],a=!0,o=!1,f,i;try{for(n=n.call(e);!(a=(f=n.next()).done)&&(t.push(f.value),!(r&&t.length===r));a=!0);}catch(c){o=!0,i=c}finally{try{!a&&n.return!=null&&n.return()}finally{if(o)throw i}}return t}}function K(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function Te(e,r){if(!!e){if(typeof e=="string")return K(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return K(e,r)}}function Ae(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ie(e,r){return ke(e)||Se(e,r)||Te(e,r)||Ae()}function Oe(e,r){if(e==null)return{};var n={},t=Object.keys(e),a,o;for(o=0;o<t.length;o++)a=t[o],!(r.indexOf(a)>=0)&&(n[a]=e[a]);return n}function fe(e,r){if(e==null)return{};var n=Oe(e,r),t,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],!(r.indexOf(t)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,t)||(n[t]=e[t]))}return n}var ce={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var r={}.hasOwnProperty;function n(){for(var t=[],a=0;a<arguments.length;a++){var o=arguments[a];if(!!o){var f=typeof o;if(f==="string"||f==="number")t.push(o);else if(Array.isArray(o)){if(o.length){var i=n.apply(null,o);i&&t.push(i)}}else if(f==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){t.push(o.toString());continue}for(var c in o)r.call(o,c)&&o[c]&&t.push(c)}}}return t.join(" ")}e.exports?(n.default=n,e.exports=n):window.classNames=n})()})(ce);const Ee=ce.exports;function A(e){return A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},A(e)}function s(e,r){Ie(e)&&(e="100%");var n=Me(e);return e=r===360?e:Math.min(r,Math.max(0,parseFloat(e))),n&&(e=parseInt(String(e*r),10)/100),Math.abs(e-r)<1e-6?1:(r===360?e=(e<0?e%r+r:e%r)/parseFloat(String(r)):e=e%r/parseFloat(String(r)),e)}function Ie(e){return typeof e=="string"&&e.indexOf(".")!==-1&&parseFloat(e)===1}function Me(e){return typeof e=="string"&&e.indexOf("%")!==-1}function Ne(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function k(e){return e<=1?"".concat(Number(e)*100,"%"):e}function M(e){return e.length===1?"0"+e:String(e)}function Fe(e,r,n){return{r:s(e,255)*255,g:s(r,255)*255,b:s(n,255)*255}}function N(e,r,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(r-e)*(6*n):n<1/2?r:n<2/3?e+(r-e)*(2/3-n)*6:e}function je(e,r,n){var t,a,o;if(e=s(e,360),r=s(r,100),n=s(n,100),r===0)a=n,o=n,t=n;else{var f=n<.5?n*(1+r):n+r-n*r,i=2*n-f;t=N(i,f,e+1/3),a=N(i,f,e),o=N(i,f,e-1/3)}return{r:t*255,g:a*255,b:o*255}}function Pe(e,r,n){e=s(e,255),r=s(r,255),n=s(n,255);var t=Math.max(e,r,n),a=Math.min(e,r,n),o=0,f=t,i=t-a,c=t===0?0:i/t;if(t===a)o=0;else{switch(t){case e:o=(r-n)/i+(r<n?6:0);break;case r:o=(n-e)/i+2;break;case n:o=(e-r)/i+4;break}o/=6}return{h:o,s:c,v:f}}function Re(e,r,n){e=s(e,360)*6,r=s(r,100),n=s(n,100);var t=Math.floor(e),a=e-t,o=n*(1-r),f=n*(1-a*r),i=n*(1-(1-a)*r),c=t%6,g=[n,f,o,o,i,n][c],u=[i,n,n,f,o,o][c],v=[o,o,i,n,n,f][c];return{r:g*255,g:u*255,b:v*255}}function _e(e,r,n,t){var a=[M(Math.round(e).toString(16)),M(Math.round(r).toString(16)),M(Math.round(n).toString(16))];return t&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0):a.join("")}function G(e){return l(e)/255}function l(e){return parseInt(e,16)}var Q={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function y(e){var r={r:0,g:0,b:0},n=1,t=null,a=null,o=null,f=!1,i=!1;return typeof e=="string"&&(e=Be(e)),typeof e=="object"&&(m(e.r)&&m(e.g)&&m(e.b)?(r=Fe(e.r,e.g,e.b),f=!0,i=String(e.r).substr(-1)==="%"?"prgb":"rgb"):m(e.h)&&m(e.s)&&m(e.v)?(t=k(e.s),a=k(e.v),r=Re(e.h,t,a),f=!0,i="hsv"):m(e.h)&&m(e.s)&&m(e.l)&&(t=k(e.s),o=k(e.l),r=je(e.h,t,o),f=!0,i="hsl"),Object.prototype.hasOwnProperty.call(e,"a")&&(n=e.a)),n=Ne(n),{ok:f,format:e.format||i,r:Math.min(255,Math.max(r.r,0)),g:Math.min(255,Math.max(r.g,0)),b:Math.min(255,Math.max(r.b,0)),a:n}}var De="[-\\+]?\\d+%?",He="[-\\+]?\\d*\\.\\d+%?",h="(?:".concat(He,")|(?:").concat(De,")"),F="[\\s|\\(]+(".concat(h,")[,|\\s]+(").concat(h,")[,|\\s]+(").concat(h,")\\s*\\)?"),j="[\\s|\\(]+(".concat(h,")[,|\\s]+(").concat(h,")[,|\\s]+(").concat(h,")[,|\\s]+(").concat(h,")\\s*\\)?"),d={CSS_UNIT:new RegExp(h),rgb:new RegExp("rgb"+F),rgba:new RegExp("rgba"+j),hsl:new RegExp("hsl"+F),hsla:new RegExp("hsla"+j),hsv:new RegExp("hsv"+F),hsva:new RegExp("hsva"+j),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function Be(e){if(e=e.trim().toLowerCase(),e.length===0)return!1;var r=!1;if(Q[e])e=Q[e],r=!0;else if(e==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};var n=d.rgb.exec(e);return n?{r:n[1],g:n[2],b:n[3]}:(n=d.rgba.exec(e),n?{r:n[1],g:n[2],b:n[3],a:n[4]}:(n=d.hsl.exec(e),n?{h:n[1],s:n[2],l:n[3]}:(n=d.hsla.exec(e),n?{h:n[1],s:n[2],l:n[3],a:n[4]}:(n=d.hsv.exec(e),n?{h:n[1],s:n[2],v:n[3]}:(n=d.hsva.exec(e),n?{h:n[1],s:n[2],v:n[3],a:n[4]}:(n=d.hex8.exec(e),n?{r:l(n[1]),g:l(n[2]),b:l(n[3]),a:G(n[4]),format:r?"name":"hex8"}:(n=d.hex6.exec(e),n?{r:l(n[1]),g:l(n[2]),b:l(n[3]),format:r?"name":"hex"}:(n=d.hex4.exec(e),n?{r:l(n[1]+n[1]),g:l(n[2]+n[2]),b:l(n[3]+n[3]),a:G(n[4]+n[4]),format:r?"name":"hex8"}:(n=d.hex3.exec(e),n?{r:l(n[1]+n[1]),g:l(n[2]+n[2]),b:l(n[3]+n[3]),format:r?"name":"hex"}:!1)))))))))}function m(e){return Boolean(d.CSS_UNIT.exec(String(e)))}var S=2,Y=.16,ze=.05,qe=.05,Le=.15,ue=5,le=4,Ue=[{index:7,opacity:.15},{index:6,opacity:.25},{index:5,opacity:.3},{index:5,opacity:.45},{index:5,opacity:.65},{index:5,opacity:.85},{index:4,opacity:.9},{index:3,opacity:.95},{index:2,opacity:.97},{index:1,opacity:.98}];function Z(e){var r=e.r,n=e.g,t=e.b,a=Pe(r,n,t);return{h:a.h*360,s:a.s,v:a.v}}function T(e){var r=e.r,n=e.g,t=e.b;return"#".concat(_e(r,n,t,!1))}function We(e,r,n){var t=n/100,a={r:(r.r-e.r)*t+e.r,g:(r.g-e.g)*t+e.g,b:(r.b-e.b)*t+e.b};return a}function J(e,r,n){var t;return Math.round(e.h)>=60&&Math.round(e.h)<=240?t=n?Math.round(e.h)-S*r:Math.round(e.h)+S*r:t=n?Math.round(e.h)+S*r:Math.round(e.h)-S*r,t<0?t+=360:t>=360&&(t-=360),t}function X(e,r,n){if(e.h===0&&e.s===0)return e.s;var t;return n?t=e.s-Y*r:r===le?t=e.s+Y:t=e.s+ze*r,t>1&&(t=1),n&&r===ue&&t>.1&&(t=.1),t<.06&&(t=.06),Number(t.toFixed(2))}function ee(e,r,n){var t;return n?t=e.v+qe*r:t=e.v-Le*r,t>1&&(t=1),Number(t.toFixed(2))}function H(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=[],t=y(e),a=ue;a>0;a-=1){var o=Z(t),f=T(y({h:J(o,a,!0),s:X(o,a,!0),v:ee(o,a,!0)}));n.push(f)}n.push(T(t));for(var i=1;i<=le;i+=1){var c=Z(t),g=T(y({h:J(c,i),s:X(c,i),v:ee(c,i)}));n.push(g)}return r.theme==="dark"?Ue.map(function(u){var v=u.index,x=u.opacity,p=T(We(y(r.backgroundColor||"#141414"),y(n[v]),x*100));return p}):n}var P={red:"#F5222D",volcano:"#FA541C",orange:"#FA8C16",gold:"#FAAD14",yellow:"#FADB14",lime:"#A0D911",green:"#52C41A",cyan:"#13C2C2",blue:"#1890FF",geekblue:"#2F54EB",purple:"#722ED1",magenta:"#EB2F96",grey:"#666666"},R={},_={};Object.keys(P).forEach(function(e){R[e]=H(P[e]),R[e].primary=R[e][5],_[e]=H(P[e],{theme:"dark",backgroundColor:"#141414"}),_[e].primary=_[e][5]});var ne={};function $e(e,r){}function Ve(e,r,n){!r&&!ne[n]&&(e(!1,n),ne[n]=!0)}function Ke(e,r){Ve($e,e,r)}function Ge(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function Qe(e,r){if(!e)return!1;if(e.contains)return e.contains(r);for(var n=r;n;){if(n===e)return!0;n=n.parentNode}return!1}var re="data-rc-order",Ye="rc-util-key",B=new Map;function se(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=e.mark;return r?r.startsWith("data-")?r:"data-".concat(r):Ye}function q(e){if(e.attachTo)return e.attachTo;var r=document.querySelector("head");return r||document.body}function Ze(e){return e==="queue"?"prependQueue":e?"prepend":"append"}function de(e){return Array.from((B.get(e)||e).children).filter(function(r){return r.tagName==="STYLE"})}function ge(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!Ge())return null;var n=r.csp,t=r.prepend,a=document.createElement("style");a.setAttribute(re,Ze(t)),n!=null&&n.nonce&&(a.nonce=n==null?void 0:n.nonce),a.innerHTML=e;var o=q(r),f=o.firstChild;if(t){if(t==="queue"){var i=de(o).filter(function(c){return["prepend","prependQueue"].includes(c.getAttribute(re))});if(i.length)return o.insertBefore(a,i[i.length-1].nextSibling),a}o.insertBefore(a,f)}else o.appendChild(a);return a}function Je(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=q(r);return de(n).find(function(t){return t.getAttribute(se(r))===e})}function Xe(e,r){var n=B.get(e);if(!n||!Qe(document,n)){var t=ge("",r),a=t.parentNode;B.set(e,a),a.removeChild(t)}}function en(e,r){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},t=q(n);Xe(t,n);var a=Je(r,n);if(a){var o,f;if(((o=n.csp)===null||o===void 0?void 0:o.nonce)&&a.nonce!==((f=n.csp)===null||f===void 0?void 0:f.nonce)){var i;a.nonce=(i=n.csp)===null||i===void 0?void 0:i.nonce}return a.innerHTML!==e&&(a.innerHTML=e),a}var c=ge(e,n);return c.setAttribute(se(n),r),c}function nn(e,r){Ke(e,"[@ant-design/icons] ".concat(r))}function te(e){return A(e)==="object"&&typeof e.name=="string"&&typeof e.theme=="string"&&(A(e.icon)==="object"||typeof e.icon=="function")}function ae(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(e).reduce(function(r,n){var t=e[n];switch(n){case"class":r.className=t,delete r.class;break;default:r[n]=t}return r},{})}function z(e,r,n){return n?W.createElement(e.tag,b(b({key:r},ae(e.attrs)),n),(e.children||[]).map(function(t,a){return z(t,"".concat(r,"-").concat(e.tag,"-").concat(a))})):W.createElement(e.tag,b({key:r},ae(e.attrs)),(e.children||[]).map(function(t,a){return z(t,"".concat(r,"-").concat(e.tag,"-").concat(a))}))}function me(e){return H(e)[0]}function be(e){return e?Array.isArray(e)?e:[e]:[]}var rn=`
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,tn=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rn,n=w.exports.useContext(oe),t=n.csp;w.exports.useEffect(function(){en(r,"@ant-design-icons",{prepend:!0,csp:t})},[])},an=["icon","className","onClick","style","primaryColor","secondaryColor"],C={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function on(e){var r=e.primaryColor,n=e.secondaryColor;C.primaryColor=r,C.secondaryColor=n||me(r),C.calculated=!!n}function fn(){return b({},C)}var O=function(r){var n=r.icon,t=r.className,a=r.onClick,o=r.style,f=r.primaryColor,i=r.secondaryColor,c=fe(r,an),g=C;if(f&&(g={primaryColor:f,secondaryColor:i||me(f)}),tn(),nn(te(n),"icon should be icon definiton, but got ".concat(n)),!te(n))return null;var u=n;return u&&typeof u.icon=="function"&&(u=b(b({},u),{},{icon:u.icon(g.primaryColor,g.secondaryColor)})),z(u.icon,"svg-".concat(u.name),b({className:t,onClick:a,style:o,"data-icon":u.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},c))};O.displayName="IconReact";O.getTwoToneColors=fn;O.setTwoToneColors=on;const L=O;function he(e){var r=be(e),n=ie(r,2),t=n[0],a=n[1];return L.setTwoToneColors({primaryColor:t,secondaryColor:a})}function cn(){var e=L.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor}var un=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];he("#1890ff");var E=w.exports.forwardRef(function(e,r){var n,t=e.className,a=e.icon,o=e.spin,f=e.rotate,i=e.tabIndex,c=e.onClick,g=e.twoToneColor,u=fe(e,un),v=w.exports.useContext(oe),x=v.prefixCls,p=x===void 0?"anticon":x,ve=Ee(p,(n={},D(n,"".concat(p,"-").concat(a.name),!!a.name),D(n,"".concat(p,"-spin"),!!o||a.name==="loading"),n),t),I=i;I===void 0&&c&&(I=-1);var pe=f?{msTransform:"rotate(".concat(f,"deg)"),transform:"rotate(".concat(f,"deg)")}:void 0,ye=be(g),U=ie(ye,2),Ce=U[0],we=U[1];return $("span",{...b(b({role:"img","aria-label":a.name},u),{},{ref:r,tabIndex:I,onClick:c,className:ve}),children:$(L,{icon:a,primaryColor:Ce,secondaryColor:we,style:pe})})});E.displayName="AntdIcon";E.getTwoToneColor=cn;E.setTwoToneColor=he;const sn=E;export{sn as A,b as _};
