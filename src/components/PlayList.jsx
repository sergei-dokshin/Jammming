import React from 'react';
import styles from './PlayList.module.css';
import TrackInPlaylist from './TrackInPlaylist';

export default function PlayList({ playlist, remove, setMusic, music, playlistHeader, handlePlaylistHeader, requestAuth, createPlaylist }) {
    
    return (
        <div className={styles.playList} id="playlist">
            <input 
                type="text"
                value={playlistHeader}
                placeholder='Name of your new playlist'
                onChange={handlePlaylistHeader} 
                className={styles.input}               
                ></input>
            
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
            <button onClick={requestAuth}>Authorize</button>
            <button onClick={createPlaylist}>Save to Spotify</button>
        </div>
    );
}


