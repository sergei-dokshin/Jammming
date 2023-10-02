import React from 'react';
import styles from './PlayList.module.css';
import TrackInPlaylist from './TrackInPlaylist';

export default React.memo(
    function PlayList({ playlist, remove, setMusic, music, playlistHeader, handlePlaylistHeader, createPlaylist, data, playPause }) {
    console.log(data);
    return (
        <div className={styles.playList} id="playlist">
                <input
                    type="text"
                    value={playlistHeader}
                    placeholder='Name of your new playlist'
                    onChange={handlePlaylistHeader}
                    className={styles.input}
                ></input>

                {playlist.map((ele, index) => {

                    return <TrackInPlaylist
                        index={index}
                        name={ele.name.substring(0, 25)}
                        artist={ele.artists[0].name}
                        album={ele.album.name.substring(0, 17)}
                        img={ele.album.images[2].url}
                        sound={ele.preview_url}
                        uri={ele.uri}
                        key={ele.id}
                        track={ele}
                        remove={remove}
                        setMusic={setMusic}
                        music={music}
                        playPause={playPause}
                    />

                })
                }                
                <button onClick={createPlaylist}>Save to Spotify</button>
            </div>
    );
}
);

