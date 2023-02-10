const Balance = document.getElementById("UserBalance");
const Loan = document.getElementById("UserLoan");
const TotalBalance = document.getElementById("TotalBalance");
const LoanButton = document.getElementById("GetLoanButton");
const RepayLoanButton = document.getElementById("RepayButton")
const WorkPay = document.getElementById("Pay");
const BankButton = document.getElementById("BankButton");
const WorkButton = document.getElementById("WorkButton");
const LaptopsElement = document.getElementById("LaptopList");
const LaptopsListElement = document.getElementById("Laptops");
const LaptopPhotoElement= document.getElementById("LaptopPhoto");
const LaptopNameElement= document.getElementById("LaptopName");
const LaptopDescriptionElement= document.getElementById("LaptopDescription");
const LaptopPriceElement= document.getElementById("LaptopPrice");
const BuyNowButtonElement= document.getElementById("BuyNowButton");

let balance = 200;
let loan = 0;
let totalBalance = balance + loan;
let pay = 0;
let hasLoan = false;
let laptops = [];
let selectedLaptop = laptops[0]

//Part1###########################################################################################################
const handleGetALoan = () => {
    if(!hasLoan){
        let possibleLoan = Number(prompt("The maximum amount you can loan is: " + balance * 2))
        if(isValidLoan(possibleLoan)){
            hasLoan = true;
            loan = possibleLoan;
            totalBalance = balance + loan;
            updateBankNumbers();
        } else {
            alert("Attempt to take an invalid loan!");
        }
    } else {
        alert("You have to pay the current loan first!");
    }   
}

const isValidLoan = (loan) => loan > 0 && loan <= balance * 2 ? true : false;

const updateBankNumbers = () => {
    totalBalance = balance + loan;
    Balance.innerText = 'User Balance: ' + balance;
    Loan.innerText = 'Loan: ' + loan;
    TotalBalance.innerText = 'Total Balance: ' + totalBalance;
}

//Part2############################################################################################################
const handleWork = () => {
    pay += 100;
    updatePay();
}

const handleBankTransfer = ()=> {
    if(hasLoan){
        alert("You have a loan, 10% of your pay will go to the bank!")
        let payTenPercent = pay/10;
        let payNinetyPercent = pay - pay/10;
        payLoan(payTenPercent);
        balance += payNinetyPercent;
    } else {
        balance += pay;
        pay =0;     
    }
    isLoanZero();
    updateBankNumbers();
    updatePay();
}

const handleRepayLoanTransfer = () => {
    payLoan(pay);
    updateBankNumbers();
    updatePay();
}

const updatePay = () => WorkPay.innerText= "Pay: " + pay;
const isLoanZero =() => loan === 0 ? hasLoan = false : hasLoan = true;

const payLoan = payToBank => {
    if(loan - payToBank <= 0){
        balance += payToBank - loan;
        loan = 0;
        hasLoan = false;
    } else{
        loan -= payToBank;
    }
    pay = 0;
}

const handleShowHideRepayLoanButton = () => {
    hasLoan ? RepayLoanButton.removeAttribute("hidden") : RepayLoanButton.setAttribute("hidden","hidden")
};

//PART3############################################################################################################
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
    LaptopPriceElement.innerText = laptop.price;   
}

//PART4##########################################################################################################
const handleBuyNowButton = () => {
    if(selectedLaptop.price <= totalBalance){
        alert("Congrats champ you have bought this laptop!")
        
        selectedLaptop.stock--;
        updateBankNumbers();
    }else{
        alert("You don't have enough money!")
    }
}

document.onclick = handleShowHideRepayLoanButton
LoanButton.addEventListener("click", handleGetALoan)
WorkButton.addEventListener("click",handleWork)
BankButton.addEventListener("click",handleBankTransfer)
RepayLoanButton.addEventListener("click", handleRepayLoanTransfer)
LaptopsElement.addEventListener("change",handleLaptopListChange)
BuyNowButtonElement.addEventListener("click", handleBuyNowButton)