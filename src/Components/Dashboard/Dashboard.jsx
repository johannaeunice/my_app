// import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <HelmetProvider>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
            <title>Dashboard</title>
          </head>
        </html>
      </HelmetProvider>

      <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
        <form className="container-fluid">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">Le Nkap</span>
            <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" />
            <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
          </div>
        </form>
      </nav>

      {/* Sidebar */}
  <div className="row">
  <div className="col-md-2 bg-light d-none d-md-block sidebar">
  <div className="left-sidebar">
  <ul className="nav flex-column sidebar-nav">
  <li className="nav-item">
    <a className="nav-link active" href="#">
      {/* // eslint-disable-next-line react/no-unknown-property */}
      <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-Rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-Rule="evenodd"/></svg>
      Expenses
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">
      <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-Rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-Rule="evenodd"/></svg>
      Income
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">
      <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-Rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-Rule="evenodd"/></svg>
      Summary
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">
      <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-Rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-Rule="evenodd"/></svg>
      Savings
    </a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">
      <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-Rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clip-Rule="evenodd"/></svg>
      Contact
    </a>
  </li>
</ul>
  </div>
</div>
  </div>

  {/* Main */}
  <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
  <h3>Candidates</h3>
<hr/>
<div className="table-responsive">
  <table className="table table-primary">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Position</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>Project Manager</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>JS developer</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>Bird</td>
        <td>Back-end developer</td>
      </tr>
      <tr>
        <th scope="row">4</th>
        <td>Martin</td>
        <td>Smith</td>
        <td>Back-end developer</td>
      </tr>
      <tr>
        <th scope="row">5</th>
        <td>Kate</td>
        <td>Mayers</td>
        <td>Scrum master</td>
      </tr>
    </tbody>
  </table>
</div>
<div className="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Invoice #184382</h5>
        <p className="card-text">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
        <a href="#" className="btn btn-primary">Print</a>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Invoice #184386</h5>
        <p className="card-text">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
        <a href="#" className="btn btn-primary">Print</a>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Invoice #184389</h5>
        <p className="card-text">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
        <a href="#" className="btn btn-primary">Print</a>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Invoice #184391</h5>
        <p className="card-text">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
        <a href="#" className="btn btn-primary">Print</a>
      </div>
    </div>
  </div>
</div>
  </main>
</div>
    
  )
}

export default Dashboard