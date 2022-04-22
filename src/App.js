import "./App.css";
import { useEffect, useState } from "react";
function App() {
    const [users, SetUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/user")
            .then(res => res.json())
            .then(data => SetUsers(data));
    }, []);
    let handleSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email };
        const newUser = [...users, user];
        SetUsers(newUser);
        const url = "http://localhost:5000/user";
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(user),
        };

        fetch(url, options)
            .then(res => res.json())
            .then(data => console.log(data));
    };

    return (
        <div className="App">
            Total User : {users.length}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" name="name" required />
                <input type="Email" placeholder="Email" name="email" required />
                <input type="submit" name="Submit" />
            </form>
            <ul>
                {users.map(user => (
                    <li key={user?.id}>
                        Name: {user?.name}, id: {user?.id}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
