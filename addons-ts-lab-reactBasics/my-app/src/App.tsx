import React, { useState, useEffect } from 'react';
import './App.css';

// interface Address {
//   country: String,
//   state: String,
//   city: String,
//   postcode: String,
//   street: String,
//   number: Number,
// }

interface IUser {
  name: String,
  age: number,
  address: String,
}

function App() {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    const fetchedUser = async () => {
      const dataUser = await fetch("https://randomuser.me/api/");
      const newUser = await dataUser.json();
      const randomUser = newUser.results[0];

      setUser({
        ...user,
        name: randomUser.name.first,
        age: randomUser.dob.age,
        address: randomUser.location.city
      })

      console.log(user);
    };

    fetchedUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="App">
     <h1>{user.name}</h1>
      <div>{user.age}</div>
      <p>{user.address}</p>
      <input type="text" name="name" onChange={handleChange}></input>
    </div>
  );
}

export default App;
