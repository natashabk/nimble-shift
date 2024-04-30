import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateUser from './CreateUser';
import CreateSite from './CreateSite';

import { Button, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'

const Home = () => {
  return(
    <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/user">Create User</Link></li>
          <li><Link to="/site">Create Site</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/user" element={<CreateUser/>} />
        <Route path="/site" element={<CreateSite/>} />
      </Routes>
    </div>
    </Router>
  )
}

export default Home