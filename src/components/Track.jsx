import React, {useRef} from 'react';
import styles from './Track.module.css';

export default function Track(props) {
    const {index, name, artist, album, img, add, track, sound, music, playPause} = props;
    const reffer = useRef(null);
    
   

    return (
        <div className={styles.trackDiv}> 
            <audio src={sound} ref={reffer} ></audio>                               
            <span className={styles.spanNumber}>{index + 1}</span>
            <h4>{`${name}`}</h4>
            <p>{artist}</p>
            <h6>{album}</h6>
            <div className={styles.imgAlbum}>
                {!music ? (
                    <span id="playbutton" className={styles.Symbol} onClick={() => playPause(reffer)}>►</span>) : (
                    <span id="pausebutton" className={styles.Symbol} onClick={() => playPause(reffer)}>॥</span>
                )}
                <img src={img} />
                </div>            
            <div className={styles.plus} >
                <p onClick={() => add(track)} className={styles.cross}>+<span className={styles.add}>Add to Playlist</span></p>
            </div>
        </div>
    );
}


