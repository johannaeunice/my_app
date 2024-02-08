import React from 'react';
import { Line, Pie } from 'react-chartjs-2';

class ExpenseTrackerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Example data for charts
            lineChartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Expenses',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            },
            pieChartData: {
                labels: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Others'],
                datasets: [
                    {
                        label: 'Expenses by Category',
                        data: [300, 50, 100, 150, 200],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                    },
                ],
            },
        };
    }

    render() {
        return (
            <div>
                <h2>Expense Tracker Dashboard</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '50%' }}>
                        <h3>Monthly Expenses</h3>
                        <Line data={this.state.lineChartData} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <h3>Expenses by Category</h3>
                        <Pie data={this.state.pieChartData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseTrackerDashboard;
