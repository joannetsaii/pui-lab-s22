/*** Object Constructors ***/
function Cat(name, age) {
    this.name = name;
    this.age = age;
    this.image = "cat.jpg";
    this.image_alt = "A cute black and white cat with giant green eyes";
}

function Dog(name, age) {
    this.name = name;
    this.age = age;
    this.image = "dog.jpg"
    this.image_alt = "An adorable little brown and white dog";
}

function Cow(name, age) {
    this.name = name;
    this.age = age;
    this.image = "cow.jpg";
    this.image_alt = "A black and white cow with tags on ears";
}

/*** Global Variables ***/
let animals = [new Cat(), new Dog(), new Cow()];
let names = ["Momo", "Coco", "Ollie", "Harry", "Beck", "Ruby", "Raulph"];

/*** Functions ***/
// get a random index for an array from 0 to maxIndex (not inclusive)
function getRandomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}

// generates a random name from list of names
function generateRandomName() {
    let randomIndex = getRandomIndex(names.length);
    return names[randomIndex];
}

// generates a random age from 0 to 5
function generateRandomAge() {
    return getRandomIndex(5);
}

// generates either a Cat, Dog, or Cow with a random name and random age
function generateRandomAnimal() {
    let randomIdx = getRandomIndex(animals.length);
    let randomAnimal = animals[randomIdx];
  
    if (randomAnimal instanceof Cat) 
    {
      return new Cat(generateRandomName(), generateRandomAge());
    } 
    else if (randomAnimal instanceof Dog) 
    {
      return new Dog(generateRandomName(), generateRandomAge());
    } 
    else if (randomAnimal instanceof Cow) 
    {
      return new Cow(generateRandomName(), generateRandomAge());
    }
}

/*** Document Load ****/
/*** Document Load ****/
function onLoad () {

    // get the savedAnimal in local storage if one exists
    var animal = JSON.parse(localStorage.getItem("savedAnimal"));
  
    //use a boolean to keep track of whether you have saved an animal
    var hasSavedAnimal = false;
  
    // store arrary of animals (up to 5)
    var animal_arr = [];

    //check if the saved animal exists in local storage
    if (animal === null)  // if the animal doesn't exist
    {
      //if there is no saved animal, the button should display the Save Animal text
      document.getElementById("button-storage").textContent = "Save Me";
  
      //if there is no saved animal, we generate one
      animal = generateRandomAnimal();
    } 
    else 
    {
      //if there is a saved animal, the button should display Clear Animal text
      document.getElementById("button-storage").textContent = "Clear Animal";
  
      //change the boolean to note that this animal has been saved
      hasSavedAnimal = true;
    }
  
    // update the page based on the animal properties
    document.getElementById("animal-properties").textContent = animal.name + "  " + animal.age + "years old";
    document.getElementById("animal-img").setAttribute("src", animal.image);
  
  
    document.getElementById("button-storage").addEventListener("click", function() {
      //when we are clearing the animal
      if (hasSavedAnimal) 
      {
        // clear the animal from the local storage
        localStorage.removeItem("savedAnimal");
  
        // if this button was clicked, hide button and show message to user
        document.getElementById("button-storage").style.display = "none";
        document.getElementById("feedback-text").textContent = "Cleared!";
        document.getElementById("feedback-text").style.display = "block";
      }
      //when we are saving the animal
      else 
      {
        // save the animal to the local storage
        localStorage.setItem("savedAnimal", JSON.stringify(animal));

        // push to array
        animal_arr.push(JSON.stringify(animal));
        document.getElementById("animal-list").innerHTML = animal_arr;
        console.log(animal_arr)
  
        // if this button was clicked, hide button and show message to user
        document.getElementById("button-storage").style.display = "none";
        document.getElementById("feedback-text").textContent = "Saved!";
        document.getElementById("feedback-text").style.display = "block";
      }
    });
};
