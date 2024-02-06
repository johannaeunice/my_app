import { createBrowserRouter, createRoutesFrontElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom';
import HomePage from '../Components/HomePage/HomePage';
import ContactPage from '../Components/ContactPage/ContactPage'
import {LoginSignup} from '../Components/login_signup/Loginsignup'
import {Dashboard} from '../Components/Dashboard/Dashboard'

export default function dar() {
    const router = createBrowserRouter(
        createRoutesFrontElements(
          <Route path='/' element={<Root />}>
                <Route index element={<HomePage/>}/>
                <Route index ={<LoginSignup/>}/>
                <Route index ={<ContactPage/>}/>
                <Route index ={<Dashboard/>}/>
          </Route>
        )
      )

      const Root = () => {
        return (
          <>
            <div>
              <Link to='/'>Home</Link>
              <Link to='/HomePage'>Home Page</Link>
              <Link to='/ContactPage'>Contacts</Link>
            </div>
        
            <div>
              <Outlet/>
            </div>
          </>
        )
        }

    return(
        <div className='root'>
            <RouterProvider router={router}/>
        </div>
    )
}