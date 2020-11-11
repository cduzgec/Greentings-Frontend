import React, {useState,useEffect } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function Shop() {

    useEffect(() => {
        fetchItems();
    }, []);

    const[items,setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://ghibliapi.herokuapp.com/films');
       
        const items= await data.json();
        console.log(items); 
        setItems(items);

    };



  return (
    <div>
        {items.map(item => (
            <h1 key= {item.id}> 
            <Link to = {'/shop/${item.id}'}>{item.title} </Link>
            </h1> // items have title id description director etc
        ))}
    </div>
  );
}

export default Shop;
