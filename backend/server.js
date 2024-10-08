require('dotenv').config();
const express = require('express');
var cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT;
const userRoutes = require('./modules/users');
const recipeRoutes = require('./modules/recipes')
const categoryRoutes = require('./modules/category')
const logger = require('./modules/logger')

//const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/category', categoryRoutes);

// log file urites
if (fs.existsSync('api.log')) {
  fs.unlinkSync('api.log')
  logger.notice('Existing log file deleted')
}

app.listen(port, () => {
  
  logger.info(`A masinéria megfigyel itten e: ${port}...`);
});

