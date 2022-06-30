import React from 'react';
import {
  Header,
  HeaderProps,
} from './components/Header/Header';
import {
  Center,
  Group,
} from '@mantine/core';
import  Footer  from './components/Footer/Footer';
import { HEADER_HEIGHT } from './components/Header/styles';
import './App.css';

import Map from './components/Map/Map';
import {Address, Sidebar} from './components/Sidebar/Sidebar';
import data from "./data/proptertyData.json";

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
              width: '750px',
              '@media (max-width: 1600px)': {
                  width: '375px'
              },
          }}
        >
          <Sidebar />
        </Center>
        <Center
          sx={{
              height: '100%',
              width: 'calc(99% - 750px)',
              '@media (max-width: 1600px)': {
                  width: 'calc(97% - 375px)'
              },
          }}
          >
          <Map />
        </Center>
      </Group>
      <Footer />
    </div>
  );
}

export default App;

