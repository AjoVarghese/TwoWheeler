import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import store from './REDUX/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
    <Provider store={store}>
      <App />  
    </Provider>
    </ChakraProvider>
    
 
);

