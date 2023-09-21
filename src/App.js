import React, { useState, useEffect } from 'react';
import './App.css';
import PlayList from './components/PlayList';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Header from './components/Header';

function App() {

  const [search, setSearch] = useState('');
  const [response, setResponse] = useState('');
  const [track, setTrack] = useState('');
  const [playlist, setPlaylist] = useState([]);
  

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  
  // function addToPlayList(e) {
  //       setPlaylist((prev) => {}, ...prev);
  // }

  async function fetchData() {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${search}&type=tracks`;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '8e70b69d61mshb35359547142cb7p12c108jsnf11da5afb4fd',
		    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
	    setResponse(result);
    } catch (error) {
	    console.error(error);
    }
      }
      
  
  

  return (
    <div className="App">
      <Header />
      <SearchBar value={search}  func={handleSearch} fetchData={fetchData}/>
      <div className="main">
        <TrackList response={response} />
        <PlayList />
      </div>
      
      
      
    </div>
  );
}

export default App;
