import React, { useState, useEffect, useRef } from 'react';
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
  
  /* const [tracks, setTracks] = useState([
    {name: 'Painkiller', artist: 'Judas Priest', album: 'Painkiller', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '77773473525'}, 
    {name: 'Toxic', artist: 'Britney Spears', album: 'Toxic', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '97899805757'}, 
    {name: 'Formidable', artist: 'Alex Pachabezian', album: 'Piano Arrangement', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '56454777457'}
]); */
  
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
    console.log(accessToken);
  },[]);
    


  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function addToPlaylist(track) {    
    let findTrack = responseArray.find(ele => ele.id == track.id);    
    setPlaylist([findTrack, ...playlist]);    
  } 

  function removeFromPlaylist(track) {
    setPlaylist(playlist.filter(ele => ele.id !== track.id));
  }

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
      
  const [music, setMusic] = useState(false);
  const reffer = useRef(null);
  
  const toggleSymbol = async (track) => {
    let findTrack = responseArray.find(ele => ele.id == track.id);
    

    setMusic(!music);
    
    
    if(music) {           
      reffer.current.pause();      
    }else{      
      await reffer.current.play();
    }   
  }

  function addToPlaylist(track) {    
    let findTrack = responseArray.find(ele => ele.id == track.id);    
    setPlaylist([findTrack, ...playlist]);    
  } 

  return (
    <div className="App">
      
      <Header />
      <SearchBar value={search}  func={handleSearch} fetchData={fetchData}/>
      <div className="main">
        <TrackList response={responseArray} add={addToPlaylist} toggleSymbol={toggleSymbol} music={music} setMusic={setMusic} reffer={reffer}/>
        <PlayList playlist={playlist}  remove={removeFromPlaylist} />
      </div>
      
      
      
    </div>
  );
}

export default App;
