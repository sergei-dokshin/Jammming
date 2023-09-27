import React, { useState, useEffect } from 'react';
import styles from './TrackList.module.css';
import Track from './Track';



export default function TrackList(props) {
    
    
    if(props.response !== '') {        
        const arrayTracks = props.response;          

        return (
            <div className={styles.tracklistDiv} id="tracklist">
                <h2>Search Results</h2>
                
                { arrayTracks.map((ele, index) => 
                   
                    <Track
                        index={index} 
                        name={ele.name.substring(0,25)} 
                        artist={ele.artists[0].name} 
                        album={ele.album.name.substring(0,17)} 
                        img={ele.album.images[2].url}
                        sound={ele.preview_url}
                        toggleSymbol={props.toggleSymbol}
                        music={props.music}                    
                        key={ele.id}
                        id={ele.id} 
                        track={ele}
                        add={props.add}                        
                        setMusic={props.setMusic}
                    />)                     
                }    
            </div>
        )
            }else{
                return (
                    <div className={styles.tracklistDiv} id="tracklist">
                        <h2>Search Results</h2>
                           
                    </div>
                )
            }
            // return (
            //     <div className={styles.tracklistDiv} id="tracklist">
            //         <h2>Search Results</h2>
            //         { props.tracks.map((ele, index) =>  {
            //             const track = <Track
            //             index={index} 
            //             name={ele.name} 
            //             artist={ele.artist} 
            //             album={ele.album} 
            //             img={ele.img}
            //             key={ele.id}            
            //             track={ele}
            //             add={props.add}/>                
                        
                       
            //             return track;
            //         })
            //         } 
            //     </div>
            // )
        
    
}
