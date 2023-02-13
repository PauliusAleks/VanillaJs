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
export const handleGetALoan = () => {
    if(!hasLoan){
        let possibleLoan = Number(prompt("The maximum amount you can loan is: " + NOKFormat(balance * 2)))
        if(isValidLoan(possibleLoan)){
            hasLoan = true;
            loan = possibleLoan;
            setBalance(balance + loan)
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
    BalanceElement.innerText = 'User Balance: ' + NOKFormat(balance);
    LoanElement.innerText = hasLoan ? 'Loan: ' + NOKFormat(loan) : "";
}

const NOKFormat = (number) => {
    return new Intl.NumberFormat("eu-EU", {style:"currency", currency:"NOK"}).format(number);
}

export {balance,setBalance, loan, setLoan, hasLoan, setHasLoan, NOKFormat, updateBankNumbers};