const restChef = require("./restChef")

const app = restChef(6000,()=>{
  console.log("Server is running")
}) 

//sakib

app.get('/sample',(req,res)=>{
  res.sendData({
    status:201,
    data:[{name:"uday",age:25}]
  })
})

app.post('/sample',(req,res)=>{
  res.sendData({
    status:201,
    data:[{name:"jui",age:25}]
  })
})


app.get('/',(req,res)=>{
  res.end("First Route : /")
})
