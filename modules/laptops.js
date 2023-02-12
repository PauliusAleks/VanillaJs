import { balance, setBalance, NOKFormat, updateBankNumbers } from "./bank.js";

const LaptopsElement = document.getElementById("LaptopList");
const LaptopsListElement = document.getElementById("Laptops");
const LaptopPhotoElement= document.getElementById("LaptopPhoto");
const LaptopNameElement= document.getElementById("LaptopName");
const LaptopDescriptionElement= document.getElementById("LaptopDescription");
const LaptopPriceElement= document.getElementById("LaptopPrice");
const BuyNowButtonElement= document.getElementById("BuyNowButton");


let laptops = [];
let selectedLaptop = laptops[0]

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToList(laptops));

const addLaptopsToList = (laptops) => {
    laptops.forEach(laptop => addLaptopToList(laptop));
}

const addLaptopToList = (laptop) => {
    const LaptopElement = document.createElement("option");
    LaptopElement.value = laptop.title;
    LaptopElement.appendChild(document.createTextNode(laptop.title));
    LaptopsElement.appendChild(LaptopElement);
    selectedLaptop = laptops[0];
    getLaptopProperties(laptops[0]);
}

const handleLaptopListChange = e => {
    selectedLaptop = laptops[e.target.selectedIndex];
    getLaptopProperties(selectedLaptop);   
}

const getLaptopProperties = (laptop) =>{
    const selectedLaptopSpecs = laptop.specs;
    LaptopsListElement.innerText = "";
    for(const spec in selectedLaptopSpecs){
        const ilElement = document.createElement("li");
        ilElement.innerText = selectedLaptopSpecs[spec];
        LaptopsListElement.appendChild(ilElement)
    }

    LaptopPhotoElement.setAttribute("src","https://hickory-quilled-actress.glitch.me/" + laptop.image);
    LaptopNameElement.innerText = laptop.title;    
    LaptopDescriptionElement.innerText = laptop.description;   
    LaptopPriceElement.innerText = NOKFormat(laptop.price);   
}

const handleBuyNowButton = () => {
    if(selectedLaptop.stock > 0){
        if(selectedLaptop.price <= balance){
            alert("Congrats champ you have bought this laptop!");
            setBalance(balance - selectedLaptop.price);
            selectedLaptop.stock--;
            updateBankNumbers();
        }else{
            alert("You don't have enough money!")
        }
    } else {
        alert("Out of stock!")
    }
    
}

LaptopsElement.addEventListener("change",handleLaptopListChange)
BuyNowButtonElement.addEventListener("click", handleBuyNowButton)