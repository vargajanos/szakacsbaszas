require('dotenv').config();
const express = require('express');
var cors = require('cors');

const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/categorys');

const app = express();
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes); 
app.use('/recipes', recipeRoutes);
app.use('/categorys', categoryRoutes);





app.listen(port, () => {
  //console.log(process.env) ;
  console.log(`A masinéria megfigyel itten e: ${port}...`);
});

