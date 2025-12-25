import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../api/config';

const BudgetForm = ({ projectId, onUpdate }) => {
    const [amount, setAmount] = useState('');
    const API_URL = getApiUrl();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/budget`, {
                project_id: projectId,
                amount: parseFloat(amount)
            });
            setAmount('');
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error setting budget", error);
        }
    };

    if (!projectId) return null;

    return (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <h3>Set Project Budget</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="Budget Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Update Budget</button>
            </form>
        </div>
    );
};

export default BudgetForm;
