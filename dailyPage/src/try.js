// // var today=new Date('2022/10/0')
// // var day=today.getDay()
// // console.log(day)
// // var days=[1,2,3]
// // days.unshift(0)
// // console.log(days)
// // var dayss=today.getDate()
// // console.log(dayss)
// var date=new Date()
// console.log(date.getMonth())
var a=[1,2,3]
var b=[4,5,6]
// console.log(a.concat(b))

class A{
    constructor(a){
        this.a=a
    }
}

class B extends A{
    constructor(b){
        super(b)
    }
}

var b1=new B(5)
console.log(b1)

function try1(){
    var a=1
    function do1(){
        a+=1
        console.log(a)
    }
    do1()
}
try1()