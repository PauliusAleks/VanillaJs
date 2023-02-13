import {balance, setBalance, loan, setLoan, hasLoan, setHasLoan, NOKFormat, updateBankNumbers} from "./bank.js";

const RepayLoanButtonElement = document.getElementById("RepayButton")
const PayElement = document.getElementById("Pay");
const BankButtonElement = document.getElementById("BankButton");
const WorkButtonElement = document.getElementById("WorkButton");

let pay = 0;

const setPay = (value) =>{
    pay = value;
}

const isLoanZero =() => loan === 0 ? setHasLoan(false) : setHasLoan(true);

const handleWork = () => {
    setPay(pay + 100);
    updatePay();
}

const handleBankTransfer = ()=> {
    if(hasLoan){
        alert("You have a loan, 10% of your pay will go to the bank!")
        let payTenPercent = pay/10;
        let payNinetyPercent = pay - payTenPercent;
        payLoan(payTenPercent);
        setBalance(balance + payNinetyPercent);
    } else {
        setBalance(balance + pay);
        setPay(0);    
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

const updatePay = () => PayElement.innerText= "Pay: " + NOKFormat(pay);

const payLoan = payToBank => {
    if(loan - payToBank <= 0){
        setBalance(balance + payToBank - loan);
        setLoan(0);
        setHasLoan(false);
    } else{
        setLoan(loan - payToBank);
    }

    setPay(0);
}

const handleShowHideRepayLoanButton = () => {
    hasLoan ? RepayLoanButtonElement.removeAttribute("hidden") : RepayLoanButtonElement.setAttribute("hidden","hidden")
};

document.onclick = handleShowHideRepayLoanButton

WorkButtonElement.addEventListener("click",handleWork)
BankButtonElement.addEventListener("click",handleBankTransfer)
RepayLoanButtonElement.addEventListener("click", handleRepayLoanTransfer)