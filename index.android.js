const express = require('express'); // Load express module
const bodyParser = require('body-parser'); // Load body parser module
const routes = require('./routes/api'); // Load routes
const mongoose = require('mongoose');

const pswd = '51AvMyNBxuuyFLN9';

const uri = "mongodb://najib:" + pswd + "@cluster0-shard-00-00-zzoys.mongodb.net:27017,"
                + "cluster0-shard-00-01-zzoys.mongodb.net:27017,"
                    + "cluster0-shard-00-02-zzoys.mongodb.net:27017/Recipe?"
                        + "ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

const app = express(); // Set up express app



// Connect to mongoDB
mongoose.connect(uri, {   
    useMongoClient: true
});

// var db = mongoose.connection;

mongoose.Promise = global.Promise; // Override mongoose promise as it is deprecated

app.use(express.static('public')); // Return static files from public folder

app.use(bodyParser.json()); // Initialize body parser
app.use('/api', routes); // Initialize routes

// Initialize Error Handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({mistake: err.message});
}); 

// Listen for requests
app.listen(process.env.port || 8000,function(){
    console.log('now listening for requests');
});














// <span className="url">{recipe.obj.url}</span>
// <span classname="dietLabels">{recipe.obj.dietLabels}</span>
// <span className="healthLabels">{recipe.obj.healthLabels}</span>
// <span className="ingredientLines">{recipe.obj.healthLabels}</span>
// <span className="calories">{recipe.obj.calories} kcal</span>