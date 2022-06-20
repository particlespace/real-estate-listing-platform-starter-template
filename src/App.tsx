import React from 'react';
import {
  Header, HeaderProps,
} from './components/Header/Header';
import logo from './logo.svg';
import './App.css';

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
    </div>
  );
}

export default App;
