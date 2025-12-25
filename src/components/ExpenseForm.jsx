import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../api/config';

const ExpenseForm = ({ projectId, onUpdate }) => {
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Labor');
    const [amount, setAmount] = useState('');
    const API_URL = getApiUrl();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/expenses`, {
                description,
                type,
                amount: parseFloat(amount),
                project_id: projectId,
                date: new Date().toISOString()
            });
            setDescription('');
            setAmount('');
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error adding expense", error);
        }
    };

    if (!projectId) return null;

    return (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <h3>Add Daily Expense</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Labor">Labor</option>
                        <option value="Material">Material</option>
                        <option value="Equipment">Equipment</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default ExpenseForm;
