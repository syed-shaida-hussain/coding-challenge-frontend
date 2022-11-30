import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        setUsers(res.data);
      });
    }, []);
    return (
      <div>
        <h1 className="heading centered">Exercise 1 : </h1>
        <h2 className="heading">
          Fetching users from database and displaying their names.
        </h2>
        {users.map((user) => (
          <div key={user.id} className="user">
            {user.id} ) {user.name}
          </div>
        ))}
      </div>
    );
  };

  export {Users}