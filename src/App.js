import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter'

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// localStorage.setItem('token', '1');

const client = new ApolloClient({
  uri: 'http://localhost:3000/admin-graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token || ''
      }
    })
  }
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}
