import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({component: Component,...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props.match)
        if (localStorage.getItem("isLogged") === "true" && localStorage.getItem("user_id") ===(props.match.params.user_id) ) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
