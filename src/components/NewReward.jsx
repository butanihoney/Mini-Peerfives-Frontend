import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NewReward = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [amount, setAmount] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [balance, setBalance] = useState(0);
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetch list of users excluding the current user
        fetch(`${apiUrl}/users`)
            .then(response => response.json())
            .then(data => setUsers(data.filter(user => user._id !== id)));

        // Fetch current user's P5 balance
        fetch(`${apiUrl}/users/${id}`)
            .then(response => response.json())
            .then(data => setBalance(data.p5Balance));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount > 100 || amount <= 0 || amount > balance) return;

        // Create a new reward
        fetch(`${apiUrl}/rewards/${id}/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, recipientId: selectedUser }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create reward');
                }
                return response.json();
            })
            .then(() => navigate(`/${id}/p5`))
            .catch(err => {
                console.error('Error creating reward:', err);
                alert('Failed to create reward');
            });
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        setIsValid(value <= 100 && value > 0 && value <= balance);
    };

    return (
        <div>
            <h1>New Reward</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user">Select User:</label>
                    <select
                        id="user"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        required
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        max="100"
                        min="0"
                        required
                    />
                </div>
                <p>Current P5 Balance: {balance}</p>
                <button
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => navigate(`/${id}/rewards`)}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default NewReward;
