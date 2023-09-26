import React, { useState } from 'react';
import styles from './TrackList.module.css';
import Track from './Track';



export default function TrackList(props) {
    
    if(props.response !== '') {
        console.log(props.response);
         const arrayTracks = props.response;
         console.log(arrayTracks); 

        return (
            <div className={styles.tracklistDiv} id="tracklist">
                <h2>Search Results</h2>
                { arrayTracks.map((ele, index) =>  
                    <Track
                    index={index} 
                    name={ele.name} 
                    artist={ele.artists[0].name} 
                    album={ele.album.name} 
                    img={ele.album.images[2].url}
                    key={ele.id}
                    id={ele.id} 
                    track={ele}
                    add={props.add}
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
