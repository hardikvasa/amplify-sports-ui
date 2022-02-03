import React, { useState } from 'react'
import './App.css'
import Amplify, { Storage } from 'aws-amplify'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { MdSend /* MdList */ } from 'react-icons/md'
import awsConfig from './aws-exports'
Amplify.configure(awsConfig)


class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props)
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      
      <div data-vjs-player style={{
          width: 540, height: 320
        }}>
        <video  ref={(node) => { this.videoNode = node; }} className="video-js" />
      </div>
      

    );
  }
}

const vidArr = ["https://parth-demo-bucket.s3.us-east-2.amazonaws.com/F1.mp4","https://parth-demo-bucket.s3.us-east-2.amazonaws.com/F2.mp4"]

const videoJsOptions = {autoplay: false, controls: true,
  sources: [{src: vidArr[0]}]
}

const videoJsOptions2 = {autoplay: false, controls: true,
  sources: [{src: vidArr[1]}]
}

function App() {
  return (
    /*
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='AnyCompany video team, Sign-In with Your E-Mail Address'
        slot='sign-in'
      />
      <AmplifySignUp
        headerText='AnyCompany video team, Sign-Up with Your E-Mail Address'
        slot='sign-up'
      />
      */

    <div>
      <nav style={nav}>
        <p style={navHeading}>Live Streaming with React & AWS</p>
      </nav>
      
      <div style={container}>
        <table>
          <tr>
            <th>Video</th>
            <th>Vote</th>
          </tr>
          <tr>
            <td><VideoPlayer { ...videoJsOptions } /></td>
            <td></td>
          </tr>
          <tr>
            <td><VideoPlayer { ...videoJsOptions2 } /></td>
            <td></td>
          </tr>
        </table>
      </div>
      </div>

      /*
      <div className='sign-out'>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
    */
  );
}

const nav = { padding: '0px 40px', height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }
const container = { paddingTop: 40, width: 960, margin: '0 auto' }
const navHeading = { margin: 0, fontSize: 18 }

export default App
