import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserList.css'; 

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div className="user-list-container">
            <h1>Users List</h1>
            <Link className="create-user-button" to="/new">Create New User</Link>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>P5 Balance</th>
                        <th>Reward Balance</th>
                        <th>Login</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.p5Balance}</td>
                            <td>{user.rewardBalance}</td>
                            <td>
                                <Link className="view-button" to={`/${user._id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
