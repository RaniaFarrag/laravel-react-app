import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function TruckRequestComponent  ()  {
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [date, setDate] = useState(new Date());
  const handleDateChange = (date) => {
    setDate(date);
};
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleTruckRequest = async (e) => {
    e.preventDefault();
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 

    setErrors('');
    setLoading(true); 
    const data = {address, weight, size, date:formattedDate};

    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
         
        const response = await axios.post('http://127.0.0.1:8000/api/truck_request', data);
        console.log(response)
        if (response.data.message) {
          toast.success(response.data.message);
          setLoading(false);
          setAddress('')
          setWeight('')
          setSize('')
          setDate(new Date());
          navigate('/list_truck_requests');
        }
     
    } catch (error) {
        if(error?.response?.status === 422){
            setErrors(error.response.data.message); 
        }
        setLoading(false)
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 mx-auto">
        <div className="card shadow-sm mt-5">
          <div className="card-header bg-primary text-white">
            <h4 className="text-center">Add Truck Request</h4>
          </div>
          <div className="card-body">
            {errors && <div className="alert alert-danger">{errors}</div>}
            <form onSubmit={handleTruckRequest}>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address*</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="weight" className="form-label">Weight*</label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="size" className="form-label">Size*</label>
                <input
                  type="number"
                  className="form-control"
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="truckDate">Request Date and Time</label>
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp" 
                    timeFormat="HH:mm"
                    timeIntervals={15} 
                    timeCaption="Time"
                />
            </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Submit'}
              </button>

              <div className="text-center mt-3">
                <p>See Your Requests? <a href="/list_truck_requests">Click here!</a></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckRequestComponent;
