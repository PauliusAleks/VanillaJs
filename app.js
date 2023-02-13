import {handleGetALoan} from "./modules/bank.js"
import {handleShowHideRepayLoanButton, handleBankTransfer, handleWork, handleRepayLoanTransfer} from "./modules/work.js"
import {handleLaptopListChange, handleBuyNowButton} from "./modules/laptops.js"

//Bank
export const BalanceElement = document.getElementById("UserBalance");
export const LoanElement = document.getElementById("UserLoan");
export const LoanButtonElement = document.getElementById("GetLoanButton");

//Work
export const RepayLoanButtonElement = document.getElementById("RepayButton")
export const PayElement = document.getElementById("Pay");
export const BankButtonElement = document.getElementById("BankButton");
export const WorkButtonElement = document.getElementById("WorkButton");

//Laptops
export const LaptopsElement = document.getElementById("LaptopList");
export const LaptopsListElement = document.getElementById("Laptops");
export const LaptopPhotoElement= document.getElementById("LaptopPhoto");
export const LaptopNameElement= document.getElementById("LaptopName");
export const LaptopDescriptionElement= document.getElementById("LaptopDescription");
export const LaptopPriceElement= document.getElementById("LaptopPrice");
export const BuyNowButtonElement= document.getElementById("BuyNowButton");


//Bank
LoanButtonElement.addEventListener("click", handleGetALoan);

//Work
document.onclick = handleShowHideRepayLoanButton
WorkButtonElement.addEventListener("click",handleWork)
BankButtonElement.addEventListener("click",handleBankTransfer)
RepayLoanButtonElement.addEventListener("click", handleRepayLoanTransfer)

//Laptops
LaptopsElement.addEventListener("change",handleLaptopListChange)
BuyNowButtonElement.addEventListener("click", handleBuyNowButton)