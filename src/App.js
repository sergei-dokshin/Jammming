import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import PlayList from './components/PlayList';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Header from './components/Header';
import queryString from 'query-string';
import axios from 'axios';

function App() {

  const [search, setSearch] = useState('');
  const [playlistHeader, setPlaylistHeader] = useState('');
  const [responseArray, setResponseArray] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [music, setMusic] = useState(false);
  const [access_token, setAccess_token] = useState('');
  const [status, setStatus] = useState('blob');

  useEffect(() => {
    callAuthorizationApi();
  }, []);

  //                     ----------- AUTHORIZATION -----------

  function requestAuth() {
    let url = 'https://accounts.spotify.com/authorize?';

    url += "client_id=44a2eeebcd05452fb85455ce497c3779";
    url += "&response_type=code";
    url += "&redirect_uri=http://localhost:3000/";
    url += "&show_dialog=true";
    url += "&scope=playlist-modify-public playlist-modify-private";
    window.location.href = url;
  }
  //              ------------ GET ACCSESS TOKEN(after authorization) ------------

  async function getAccessToken(code) {
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/&client_id=44a2eeebcd05452fb85455ce497c3779&client_secret=23bb778bf4ff4f3cabcdb18feb6f3f19`;

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa('44a2eeebcd05452fb85455ce497c3779:23bb778bf4ff4f3cabcdb18feb6f3f19')
        },
        body: body
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAccess_token(data.access_token);
      setStatus('m');
    } catch (error) {
      console.error('GetAccessToken Error:', error);
    }
  }


  async function callAuthorizationApi() {
    let AuthCode = '';
    if (window.location.search.length > 0) {
      const search = window.location.search;
      const getParam = new URLSearchParams(search);
      AuthCode = getParam.get('code');
    }
    //console.log("Auth code: " + AuthCode);
    getAccessToken(AuthCode);
  }


  //                ------------- GETTING SEARCH RESPONSE -------------

  async function Search() {

    const url = `https://api.spotify.com/v1/search?q=${search}&type=track,artist`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + access_token
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setResponseArray(result.tracks.items);
      setSearch('');

    } catch (error) {
      console.error(error);
    }
  }


  //                   -------------   HANDLING FUNCTIONS -------------

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handlePlaylistHeader(e) {
    setPlaylistHeader(e.target.value);
  }

  function addToPlaylist(track) {
    let findTrack = responseArray.find(ele => ele.id == track.id);
    setPlaylist([findTrack, ...playlist]);
  }

  function removeFromPlaylist(track) {
    setPlaylist(playlist.filter(ele => ele.id !== track.id));
  }

  const [currentPlay, setCurrentPlay] = useState(null);
  const reffer = useRef(null);
  
  useEffect(() => {
    if (!music && currentPlay !== null) {
      reffer.current.pause();
    } 
    else if(music && currentPlay !== null){
      try {
        reffer.current.play();
      } catch (e) {
        console.log('cannot play music! - ' + e)
      }
    }
  }, [music]);

  function playPause(track) {    
    let findTrack = playlist.find(ele => ele.id == track.id);
    setCurrentPlay(findTrack);
    setMusic(!music);
  }



//                     ------------- CREATING PLAYLIST -------------

async function createPlaylist() {
  const param = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    },
    body: JSON.stringify({
      "name": playlistHeader,
      "public": false,
      "description": "Created with Jammming"
    })
  }

  let arrayOfURIs = [];
  function getURIs() {
    arrayOfURIs = playlist.map((ele) => ele.uri);
  }

  getURIs();

  const paramAddTracks = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
    },
    body: JSON.stringify({
      "uris": arrayOfURIs
    })
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/users/3143qbvhf3iu6jkeoyy4z77jsxlu/playlists`, param);
    const data = await response.json();
    const playlistId = data.id;

    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, paramAddTracks);

    alert('The playlist has been created!');

  } catch (e) {
    console.log("Unable to create Playlist. Reason: " + e);
  }
}


//                        ------------- RETURN ------------- 

return (
  status !== 'blob' ?
    <div className="App">
      <Header />
      <SearchBar value={search} handleSearch={handleSearch} Search={Search} />
      <div className="main">
        <audio src={currentPlay !== null ? currentPlay.preview_url : {}} ref={reffer} ></audio>
        <TrackList response={responseArray} add={addToPlaylist} music={music} setMusic={setMusic} playPause={playPause} />        
        <PlayList playlist={playlist} remove={removeFromPlaylist} music={music} setMusic={setMusic} playlistHeader={playlistHeader} handlePlaylistHeader={handlePlaylistHeader} requestAuth={requestAuth} createPlaylist={createPlaylist} playPause={playPause} reffer={reffer} />
      </div>
    </div>
    :
    <div className="Authorize" id="searchbar">
      <button onClick={requestAuth}>Authorize</button>
    </div>
);
}

export default App;
