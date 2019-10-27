import React from 'react'
import ReactDOM from 'react-dom'
import { FormThemeProvider } from 'react-standalone-form'
import './index.css'
import App from './App'
import { Auth0Provider } from './auth0'
import * as serviceWorker from './serviceWorker'


ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    client_id={process.env.REACT_APP_AUTH_CLIENT}
    redirect_uri={window.location.origin}
    responseType='token id_token'
    getTokenSilently
  >
    <FormThemeProvider>
      <App />
    </FormThemeProvider>
  </Auth0Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
