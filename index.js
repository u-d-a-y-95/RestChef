const restChef = require("./restChef")

const app = restChef(6000,()=>{
  console.log("Server is running")
}) 



app.get('/sample',(req,res)=>{
  res.end("Second  Route : /")
})

app.get('/',(req,res)=>{
  res.end("First Route : /")
})
