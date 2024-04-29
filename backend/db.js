const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

// pool.query("select * from url.urltable").then((response)=>{
// const {rows}=response;
// console.log(rows);
// }).catch(e=>{
//   console.log("error==>",e.message);
// })
module.exports = pool;

