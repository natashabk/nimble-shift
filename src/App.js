import React, { useState } from 'react';
import { Button, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'


const CreateUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted data:', {firstName, lastName, phone, email});
    // Here, you can also send formData to a server or API endpoint
    const data = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      }
    };
  
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      console.log('User created:', await response.json());
    } else {
      console.error('Failed to create user:', await response.json());
    }

  };

  return(
    <div style={{width: 500}}>
      <Heading>New User</Heading>
      <form onSubmit={handleSubmit}>
        <div>
          <Input type="text" value={firstName} placeholder="First Name" onChange={( e ) => setFirstName( e.target.value )} required/>
          <Input type="text" value={lastName} placeholder="Last Name" onChange={( e ) => setLastName( e.target.value )} required/>
          <Input type="email" value={email} placeholder="Email Address" onChange={( e ) => setEmail( e.target.value )} required/>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <PhoneIcon color='gray.300' />
            </InputLeftElement>
            <Input
              type='tel' 
              placeholder='Phone number'
              value={phone}
              onChange={( e ) => {
                const numericPhone = e.target.value.replace(/\D/g,'')
                setPhone( numericPhone )
              }}
              required
              />
          </InputGroup>
        </div>
        <Button colorScheme='teal' type="submit">Create Profile</Button>
      </form>
    </div>
  )
}

export default CreateUser