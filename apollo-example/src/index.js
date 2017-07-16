import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'
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

const wsClient = new SubscriptionClient(
  process.env.REACT_APP_GRAPHCOOL_SUBSCRIPTION_ENDPOINT,
  {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(process.env.REACT_APP_GC_AUTH_TOKEN)
    }
  }
)

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      const token = localStorage.getItem(process.env.REACT_APP_GC_AUTH_TOKEN)
      req.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    }
  }
])

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})

// 4
render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
