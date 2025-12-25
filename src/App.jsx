import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import BudgetForm from './components/BudgetForm';
import Dashboard from './components/Dashboard';
import ProjectSelector from './components/ProjectSelector';
import { getApiUrl } from './api/config';
import './App.css';

function App() {
  const [projectId, setProjectId] = useState(null);
  const [summary, setSummary] = useState(null);
  const API_URL = getApiUrl();

  const fetchSummary = async () => {
    if (!projectId) {
        setSummary(null);
        return;
    }
    try {
      const res = await axios.get(`${API_URL}/api/summary?project_id=${projectId}`);
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching summary", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [projectId]);

  return (
    <div className="container">
      <h1>Road Construction Cost Tracker</h1>
      
      <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
        API: {API_URL || 'Local Proxy'}
      </div>
      
      <ProjectSelector selectedProjectId={projectId} onSelect={setProjectId} />

      {projectId ? (
        <div className="layout">
          <div className="sidebar">
            <BudgetForm projectId={projectId} onUpdate={fetchSummary} />
            <ExpenseForm projectId={projectId} onUpdate={fetchSummary} />
          </div>
          
          <div className="main-content">
            <Dashboard summary={summary} />
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Please select or create a project to get started.</p>
      )}
    </div>
  );
}

export default App;
