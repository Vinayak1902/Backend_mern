const {addToCart,changeQty,name}=require('./cartModule')

console.log("Hello World")
console.log(1+20)
let l = [10,20,30,40,50]
l.forEach((value,index)=>{
    console.log(value,index)
})
console.log(addToCart());
console.log(changeQty());
console.log(name);
