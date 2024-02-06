// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// import Layout from "./Components/Layout";
// import HomePage from "./Components/HomePage/HomePage";
// import LoginSignup from "./Components/login_signup/Loginsignup";
// import ContactPage from "./Components/ContactPage/ContactPage";
// import ErrorPage from './Components/ErrorPage'

// export default function App() {
//   return (
//     <div className='wrapper'>
//       <h1>My Page</h1>
      
//     <BrowserRouter>
//     <nav>
//         <ul>
//           <li><Link to='/home'>Home</Link></li>
//           <li><Link to='/contacts'>Contacts</Link></li>
//           <li><Link to='/login'>login</Link></li>
//           <li><Link to='/*'></Link></li>
//         </ul>
//       </nav>
//     <Switch>
      
//         {/* <Route path="/" element={<Layout />}> */}
//           <Route path='/home'>
//             <HomePage/>
//           </Route>
//           <Route path='/login'>
//             <LoginSignup/>
//           </Route>
//           <Route path='/contacts'>
//             <ContactPage/>
//           </Route>
//           <Route path='*'>
//             <ErrorPage/>
//           </Route>
//         {/* </Route> */}
      
//       </Switch>
//     </BrowserRouter>
//     </div>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);





import { useState } from 'react'

import ExpenseList from './Components/AddExpense/ExpenseList'
import ExpenseFilter from './Components/AddExpense/ExpenseFilter'
import ExpenseForm from './Components/AddExpense/ExpenseForm';

export default function App() {

  const [expenses, setExpenses] = useState([
    { id: 1, description: "2 packs of sugar", amount: 50, category: "groceries" },
    { id: 2, description: "2 packs of biscuit", amount: 60, category: "groceries" },
    { id: 3, description: "Electricity bill", amount: 100, category: "utilities" },
    { id: 4, description: "1 spotify subscription", amount: 30, category: "entertainment" },
    { id: 5, description: "2 boomplay subscription", amount: 30, category: "entertainment" }
  ]);

  const addItem = (data) => {
    console.log(data);
    setExpenses(() => [...expenses, data])
  }

  const deleteItem = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const filterItem = (cat) => {
    setExpenses(expenses.filter(expense => expense.category == cat))
  }

  return (
    <>
      <ExpenseForm addExpense={addItem} />
      <ExpenseFilter filterItem={filterItem} />
      <ExpenseList items={expenses} deleteItem={deleteItem} />

      
    </>
  )
}



