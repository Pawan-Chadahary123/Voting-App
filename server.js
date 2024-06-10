const { log } = require('console');
const express = require('express')
const app = express();

// require('dotenv').config()

const PORT = process.env.PORT || 3000;




app.listen(PORT , ()=>{
    console.log('listening on port 3000');
})