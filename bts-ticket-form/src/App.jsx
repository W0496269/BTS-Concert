import React, { useState } from 'react';
import './App.css';

function App() {
  const initialForm = {
    ConcertId: 1,
    Email: '',
    Name: '',
    Phone: '',
    Quantity: 1,
    CreditCard: '',
    Expiration: '',
    SecurityCode: '',
    Address: '',
    City: '',
    Province: '',
    PostalCode: '',
    Country: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'https://nscc-0496269-ticketsapi-cxcvbwgcbrahfgeh.canadacentral-01.azurewebsites.net/api/tickets';
    console.log("Posting to:", apiUrl); 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Ticket submitted successfully!');
        setFormData(initialForm);
      } else {
        alert('Failed to submit ticket.');
      }
    } catch (error) {
      alert('An error occurred.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>BTS: Live in Seoul</h1>
        <p>Oct 21, 2025 | Olympic Stadium</p>
        <img src="/bts.jpg" alt="BTS" className="concert-img" />
      </div>

      <form onSubmit={handleSubmit} className="ticket-form">
        {Object.entries(initialForm).map(([key, val]) =>
          key === 'ConcertId' ? (
            <input key={key} type="hidden" name={key} value={formData[key]} />
          ) : (
            <div key={key} className="form-group">
              <label>{key}</label>
              <input
                name={key}
                type={key === 'Email' ? 'email' : key === 'Quantity' ? 'number' : 'text'}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          )
        )}
        <button type="submit">Buy Ticket</button>
      </form>
    </div>
  );
}

export default App;
