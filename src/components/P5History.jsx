import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './P5History.css';

const P5History = () => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user details
        fetch(`/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));

        // Fetch P5 history
        fetch(`/transactions/${id}/p5`)
            .then(response => response.json())
            .then(data => setHistory(data));
    }, [id]);

    const handleDelete = (historyId, points) => {
        fetch(`/transactions/${id}/p5/${historyId}`, {
            method: 'DELETE',
        }).then(() => {
            setHistory(prevHistory => prevHistory.filter(item => item._id !== historyId));
            setUser(prevUser => ({ ...prevUser, p5Balance: prevUser.p5Balance - points }));
        });
    };

    return (
        <div className="p5-history-container">
            <h1>P5 History</h1>
            <p className="balance-info">P5 Balance: {user?.p5Balance}</p>
            <Link className="create-reward-button" to={`/${id}/rewards/new`}>Create New Reward</Link>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date-Time</th>
                        <th>P5 Given</th>
                        <th>User Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{new Date(item.dateTime).toLocaleString()}</td>
                            <td>{item.points}</td>
                            <td>{item.givenTo.name}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(item._id, item.points)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default P5History;
