import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
// 1
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo'

// 2
const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
})

// 3
const client = new ApolloClient({
  networkInterface
})

// 4
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
