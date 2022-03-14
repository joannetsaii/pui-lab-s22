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
    this.image = "bird.jpg";
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
function onLoad() {
    // generate a random animal when the document opens
    let animal = generateRandomAnimal();
    console.log(animal)
    // update the page based on the animal properties
    document.getElementById("animal-properties").textContent = animal.name + "  " + animal.age + "years old";
    let imageTag = document.getElementById("animal-img");
    imageTag.setAttribute("src", animal.image);
    imageTag.setAttribute("alt", animal.image_alt);
}

