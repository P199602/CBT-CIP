import React, { useContext } from 'react';
import { CityNameContext } from '../components/CityNameContext';
import '../style/style.css';

const Navbar = () => {
    const { city, setCity } = useContext(CityNameContext);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div>
            <div className='top'>
                <h2 className='top-bar'>Today Weather</h2>
                <div className='input-bar'>
                <h4 className='top-bar-s'>Enter your city name</h4>
                <input
                    className='insert-field'
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="City name"
                />
            </div>
            </div>
        </div>
    );
};

export default Navbar;
