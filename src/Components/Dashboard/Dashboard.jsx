import './Dashboard.css'
import dashboard_icon from '../icons/dashboard.png'
import expense_icon from '../icons/monitoring.png'
import help_icon from '../icons/contact_support.png'
import settings_icon from '../icons/list.png'
import bills_icon from '../icons/payments.png'
import app_icon from '../icons/logo.png'
import account_icon from '../icons/account_circle.png'
import menu_icon from '../icons/menu.png'
import savings_icon from '../icons/savings.png'
import details_icon from '../icons/expand_more.png'


function Dashboard() {
    return (
        <div className="dashboard">
            <div className='top-title'>
                    <div className='left'>
                       <a href='#'>
                        <span>
                        <img src={app_icon}/> Le Nkap
                        </span>
                        </a>     
                    </div>
                    
                    <div className='right'>
                        <a href='#'>
                            <span>
                                Need our help?
                            </span>
                        </a>
                        <a href='#'>
                            <span>
                                Read Our Blog
                            </span>
                        </a>
                        <div className='account'>
                            <img src={account_icon}/>
                            <span>
                                Hi Johanna
                            </span>
                        </div>
                        <span>
                            <img src={menu_icon}/>
                        </span>
                    </div>
                </div>
            <div className="container">
                
                <div className='aside-left'>
                    <div className='top'>
                        <a href='#'>
                    <span>
                            <img src={dashboard_icon} alt="dashboard"/> Dashboard
                        </span>
                        </a>
                        <a href='#'>
                        <span>
                            <img src={bills_icon} alt='Bills & Payments'/> Bills and Payments
                        </span>
                        </a>
                        <a href='#'>
                        <span>
                            <img src={expense_icon} alt='Expenses'/> Expenses
                            <span className='now'>Now</span>
                        </span>
                        </a>
                        <a href='#'>
                        <span>
                            <img src={settings_icon} alt='Settings'/>Settings
                        </span>
                        </a>
                        <a href='#'>
                        <span>
                            <img src={help_icon} alt='Get Help'/> Get Help
                        </span>
                        </a>
                    </div>
                    <div className='bottom'>
                    <span>
                                {/* add img for all rights reserved */}
                                All Rights Reserved 2023-2024
                            </span>
                    </div>
                </div>

                <main>
                    <div className='top'>
                        <div className='box'>
                            <div className="dot">
                            </div>
                            <span>Food & Drinks</span>
                            <div className='amount'>
                                {/* <img src={roupi_icon} */}
                                18,046
                            </div>
                        </div>
                        <div className='box'>
                            <div className="dot">
                            </div>
                            <span>Bills & Payments</span>
                            <div className='amount'>
                                {/* <img src={roupi_icon} */}
                                46,24
                            </div>
                        </div>
                        <div className='box'>
                            <div className="dot">
                            </div>
                            <span>Entertainment</span>
                            <div className='amount'>
                                {/* <img src={roupi_icon} */}
                                2376
                            </div>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='chart-box'>

                        </div>
                    </div>
                </main>

                <aside className='right'>
                    <div className='header'>
                        <span>
                            <img src={savings_icon}/>
                            Your transaction History
                        </span>
                    </div>
                    <span className='line'></span>
                    <div className='data'>
                        <div className='item'>
                            <button>
                                <img src={bills_icon}/>
                            </button>
                            <span className='title'>Burger King</span>
                            <span className='date'>11th Dec 2017, Monday</span>
                            <div className='amount'>
                                <span className='red'>
                                {/* <img src={roupi_icon} */} 3,197
                                </span>
                            </div>
                            <img src={details_icon}/>
                        </div>
                        <span className='line'></span>
                        <div className='item'>
                            <button>
                                <img src={bills_icon}/>
                            </button>
                            <span className='title'>Arun Payment</span>
                            <span className='date'>11th Dec 2017, Monday</span>
                            <div className='amount'>
                                <span className='green'>
                                {/* <img src={roupi_icon} */} 20,000
                                </span>
                            </div>
                            <img src={details_icon}/>
                        </div>
                        <span className='line'></span>
                        <div className='item'>
                            <button>
                                <img src={bills_icon}/>
                            </button>
                            <span className='title'>PVR Forum</span>
                            <span className='date'>11th Dec 2017, Monday</span>
                            <div className='amount'>
                                <span className='red'>
                                {/* <img src={roupi_icon} */} 2,197
                                </span>
                            </div>
                            <img src={details_icon}/>
                        </div>
                        <span className='line'></span>
                        <div className='item'>
                            <button>
                                <img src={bills_icon}/>
                            </button>
                            <span className='title'>Mc Donald s, HSR</span>
                            <span className='date'>11th Dec 2017, Monday</span>
                            <div className='amount'>
                                <span>
                                {/* <img src={roupi_icon} */} 3,103
                                </span>
                            </div>
                            <img src={details_icon}/>
                        </div>
                        <span className='line'></span>
                    </div>
                    <div className='bottom'>
                        <span className='line'></span>
                        <img src={expense_icon}/>
                        <span>Missing Transaction ?</span>
                        <div className='btn'>
                            <button>
                                ADD NEW
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Dashboard;