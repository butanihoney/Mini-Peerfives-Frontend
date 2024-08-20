import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserForm.css';

const UserForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (id) {
            fetch(`${apiUrl}/users/${id}`)
                .then(response => response.json())
                .then(data => setName(data.name));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/users/${id}` : `${apiUrl}/users/`;

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        }).then(() => navigate('/'));
    };

    const handleViewP5 = () => {
        if (id) {
            navigate(`/${id}/p5`);
        }
    };

    const handleViewRewards = () => {
        if (id) {
            navigate(`/${id}/rewards`);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>{id ? 'View User' : 'New User'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
                {id && (
                    <>
                        <button type="button" onClick={handleViewP5}>View P5 Balance</button>
                        <button type="button" onClick={handleViewRewards}>View Rewards Balance</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default UserForm;
