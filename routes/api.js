const express = require('express');
const router = express.Router();
const Recipe = require('../Models/recipes');

// Get a list of all the recipes from the DB  
router.get('/recipes/all', function(req, res, next){
  Recipe.find({}).then(function(recipe){
    res.send(recipe);
  });
});

// Get a list of recipes from the DB  
router.get('/recipes/:name', function(req, res, next){
  Recipe.find({name: {
    $regex: new RegExp(req.params.name)}}).then(function(recipe){
      res.send({recipe})
  });
});

// Post a new recipe to the DB
router.post('/recipes', function(req, res, next){
  Recipe.create(req.body).then(function(recipe) {
    res.send({recipe});
    const msg = "Recipe has been created"
    console.log(msg);
  }).catch(next);

});

// Update a recipe in the DB
router.put('/recipes/:id', function(req, res, next){
  Recipe.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Recipe.findOne({_id: req.params.id}).then(function(recipe){
      const name = recipe.name;
      console.log(name + " has been update")
      res.send(recipe);
    })
  })
});

// Delete a recipe from the DB
router.delete('/recipes/:id', function(req, res, next){
  Recipe.findOne({_id: req.params.id}).then(function(recipe){
    const name = recipe.name;
    Recipe.findByIdAndRemove({_id: req.params.id}).then(function(recipe){
      console.log(name + " has been deleted");
      res.send(recipe)
    })
  })
});

module.exports = router;