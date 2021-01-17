/**
 * @description This Constructor defines a Dinosaur object
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
}

/**
 * @description This Constructor defines a Human Object
 */
function Human(name, height, weight, diet) {
  (this.name = name),
    (this.height = height),
    (this.weight = weight),
    (this.diet = diet);
  this.image = 'images/human.png';
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
 *@description This function will collect Human data from the input form and return a new Human Object
 */
function getHumanData() {
  const humanName = document.getElementById('name').value;

  const humanHeight =
    Number(document.getElementById('inches').value) +
    Number(document.getElementById('feet').value) * 12;

  const humanWeight = Number(document.getElementById('weight').value);

  const humanDiet = document.getElementById('diet').value.toLowerCase();

  // return a new Human Object
  return new Human(humanName, humanHeight, humanWeight, humanDiet);
}

// Create Dino Compare Method 1 -
/**
 *@description This function compares a Humans weight to that of a dinosaur. If getRandomFact returns weight this function will be called.
 */
function compareWeight(dinosaur) {
  // get human weight from object
  const humanWeight = Number(getHumanData().weight);
  const timesHeavier = Math.round(dinosaur.weight / humanWeight);

  //compare humans weight to dino's weight
  if (humanWeight > dinosaur.weight) {
    return `WOW! You weigh more than a ${dinosaur.species}`;
  } else if (humanWeight < dinosaur.weight) {
    return `${dinosaur.species} was ${timesHeavier} times heavier than you!`;
  } else {
    return `Amazing! Somehow you and ${dinosaur.species} are the same height!`;
  }
}

/**
 * @description This function compares a Humans height with that of the dinosaur Object.
 */
function compareHeight(dinosaur) {
  // get human height from object
  const getHumanHeight = getHumanData().height;

  // give an approximation of difference
  const heightDifference = Math.floor((dinosaur.height - getHumanHeight) / 12);

  if (dinosaur.height > getHumanHeight) {
    return `${dinosaur.species} was ${heightDifference} times taller than you!`;
  } else if (dinosaur.height < getHumanHeight) {
    return `You are taller than a ${dinosaur.species}`;
  } else {
    return `Amazing! You and ${dinosaur.species} are the same height!`;
  }
}

/**
 * @description This function compares a Humans selected diet with that of the dinosaur Object.
 */
function compareDiet(dinosaur) {
  // get human diet from object
  const getHumanDiet = getHumanData().humanDiet;

  if (dinosaur.diet === getHumanDiet) {
    return `${dinosaur.species} had a ${dinosaur.diet} diet, just like you`;
  } else {
    return `${dinosaur.species} had a ${dinosaur.diet} diet.`;
  }
}

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

  for (let index in displayArray) {
    let subject = displayArray[index];
    //Run comparisions and generate a fact array
    const factsArray = [
      subject.fact,
      compareWeight(subject),
      compareHeight(subject),
      compareDiet(subject),
    ];
    //check for human data
    if (!subject.species) {
      // append human info to display
      let humanDiv = document.createElement('div');
      humanDiv.className = 'grid-item';

      let humanHeader = document.createElement('h3');
      humanHeader.innerText = 'Human';
      humanDiv.appendChild(humanHeader);

      let humanImage = document.createElement('img');
      humanImage.src = subject.image;
      humanDiv.appendChild(humanImage);

      let humanName = document.createElement('p');
      humanName.innerText = subject.name;
      humanDiv.appendChild(humanName);

      document.getElementById('grid').appendChild(humanDiv);
    } else {
      let getFact = factsArray[Math.floor(Math.random() * factsArray.length)];
      // Check for Pigeon Species
      if (subject.species === 'Pigeon' && subject instanceof Dinosaur) {
        getFact = subject.fact;
      }
      let gridItems = prepareDinoDisplay(
        subject.species,
        subject.image,
        getFact
      );
      document.getElementById('grid').appendChild(gridItems);
    }
  }
  const resetBtn = document.getElementById('reset-btn');
  resetBtn.style.display = 'inline-block';
}

function appReset() {
  document.getElementById('grid').innerHTML = '';
  document.getElementById('reset-btn').style.display = 'none';
  document.getElementById('dino-compare').classList.remove('hidden');
  document.getElementById('dino-compare').reset();
  arrayOfDinosaurs.splice(4, 1);
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
  document.getElementById('reset-btn').addEventListener('click', appReset);
})();
