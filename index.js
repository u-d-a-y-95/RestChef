const restChef = require("./restChef")

const app = restChef(6000,()=>{
  console.log("Server is running")
}) 



app.get('/sample',(req,res)=>{
  res.sendData({
    status:201,
    data:[{name:"uday",age:25}]
  })
})

app.get('/',(req,res)=>{
  res.end("First Route : /")
})
