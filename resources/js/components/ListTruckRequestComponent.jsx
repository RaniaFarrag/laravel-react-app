import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ListTruckRequestComponent  ()  {
    const [truckRequests, setTruckRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTruckRequests = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/list_truck_requests', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
                    },
                });
                setTruckRequests(response.data);
            } catch (err) {
                if (err.response && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('An error occurred while fetching truck requests.');
                }
                toast.error(message);
            } finally {
                setLoading(false);
            }
        };

        fetchTruckRequests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center bg-success text-white p-3 rounded">Truck Requests</h2>
            <table className="table table-striped table-hover table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Address</th>
                        <th>Weight (kg)</th>
                        <th>Size (m³)</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {truckRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.user ? request.user.name : ''}</td>
                            <td>{request.address}</td>
                            <td>{request.weight}</td>
                            <td>{request.size}</td>
                            <td>{new Date(request.date).toLocaleString()}</td>
                            <td>
                                <span className={`badge ${request.status === 0 ? 'bg-warning' : (request.status === 1 ? 'bg-primary' : 'bg-success')}`}>
                                    {request.status === 0 ? 'Pending' : (request.status === 1 ? 'In Progress' : 'Delivered')}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-center mt-3">
                <a href="/truck_request" className="btn btn-primary">Add Request</a>
            </div>
        </div>
    );
}
  
  export default ListTruckRequestComponent;