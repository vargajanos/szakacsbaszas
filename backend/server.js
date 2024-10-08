require('dotenv').config();
const express = require('express');
var cors = require('cors');
const fs = require("fs");

const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/categorys');
const logger = require('./routes/logger')

const app = express();
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes); 
app.use('/recipes', recipeRoutes);
app.use('/categorys', categoryRoutes);

// clear log file
if(fs.existsSync("api.log")){
  fs.unlinkSync("api.log")
  logger.notice("Existing log file deleted on server start.")
}



app.listen(port, () => {
  //console.log(process.env) ;
  logger.moka(`A masinéria megfigyel itten e: ${port}...`);
});

