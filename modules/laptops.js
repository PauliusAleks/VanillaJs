import { balance, setBalance, NOKFormat, updateBankNumbers } from "./bank.js"; //Functions from bank.js.
//Importing DOM elements from app.js
import {
LaptopsElement,
LaptopsSpecsElement,
LaptopPhotoElement,
LaptopNameElement,
LaptopDescriptionElement,
LaptopPriceElement
}
from "../app.js"

let laptops = [];
let selectedLaptop = laptops[0] //Initially setting selectedLaptop to first laptop in the laptop list.

//API fetch call to GET all computers from given Endpoint.
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then((response) => { // if response is 200(OK) return data.
        if(response.status === 200){
            return response.json()
        } else {
            throw new Error("An error has occurred!")
        }
    })
    .then(data => laptops = data) //set laptop list equal to the data that is fetched.
    .then(laptops => addLaptopsToList(laptops))//fill DOM Select list with laptops.
    .catch(e=>console.log(e))//log an error if occurs.

//Function to to add laptops to DOM Select list.
const addLaptopsToList = (laptops) => {
    laptops.forEach(laptop => addLaptopToList(laptop)); //call addLaptopToList on each laptop in laptops list.
}

//Function to add a laptop to the DOM select list.
const addLaptopToList = (laptop) => {
    const LaptopElement = document.createElement("option"); //Element in Select
    LaptopElement.value = laptop.title; //Setting its value to laptop's title.
    LaptopElement.appendChild(document.createTextNode(laptop.title)); //Appending title to be the value in laptopElement
    LaptopsElement.appendChild(LaptopElement); //Appending LaptopElement to the Laptops Select List.
    selectedLaptop = laptops[0]; //Setting selected laptop to the first laptop in the laptops list.
    getLaptopProperties(laptops[0]); //Getting laptop properties of the initially selected laptop when the page is rendered.
}

//Function to fetch properties of a laptop
const getLaptopProperties = (laptop) =>{
    LaptopsSpecsElement.innerText = ""; //Setting current content of DOM UL to empty.
    const selectedLaptopSpecs = laptop.specs;//defining object with specs of a laptop
    for(const spec in selectedLaptopSpecs){ // looping through every spec in the list.
        const ilElement = document.createElement("li"); //Creating DOM LI
        ilElement.setAttribute("key",laptop.id); //Setting key of an UL item to laptop's id
        ilElement.innerText = selectedLaptopSpecs[spec]; //Setting DOM LI content to current spec in the loop.
        LaptopsSpecsElement.appendChild(ilElement) //Adding DOM LI to DOM UL
    }
    LaptopPhotoElement.setAttribute("src","https://hickory-quilled-actress.glitch.me/" + laptop.image); //Setting image to laptops URL.
    LaptopNameElement.innerText = laptop.title; //Setting DOM LaptopNameElement text to laptop's title.   
    LaptopDescriptionElement.innerText = laptop.description; //Setting DOM LaptopDescriptionElement text to laptop's description.
    LaptopPriceElement.innerText = NOKFormat(laptop.price); //Setting DOM LaptopPriceElement text to laptop's price with applied format.  
} //Laptop with id=5, has a faulty image.

//Handling selected value change in the DOM Select
export const handleLaptopListChange = e => {
    selectedLaptop = laptops[e.target.selectedIndex];//Using event to target index selected of selected laptop.
    getLaptopProperties(selectedLaptop); //Getting laptop properties to update DOM UL. 
}

//Handling buy now button click
export const handleBuyNowButton = () => {
    if(selectedLaptop.stock > 0){ //if laptop in stock.
        if(selectedLaptop.price <= balance){ //checking if user has enough money.
            alert(`Congratulations, you have bought ${selectedLaptop.title}!`);
            setBalance(balance - selectedLaptop.price); // deduct money from balance.
            selectedLaptop.stock--; // decrease laptop stock property by 1.
            updateBankNumbers(); // Updating numbers in DOM.
        }else{
            alert("You don't have enough money!")
        }
    } else {
        alert("Out of stock!")
    }   
}