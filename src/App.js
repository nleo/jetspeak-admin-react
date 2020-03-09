import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter'

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
const client = new ApolloClient({
  uri: 'http://localhost:3000/admin-graphql',
});


export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}
