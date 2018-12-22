import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import apolloClient from './apolloClient';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.12:8080'; //Change on host should be env variable.

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
