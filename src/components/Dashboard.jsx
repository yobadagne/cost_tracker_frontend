import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = ({ summary }) => {
    if (!summary) return <div>Loading...</div>;

    const { total_cost, breakdown, budget, alert } = summary;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            
            {alert && (
                <div style={{ 
                    backgroundColor: '#ffcccc', 
                    color: '#cc0000', 
                    padding: '15px', 
                    marginBottom: '20px',
                    borderRadius: '5px',
                    fontWeight: 'bold'
                }}>
                    ⚠️ ALERT: Total cost ({total_cost.toFixed(2)}) has exceeded the budget ({budget.toFixed(2)})!
                </div>
            )}

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', flex: 1 }}>
                    <h3>Total Cost</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${total_cost.toFixed(2)}</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', flex: 1 }}>
                    <h3>Budget</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${budget ? budget.toFixed(2) : 'Not Set'}</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', flex: 1 }}>
                    <h3>Remaining</h3>
                    <p style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold',
                        color: (budget - total_cost) < 0 ? 'red' : 'green' 
                    }}>
                        ${(budget - total_cost).toFixed(2)}
                    </p>
                </div>
            </div>

            <div style={{ width: '100%', height: '300px', marginBottom: '20px' }}>
                <h3>Cost Breakdown</h3>
                { breakdown && breakdown.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={breakdown}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="type" type="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#8884d8" name="Cost" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No expenses recorded yet.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
