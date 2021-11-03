//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////////////adding budget to local storage ////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
const budgetSubmitBtnElem = document.querySelector('#budget-submit');

budgetSubmitBtnElem.addEventListener('click', (e) => {

  e.preventDefault();
  const budgetInputElem = document.querySelector('#budget-input');
  const budget = localStorage.getItem('budget');
  if (budget == null) {
    budgetArray = [];
  }
  else {
    budgetArray = JSON.parse(budget);
  }

  if (budgetInputElem.value != '') {
    budgetArray[0] = budgetInputElem.value;
    localStorage.setItem('budget', JSON.stringify(budgetArray));
    budgetInputElem.value = '';
  }
  else {
    alert(`dudget can't be blank`);
  }
  displayExpance();
  displayBEB();

  // console.log(typeof (budgetInputElem.value));

});

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////adding expance to local storage and display it////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

const expanceSubmitElem = document.querySelector('#expense-submit');
expanceSubmitElem.addEventListener('click', (e) => {
  e.preventDefault();
  const expanceInputElem = document.querySelector('#expense-input');
  const amountInputElem = document.querySelector('#amount-input');
  const expence = localStorage.getItem('expance');
  if (expence == null) {
    expanceArray = [];
  }
  else {
    expanceArray = JSON.parse(expence);
  }

  let expancetObj = {
    expanceName: expanceInputElem.value,
    expanceAmount: amountInputElem.value
  }

  expanceArray.push(expancetObj);
  localStorage.setItem('expance', JSON.stringify(expanceArray));

  expanceInputElem.value = '';
  amountInputElem.value = '';
  displayExpance();
  displayBEB();
  // console.log(,)
})

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////calculating sum of all expances////////////////////
/////////////////// returning total expances       ////////////////////
//////////////////////////////////////////////////////////////////////

function expanceTotal() {
  const expance = localStorage.getItem('expance');
  if (expance == null) {
    expanceArray = [];
  }
  else {
    expanceArray = JSON.parse(expance);
  }

  let totalExpanceAmount = 0;
  expanceArray.forEach((element, index) => {
    let totalAmountInInt = parseInt(expanceArray[index].expanceAmount);
    totalExpanceAmount += totalAmountInInt;
  })

  return totalExpanceAmount;

}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////returning total budget/////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function tottaBudget() {
  const budget = localStorage.getItem('budget');
  if (budget == null) {
    budgetArray = [];
  }
  else {
    budgetArray = JSON.parse(budget);
  }
  return budgetArray[0];
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////returning total remaining balance /////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function remainingBalance() {
  return tottaBudget() - expanceTotal();
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////display expance data          /////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
displayExpance();
function displayExpance() {
  const expance = localStorage.getItem('expance');
  if (expance == null) {
    expanceArray = [];
  }
  else {
    expanceArray = JSON.parse(expance);
  }

  let html = '';

  expanceArray.forEach((element, index) => {
    html +=
      `
    <div class="expance">
    <div class="expense-item d-flex justify-content-between align-items-baseline">

        <h6 class="expense-title mb-0 text-uppercase list-item">- ${element.expanceName}</h6>
        <h5 class="expense-amount mb-0 list-item">$${element.expanceAmount}</h5>

        <div class="expense-icons list-item">

            <a href="#" class="edit-icon mx-2" onclick="editExpances(${index})">
                <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete-icon" onclick="deleteExpence(${index})">
                <i class="fas fa-trash"></i>
            </a>
        </div>
    </div>
</div>

    `;
  })

  let expanceContainerElem = document.querySelector('.expance');
  expanceContainerElem.innerHTML = html;
  displayBEB();
  // console.log(expanceContainerElem);
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////display budget expance balance /////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
displayBEB();
function displayBEB() {
  let totalBudgetElem = document.querySelector('#budget-amount');
  let totalExpanceElem = document.querySelector('#expense-amount');
  let remainingBalanceElem = document.querySelector('#balance-amount');

  totalBudgetElem.innerText = tottaBudget();
  totalExpanceElem.innerText = expanceTotal();
  remainingBalanceElem.innerText = remainingBalance();


  // console.log();

}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////deliting expances             /////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function deleteExpence(index) {
  const expance = localStorage.getItem('expance');
  if (expance == null) {
    expanceArray = [];
  }
  else {
    expanceArray = JSON.parse(expance);
  }

  expanceArray.splice(index, 1);
  localStorage.setItem('expance', JSON.stringify(expanceArray));
  displayExpance();
  displayBEB();
  console.log(index);
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////editing expances             /////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function editExpances(index) {
  let hiddenInputElem = document.querySelector('#hidden');
  let updateBtnElem = document.querySelector('#update-submit')
  updateBtnElem.style.display = 'block';
  expanceSubmitElem.style.display = 'none';
  const expanceInputElem = document.querySelector('#expense-input');
  const amountInputElem = document.querySelector('#amount-input');
  const expance = localStorage.getItem('expance');
  if (expance == null) {
    expanceArray = [];
  }
  else {
    expanceArray = JSON.parse(expance);
  }

  expanceInputElem.value = expanceArray[index].expanceName;
  amountInputElem.value = expanceArray[index].expanceAmount;
  hiddenInputElem.value = index;
  // console.log(hiddenInputElem, index);
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////updating expances             /////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

let updateBtnElem = document.querySelector('#update-submit');
updateBtnElem.addEventListener('click', (e) => {

  e.preventDefault();
  const expanceInputElem = document.querySelector('#expense-input');
  const amountInputElem = document.querySelector('#amount-input');
  let hiddenInputElemValue = document.querySelector('#hidden').value;
  const expance = localStorage.getItem('expance');
  if (expance == null) {
    expanceArray = [];
  }
  else {
    expanceArray = JSON.parse(expance);
  }

  expanceArray[hiddenInputElemValue].expanceName = expanceInputElem.value;
  expanceArray[hiddenInputElemValue].expanceAmount = amountInputElem.value;

  localStorage.setItem('expance', JSON.stringify(expanceArray));
  expanceInputElem.value = '';
  amountInputElem.value = '';
  updateBtnElem.style.display = 'none';
  expanceSubmitElem.style.display = 'block';
  displayExpance();
  displayBEB();
  // console.log(expanceArray[hiddenInputElemValue].expanceName);


})






// class UI {
//   constructor() {
//     this.budgetFeedback = document.querySelector(".budget-feedback");
//     this.expenseFeedback = document.querySelector(".expense-feedback");
//     this.budgetForm = document.getElementById("budget-form");
//     this.budgetInput = document.getElementById("budget-input");
//     this.budgetAmount = document.getElementById("budget-amount");
//     this.expenseAmount = document.getElementById("expense-amount");
//     this.balance = document.getElementById("balance");
//     this.balanceAmount = document.getElementById("balance-amount");
//     this.expenseForm = document.getElementById("expense-form");
//     this.expenseInput = document.getElementById("expense-input");
//     this.amountInput = document.getElementById("amount-input");
//     this.expenseList = document.getElementById("expense-list");
//     this.itemList = [];
//     this.itemID = 0;
//   }

//   //submit budget method
//   submitBudgetForm(){
//       const value = this.budgetInput.value;
//       if(value === '' || value < 0){
//         this.budgetFeedback.classList.add('showItem');
//         this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
//         const self = this;
//         setTimeout(function(){
//           self.budgetFeedback.classList.remove('showItem');
//         }, 3000);
//       } else {
//         this.budgetAmount.textContent = value;
//         this.budgetInput.value = '';
//         this.showBalance();
//       }
//   }

//   //show balance
//   showBalance(){
//     const expense = this.totalExpense();
//     const total = parseInt(this.budgetAmount.textContent) - expense;
//     this.balanceAmount.textContent = total;
//     if(total < 0){
//       this.balance.classList.remove('showGreen', 'showBlack');
//       this.balance.classList.add('showRed');
//     } else if(total > 0){
//       this.balance.classList.remove('showRed', 'showBlack');
//       this.balance.classList.add('showGreen');
//     } else if(total === 0){
//       this.balance.classList.remove('showRed', 'showGreen');
//       this.balance.classList.add('showBlack');
//     }
//   }
//   //submit expense form
//   submitExpenseForm(){
//     const expenseValue = this.expenseInput.value;
//     const amountValue = this.amountInput.value;
//     if(expenseValue === '' || amountValue === '' || amountValue < 0){
//       this.expenseFeedback.classList.add('showItem');
//       this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
//       const self = this;
//       setTimeout(function(){
//         self.expenseFeedback.classList.remove('showItem');
//       }, 3000)
//     } else {
//       let amount = parseInt(amountValue);
//       this.expenseInput.value = '';
//       this.amountInput.value = '';

//       let expense = {
//         id: this.itemID,
//         title: expenseValue,
//         amount: amount
//       }
//       this.itemID++;
//       this.itemList.push(expense);
//       this.addExpense(expense);
//       this.showBalance();

//     }
//   }

//   //add expense
//   addExpense(expense){
//     const div = document.createElement('div');
//     div.classList.add('expense');
//     div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

//     <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
//     <h5 class="expense-amount mb-0 list-item">$${expense.amount}</h5>

//     <div class="expense-icons list-item">

//      <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
//       <i class="fas fa-edit"></i>
//      </a>
//      <a href="#" class="delete-icon" data-id="${expense.id}">
//       <i class="fas fa-trash"></i>
//      </a>
//     </div>
//    </div`;
//    this.expenseList.appendChild(div);
//   }

//   //total expense
//   totalExpense(){
//     let total = 0;
//     if(this.itemList.length > 0){
//       total = this.itemList.reduce(function(acc, curr){
//         acc += curr.amount;
//         return acc;
//       }, 0)
//     } 
//     this.expenseAmount.textContent = total;
//     return total;
//   }

//   //edit expense
//   editExpense(element){
//     let id = parseInt(element.dataset.id);
//     let parent = element.parentElement.parentElement.parentElement;
//     //remove from DOM
//     this.expenseList.removeChild(parent);
//     //remove from the list
//     let expense = this.itemList.filter(function(item){
//       return item.id === id;
//     })
//     //show values
//     this.expenseInput.value = expense[0].title;
//     this.amountInput.value = expense[0].amount;
//     //remove from the list
//     let tempList = this.itemList.filter(function(item){
//       return item.id !== id;
//     })
//     this.itemList = tempList;
//     this.showBalance();
//   }

//   //delete expense
//   deleteExpense(element){
//     let id = parseInt(element.dataset.id);
//     let parent = element.parentElement.parentElement.parentElement;
//     //remove from DOM
//     this.expenseList.removeChild(parent);
//     //remove from the list
//     let tempList = this.itemList.filter(function(item){
//       return item.id !== id;
//     })
//     this.itemList = tempList;
//     this.showBalance();
//   }
// }

// function eventListeners(){
//   const budgetForm = document.getElementById('budget-form');
//   const expenseForm = document.getElementById('expense-form');
//   const expenseList = document.getElementById('expense-list');

//   //new instance of UI Class
//   const ui = new UI();

//   //budget form submit
//   budgetForm.addEventListener('submit', function(event){
//     event.preventDefault();
//     ui.submitBudgetForm();
//   })
//   //expense form submit
//   expenseForm.addEventListener('submit', function(event){
//     event.preventDefault();
//     ui.submitExpenseForm();

//   })
//   //expense list submit
//   expenseList.addEventListener('click', function(event){
//     if (event.target.parentElement.classList.contains('edit-icon')){
//       ui.editExpense(event.target.parentElement);
//     }else if (event.target.parentElement.classList.contains('delete-icon')){
//       ui.deleteExpense(event.target.parentElement);
//     }
//   })
// }

// document.addEventListener('DOMContentLoaded', function(){
//   eventListeners();
// })