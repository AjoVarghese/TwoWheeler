import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import { ChakraProvider } from '@chakra-ui/react'
import store from './redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <ChakraProvider>
   
    <Provider store={store}>
    <ErrorBoundary>
    {/* <React.StrictMode> */}
      <App />  
      {/* </React.StrictMode> */}
    </ErrorBoundary>
    </Provider>
   
    // </ChakraProvider>
    
 
);

