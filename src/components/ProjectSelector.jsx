import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../api/config';

const ProjectSelector = ({ selectedProjectId, onSelect }) => {
    const [projects, setProjects] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const API_URL = getApiUrl();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            // If API_URL is empty, it uses relative path (proxy)
            // If set (deployment), it uses full URL
            const res = await axios.get(`${API_URL}/api/projects`);
            setProjects(res.data);
            if (res.data.length > 0 && !selectedProjectId) {
                onSelect(res.data[0].id);
            }
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/projects`, {
                name: newProjectName
            });
            setNewProjectName('');
            setIsCreating(false);
            await fetchProjects();
            onSelect(res.data.id);
        } catch (error) {
            console.error("Error creating project", error);
        }
    };

    return (
        <div style={{ padding: '10px', marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label><strong>Current Project:</strong></label>
                <select 
                    value={selectedProjectId || ''} 
                    onChange={(e) => onSelect(parseInt(e.target.value))}
                    style={{ padding: '5px' }}
                >
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                <button onClick={() => setIsCreating(true)}>+ New Project</button>
            </div>

            {isCreating && (
                <div style={{ marginTop: '10px' }}>
                    <form onSubmit={handleCreate} style={{ display: 'flex', gap: '5px' }}>
                        <input 
                            type="text" 
                            placeholder="Project Name" 
                            value={newProjectName} 
                            onChange={(e) => setNewProjectName(e.target.value)} 
                            required 
                        />
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => setIsCreating(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProjectSelector;
