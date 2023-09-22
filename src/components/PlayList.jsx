import React from 'react';
import styles from './PlayList.module.css';
import TrackInPlaylist from './TrackInPlaylist';

export default function PlayList({ playlist, remove }) {
    //console.log("from PlayList.jsx: " + playlist);
    return (
        <div className={styles.playList} id="playlist">
            <h2>Your New Playlist</h2>
            
            { playlist.map((ele, index) =>  {
                        
                return <TrackInPlaylist 
                        index={index} 
                        name={ele.name} 
                        artist={ele.artist} 
                        album={ele.album} 
                        img={ele.img}
                        key={ele.id}
                        track={ele}
                        remove={remove}/>
             })
            }
            <button>Save to Spotify</button>
        </div>
    );
}


