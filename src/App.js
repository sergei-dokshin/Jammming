import React, { useState, useEffect } from 'react';
import './App.css';
import PlayList from './components/PlayList';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Header from './components/Header';

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [search, setSearch] = useState('');
  const [responseArray, setResponseArray] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([
    {name: 'Painkiller', artist: 'Judas Priest', album: 'Painkiller', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '77773473525'}, 
    {name: 'Toxic', artist: 'Britney Spears', album: 'Toxic', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '97899805757'}, 
    {name: 'Formidable', artist: 'Alex Pachabezian', album: 'Piano Arrangement', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '56454777457'}
]);
  
//                          Getting access TOKEN
 
  useEffect(() => {
    // Getting access TOKEN
    const client_id = "44a2eeebcd05452fb85455ce497c3779";
    const client_secret = "23bb778bf4ff4f3cabcdb18feb6f3f19";
    //const url = "https://accounts.spotify.com/api/token";
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
    console.log(accessToken);
  },[]);
    


  function handleSearch(e) {
    setSearch(e.target.value);
  }


  // function addToPlaylist(track) {    
  //   let findTrack = tracks.find(ele => ele.id == track.id);    
  //   setPlaylist([findTrack, ...playlist]);    
  // } 
  
  function addToPlaylist(track) {    
    let findTrack = responseArray.find(ele => ele.id == track.id);    
    setPlaylist([findTrack, ...playlist]);    
  } 

  function removeFromPlaylist(track) {
    setPlaylist(playlist.filter(ele => ele.id !== track.id));
  }


  // async function fetchData() {
  //   const url = `https://spotify23.p.rapidapi.com/search/?q=${search}&type=tracks`;
  //   const options = {
	//     method: 'GET',
	//     headers: {
	// 	    'X-RapidAPI-Key': '8e70b69d61mshb35359547142cb7p12c108jsnf11da5afb4fd',
	// 	    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	//     }
  //   };

  //   try {
	//     const response = await fetch(url, options);
	//     const result = await response.json();
	//     setResponse(result);
  //     setSearch('');
  //   } catch (error) {
	//     console.error(error);
  //   }
  //     }
      
  async function fetchData() {

      const url = `https://api.spotify.com/v1/search?q=${search}&type=track,artist`;
      const options = {
        method: 'GET',
        headers: {
    	    Authorization:  "Bearer "+ accessToken 
        }
      };
  
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("RESULT: " + result);
        setResponseArray(result.tracks.items);
        setSearch('');
        
      } catch (error) {
        console.error(error);
      }
        }
      console.log("THIS_NOW: " + playlist);  

  return (
    <div className="App">
      <Header />
      <SearchBar value={search}  func={handleSearch} fetchData={fetchData}/>
      <div className="main">
        <TrackList response={responseArray} tracks={tracks} add={addToPlaylist} />
        <PlayList playlist={playlist}  remove={removeFromPlaylist} />
      </div>
      
      
      
    </div>
  );
}

export default App;
