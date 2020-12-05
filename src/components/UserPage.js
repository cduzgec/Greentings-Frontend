import React, {useState,useEffect } from "react";

function UserPage({ match }) {
  useEffect(() => { fetchUser();}, []);

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const data = await fetch(`/user/${match.params.user_id}`)
    const user = await data.json();
    setUser(user)
    console.log("USERPAGE")
    console.log(user);
  }
  return (
    <div>
        <h1>Welcome {user.first_name}</h1>
    </div>
  );
}

export default UserPage;
