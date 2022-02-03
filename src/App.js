import React, { useState } from 'react'
import './App.css'
import Amplify, { Storage } from 'aws-amplify'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { MdSend /* MdList */ } from 'react-icons/md'
import awsConfig from './aws-exports'
Amplify.configure(awsConfig)

const App = () => {

  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='AnyCompany video team, Sign-In with Your E-Mail Address'
        slot='sign-in'
      />
      <AmplifySignUp
        headerText='AnyCompany video team, Sign-Up with Your E-Mail Address'
        slot='sign-up'
      />
      <h2>Hello</h2>


      <div className='sign-out'>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  )
}

export default App
