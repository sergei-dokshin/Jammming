import React from 'react';
import styles from './Track.module.css';

export default function Track(props) {
    const {index, name, artist, album, img, add, track} = props;
    return (
        <div className={styles.trackDiv}>
            <h4><span className={styles.spanNumber}>{index + 1}</span>{`  ${name}`}</h4>
            <p>{artist}</p>
            <div className={styles.imgAlbum}><img src={img} /></div>
            <h6>{album}</h6>
            <div className={styles.plus} >
                <p onClick={() => add(track)}>+<span className={styles.add}>Add to Playlist</span></p>
            </div>
        </div>
    );
}
