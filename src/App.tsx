import { Center, Group } from '@mantine/core';
import React from 'react';
import {
  Header, HeaderProps,
} from './components/Header/Header';
import  Footer  from './components/Footer/Footer';
import { HEADER_HEIGHT } from './components/Header/styles';
import './App.css';
import axios, { 
  AxiosError, 
  AxiosResponse 
} from 'axios';
import qs from 'qs';

/**
 * Authorization header for the Particle Space API
 */
const data = qs.stringify({
  'secret_key': process.env.REACT_APP_PARTICLE_SPACE_SECRET_KEY,
  'publish_key': process.env.REACT_APP_PARTICLE_SPACE_PUBLISH_KEY,
});
const authorizationConfig = {
  method: 'post',
  url: 'https://api.particlespace.com/api/v1/authenticate',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(authorizationConfig)
.then(function (response: AxiosResponse) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error: AxiosError) {
  console.log(error);
});

/**
 * Query params placeholder for the Search API
 */
const addressNumber = '808';
const address = 'awesome street';
const city = 'San Francisco';
const state = 'CA';
const zipcode = '94103';

/**
 * Particle Space search API
 */
const searchConfig = {
  method: 'get',
  url: `https://api.particlespace.com/api/v1/property/search?address=${addressNumber} ${address}&city=${city}&state=${state}&zipcode=${zipcode}`,
  headers: {
    'Authorization': 'Bearer ' + process.env.BEARER_TOKEN
  }
};

axios(searchConfig)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

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
          <Map/>
        </Center>
      </Group>
      <Footer />
    </div>
  );
}

export default App;

