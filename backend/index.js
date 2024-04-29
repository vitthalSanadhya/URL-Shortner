const express = require('express');
const app = express();
const cors = require("cors");
const { idToShortURL } = require('./algorithm');
const dns = require('dns');
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body
 
// get all URLS and data GET 
app.get("/urls", async (req, res) => {
  console.log(req.headers.host);
    try {
    //   const { org_url } = req.body;
      const newURL = await pool.query(
        "SELECT * FROM urltable ",
      );
      console.log(newURL)
  
      res.json(newURL.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  // conversion endpoint GET
  app.get("/convert",async (req,res)=>{
    let {url} =req.query;
    let host =req.get("host")

    try{
        const existingURL = await pool.query(
            `SELECT short_url FROM urltable WHERE org_url= $1 `,[`${url}`]
          );
          console.log("==",existingURL.rows)
        
          if(existingURL.rows.length==0){
            await pool.query(`INSERT INTO urltable (org_url) values ($1)`,[`${url}`]);
            const data=await pool.query(
                `SELECT url_id FROM urltable WHERE org_url = $1 `,[`${url}`]
              );
              let id=data.rows[0].url_id;
              console.log("-->>",id);
              let shortUrl=idToShortURL(id);
              console.log("-->>",shortUrl);
                await pool.query(
                    `UPDATE urltable SET short_url=$1 WHERE url_id=$2 `,[`${shortUrl}`,`${id}`]
                ); 
                return res.status(200).json({
                    success:true,
                    shortUrl,
                    host:req.headers.host
                })
            
          }
          else{
            let shortUrl =await pool.query(
                `Select short_url from urltable  where org_url=$1 `,[`${url}`]
            ); 
            let val=shortUrl.rows[0].short_url;
            return res.status(200).json({
                success:true,
                shortUrl:val,
                host:req.headers.host
            });
          }
        }
catch(e){
    console.log(e.message);
    res.status(502).json({
        success:false,
        msg:"something went wrong"
    })

}
    
  });

  app.get("/:url",async (req,res)=>{
    const {url}=req.params;
    try{
      let orgURL =await pool.query(
        `Select org_url from urltable  where short_url=$1 `,[`${url}`]
    ); 
    let actualUrl=orgURL.rows[0].org_url;
      console.log("/:url route -> url , result ",actualUrl);
      return res.redirect(actualUrl);   
    
    }

    catch(e){
      console.log("error ->",e.message);
      res.json({
        msg:"something went wrong please try again later or check your url if it exists"
      })
    }
   
  })


app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
