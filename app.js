// Define a Dinosaur Constructor.
function Dinosaur(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = 'images/' + species.toLowerCase() + '.png';
}

// Define a Human Object
function Human(name, height, weight) {
  (this.name = name), (this.height = height), (this.weight = weight);
}

// Create Dinosaur Objects from JSON data.
let arrayOfSubjects = [];

fetch('dino.json')
  .then((res) => res.json())
  .then((data) => {
    arrayOfSubjects = data.Dinos.map(
      (dino) =>
        new Dinosaur(
          dino.species,
          dino.weight,
          dino.height,
          dino.diet,
          dino.where,
          dino.when,
          dino.fact
        )
    );
  });

// Define a function to collect Human Data and return a new Human Object
function makeHumanSubject() {
  let humanName = document.getElementById('name').value;

  // convert values from string to integer
  let heightInFeet = parseInt(document.getElementById('feet').value);
  let heightInInches = parseInt(document.getElementById('inches').value);
  let humanWeight = parseInt(document.getElementById('weight').value);

  //Convert height to inches
  let humanHeight = heightInFeet * 12 + heightInInches;

  // return a new Human Object
  return new Human(humanName, humanHeight, humanWeight);
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// The main function of the application should take the user input, create a new Human object and call all the comparison functions. This program should only be run when the button is clicked
function programRun(e) {
  e.preventDefault();

  const humanSubject = makeHumanSubject();
  console.log(arrayOfSubjects);
}

// On button click, run the main function and prepare and display infographic
(function () {
  document.getElementById('btn').addEventListener('click', programRun);
})();
