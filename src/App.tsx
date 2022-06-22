import { Group, Center } from '@mantine/core';
import React from 'react';
import {
  Header, HeaderProps,
} from './components/Header/Header';
import  Footer  from './components/Footer/Footer';
import { HEADER_HEIGHT } from './components/Header/styles';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map/Map';


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
