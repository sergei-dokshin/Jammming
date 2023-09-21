import React from 'react';
import styles from './TrackList.module.css';
import Track from './Track';

export default function TrackList(props) {
    
    /* if(props.response !== '') {
        console.log(props.response);
         const arrayTracks = props.response.tracks.items;
         console.log(arrayTracks); 

        return (
            <div className={styles.tracklistDiv} id="tracklist">
                <h2>Search Results</h2>
                { arrayTracks.map((ele, index) =>  
                    <Track
                    index={index} 
                    name={ele.data.name} 
                    artist={ele.data.artists.items[0].profile.name} 
                    album={ele.data.albumOfTrack.name} 
                    img={ele.data.albumOfTrack.coverArt.sources[1].url}
                    key={ele.data.id} 
                    crossFunc={props.func} />)
                }    
            </div>
        ) */
        
        const arrayTracks = [
                {name: 'Painkiller', artist: 'Judas Priest', album: 'Painkiller', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '77773473525'}, 
                {name: 'Painkiller', artist: 'Judas Priest', album: 'Painkiller', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '97899805757'}, 
                {name: 'Painkiller', artist: 'Judas Priest', album: 'Painkiller', img: 'https://i.scdn.co/image/ab67616d0000485120cac893b7a494f729128dac', id: '56454777457'}
            ]; 

            return (
                <div className={styles.tracklistDiv} id="tracklist">
                    <h2>Search Results</h2>
                    { arrayTracks.map((ele, index) =>  
                        <Track
                        index={index} 
                        name={ele.name} 
                        artist={ele.artist} 
                        album={ele.album} 
                        img={ele.img}
                        key={ele.id} 
                        crossFunc={props.func} />)
                    } 
                </div>
            )
        
    
}
