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
app.delete("/:id",(req,res)=>{
    const eId = req.params.id;

    if (!eId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }
  
    const deleteQuery = 'DELETE FROM details WHERE id = ?';
  
    pool.query(deleteQuery, [eId], (err, results) => {
      if (err) {
        console.error('Error deleting employee from MySQL:', err);
        return res.status(500).json({ error: 'Error deleting book from the database' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      res.status(200).json({ message: 'Book deleted successfully' });
    });
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
app.put("/edit/:id", (req, res) => {
    const id = req.params.id;  // Extracting the id from the URL parameters
    const updatef = req.body.updatef;
    const value = req.body.value;

    // Using string interpolation to build the SQL query
    const updateQuery = `UPDATE details SET ${updatef} = ? WHERE id = ?`;

    pool.query(updateQuery, [value, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error updating employee in the database' });
        } else {
            res.send("ok");
        }
    });
});

  
const port=process.env.PORT||3000;
app.listen(port,(req,res)=>{
    console.log("connected")
})
