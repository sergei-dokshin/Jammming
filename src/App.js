import React, { useState, useEffect } from 'react';
import './App.css';
import PlayList from './components/PlayList';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Header from './components/Header';
import queryString from 'query-string';
import axios from 'axios';

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [search, setSearch] = useState('');
  const [playlistHeader, setPlaylistHeader] = useState('');
  const [responseArray, setResponseArray] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [music, setMusic] = useState(false);


  //                          Getting access TOKEN

  useEffect(() => {

    const client_id = "44a2eeebcd05452fb85455ce497c3779";
    const client_secret = "23bb778bf4ff4f3cabcdb18feb6f3f19";
    const requestParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    }
    fetch("https://accounts.spotify.com/api/token", requestParameters)
      .then(response => response.json())
      .then(data => setAccessToken(data["access_token"]))
      .catch(e => {
        console.log("Unable to get TOKEN: " + e);
      })
  }, []);



  //                           GETTING RESPONSE
  async function fetchData() {

    const url = `https://api.spotify.com/v1/search?q=${search}&type=track,artist`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + accessToken
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


  //                          HANDLING FUNCTIONS
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





  //                            AUTHORIZATION
  function requestAuth() {
    let url = 'https://accounts.spotify.com/authorize?';

    url += "client_id=44a2eeebcd05452fb85455ce497c3779";
    url += "&response_type=code";
    url += "&redirect_uri=http://localhost:3000/";
    url += "&show_dialog=false";
    url += "&scope=playlist-modify-public playlist-modify-private";
    window.location.href = url;
  }

  let AuthCode = '';
  useEffect(() => {    
    getAuthCode();
    callAuthorizationApi();
    console.log("Auth code: " + AuthCode);
  }, []);
  

  async function getAuthCode() {

    if (window.location.search.length > 0) {
      const search = window.location.search;
      const getParam = new URLSearchParams(search);
      AuthCode = getParam.get('code');
    }
  }

  //             АВТОРИЗАЦИЯ ПРОДОЛЖАЕТСЯ. Получаем еще один access_token  
 

  function callAuthorizationApi() {
    let body = `grant_type=authorization_code&code=${AuthCode}&redirect_uri=http://localhost:3000/&client_id=44a2eeebcd05452fb85455ce497c3779&client_secret=23bb778bf4ff4f3cabcdb18feb6f3f19`;
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('44a2eeebcd05452fb85455ce497c3779:23bb778bf4ff4f3cabcdb18feb6f3f19'));

    xhr.send(body);
    xhr.onload = handleAuthResponse;


  }


  
  const [access_token, setAccess_token] = useState('');
  console.log("access_token_free: " + access_token);
  //const [data, setData] = useState('blob');
  const [status, setStatus] = useState('blob');
  
  var data = 'blob';
  

  function handleAuthResponse() {
    
    if (this.status == 200) {
      //setData(JSON.parse(this.responseText));
      data = JSON.parse(this.responseText);
      setStatus('m');
      console.log("data: " + data);
      if (data.access_token != undefined) {
        
        setAccess_token(data.access_token);
        console.log("access_token: " + access_token);
        
      }
     
    } else {
      console.log("responseText: " + this.responseText);
    }
  }





  
  async function createPlaylist() {
    const user_id = "3143qbvhf3iu6jkeoyy4z77jsxlu";
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
      console.log("user_id: " + user_id);
      console.log(param);
      const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, param);
      const data = await response.json();
      const playlistId = data.id;

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, paramAddTracks);
      
      alert('The playlist has been created!');

    } catch (e) {
      console.log("Unable to create Playlist. Reason: " + e);
    }
  }


  return (
    status !== 'blob' ?
    <div className="App">
      <Header />
      <SearchBar value={search} handleSearch={handleSearch} fetchData={fetchData} data={data} requestAuth={requestAuth}/>
      <div className="main">
        <TrackList response={responseArray} add={addToPlaylist} music={music} setMusic={setMusic} />
        <PlayList playlist={playlist} remove={removeFromPlaylist} music={music} setMusic={setMusic} playlistHeader={playlistHeader} handlePlaylistHeader={handlePlaylistHeader} requestAuth={requestAuth} createPlaylist={createPlaylist} />
      </div>
    </div>
    :
    <div className="Authorize" id="searchbar">
        <button onClick={requestAuth}>Authorize</button>
    </div>
  );
}

export default App;
