import React from 'react';
import style from './TrackInPlaylist.module.css';

export default function TrackInPlaylist(props) {
    const {index, name, artist, album, img, remove, track} = props;
    return (
        <div className={style.trackDiv}>
            <h4><span className={style.spanNumber}>{index + 1}</span>{' ' + name} </h4>
            <p>{artist}</p>
            <div className={style.imgAlbum}><img src={img}/></div>
            <h6>{album} </h6>
            <div className={style.plus} onClick={() => remove(track)}>
            <p>-<span className={style.add}>Remove from Playlist</span></p>
            </div>
        </div>)


}