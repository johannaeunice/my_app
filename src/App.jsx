import { useState } from 'react'
import ExpenseList from './Components/AddExpense/ExpenseList'
import ExpenseFilter from './Components/AddExpense/ExpenseFilter'
import ExpenseForm from './Components/AddExpense/ExpenseForm';

function App() {

  const [expenses, setExpenses] = useState([
    {id:1, description:"2 packs of sugar", amount:50, category:"groceries"},
    {id:2, description:"2 packs of biscuit", amount:60, category:"groceries"},
    {id:3, description:"Electricity bill", amount:100, category:"utilities"},
    {id:4, description:"1 spotify subscription", amount:30, category:"entertainment"},
    {id:5, description:"2 boomplay subscription", amount:30, category:"entertainment"}
]);

const addItem=(data)=>{
  console.log(data);
  setExpenses(()=>[...expenses, data])
}

const deleteItem=(id)=>{
  setExpenses(expenses.filter(expense => expense.id !== id))
}

const filterItem = (cat) => {
  setExpenses(expenses.filter(expense => expense.category == cat))
}

  return (
    <>
    <ExpenseForm addExpense = {addItem}/>
      <ExpenseFilter filterItem = {filterItem}/>
      <ExpenseList items = {expenses} deleteItem = {deleteItem}/>

    </>
  )
}

export default App