import React, { useEffect, useState } from 'react';
import '../App.css';

function ProductDetail({match}) {
  useEffect(() => {fetchItem(); console.log(match)},[]);

  const [item, setItem] = useState({});

  const fetchItem =async() => {
    const fetchItem = await fetch (`http://localhost:3000/product/${match.params.product_id}`)
    const item = await fetchItem.json();
    setItem(item)
    console.log(item);
  }


  return (
    <div>
        <h1>Product Detail</h1>
        <h1>{item.product_name}</h1>
        <img src={item.img} alt="item image" />
        <h1>{item.description}</h1>
        <h1>Brand: {item.brand_name}</h1>
        <h1>Price: {item.price}</h1>
    </div>
  );
}

export default ProductDetail;
