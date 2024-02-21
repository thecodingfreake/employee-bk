const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")

const dotenv=require("dotenv")
const app=express()
app.use(express.json())
app.use(cors())
const pool = mysql.createPool('mysql://root:FBB2H2Cg-5ccfB-cbD3AAD6DhD1GAgbG@viaduct.proxy.rlwy.net:50362/railway');
 app.get("/get",(req,res)=>{
    pool.query("select * from details",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
 })
app.post("/entry",(req,res)=>{
    const data=req.body
    console.log(data)
    const {id}=data;
    pool.query("SELECT * from details where id=?",[id],(err,result)=>{
        if(err){
            console.log(id)
            console.log(err)
        }
        else if(result.length>0){
            res.send("id")
        }
        else{
            pool.query("insert into details set ?",[data],(err,result2)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.send("ok")
                }
            })
        }
    })

}) 
const port=process.env.PORT||3000;
app.listen(port,(req,res)=>{
    console.log("connected")
})