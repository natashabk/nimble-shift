import React, { useState } from 'react';


const CreateUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', {firstName, lastName, phone, email});
    // Here, you can also send formData to a server or API endpoint
  };

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={( e ) => setFirstName( e.target.value )}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={( e ) => setLastName( e.target.value )}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={( e ) => setEmail( e.target.value )}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          placeholder="123-456-7890"
          value={phone}
          onChange={( e ) => {
            const numericPhone = e.target.value.replace(/\D/g,'')
            setPhone( numericPhone )
          }}
          required
        />
      </div>
      <button type="submit">Create Profile</button>
    </form>
  )
}

export default CreateUser