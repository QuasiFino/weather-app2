import React, {useState, useEffect} from 'react'
import './style.css';
import Weatherdetails from './Weatherdetails';

function SearchMain() {
    const [searchTerm, setSearchTerm] = useState('New york');
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=71e65770782f2cd2ee6fc0ea9465802f`;
            let res = await fetch(url);
            let data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { main: weatherType } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherType,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input 
                        className="searchTermf"
                        type="search" 
                        placeholder="Search city..." 
                        id="search" 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <button 
                        className="searchButton"
                        onClick={getWeatherInfo}
                    >
                        Search
                    </button>
                </div>

            </div>
            <Weatherdetails {...tempInfo}/>
        </>
    );
}

export default SearchMain;
