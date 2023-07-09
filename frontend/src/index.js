import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom"
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App';

const theme = extendTheme({
  colors: {
    brand:{
      yellow:"#ffd149",
      blak:"#222230"
    }
  },
  fonts: {
    body: `'Syne Variable', sans-serif`
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
