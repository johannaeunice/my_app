import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import HomePage from './Components/HomePage/HomePage';
// import Paths from './Components/Routes';
import Dashboard from './Components/Dashboard/Dashboard';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Dashboard/>
      {/* <HomePage/> */}
      {/* <Paths/> */}
    </Router>
    {/* <RouterProvider router={router}/> */}
    
  </React.StrictMode>,
)
