import React from 'react';
import styles from './PlayList.module.css';

export default function PlayList() {

    return (
        <div className={styles.playList} id="playlist">
            <h2>Your New Playlist</h2>
            <h2>list of tracks...</h2>
            <button>Save to Spotify</button>
        </div>
    );
}


