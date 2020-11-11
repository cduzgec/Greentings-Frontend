import React, {useState} from 'react';

const Movie = ({name, price}) => {  // can be written as ({name}) or porps

    return(
        <div>
            <h3>{name}</h3>
            <p>{price}</p>
        </div>
    );

}


export default Movie;
