import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Table from "./components/Table";
import Form from "./components/Form";

function App() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers()
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log.error("Unexpected response", res);
            }
        })
        .then((json) => {
            if(json) {
                setCharacters(json["users_list"]);
            } else {
                setCharacters(null);
            }
        })
        .catch((error) => {console.log("Fetch error:", error); });
    }, );  //[] argument so useEffect only runs when components first mounts

    function removeOneCharacter(index) {
        const charID = characters[index]._id;
        deleteUser(charID)
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to find user');
            }
            })
        .then(() => {
            setCharacters(characters.filter((_, i) => i !== index));
            })
        .catch((error) => {
            console.log(error);
        })
    }

    function updateList(person) {
        postUser(person)
        .then((response) => {
            if(response.status === 201) {
                return response.json();
            } else {
                throw new Error('Failed to create user');
            }
        })
        .then((data) => setCharacters([...characters, data.user]))
        .catch((error) => {
            console.log(error);
        })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:5478")
        return promise;
    }

    function postUser(person) {
        const promoise = fetch ("http://localhost:5478", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
        });
        return promise;
    }

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login handleSubmit={Login.loginUser} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

/* FROM PREVIOUS LAB
<Table
characterData={characters}
removeCharacter={removeOneCharacter}
/>
<Form handleSubmit={updateList} />
*/

export default App;
