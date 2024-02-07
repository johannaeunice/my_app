import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
// import Dashboard from './Components/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Router>   */}
     <App/>
     {/* <Dashboard/> */}
    {/* </Router> */}
    {/* <RouterProvider router={router}/> */}
    
  </React.StrictMode>,
)
