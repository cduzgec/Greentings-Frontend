import React, {useState,useEffect } from 'react';
import '../App.css';


function ItemDetail({match}) {
    useEffect(() => {
        fetchItem();
        console.log(match);
    }, []);

    const[item,setItem] = useState();

    const fetchItem = async () => {
        const fetchItem = await fetch( 'https://ghibliapi.herokuapp.com/films/?id=${match.params.id}');
        const item= await fetchItem.json();
        console.log(item); 
    };


    return (
    <div>
        <h1>Movie Page: but need to be improve to be an individual unique movie page</h1> {/* item.name */}
    </div>
    );
}

export default ItemDetail;
