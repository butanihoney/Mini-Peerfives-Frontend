import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RewardHistory = () => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));

        fetch(`${apiUrl}/rewards/${id}`)
            .then(response => response.json())
            .then(data => setHistory(data));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            <h1>Reward History</h1>
            <p>Reward Balance: {user?.rewardBalance}</p>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date-Time</th>
                        <th>Rewards Received</th>
                        <th>User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{new Date(item.dateTime).toLocaleString()}</td>
                            <td>{item.points}</td>
                            <td>{item.givenBy.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RewardHistory;
