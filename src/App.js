import React, { useState,useEffect } from 'react'
import './App.css'
import Amplify from 'aws-amplify'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { MdSend /* MdList */ } from 'react-icons/md'
import axios from 'axios'
import awsConfig from './aws-exports'
const thumbs_up = require('./assets/thumbs_up.png');
const thumbs_down = require('./assets/thumbs_down.png');
Amplify.configure(awsConfig)


class VideoPlayer extends React.Component {

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
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

/*
function xyz (callback) { 
  axios.get(`https://56lor2kfz8.execute-api.us-east-1.amazonaws.com/test/videos`)
    .then(res => {
      const filepath = res.data.Items[0].filepath.S
      callback ({autoplay: false, controls: true,sources: [{src: filepath}]})
    }).catch(err =>{
      console.log(err);
    })
  }
*/

const useFetchData = (url) => {
  const [state, setState] = useState({ isLoading: true, error: null, data: null });
  useEffect(() => {
    //let isMounted = true;  
    axios.get(url)
      .then((res) => {
        console.log(res.data.Items.length)
        if(res.data.Items.length === 3){
          setState(
          { isLoading: false, data: [
            {autoplay: false, controls: true,sources: [{src: res.data.Items[0].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[1].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[2].filepath.S}]}], 
            error: null });
        } else if (res.data.Items.length === 4){
          setState(
          { isLoading: false, data: [
            {autoplay: false, controls: true,sources: [{src: res.data.Items[0].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[1].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[2].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[3].filepath.S}]}], 
            error: null });
        } else if (res.data.Items.length === 5){
          setState(
          { isLoading: false, data: [
            {autoplay: false, controls: true,sources: [{src: res.data.Items[0].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[1].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[2].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[3].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[4].filepath.S}]}], 
            error: null });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, data: null, error });
      });
  }, [url]);
  return state;
};

function populateDate(username,video,vote){
    console.log(username,video,vote);
    axios.post('https://dcyxom2xcc.execute-api.us-east-1.amazonaws.com/prod/updaterecord', {
      username: username,
      video: video,
      vote: vote
    })
  };


function App() {

  const { isLoading, data, error } = useFetchData("https://56lor2kfz8.execute-api.us-east-1.amazonaws.com/test/videos");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error: {error}</div>;

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
    

    <div>
      <nav style={nav}>
        <p style={navHeading}>AnyCompany Sports Streaming</p>
      </nav>
      
      <div style={container}>
        
        <table>
          <tbody>
            <tr>
              <th>Video</th>
              <th>Vote</th>
            </tr>
            {data.map(function(object, i){
              //console.log(object);
                return <tr><td><VideoPlayer { ...object  }/></td><td><img src={thumbs_up} alt="Thumbs Up" onClick={() => populateDate('hnvasa@gmail.com',object.sources[0].src,'upvote')} /><img src={thumbs_down} alt="Thumbs Down" onClick={() => populateDate('hnvasa@gmail.com',object.sources[0].src,'downvote')} /></td></tr>;
            })}
          </tbody>
        </table>


      </div>
      </div>

      
      <div className='sign-out'>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
    
    
  );
}

const nav = { padding: '0px 40px', height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }
const container = { paddingTop: 40, width: 960, margin: '0 auto' }
const navHeading = { margin: 0, fontSize: 18 }

export default App
