import React, { useState } from 'react';
import NavBar from "./components/NavBar";
import Body from "./components/body";
import { CityNameContext } from "./components/CityNameContext";
import './App.css';

function App() {
    const [city, setCity] = useState("Delhi");

    return (
        <div className="App">
            <CityNameContext.Provider value={{ city, setCity }}>
                <NavBar />
                <Body />
            </CityNameContext.Provider>
        </div>
    );
}

export default App;
