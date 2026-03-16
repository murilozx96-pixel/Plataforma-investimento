import React from 'react';

const Dashboard = () => {
    const portfolio = [{symbol: 'AAPL', amount: 10}, {symbol: 'GOOGL', amount: 5}];
    const availableStocks = ['MSFT', 'AMZN', 'TSLA', 'FB'];

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Your Portfolio</h2>
            <ul>
                {portfolio.map(stock => (
                    <li key={stock.symbol}>{stock.symbol}: {stock.amount}</li>
                ))}
            </ul>
            <h2>Available Stocks</h2>
            <ul>
                {availableStocks.map(stock => (
                    <li key={stock}>{stock}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;