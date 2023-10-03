import React, { useState, useEffect } from 'react';
import styles from './TrackList.module.css';
import Track from './Track';



export default React.memo(
    function TrackList(props) {
    
    
    if(props.response !== '') {        
        const arrayTracks = props.response;          

        return (
            <div className={styles.tracklistDiv} id="tracklist">
            <h2 className={styles.results}>Search Results</h2>
                
                { arrayTracks.map((ele, index) => 
                   
                    <Track
                        index={index} 
                        name={ele.name.substring(0,25)} 
                        artist={ele.artists[0].name}                         
                        img={ele.album.images[2].url}
                        sound={ele.preview_url}
                        uri={ele.uri}                        
                        music={props.music}                    
                        key={ele.id}
                        id={ele.id} 
                        track={ele}
                        add={props.add}                        
                        setMusic={props.setMusic}
                        playPause={props.playPause}
                    />)                     
                }    
            </div>
        )
            }else{
                return (
                    <div className={styles.tracklistDiv} id="tracklist">
                        <h2>Search Results</h2>
                           
                    </div>
                )
            }
                    
    
});
