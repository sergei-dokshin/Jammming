import React from 'react';
import styles from './PlayList.module.css';
import TrackInPlaylist from './TrackInPlaylist';

export default function PlayList({ playlist, remove, setMusic, music }) {
    
    return (
        <div className={styles.playList} id="playlist">
            <h2>Your New Playlist</h2>
            
            { playlist.map((ele, index) =>  {
                        
                return <TrackInPlaylist 
                        index={index} 
                        name={ele.name.substring(0,25)} 
                        artist={ele.artists[0].name} 
                        album={ele.album.name.substring(0,17)} 
                        img={ele.album.images[2].url}
                        sound={ele.preview_url}
                        key={ele.id}
                        track={ele}
                        remove={remove}
                        setMusic={setMusic}
                        music={music}
                        />
                        
             })
            }
            <button>Save to Spotify</button>
        </div>
    );
}


