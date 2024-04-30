import React, { useState } from 'react';
import { Button, Heading, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'

const CreateSite = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [admin, setAdmin] = useState('')
    const [users, setUsers] = useState([])


    // get list of users to select one as the admin for this site
    const getUsers = async () => {
      console.log("fetching users")
      
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
    
      if (response.ok) {
        const userList = await response.json();
        setUsers(userList)
      } else {
        console.error('Failed to get users:', await response.json());
      }

    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Submitted data:', {name, address, city, state, zipcode, phone, email, admin});
      const data = { site: { name, address, city, state, zipcode, email, phone, site_admin_id: parseInt(admin) }};
    
      const response = await fetch('http://localhost:3001/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    
      if (response.ok) {
        console.log('Site created:', await response.json());
      } else {
        console.error('Failed to create user:', await response.json());
      }
  
    };
  
    if (users.length == 0) {getUsers()}

    return(
      <div style={{width: 500}}>
        <Heading>New Site</Heading>
        <form onSubmit={handleSubmit}>
          <div>
            <Input type="text" value={name} placeholder="Name" onChange={( e ) => setName( e.target.value )} required/>
            <Input type="text" value={address} placeholder="Address" onChange={( e ) => setAddress( e.target.value )} required/>
            <Input type="text" value={city} placeholder="City" onChange={( e ) => setCity( e.target.value )} required/>
            <Input type="text" value={state} placeholder="State" onChange={( e ) => setState( e.target.value )} required/>
            <Input type="text" value={zipcode} placeholder="Zipcode" onChange={( e ) => setZipcode( e.target.value )} required/>
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
            <Select placeholder='Site admin' onChange={(e)=> setAdmin(e.target.value) }>
              {users.map(user => <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)}
            </Select>
          </div>
          <Button colorScheme='teal' type="submit">Create Site</Button>
        </form>
      </div>
    )
  }
  
  export default CreateSite