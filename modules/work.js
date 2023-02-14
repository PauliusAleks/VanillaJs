//JavaScript file for work handling work operations:
//Importing variables and functions from bank.js.
import {balance, setBalance, loan, setLoan, hasLoan, setHasLoan, NOKFormat, updateBankNumbers} from "./bank.js";
//Importing Element variables from app.js
import {RepayLoanButtonElement,PayElement} from "../app.js"

let pay = 0;

//sets pay to a given value
const setPay = (value) =>{
    pay = value;
}

//checks if loan is zero, if it is sets hasLoan variable to false, otherwise true.
const isLoanZero =() => loan === 0 ? setHasLoan(false) : setHasLoan(true);

//function to add 100 to the pay.
export const handleWork = () => {
    setPay(pay + 100);
    updatePay();
}

//function to handle bank transfer. If user has loan, deducts loan by 10% of pay and 90% goes to the user.
export const handleBankTransfer = ()=> {
    if(hasLoan){
        alert("You have a loan, 10% of your pay will go to the bank!")
        let payTenPercent = pay/10;
        let payNinetyPercent = pay - payTenPercent;
        payLoan(payTenPercent);
        setBalance(balance + payNinetyPercent);
    } else { // if user does not have any loan, transfers pay to the user.
        setBalance(balance + pay);
        setPay(0);    
    }
    isLoanZero(); // checks whether the loan is still zero after transferring.
    updateBankNumbers();//updates DOM.
    updatePay();//updates DOM.
}

//function to deduct all of the pay from the loan.
export const handleRepayLoanTransfer = () => {
    payLoan(pay);
    updateBankNumbers();
    updatePay();
}

//updates the pay number.
const updatePay = () => PayElement.innerText= "Pay: " + NOKFormat(pay);

//function to pay loan.
const payLoan = payToBank => {
    if(loan - payToBank <= 0){ //if pay covers loan, set it to zero and transfer rest to the user.
        setBalance(balance + payToBank - loan);
        setLoan(0);
        setHasLoan(false);
    } else{ // if does not cover loan, deduct pay from the loan.
        setLoan(loan - payToBank);
    }
    setPay(0);
}

// function to show or hide the Repay Loan button. Hidden if user does not have loan.
export const handleShowHideRepayLoanButton = () => {
    hasLoan ? RepayLoanButtonElement.removeAttribute("hidden") : RepayLoanButtonElement.setAttribute("hidden","hidden")
};