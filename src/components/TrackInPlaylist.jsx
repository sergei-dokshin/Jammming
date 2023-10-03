import React, { useRef } from 'react';
import styles from './TrackInPlaylist.module.css';

export default function TrackInPlaylist(props) {
    const {index, name, artist, img, remove, track, setMusic, music, sound} = props;
    const reffer = useRef(null);
    
    async function playPause() {
        setMusic(!music);
        if(music) {
            reffer.current.pause();
        }else{
            try{
                await reffer.current.play();
            }catch(e){
                console.log('paused!' + e)
            }            
        }
    }

    return (
        
        <div className={styles.trackDiv}> 
            <audio src={sound} ref={reffer} ></audio>                               
            <span className={styles.spanNumber}>{index + 1}</span>
            <h4>{`${name}`}</h4>
            <p>{artist}</p>            
            <div className={styles.imgAlbum}>
                {!music ? (
                    <span id="playbutton" className={styles.Symbol} onClick={() => playPause(reffer)}>►</span>) : (
                    <span id="pausebutton" className={styles.Symbol} onClick={() => playPause(reffer)}>॥</span>
                )}
            <img src={img} />
            </div>            
            <div className={styles.minus} >
                <h2 onClick={() => remove(track)} className={styles.line}>-<span className={styles.add}>Remove from Playlist</span></h2>
            </div>            
        </div>
        )
        


}