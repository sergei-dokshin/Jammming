import React, {useRef} from 'react';
import styles from './Track.module.css';

export default function Track(props) {
    const {index, name, artist, album, img, add, track, sound, music, setMusic} = props;
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
            <h6>{album}</h6>
            <div className={styles.imgAlbum}>
                {!music ? (
                    <span id="playbutton" className={styles.Symbol} onClick={() => playPause()}>►</span>) : (
                    <span id="pausebutton" className={styles.Symbol} onClick={() => playPause()}>॥</span>
                )}
                <img src={img} />
                </div>            
            <div className={styles.plus} >
                <p onClick={() => add(track)} className={styles.cross}>+<span className={styles.add}>Add to Playlist</span></p>
            </div>
        </div>
    );
}


