
import express from "express";
import db from "../index.js";
const router=express.Router();

// router.get('/',(request,response)=>{
   
//     // console.log(request);
//      console.log("get ");
//     // console.log(reponse);
//     return response.status(224).send(`hello suha`);

// });


router.post("/",async(req,res)=>{
    console.log(req.body);
    const input=req.body;
    // console.log(input.name);
    console.log("hi");
  try{
   await  db.query("INSERT INTO my_table (name,title,year) VALUES ($1,$2,$3)",[input.name,input.title,input.year]);
   res.send("succes");
  }catch(err){
    console.log(err.message);
    res.status(500).send(err.message);
  }
});


router.get("/",async(req,res)=>{
   // res.send("hello");
   try{
    const result =await db.query("SELECT * FROM my_table ");
  //  console.log(result.rows);
   res.send(result);
   }catch(err){
     res.status(500).send(err.message);
   }
   
});

//function to get the details with id
async function getDetails(id){
try{
    const result =await db.query("SELECT * FROM my_table WHERE id=$1",[id]);
    return result;
}catch(err){
  console.log(err.message);
}
}
//getting data by id
router.get("/:id",async(req,res)=>{
   // res.send("hello");
   
 //console.log(id);
 
   try{
    const {id}=req.params;
    const result= await getDetails(id);
   //console.log(result.rows);
   res.send(result.rows);
   }catch(err){
     res.status(500).send(err.message);
   }
   
});
//update data by id function
async function updateTheDetails(id,val){
    console.log(id);
    console.log(val);
    try{

      const result =await db.query("UPDATE my_table SET name=$1,title=$2,year=$3 WHERE id=$4",[val.name,val.title,val.year,id]);
      console.log(result);
      return result;
   }catch(err){
    res.status(400).send(err.message);
   }
}

//update the details
router.put("/:id",async(req,res)=>{
     try{
  if(!req.body.name||!req.body.title||!req.body.year){
      res.status(400).send("enter all details");
  }
  // console.log(req.body.name);
  // console.log(req.body.title);
  // console.log(req.body.year);
  const {id}=req.params;
  const result= await updateTheDetails(id,req.body);
   const updateresult =await getDetails(id);
   res.send(updateresult.rows);
  if(!result.rowCount){
    res.status(404).send("not found");
  }
  res.send("success");
}catch(err){
  console.log(err.message);
}
});

//delete data by id
router.delete("/:id",async (req, res)=>{
  try{
    const {id}=req.params;
    const result =await db.query("DELETE FROM my_table WHERE id=$1",[id]);
    if(!result.rowCount){
      res.status(404).send("not found");
    }else{
    res.send("success");
    }
    }catch(err){
      res.status(500).send(err.message);

    }

    
});

export default router;