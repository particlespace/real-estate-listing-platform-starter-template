
import { Center, Group, Modal } from '@mantine/core';

import React from 'react';
import {
  Header, HeaderProps,
} from './components/Header/Header';
import  Footer  from './components/Footer/Footer';
import { HEADER_HEIGHT } from './components/Header/styles';
import PropertyDetailView
  from './components/PropertyDetailView/PropertyDetailView';
import './App.css';
import Map from './components/Map/Map';
import {Sidebar} from './components/Listings/Sidebar'


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
          <Sidebar/>
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
      <PropertyDetailView />
    </div>
  );
}

export default App;
