import React from "react";

function Invoice({ match }) {

    console.log(match.params.order_id)
    //const data = await fetch(`/user/${match.params.user_id}`)


  return (
    <div>
        <h1>INVOICE PAGE for invoice ID: {match.params.order_id} </h1>
    </div>
  );
}

export default Invoice;
