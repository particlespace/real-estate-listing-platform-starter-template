import { Center, Group } from '@mantine/core';
import React from 'react';
import {
  Header, HeaderProps,
} from './components/Header/Header';
import  Footer  from './components/Footer/Footer';
import { HEADER_HEIGHT } from './components/Header/styles';
import logo from './logo.svg';
import './App.css';

const token = async () => {
  try {
    const response = await fetch('https://api.particlespace.com/api/v1/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-xxx-form-urlencoded',
      },
    } as RequestInit);
    return JSON.stringify(response);
  } catch (error) {
    throw error;
  }
}

const addressNumber = '808';
const address = 'awesome street';
const city = 'San Francisco';
const state = 'CA';
const zipcode = '94103';

const data = async () => {
  try {
    const response = await fetch(`https://api.particlespace.com/api/v1/property/search?address=${addressNumber} ${address}&city=${city}&state=${state}&zipcode=${zipcode}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    } as RequestInit);
    return JSON.stringify(response);
  } catch (error) {
    throw error;
  }
}

const links: HeaderProps['links'] = [
  {
    link: '/home',
    label: 'Home'
  }
]

function App() {
  return (
    <div className="App">
      <Header links={links} />
      <Group
        sx={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Center
          sx={{
            height: '100%',
            width: '49%',
          }}
        >
          List
        </Center>
        <Center
          sx={{
          height: '100%',
          width: '50%',
        }}
          >
          Map/Details
        </Center>
      </Group>
      <Footer />
    </div>
  );
}

export default App;

