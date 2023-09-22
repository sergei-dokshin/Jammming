import React, { useState } from 'react';
import styles from './TrackList.module.css';
import Track from './Track';



export default function TrackList(props) {
    const tracklist = [];
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
        
            return (
                <div className={styles.tracklistDiv} id="tracklist">
                    <h2>Search Results</h2>
                    { props.tracks.map((ele, index) =>  {
                        const track = <Track
                        index={index} 
                        name={ele.name} 
                        artist={ele.artist} 
                        album={ele.album} 
                        img={ele.img}
                        key={ele.id} 
                        crossFunc={props.func} />;
                        
                        tracklist.push(track);
                        console.log(tracklist);
                        
                        return track;
                    })
                    } 
                </div>
            )
        
    
}
