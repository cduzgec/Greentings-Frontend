import React, {useState} from 'react';
import Movie from './Movie';

const MovieList = () => {
    const [movies,setMovies] = useState([
        {
            name: 'Harry',
            price: '10',
            id: '234'
        },
        {
            name: 'Game',
            price: '10',
            id: '39854854'
        },
        {
            name: 'Incept',
            price: '10',
            id: '864455'
        }
    ]);
    return(
        <div>
        {movies.map(movie => (
            <Movie name={movie.name} price={movie.price} key={movie.id}/>
        ))}
        </div>



    );

}


export default MovieList;
