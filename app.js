/**
 * @description This Constructor defines a Dinosaur object and it's methods
 */
function Dinosaur(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = `I weighed about ${weight} pounds!`;
  this.height = height;
  this.diet = `I am a ${diet}`;
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
    // Return a random item when function is called
    return randomFact;
  };
}

// Define a Human Object
function Human(name, height, weight) {
  (this.name = name),
    (this.height = height),
    (this.weight = weight),
    (this.image = 'images/human.png');
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

/**
 *@description This function will collection Human data and return a new Human Object
 */
function getHumanData() {
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

/**
 *@description This function will take Human Data and append to the dom as necessary.
 */
// Create Dino Compare Method 1

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

/**
 * @description This function will take parameters from createDisplay and prepare all necessary DOM elements.
 */
function prepareDinoDisplay(species, url, fact) {
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
 * @description This function builds the display to the DOM. Gets information for both Dinos and Humans.
 */
function createDisplay(subject) {
  // should take the dinosaur data and add the human data to index 4
  let displayArray = arrayOfDinosaurs;
  displayArray.splice(4, 0, subject);

  for (let object in displayArray) {
    let subject = displayArray[object];
    if (!subject.species) {
      // append human info to display
      let humanDiv = document.createElement('div');
      humanDiv.className = 'grid-item';

      let humanHeader = document.createElement('h3');
      humanHeader.innerText = 'Human';
      humanDiv.appendChild(humanHeader);

      let humanImage = document.createElement('img');
      humanImage.src = '/images/human.png';
      humanDiv.appendChild(humanImage);

      let humanName = document.createElement('p');
      humanName.innerText = subject.name;
      humanDiv.appendChild(humanName);

      document.getElementById('grid').appendChild(humanDiv);
    } else {
      // This will prepare the dinosaur display
      let getFact = subject.generateFact();
      let gridItems = prepareDinoDisplay(
        subject.species,
        subject.image,
        getFact
      );
      document.getElementById('grid').appendChild(gridItems);
    }
  }
  // for (let dinosaur in arrayOfDinosaurs) {
  //   let dino = arrayOfDinosaurs[dinosaur];
  //   let getFact = dino.generateFact();
  //   let gridItems = getDisplayInformation(dino.species, dino.image, getFact);

  //   document.getElementById('grid').appendChild(gridItems);
  // }
}

/**
 * @description The main function of the application: should take the user input, create a new Human object and call all the comparison functions. This program should only be run when the button is clicked.
 */

function programRun(e) {
  e.preventDefault();

  // Collect Human Data
  const humanSubject = getHumanData();

  // Remove the form from the DOM
  document.getElementById('dino-compare').classList.add('hidden');

  // Call tile generation function
  createDisplay(humanSubject);
}

// IIFE: On button click, run the main function and prepare and display infographic
(function () {
  document.getElementById('btn').addEventListener('click', programRun);
})();
