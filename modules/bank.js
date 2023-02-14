//Importing Element DOM variables from app.js
import {BalanceElement, LoanElement} from "../app.js"

let balance = 100;
let loan = 0;
let hasLoan = false;

const setBalance = (value) => {
    balance = value;
}
const setLoan = (value) => {
    loan = value;
}
const setHasLoan = (value) => {
    hasLoan = value;
}
//Function to handle Get loan button. Using Export here for learning purposes.
export const handleGetALoan = () => {
    if(!hasLoan){ //if user does not have a loan, it is allowed to take one.
        let possibleLoan = Number(prompt("The maximum amount you can loan is: " + NOKFormat(balance * 2)))// allows number input
        if(isValidLoan(possibleLoan)){ // if input in prompt box is valid. set hasLoan to true and take loan.
            hasLoan = true;
            loan = possibleLoan;
            setBalance(balance + loan)
            updateBankNumbers();
        } else { // alert if loan invalid.
            alert("Attempt to take an invalid loan!");
        }
    } else { // alert if already has loan.
        alert("You have to pay the current loan first!");
    }   
}
//helper function to check if loan is  between 0 to 2 * balance
const isValidLoan = (loan) => loan > 0 && loan <= balance * 2 ? true : false;

//Function to update DOM elements balance and loan.
const updateBankNumbers = () => {
    BalanceElement.innerText = 'User Balance: ' + NOKFormat(balance);
    LoanElement.innerText = hasLoan ? 'Loan: ' + NOKFormat(loan) : "";
}

// Function to format number to European format and NOK currency.
const NOKFormat = (number) => {
    return new Intl.NumberFormat("eu-EU", {style:"currency", currency:"NOK"}).format(number);
}

//Exporting functions used in other modules.
export {balance, setBalance, loan, setLoan, hasLoan, setHasLoan, NOKFormat, updateBankNumbers};