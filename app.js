/**
 * @description This Constructor defines a Dinosaur object and it's methods
 */
function Dinosaur(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = 'images/' + species.toLowerCase() + '.png';

  // create a method that returns a random fact based off of: weight, height, diet, where, when and fact
  this.generateFact = function () {
    let facts = [
      this.height,
      this.weight,
      this.diet,
      this.where,
      this.when,
      this.fact,
    ];

    let randomFact = facts[Math.floor(Math.random() * facts.length)];
    // Return a random item when runction is called
    return randomFact;
  };
}

// Define a Human Object
function Human(name, height, weight) {
  (this.name = name), (this.height = height), (this.weight = weight);
}

// Create Dinosaur Objects from JSON data - using Fetch.
let arrayOfDinosaurs = [];

fetch('dino.json')
  .then((res) => res.json())
  .then((data) => {
    arrayOfDinosaurs = data.Dinos.map(
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

  // get values and convert from string to integer
  let heightInFeet = parseInt(document.getElementById('feet').value);
  let heightInInches = parseInt(document.getElementById('inches').value);
  let humanWeight = parseInt(document.getElementById('weight').value);

  //Convert height to inches
  let humanHeight = heightInFeet * 12 + heightInInches;

  // return a new Human Object
  return new Human(humanName, humanHeight, humanWeight);
}

// Create Dino Compare Method 1

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

/**
 * @description This function will take parameters from createDisplay and prepare all necessary DOM elements.
 */
function getDisplayInformation(species, url, fact) {
  let dinoDiv = document.createElement('div');
  // Add grid-item class to each div
  dinoDiv.className = 'grid-item';

  // include Species to H3 tag
  let dinoSpecies = document.createElement('h3');
  dinoSpecies.innerText = species;
  dinoDiv.appendChild(dinoSpecies);

  // include Image
  let imageTag = document.createElement('img');
  imageTag.src = url;
  dinoDiv.appendChild(imageTag);

  //include a random fact
  let factTag = document.createElement('p');
  factTag.innerText = fact;
  dinoDiv.appendChild(factTag);

  return dinoDiv;
}

/**
 * @description This function builds the display to the DOM
 */
function createDisplay() {
  for (let dinosaur in arrayOfDinosaurs) {
    let dino = arrayOfDinosaurs[dinosaur];
    let getFact = dino.generateFact();
    let gridItems = getDisplayInformation(dino.species, dino.image, getFact);

    document.getElementById('grid').appendChild(gridItems);
  }
}

/**
 * @description The main function of the application: should take the user input, create a new Human object and call all the comparison functions. This program should only be run when the button is clicked
 */

function programRun(e) {
  e.preventDefault();

  // Store human data
  const humanSubject = makeHumanSubject();

  // Remove the form from the DOM
  document.getElementById('dino-compare').classList.add('hidden');

  // Call tile generation function
  createDisplay();
}

// On button click, run the main function and prepare and display infographic
(function () {
  document.getElementById('btn').addEventListener('click', programRun);
})();
